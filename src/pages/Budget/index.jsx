import React, { useEffect, useState } from 'react'
import { getBalanceOverview, getBudgetByUserID, getCurrentBudget, } from '../../api/budget.api'
import { useSelector } from 'react-redux'
import { Col, Row, Space, Empty } from 'antd';
import SimpleLineChartOption from '../../utils/SimpleLineChartOption';
import COLORS from '../../constants/COLORS';
import ReactEcharts from "echarts-for-react";
import { SimplePieChartOption } from '../../utils/SimplePieChartOption';
import AllBudgetsRecords from './components/AllBudgetsRecords';
import TimeBasisBalances from './components/TimeBasisBalances';
import OneBudgetCard from './components/OneBudgetCard';

function Budget() {
    const { user } = useSelector(state => state.user)
    const [allBudgets, setAllBudgets] = useState([])
    const [currentBudget, setCurrentBudget] = useState()
    const [balanceOverview, setBalanceOverview] = useState()
    const [monthlyBalance, setMonthlyBalance] = useState()
    const [dailyBalance, setDailyBalance] = useState()
    const [yearlyBalance, setYearlyBalance] = useState([])
    const getOverview = async (userId) => {
        await getBalanceOverview(userId).then(res => {
            if (res && res.status !== false) {
                const { balanceOverview, monthlyBalance, dailyBalance, yearlyBalance } = res
                console.log("sssss", res);
                setBalanceOverview(balanceOverview)
                setMonthlyBalance(monthlyBalance)
                setDailyBalance(dailyBalance)
                if (yearlyBalance && Object.keys(yearlyBalance).length !== 0) {
                    let dataArr = []
                    Object.keys(yearlyBalance).forEach(key => dataArr.push({ name: key, value: yearlyBalance[key] }))
                    setYearlyBalance(dataArr)
                }
            }
        })
    }
    const getAllbudgets = async (userId) => {
        await getBudgetByUserID(userId).then(res => {
            if (res && res.status !== false) {
                setAllBudgets(res)
            }
        })
    }
    const getCurrent = async (userId) => {
        await getCurrentBudget(userId).then(res => {
            if (res && res.status !== false) {
                setCurrentBudget(res)
            }
        })
    }
    const getAllData = () => {
        const userId = user.id
        getCurrent(userId)
        getAllbudgets(userId)
        getOverview(userId)
    }

    useEffect(() => {
        getAllData()
    }, [])


    return (
        <div>
            <Space
                direction="vertical"
                size="small"
                style={{
                    display: 'flex',
                }}
            >
                {currentBudget && Object.keys(currentBudget).length !== 0 && <OneBudgetCard Title={"Current Budget"} budget={currentBudget} getAllData={getAllData} />}
                <AllBudgetsRecords allBudgets={allBudgets} getAllData={getAllData} />
                <TimeBasisBalances balanceOverview={balanceOverview} />
                {/* charts */}
                <Row gutter={10}>
                    <Col span={12}>
                        <div style={{ width: "100%", backgroundColor: "#fff", height: 300, borderRadius: 10, }}>
                            {dailyBalance ? dailyBalance && Object.keys(dailyBalance) !== 0 && <ReactEcharts option={SimpleLineChartOption(Object.keys(dailyBalance), Object.values(dailyBalance), "Daily Balance", null, COLORS.white)} theme={'light'} />
                                : <Empty description={"Don't have the today's budget"} />}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div style={{ width: "100%", backgroundColor: "#fff", height: 300, borderRadius: 10, }}>
                            {monthlyBalance ? monthlyBalance && Object.keys(monthlyBalance) !== 0 && <ReactEcharts option={SimpleLineChartOption(Object.keys(monthlyBalance), Object.values(dailyBalance), "Monthly Balance", null, COLORS.white)} theme={'light'} />
                                : <Empty description={"Don't have the this month's budget"} />}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div style={{ width: "100%", padding: '20px 10%', backgroundColor: "#fff", height: 300, borderRadius: 10, }}>
                            {yearlyBalance ? yearlyBalance && Object.keys(yearlyBalance) !== 0 && <ReactEcharts option={SimplePieChartOption("Yearly Balances", yearlyBalance)} theme={'light'} />
                                : <Empty description={"Don't have the today's budget"} />}
                        </div>
                    </Col>
                </Row>
            </Space>
        </div >
    )
}

export default Budget
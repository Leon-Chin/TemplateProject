import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Space, Empty } from "antd";
import ReactEcharts from "echarts-for-react";

import { getAllLoansByUser, getLoanDataForYear, calculateTotalToRepay, calculateTotalToReceive } from "../../api/loan.api";
import { SimplePieChartOption } from "../../utils/SimplePieChartOption";
import LoanLineChartOption from "./utils/LoanLineChartOption";
import LoanBalances from "./components/LoanBalances";
import AllLoanRecords from "./components/AllLoanRecords";

function Loan() {
  const { user } = useSelector((state) => state.user);
  const [loans, setLoans] = useState([]);
  const [totalToRepay, setTotalToRepay] = useState();
  const [totalToReceive, setTotalToReceive] = useState();
  const [loanDataForChartGiven, setLoanDataForChartGiven] = useState([]);
  const [loanDataForChartTaken, setLoanDataForChartTaken] = useState([]);
  const [loanDataForYear, setLoanDataForYear] = useState([]);
  const [loanUpdated, setLoanUpdated] = useState(false);

  const generateLoanData = (loans, loanType) => {
    return loans
      .filter((loan) => loan.loan_type === loanType)
      .reduce((acc, loan) => {
        acc[loan.person] = (acc[loan.person] || 0) + loan.amount;
        return acc;
      }, {});
  };

  const generateChartData = (loanData) => {
    return Object.keys(loanData)
      .filter((person) => person && (typeof person === "string" || typeof person === "number"))
      .map((person) => ({ name: person, value: loanData[person] }));
  };

  const getLoans = async (userId) => {
    try {
      const res = await getAllLoansByUser(userId);
      if (res && res.status !== false) {
        setLoans(res);
        const loanDataGiven = generateLoanData(res, "GIVEN");
        const loanDataTaken = generateLoanData(res, "TAKEN");
        setLoanDataForChartGiven(generateChartData(loanDataGiven));
        setLoanDataForChartTaken(generateChartData(loanDataTaken));
      } else {
        console.error(res);
      }
    } catch (error) {
      console.log("Error in getLoans:", error);
    }
  };

  const getTotalToRepay = async (userId) => {
    await calculateTotalToRepay(userId).then((res) => {
      if (res && res.status !== false) {
        setTotalToRepay(res);
      }
    });
  };

  const getTotalToReceive = async (userId) => {
    await calculateTotalToReceive(userId).then((res) => {
      if (res && res.status !== false) {
        setTotalToReceive(res);
      }
    });
  };

  const generateChartOptions = (loanType, loanData) => {
    const baseOptions = SimplePieChartOption(`Total Loan ${loanType}`, loanData);
    return {
      ...baseOptions,
      title: {
        ...baseOptions.title,
        left: "center",
      },
      legend: {
        left: "center",
        bottom: "20",
      },
      series: [
        {
          ...baseOptions.series[0],
          emphasis: {
            label: {
              ...baseOptions.series[0].label,
              show: false,
            },
          },
        },
      ],
    };
  };

  // Line Chart
  const fetchLoanDataForYear = async (userId, year) => {
    const data = await getLoanDataForYear(userId, year);
    const dataArray = Object.keys(data).map((date) => ({ date, ...data[date] }));
    setLoanDataForYear(dataArray);
  };

  const generateLineChartOptions = (loanData, titles) => {
    const xData = loanData.map((item) => item.date);
    const givenData = loanData.map((item) => item.given);
    const takenData = loanData.map((item) => item.taken);
    const balanceData = loanData.map((item) => item.balance);

    return LoanLineChartOption(xData, [givenData, takenData, balanceData], ["Given", "Taken", "Balance"], titles);
  };

  useEffect(() => {
    const userId = user.id;
    getLoans(userId);
    getTotalToRepay(userId);
    getTotalToReceive(userId);
  }, []);

  useEffect(() => {
    const userId = user.id;
    fetchLoanDataForYear(userId, new Date().getFullYear());
    setLoanUpdated(false);
  }, [loanUpdated]);

  return (
    <div>
      <Space
        direction="vertical"
        size="small"
        style={{
          display: "flex",
        }}
      >
        <AllLoanRecords getAllData={getLoans} allLoans={loans} setLoanUpdated={setLoanUpdated} />
        <LoanBalances totalToRepay={totalToRepay} totalToReceive={totalToReceive} />
        <Row>
          <Col span={24}>
            <div style={{ width: "100%", padding: "20px 10%", backgroundColor: "#fff", height: 300, borderRadius: 10 }}>
              {loanDataForYear.length > 0 ? (
                <ReactEcharts option={generateLineChartOptions(loanDataForYear, "Monthly Loan Overview")} />
              ) : (
                <Empty description={"No loan data available for this year"} />
              )}
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <div style={{ width: "100%", padding: "20px 10%", backgroundColor: "#fff", height: 300, borderRadius: 10 }}>
              {loanDataForChartGiven.length > 0 ? (
                <ReactEcharts option={generateChartOptions("GIVEN", loanDataForChartGiven)} theme={"light"} />
              ) : (
                <Empty description={"No GIVEN loan data available"} />
              )}
            </div>
          </Col>
          <Col span={12}>
            <div style={{ width: "100%", padding: "20px 10%", backgroundColor: "#fff", height: 300, borderRadius: 10 }}>
              {loanDataForChartTaken.length > 0 ? (
                <ReactEcharts option={generateChartOptions("TAKEN", loanDataForChartTaken)} theme={"light"} />
              ) : (
                <Empty description={"No TAKEN loan data available"} />
              )}
            </div>
          </Col>
        </Row>
      </Space>
    </div>
  );
}

export default Loan;

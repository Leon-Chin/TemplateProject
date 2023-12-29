import { Card, Col, Row, } from 'antd';

const TimeBasisBalances = ({ balanceOverview }) => {
    return (
        <Row gutter={10}>
            <Col span={8}>
                <Card
                    title="Today Balance"
                    bordered={false}
                    hoverable={true}
                    headStyle={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}
                    bodyStyle={{ fontSize: 24, fontWeight: 'bold', padding: 20 }}
                >
                    {balanceOverview ? balanceOverview?.currentDayBalance : "--"}
                </Card>
            </Col>
            <Col span={8}>
                <Card
                    title="This month Balance"
                    bordered={false}
                    hoverable={true}
                    headStyle={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}
                    bodyStyle={{ fontSize: 24, fontWeight: 'bold', padding: 20 }}
                >
                    {balanceOverview ? balanceOverview?.currentMonthBalance : "--"}
                </Card>
            </Col>
            <Col span={8}>
                <Card
                    title="This year Balance"
                    bordered={false}
                    hoverable={true}
                    headStyle={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}
                    bodyStyle={{ fontSize: 24, fontWeight: 'bold', padding: 20 }}
                >
                    {balanceOverview ? balanceOverview?.currentYearBalance : "--"}
                </Card>
            </Col>
        </Row>
    )
}

export default TimeBasisBalances
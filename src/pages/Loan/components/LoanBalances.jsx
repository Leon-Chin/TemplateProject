import { Card, Col, Row } from 'antd';

const LoanBalances = ({ totalToRepay, totalToReceive }) => {
    return (
        <Row gutter={16}>
            <Col span={12}>
                <Card
                    title="Total to Repay"
                    bordered={false}
                    hoverable={true}
                    headStyle={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}
                    bodyStyle={{ fontSize: 24, fontWeight: 'bold', padding: 20 }}
                >
                    {totalToRepay || "--"}
                </Card>
            </Col>
            <Col span={12}>
                <Card
                    title="Total to Receive"
                    bordered={false}
                    hoverable={true}
                    headStyle={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}
                    bodyStyle={{ fontSize: 24, fontWeight: 'bold', padding: 20 }}
                >
                    {totalToReceive || "--"}
                </Card>
            </Col>
        </Row>
    )
}

export default LoanBalances
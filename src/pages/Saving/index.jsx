import React, { useState } from 'react'
import COLORS from '../../constants/COLORS'
import { PlusOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, InputNumber, Modal, message } from 'antd';
import { formatDateToMalaysia } from '../../utils/convertDate';
import { createNewBudget } from '../../api/budget.api';
import { useSelector } from 'react-redux';
const { TextArea } = Input;

function Saving() {
    const { user } = useSelector(state => state.user)
    const [createOpen, setCreateOpen] = useState(false)
    const onFinishCreate = async (values) => {
        const startDate = formatDateToMalaysia(new Date(values.startDate))
        const endDate = formatDateToMalaysia(new Date(values.endDate))
        const updatedBudget = { ...values, startDate, endDate, userId: user.id }
        await createNewBudget(updatedBudget).then(res => {
            if (res && res.status !== false) {
                message.success('Budget create successfully')
                setCreateOpen(false)
            } else {
                console.log(res);
            }
        })
    };
    return (
        <div style={{ position: 'relative' }}>


            <div className='hoverButton' onClick={() => setCreateOpen(true)} style={{ position: 'absolute', right: 30, bottom: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.white, width: 60, height: 60, borderRadius: '50%', backgroundColor: COLORS.primary }}>
                <PlusOutlined style={{ fontSize: 28 }} />
            </div>
            <Modal
                open={createOpen}
                onCancel={() => setCreateOpen(false)}
                onOk={() => setCreateOpen(false)}
                title={"What are you saving for ?"}
                footer={null}
            >
                <Form
                    onFinish={onFinishCreate}
                    labelCol={{ span: 8, }}
                    wrapperCol={{ span: 16, }}
                    style={{ maxWidth: 600, }}
                    autoComplete="off"
                >
                    <Form.Item label="name" name="name"
                        rules={[{ required: true, message: 'Please input budget name!', }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Start Date" name={"startDate"}>
                        <DatePicker format={"DD/MM/YYYY"} />
                    </Form.Item>
                    <Form.Item label="End Date" name={"endDate"}>
                        <DatePicker format={"DD/MM/YYYY"} />
                    </Form.Item>
                    <Form.Item label="Budegt Amount" name={"budgetAmount"}>
                        <InputNumber step={0.01} min={0} />
                    </Form.Item>
                    <Form.Item label="comments" name={"comments"}>
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16, }}>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Saving
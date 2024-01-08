import { Avatar, Button, Form, Input, Modal, Popover, message } from 'antd'
import { Header } from 'antd/es/layout/layout'
import './index.less'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/user.store';
import useUserTheme from '../../hooks/useUserTheme';
import COLORS from '../../constants/COLORS';
import { updatePassword } from '../../api/user.api';
import { useRef, useState } from 'react';

export default function MyLayoutHeader() {
    const { user: { id, name, email } } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigateTo = useNavigate()
    const loginStatusDiv = (
        <>
            <div>
                <Button type="text" danger onClick={() => {
                    dispatch(setUser(null))
                    navigateTo('/login')
                }}>
                    Logout
                </Button>
            </div>
            <div onClick={() => setUpdatePasswordModelOpen(true)}>
                <Button type="text" >
                    Update Password
                </Button>
            </div>
        </>
    );
    const [updatePasswordModelOpen, setUpdatePasswordModelOpen] = useState(false)
    const handleUpdate = async (values) => {
        const { updatedPassword } = values
        if (updatedPassword && updatedPassword.length > 5) {
            const req = { email, passord: updatedPassword }
            await updatePassword(id, req).then(res => {
                if (res && res.status !== false) {
                    dispatch(setUser(res))
                    setUpdatePasswordModelOpen(false)
                    form.resetFields();
                    message.success("Update password successfully!")
                } else {
                    message.error("error")
                }
            })
        } else {
            message.error("Please input the password, and password must be greater than 5 chars")
        }
    }
    const theme = useUserTheme()
    const [form] = Form.useForm()
    return (
        <Header className='layout-page-header' style={theme === "light" ? { boxShadow: '0 4px 10px #dddddd', backgroundColor: COLORS.white } : {}}>
            <div className='layout-page-header-left'>
                <div className="medal-logo">Expense Manager</div>
            </div>
            <div className='layout-page-header-right'>
                <Popover placement="bottom" content={loginStatusDiv} trigger="click">
                    <Avatar className='MyHeader-Avatar' size="large">{name}</Avatar>
                </Popover>
            </div>
            <Modal
                open={updatePasswordModelOpen}
                onCancel={() => setUpdatePasswordModelOpen(false)}
                onOk={() => setUpdatePasswordModelOpen(false)}
                title={"Create Budget"}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={handleUpdate}
                    labelCol={{ span: 8, }}
                    wrapperCol={{ span: 16, }}
                    style={{ maxWidth: 600, }}
                    autoComplete="off"
                >
                    <Form.Item label="New Password" name="updatedPassword"
                        rules={[{ required: true, message: 'Please input budget name!', }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16, }}>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Header>
    )
}

import { Avatar, Button, Popover } from 'antd'
import { Header } from 'antd/es/layout/layout'
import './index.less'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/user.store';
import useUserTheme from '../../hooks/useUserTheme';
import COLORS from '../../constants/COLORS';

export default function MyLayoutHeader() {
    const { user: { id, name } } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigateTo = useNavigate()
    const loginStatusDiv = (
        <>
            <Button type="text" danger onClick={() => {
                dispatch(setUser(null))
                navigateTo('/login')
            }}>
                Logout
            </Button>
        </>
    );
    const theme = useUserTheme()
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
        </Header>
    )
}

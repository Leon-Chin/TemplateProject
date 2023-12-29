import { Avatar, Button, Dropdown, Popover } from 'antd'
import { Header } from 'antd/es/layout/layout'
import './index.less'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/user.store';

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
    return (
        <Header className='layout-page-header'>
            <div className='layout-page-header-left'>
                <div className="medal-logo">Expense Manager</div>
            </div>
            <div className='layout-page-header-right'>
                {/* <Dropdown
                    menu={{
                        onClick: info => selectLocale(info),
                        items: [
                            {
                                key: 'zh_CN',
                                icon: <ZhCnSvg />,
                                disabled: locale === 'zh_CN',
                                label: '简体中文',
                            },
                            {
                                key: 'en_US',
                                icon: <EnUsSvg />,
                                disabled: locale === 'en_US',
                                label: 'English',
                            },
                        ],
                    }}
                >
                    <LanguageSvg id="language-change" />
                </Dropdown> */}
                <Popover placement="bottom" content={loginStatusDiv} trigger="click">
                    <Avatar className='MyHeader-Avatar' size="large">{name}</Avatar>
                </Popover>
            </div>
        </Header>
    )
}

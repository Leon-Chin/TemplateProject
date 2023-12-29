import React, { useState, useEffect } from 'react'
import pngurl1 from '@/assets/pic/monitorProcess.webp'
import pngurl2 from '@/assets/pic/contact.webp'
import pngurl3 from '@/assets/pic/tutorial.webp'
import pngurl4 from '@/assets/pic/game.webp'
import pngurl5 from '@/assets/pic/workoutPlan.jpg'
import { useNavigate } from 'react-router-dom'
import { apiLogin } from '@/api/user.api.js'
import './index.less'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { message } from 'antd'
import { setUser } from '../../store/user.store'
// import { checkToken } from '../../api/admin.api'
export default function Login() {
    const { user } = useSelector(state => state.user, shallowEqual)
    const navigateTo = useNavigate()
    const dispatch = useDispatch()
    const [focusedname, setFocusedname] = useState(false)
    const [focusedpassword, setFocusedpassword] = useState(false)
    const [selectedPic, setSelectedPic] = useState(1)
    const [sigInInfo, setSignInInfo] = useState({})
    const activename = focusedname ? 'active' : ''
    const activepassword = focusedpassword ? 'active' : ''
    // const checkLogged = async (token) => {
    //     const res = await checkToken({ token })
    //     if (res.logged === true) {
    //         dispatch(setLogged(true))
    //         navigateTo('/')
    //     } else {
    //         dispatch(setLogged(false))
    //     }
    // }
    useEffect(() => {
        // const token = localStorage.getItem('token');
        // if (logged !== true) {
        //     checkLogged(token)
        // }
        const timer = window.setInterval(() => {
            setSelectedPic((prev) => {
                return prev !== 5 ? prev + 1 : 1
            })
        }, 3000);
        return () => {
            clearInterval(timer);
        };
    }, []);
    useEffect(() => {
        user && navigateTo('/')
    }, [user])

    const UserSignIn = async () => {
        const res = await apiLogin({}, sigInInfo)
        if (res && res.status !== false) {
            localStorage.setItem('user', res)
            console.log("user", res);
            // const user = { ...res, id: 1 } for test
            // dispatch(setUser(user))
            dispatch(setUser(res))
            dispatch(setLogged(true))
            navigateTo('/')
        } else {
            message.error('Error happen, try again please')
        }
    }

    return (
        <div className='loginFrame'>
            <div className='box'>
                <div className='inner-box'>
                    <div className='forms-wrap'>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            UserSignIn()
                        }} autoComplete="off" className='sign-in-form'>
                            <div className='logo'>
                                {/* img */}
                                <h4>Expense Manager</h4>
                            </div>
                            <div className='heading'>
                                <h3>Welcome Back</h3>
                            </div>
                            <div className='actual-form'>
                                <div className='input-wrap'>
                                    <input
                                        type='text'
                                        minLength={4}
                                        className={`input-field ${activename}`}
                                        onFocus={() => setFocusedname(true)}
                                        onBlur={({ target: { value } }) => {
                                            if (value != "") {
                                                return;
                                            }
                                            setFocusedname(false)
                                        }}
                                        onChange={({ target: { value } }) => setSignInInfo({ ...sigInInfo, name: value })}
                                        autoComplete="off"
                                        required
                                    />
                                    <label>Name</label>
                                </div>
                                <div className='input-wrap'>
                                    <input
                                        type='email'
                                        minLength={4}
                                        onFocus={() => setFocusedpassword(true)}
                                        onBlur={({ target: { value } }) => {
                                            if (value != "") {
                                                return;
                                            }
                                            setFocusedpassword(false)
                                        }}
                                        onChange={({ target: { value } }) => setSignInInfo({ ...sigInInfo, email: value })}
                                        className={`input-field ${activepassword}`}
                                        autoComplete="off"
                                        required
                                    />
                                    <label>Email</label>
                                </div>
                                <input type='submit' value="Create User" className='sign-btn' />
                            </div>
                        </form>
                    </div>
                    <div className='carousel'>
                        <div className='images-wrapper'>
                            <img src={pngurl1} className={`image img-1 ${selectedPic === 1 && "show"}`}></img>
                            <img src={pngurl2} className={`image img-2 ${selectedPic === 2 && "show"}`}></img>
                            <img src={pngurl3} className={`image img-3 ${selectedPic === 3 && "show"}`}></img>
                            <img src={pngurl4} className={`image img-4 ${selectedPic === 4 && "show"}`}></img>
                            <img src={pngurl5} className={`image img-5 ${selectedPic === 5 && "show"}`}></img>
                        </div>
                        <div className='text-slider'>
                            <div className='text-wrap'>
                                <div className='text-group' style={{ transform: `translateY(${-(selectedPic - 1) * 2.2}rem)` }}>
                                    <h2>Track your workout prograss</h2>
                                    <h2>Contact with your friends</h2>
                                    <h2>Watch the rich tutorial library</h2>
                                    <h2>Gamification features</h2>
                                    <h2>Personalized Exercise Plan</h2>
                                </div>
                            </div>
                            <div className='bullets'>
                                <span className={selectedPic === 1 ? `active` : ''} onClick={() => setSelectedPic(1)}></span>
                                <span className={selectedPic === 2 ? `active` : ''} onClick={() => setSelectedPic(2)}></span>
                                <span className={selectedPic === 3 ? `active` : ''} onClick={() => setSelectedPic(3)}></span>
                                <span className={selectedPic === 4 ? `active` : ''} onClick={() => setSelectedPic(4)}></span>
                                <span className={selectedPic === 5 ? `active` : ''} onClick={() => setSelectedPic(5)}></span>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    )
}

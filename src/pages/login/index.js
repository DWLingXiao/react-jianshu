import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../common/header'
import axios from 'axios'
import './login.css'

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const navigator = new useNavigate()
    const getPhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }
    const getPassword = (e) => {
        setPassword(e.target.value)
    }
    const handleClick = async () => {
        if (!phoneNumber || !password) {
            console.log('用户名或者密码不能为空')
            return
        }
        const res = await axios.post('http://localhost:8000/user/login', {
            phoneNumber: phoneNumber.toString(),
            password: password.toString()
        })
        if (res.data.code === 0) {
            if (res.data.result.status !== 0) {
                localStorage.setItem('jstoken', JSON.stringify(res.data.result))
                navigator('/')
            } else {
                console.log('该账号已被封禁')
                return
            }
        }
    }
    return (
        <div>
            <Header />
            <div className='loginWrapper'>
                <div className='loginContainer'>
                    <h4 className='loginContainerTitle'>
                        <Link className='loginContainerBtn1' to='/login'>登录</Link>
                        <Link className='loginContainerBtn2' to='/register'>注册</Link>
                    </h4>
                    <div className='loginNewSession'>
                        <input type='text' placeholder='手机号或者邮箱' onChange={(e) => getPhoneNumber(e)}></input>
                        <input type='password' placeholder='密码' onChange={(e) => getPassword(e)}></input>
                    </div>
                    <button className='loginBtn' onClick={handleClick}>登录</button>
                </div>
            </div>
        </div>
    )
}

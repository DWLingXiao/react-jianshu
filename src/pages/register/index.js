import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../common/header'
import './register.css'

export default function Register() {
    const [username, setUsername] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const navigator = new useNavigate()
    const getUsername = (e) => {
        setUsername(e.target.value)
    }
    const getPhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }
    const getPassword = (e) => {
        setPassword(e.target.value)
    }

    const handleRegister = async () => {
        if (!username || !phoneNumber || !password) {
            console.log('用户名或手机号或密码不能为空')
            return
        } else {
            axios.post('http://localhost:8000/user/register', {
                username: username.toString(),
                phoneNumber: phoneNumber.toString(),
                password: password.toString()
            }).then((res) => {
                if (res.data.code === 0) {
                    navigator('/login')
                }
            }).catch(err => {
                if (err.request.status === 409) {
                    console.log('用户名或手机号已被注册')
                    return
                }
            })
        }
    }
    return (
        <div>
            <Header />
            <div className='registerWrapper'>
                <div className='registerContainer'>
                    <h4 className='registerContainerTitle'>
                        <Link className='registerContainerBtn1' to='/login'>登录</Link>
                        <Link className='registerContainerBtn2' to='/register'>注册</Link>
                    </h4>
                    <div className='registerNewSession'>
                        <input type='text' placeholder='用户名' onChange={(e) => getUsername(e)}></input>
                        <input type='text' placeholder='手机号或者邮箱' onChange={(e) => getPhoneNumber(e)}></input>
                        <input type='password' placeholder='密码' onChange={(e) => getPassword(e)}></input>
                    </div>
                    <button className='registerBtn' onClick={handleRegister}>注册</button>
                </div>
            </div>
        </div>
    )
}

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../common/header'
import './setting.css'

export default function Setting() {
    const addStyle = async (e) => {
        const siblings = e.target.parentNode.children
        for (let i = 0; i < siblings.length; i++) {
            siblings[i].className = 'settingItem'
        }

        e.target.className = 'settingItem selected'
    }
    const user = JSON.parse(localStorage.getItem('jstoken'))
    const [name, setName] = useState('')
    const [pwd, setPwd] = useState('')
    const [pwdTwo, setPwdTwo] = useState('')
    const [sign, setSign] = useState('')
    const [avatar, setAvatar] = useState('')
    const [oldInfo, setOldInfo] = useState({})
    const navigator = useNavigate()
    const fileRef = useRef()
    const { id } = useParams()
    const getOldInfo = async (id) => {
        const res = await axios(`http://localhost:8000/user/get?writer_id=${id}`)
        const { writer_info } = res.data.result
        setOldInfo(writer_info)
        setName(writer_info.username)
        setSign(writer_info.user_sign)
        setAvatar(writer_info.avatar)
    }
    const saveChange = async () => {

        if (!name) {
            console.log('用户名不能为空');
            return
        } else if (pwd !== pwdTwo) {
            console.log('两次密码不一致');
            return
        } else if (!sign) {
            console.log('个人介绍不能为空');
            return
        }
        if (pwd) {
            await axios.patch('http://localhost:8000/user/update', {
                username: name,
                password: pwd,
                user_sign: sign,
                avatar: avatar
            }, {
                headers: { 'Authorization': user.token }
            })
        } else {
            await axios.patch('http://localhost:8000/user/update', {
                username: name,
                user_sign: sign,
                avatar: avatar
            }, {
                headers: { 'Authorization': user.token }
            })
        }
        const newUser = { ...user, avatar: avatar }
        localStorage.setItem('jstoken', JSON.stringify(newUser))
        navigator('/')
    }
    const changeAvatar = () => {
        fileRef.current.click()

    }
    const handleImageChange = async (e) => {
        //console.log(e.target.files[0]);
        const formData = new FormData()
        formData.append("file", e.target.files[0])
        let config = {
            method: 'post',
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        const res = await axios.post('http://localhost:8000/article/write/upload', formData, config)
        if (res) {
            const avatarName = res.data.result.img
            setAvatar(avatarName)
        }
    }
    useEffect(() => {
        getOldInfo(id)
    }, [id])
    if (Object.keys(oldInfo).length !== 0) {
        return (
            <div>
                <Header />
                <div className='settingWrapper'>
                    <div className='settingLeft' onClick={(e) => addStyle(e)}>
                        <div className='settingItem selected'>基本设置</div>
                        <div className='settingItem'>账号管理</div>
                    </div>
                    <div className='settingRight'>
                        <div className='settingAvatar'>
                            <div>
                                <img alt='' className='settingAvatarImg' src={`http://localhost:8000/${avatar}`}></img>
                                <input type='file' ref={fileRef} className='fileStyle' onChange={(e) => handleImageChange(e)} />
                            </div>
                            <button className='settingAvatarBtn' onClick={changeAvatar}>更改头像</button>
                        </div>
                        <div className='settingName'>
                            <span>更改昵称</span>
                            <input className='settingInput' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='settingName'>
                            <span>更改密码</span>
                            <input className='settingInput' type='password' value={pwd} onChange={(e) => setPwd(e.target.value)} />
                        </div>
                        <div className='settingName'>
                            <span>确认密码</span>
                            <input className='settingInput' type='password' value={pwdTwo} onChange={(e) => setPwdTwo(e.target.value)} />
                        </div>
                        <div className='settingName'>
                            <span>更改介绍</span>
                            <input className='settingInput' value={sign} onChange={(e) => setSign(e.target.value)} />
                        </div>
                        <button className='saveChange' onClick={saveChange}>保存更改</button>
                    </div>

                </div>
            </div>
        )
    } else {
        return <div>加载中...</div>
    }

}

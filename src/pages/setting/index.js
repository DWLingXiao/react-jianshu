import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../common/header'
import './setting.css'
import { message, Modal } from 'antd';

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
    const [isModalVisible, setIsModalVisible] = useState(false);
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
    const handleOk = async () => {
        setIsModalVisible(false)
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
    const handleCancel = () => {
        setIsModalVisible(false)
    }
    const saveChange = async () => {
        if (!name) {
            message.error('?????????????????????')
            return
        } else if (pwd !== pwdTwo) {
            message.error('?????????????????????')
            return
        } else if (!sign) {
            message.error('????????????????????????')
            return
        }
        setIsModalVisible(true)

    }
    const changeAvatar = () => {
        fileRef.current.click()

    }
    const handleImageChange = async (e) => {
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
                <Modal title="????????????"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText={'??????'}
                    cancelText={'??????'}
                >
                    <p>???????????????</p>
                </Modal>
                <div className='settingWrapper'>
                    <div className='settingLeft' onClick={(e) => addStyle(e)}>
                        <div className='settingItem selected'>????????????</div>
                        <div className='settingItem'>????????????</div>
                    </div>
                    <div className='settingRight'>
                        <div className='settingAvatar'>
                            <div>
                                <img alt='' className='settingAvatarImg' src={`http://localhost:8000/${avatar}`}></img>
                                <input type='file' ref={fileRef} className='fileStyle' onChange={(e) => handleImageChange(e)} />
                            </div>
                            <button className='settingAvatarBtn' onClick={changeAvatar}>????????????</button>
                        </div>
                        <div className='settingName'>
                            <span>????????????</span>
                            <input className='settingInput' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='settingName'>
                            <span>????????????</span>
                            <input className='settingInput' type='password' value={pwd} onChange={(e) => setPwd(e.target.value)} />
                        </div>
                        <div className='settingName'>
                            <span>????????????</span>
                            <input className='settingInput' type='password' value={pwdTwo} onChange={(e) => setPwdTwo(e.target.value)} />
                        </div>
                        <div className='settingName'>
                            <span>????????????</span>
                            <input className='settingInput' value={sign} onChange={(e) => setSign(e.target.value)} />
                        </div>
                        <button className='saveChange' onClick={saveChange}>????????????</button>
                    </div>

                </div>
            </div>
        )
    } else {
        return <div>?????????...</div>
    }

}

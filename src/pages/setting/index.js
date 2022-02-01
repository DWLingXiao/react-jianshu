import React from 'react';
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
                            <img alt='' className='settingAvatarImg' src='http://localhost:8000/defaultAvatar.jpg'></img>
                        </div>
                        <button className='settingAvatarBtn'>更改头像</button>
                    </div>
                    <div className='settingName'>
                        <span>更改昵称</span>
                        <input className='settingInput' placeholder='czx' />
                    </div>
                    <div className='settingName'>
                        <span>更改密码</span>
                        <input className='settingInput' type='password' />
                    </div>
                    <div className='settingName'>
                        <span>确认密码</span>
                        <input className='settingInput' type='password' />
                    </div>
                    <div className='settingName'>
                        <span>更改介绍</span>
                        <input className='settingInput' placeholder='暂无' />
                    </div>
                    <button className='saveChange'>保存更改</button>
                </div>

            </div>
        </div>
    )
}

import React from 'react'
import './writeSourceHead.css'

export default function WriteSourceHead(props) {
    const { info, watchnums, likesnums } = props
    return (
        <div className='writeSourceInfo'>
            <div className='writeSourceInfoAvatar'>
                <img alt='' className='writeSourceInfoAvatar' src={`http://localhost:8000/${info.avatar}`}></img>
            </div>
            <div className='writeSourceInfoMax'>
                <div className='writeSourceInfoMaxName'>
                    {info.username}
                </div>
                <div className='writeSourceInfoMax2'>
                    <div className='writeSourceInfoMaxInfo'>
                        <div>
                            {watchnums}
                            <div className='writeSourceInfoMaxInfo2'>
                                阅读量
                            </div>
                        </div>
                    </div>
                    <div className='writeSourceInfoMaxInfo'>
                        <div>
                            {info.fans}
                            <div className='writeSourceInfoMaxInfo2'>
                                粉丝
                            </div>
                        </div>
                    </div>
                    <div className='writeSourceInfoMaxInfo'>
                        <div>
                            {likesnums}
                            <div className='writeSourceInfoMaxInfo2'>
                                喜欢
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='writeSourceFollow'>
                <button className='writeSourceFollowBtn'>+ 关注</button>
            </div>
        </div>
    )
}

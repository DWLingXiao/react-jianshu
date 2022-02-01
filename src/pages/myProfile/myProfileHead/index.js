import React from 'react';

export default function MyProfileHead() {
    return (
        <div className='writeSourceInfo'>
            <div className='writeSourceInfoAvatar'>
                <img alt='' className='writeSourceInfoAvatar' src={`http://localhost:8000/defaultAvatar.jpg`}></img>
            </div>
            <div className='writeSourceInfoMax'>
                <div className='writeSourceInfoMaxName'>
                    czx
                </div>
                <div className='writeSourceInfoMax2'>
                    <div className='writeSourceInfoMaxInfo'>
                        <div>
                            100
                            <div className='writeSourceInfoMaxInfo2'>
                                阅读量
                            </div>
                        </div>
                    </div>
                    <div className='writeSourceInfoMaxInfo'>
                        <div>
                            100
                            <div className='writeSourceInfoMaxInfo2'>
                                粉丝
                            </div>
                        </div>
                    </div>
                    <div className='writeSourceInfoMaxInfo'>
                        <div>
                            100
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

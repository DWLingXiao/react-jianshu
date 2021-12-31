import React from 'react'
import './writeSourceHead.css'

export default function WriteSourceHead() {
    return (
        <div className='writeSourceInfo'>
            <div className='writeSourceInfoAvatar'>
                <img alt='' className='writeSourceInfoAvatar' src='https://upload.jianshu.io/users/upload_avatars/14715425/e0668349-8c75-43db-8a9d-c388e5f00d0d.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240'></img>
            </div>
            <div className='writeSourceInfoMax'>
                <div className='writeSourceInfoMaxName'>
                    简书钻首席小管家
                </div>
                <div className='writeSourceInfoMax2'>
                    <div className='writeSourceInfoMaxInfo'>
                        <div>
                            15
                            <div className='writeSourceInfoMaxInfo2'>
                                关注
                            </div>
                        </div>
                    </div>
                    <div className='writeSourceInfoMaxInfo'>
                        <div>
                            170153
                            <div className='writeSourceInfoMaxInfo2'>
                                粉丝
                            </div>
                        </div>
                    </div>
                    <div className='writeSourceInfoMaxInfo'>
                        <div>
                            114543
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

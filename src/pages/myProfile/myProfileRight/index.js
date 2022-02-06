import React from 'react';

export default function MyProfileRight(props) {
    const { right: { writer_info } } = props
    return (
        <div className='writeSourceRightWrapper'>
            <div className='writeSourceRightTitle'>
                简书创作者
            </div>
            <div>
                <div className='writeSourceRightTitle2'>
                    个人介绍
                </div>
                <div className='writeSourceRightMessage'>
                    {writer_info.user_sign}
                </div>
            </div>
        </div>
    )
}
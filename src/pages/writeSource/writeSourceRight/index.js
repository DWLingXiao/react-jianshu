import React from 'react'
import './writeSourceRight.css'

export default function WriteSourceRight(props) {
    const { sign } = props
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
                    {sign}
                </div>
            </div>
        </div>
    )
}

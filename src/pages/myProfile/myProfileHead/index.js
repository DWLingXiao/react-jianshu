import React from 'react';

export default function MyProfileHead(props) {
    const { head } = props
    const { rows, writer_info } = head
    let watchNums = 0
    let likeNums = 0
    if (rows.length !== 0) {
        for (let i = 0; i < rows.length; i++) {
            watchNums += rows[i].watchNum
            likeNums += rows[i].likes
        }
    }
    return (
        <div className='writeSourceInfo'>
            <div className='writeSourceInfoAvatar'>
                <img alt='' className='writeSourceInfoAvatar' src={`http://localhost:8000/${writer_info.avatar}`}></img>
            </div>
            <div className='writeSourceInfoMax'>
                <div className='writeSourceInfoMaxName'>
                    {writer_info.username}
                </div>
                <div className='writeSourceInfoMax2'>
                    <div className='writeSourceInfoMaxInfo'>
                        <div>
                            {watchNums}
                            <div className='writeSourceInfoMaxInfo2'>
                                阅读量
                            </div>
                        </div>
                    </div>
                    <div className='writeSourceInfoMaxInfo'>
                        <div>
                            {writer_info.fans}
                            <div className='writeSourceInfoMaxInfo2'>
                                粉丝
                            </div>
                        </div>
                    </div>
                    <div className='writeSourceInfoMaxInfo'>
                        <div>
                            {likeNums}
                            <div className='writeSourceInfoMaxInfo2'>
                                喜欢
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

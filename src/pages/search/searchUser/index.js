import React from 'react'
import './searchUser.css'


export default function SearchUser(props) {
    const { articlelist, count } = props
    return (
        <div className='searchRightWrapper'>
            <div className='searchRightTitleAll'>
                <div className='searchRightTitle'>
                    综合排序
                </div>
                <div className='searchRightTitleCount'>
                    共{count}个结果
                </div>
            </div>
            <div className='searchUserContext'>
                {
                    articlelist.length > 0 ? articlelist.map((item) => {
                        return (
                            <div className='searchUserItem' key={item.id}>
                                <div className='searchUserItemHead'>
                                    <div>
                                        <img alt='' className='searchUserItemAvatar' src='http://localhost:8000/defaultAvatar.jpg'></img>
                                    </div>
                                    <div className='searchUserItemName'>
                                        <div className='searchUserItemName1'>
                                            {item.username}
                                        </div>
                                        <div className='searchUserItemName2'>
                                            粉丝{item.fans}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className='searchUserItemBtn'>+ 关注</button>
                                </div>
                            </div>
                        )
                    }) : <div>暂无数据</div>
                }
            </div>
        </div>
    )
}

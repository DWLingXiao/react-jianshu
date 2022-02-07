import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './myProfilePage.css'

export default function MyProfilePage(props) {
    const { page } = props
    const { rows, writer_info } = page
    const [isShowArticle, setIsShowArticle] = useState(true)
    const changeShowArticle = () => {
        setIsShowArticle(true)
    }
    const changeShowActivity = () => {
        setIsShowArticle(false)
    }

    return (
        <div className='writeSourcePageWrapper'>
            <div className='writeSourcePageTitle'>
                <span className='myprofileTitle' onClick={changeShowArticle}>我的文章</span>
                <span className='myprofileTitle' onClick={changeShowActivity}>我的动态</span>
            </div>
            {
                isShowArticle ? rows.length ?
                    rows.map((item) => {
                        return (
                            <div className='listItem' key={item.id}>
                                <img className='list-img' src={`http://localhost:8000/defaultAvatar.jpg`} alt='' />
                                <div className='listInfo'>
                                    <Link to={`/detail/${item.id}`} className='title'><div className='writeSourcePageTitle2'>{item.article_title}</div></Link>
                                    {/* <p className='desc'>{item.context}</p> */}
                                    <div className='desc' dangerouslySetInnerHTML={{ __html: item.context }}></div>
                                    <div className='listItemInfo'>
                                        <div>
                                            {writer_info.username}
                                        </div>
                                        <div style={{ marginLeft: "15px" }}>
                                            赞 {item.likes}
                                        </div>
                                        <div style={{ marginLeft: "15px" }}>
                                            看 {item.watchNum}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    })
                    : <div>暂无内容</div>
                    : rows.length ? <div className='myProfileActivity'>
                        <div className='myProfileActivityItem'><span className='myProfileName'>{writer_info.username}</span> 加入了平台 {writer_info.createdAt}</div>
                        {
                            rows.map((item) => {
                                return (<div className='myProfileActivityItem' key={item.id}><span className='myProfileName'>{writer_info.username}</span> 创建了文章《{item.article_title}》 {item.createdAt}</div>)
                            })
                        }

                    </div> : <div className='myProfileActivity'>
                        <div className='myProfileActivityItem'><span className='myProfileName'>{writer_info.username}</span> 加入了平台 {writer_info.createdAt}</div>
                    </div>
            }

        </div>
    )
}

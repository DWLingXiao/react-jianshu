import React from 'react'
import { useNavigate } from 'react-router-dom'
import './writeSourcePage.css'

export default function WriteSourcePage(props) {
    const { rows, name } = props
    const navigate = useNavigate()
    const turnToArticle = (id) => {
        navigate(`/detail/${id}`)
    }
    return (
        <div className='writeSourcePageWrapper'>
            <div className='writeSourcePageTitle'>
                他的文章
            </div>
            {
                rows.length !== 0 ? rows.map((item) => {
                    return (
                        <div className='listItem' key={item.id}>
                            <img className='list-img' src={`http://localhost:8000/${item.article_img}`} alt='' />
                            <div className='listInfo'>
                                <div className='title'><div className='writeSourcePageTitle2' onClick={() => turnToArticle(item.id)}>{item.article_title}</div></div>
                                {/* <p className='desc'>{item.context}</p> */}
                                <div className='desc' dangerouslySetInnerHTML={{ __html: item.context }}></div>
                                <div className='listItemInfo'>
                                    <div>
                                        {name}
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
                }
                ) : <div>暂无数据</div>
            }
        </div>
    )
}

import React from 'react'
import './searchRight.css'

export default function SearchRight(props) {
    const { articlelist, count } = props
    return (
        <div className='searchRightWrapper'>
            <div className='searchRightTitleAll'>
                <div className='searchRightTitle'>
                    综合排序
                </div>
                <div className='searchRightTitle'>
                    热门文章
                </div>
                <div className='searchRightTitle'>
                    最新发表
                </div>
                <div className='searchRightTitleCount'>
                    共{count}个结果
                </div>
            </div>
            <div className='searchRightContext'>
                {
                    articlelist.length > 0 ? articlelist.map((item) => {
                        return (
                            <div className='searchRightContextWriter' key={item.id}>
                                <div className='searchRightContextWriterInfo'>
                                    <div>
                                        <img alt='' className='searchRightContextWriterInfoImg' src={`http://localhost:8000/${item.user.avatar}`}></img>
                                    </div>
                                    <div>
                                        {item.user.username} {item.updatedAt}
                                    </div>
                                </div>
                                <div>
                                    <h3 className='searchRightContextTitle'>{item.article_title}</h3>
                                    <div className='searchRightContextCx'>{item.context}</div>
                                    <div className='searchRightContextDe'>
                                        看{item.watchNum}    喜欢{item.likes}
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <div>暂无数据</div>
                }

            </div>
        </div>
    )
}

import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './recoRead.css'

export default function RecoRead() {
    const [articleList, setArticleList] = useState([])
    const navigate = useNavigate()
    const getArticleList = async () => {
        const res = await axios.get('http://localhost:8000/article')
        if (res) {
            let data = res.data.result.list
            data = data.sort((a, b) => (b.watchNum - a.watchNum)).slice(0, 5)
            setArticleList(data)
        }
    }
    const getArticleDetail = (id) => {
        navigate(`/detail/${id}`)
    }
    useEffect(() => {
        getArticleList()
    }, [])
    if (articleList.length !== 0) {
        return (
            <div className='RecoReadWrapper'>
                <div className='RecoReadTitle'>
                    <span style={{ marginLeft: '8px' }}>推荐阅读 </span>
                </div>
                {
                    articleList.map((item) => {
                        return (
                            <div className='RecoReadArticle' key={item.id}>
                                <div className='RecoReadArticle1' onClick={() => getArticleDetail(item.id)}>{item.article_title}</div>
                                <div className='RecoReadArticle2'>阅读 {item.watchNum}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    } else {
        return <div>加载中</div>
    }
}

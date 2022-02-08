import React, { useEffect, useState } from 'react'
import './detail.css'
import WriterInfo from './writerInfo'
import { useParams } from 'react-router-dom'
import ArticleDetail from './articleDetail'
import Comments from './comments'
import Header from '../../common/header'
import axios from 'axios'

export default function Detail() {
    const parmars = useParams()
    const [detail, setDetail] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:8000/article/detail?id=${parmars.id}`).then((res) => {
            setDetail(res.data.result)
        })
    }, [parmars.id])
    if (Object.keys(detail).length) {
        return (
            <div>
                <Header />
                <div className='detailWrapper'>
                    <div className='detailLeft'>
                        <ArticleDetail />
                    </div>
                    <div className='detailRight'>
                        <WriterInfo writer_id={detail.writer_id} />
                    </div>
                    <div className='comments'>
                        <Comments detail={detail} />
                    </div>
                </div>
            </div>
        )
    } else {
        return <div>Loading...</div>
    }

}

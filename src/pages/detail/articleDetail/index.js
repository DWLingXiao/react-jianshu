import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './articleDetail.css'

export default function ArticleDetail(props) {
    const { detail } = props
    const [isDianzan, setisDianzan] = useState(false)
    const [dianzanNum, setdianzanNum] = useState(detail.likes)
    let Navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem('jstoken'))
    let params = useParams()
    const dianZan = async () => {
        const res = await axios.post('http://localhost:8000/up/add', {
            user_id: user.id,
            article_id: params.id,
        }, {
            headers: { 'Authorization': user.token }
        })
        const data = res.data.result
        setdianzanNum(data.proUpNum)
        if (data.proStatus === 0) {
            setisDianzan(false)
        } else {
            setisDianzan(true)
        }

    }
    const handleDianzan = () => {
        if (!localStorage.getItem('jstoken')) {
            Navigate('/login')
        } else {
            dianZan()
        }
    }

    return (
        <div className='articleDetailWrapper'>
            <h1 className='articleDetailTitle'>{detail.article_title}</h1>
            <div className='articleDetailTime'>
                <div className='articleDetailTimeIn'>
                    <img alt='' src={`http://localhost:8000/${detail.user.avatar}`} style={{ borderRadius: "50%" }}></img>
                </div>
                <div className='articleDetailTimeIn2'>
                    <div className='articleDetailTimeInName'>
                        {detail.user.username}
                    </div>
                    <div className='articleDetailTimeInTime'>
                        {`${detail.createdAt}  阅读${detail.watchNum}  喜欢${dianzanNum} `}
                    </div>
                </div>
            </div>
            <div className='articleDetailMar'>
                <img alt='' className='articleDetailImg' src={`http://localhost:8000/${detail.article_img}`} />
                {detail.context}
            </div>
            <div className='articleNext'>
                <div className='articlePreBtn'>
                    上一篇
                </div>
                <div className='articleListBtn'>
                    查看连载目录
                </div>
                <div className='articleNextBtn'>
                    下一篇
                </div>
            </div>
            <div className='dianzan'>
                <div className='dianzanBox'>
                    <div className='dianzanImg' onClick={handleDianzan}>
                        {
                            isDianzan ? '取' : '赞'
                        }
                    </div>
                    <div>{dianzanNum}人点赞</div>
                </div>
                <div className='dianzanBox'>
                    <div className='dianzanImg'>
                        ...
                    </div>
                </div>
            </div>
            <div className='boxLine'></div>
        </div>
    )
}

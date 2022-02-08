import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './articleDetail.css'

export default function ArticleDetail() {
    const [detail, setDetail] = useState({})
    const [isDianzan, setisDianzan] = useState(false)
    let navigate = useNavigate()
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
        if (data.proStatus === 0) {
            setisDianzan(false)
            getDetail(params.id)
        } else {
            setisDianzan(true)
            getDetail(params.id)
        }
    }
    const handleDianzan = () => {
        if (!localStorage.getItem('jstoken')) {
            navigate('/login')
        } else {
            dianZan()

        }
    }
    const isUserUp = async (user) => {
        if (user) {
            const res = await axios.get(`http://localhost:8000/up/isUp?user_id=${user.id}&article_id=${params.id}`)
            const state = res.data.result
            if (state) {
                setisDianzan(true)
            } else {
                setisDianzan(false)
            }
        }
    }
    const turnToUserInfo = (id) => {
        navigate(`/writeSource/${id}`)
    }
    const getDetail = async () => {
        await axios.get(`http://localhost:8000/article/detail?id=${params.id}`).then((res) => {
            setDetail(res.data.result)
        })
    }
    useEffect(() => {
        getDetail(params.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id])
    useEffect(() => {
        isUserUp(user)
    })
    if (Object.keys(detail).length !== 0) {
        return (
            <div className='articleDetailWrapper'>
                <h1 className='articleDetailTitle'>{detail.article_title}</h1>
                <div className='articleDetailTime'>
                    <div className='articleDetailTimeIn' onClick={() => turnToUserInfo(detail.writer_id)}>
                        <img alt='' src={`http://localhost:8000/${detail.user.avatar}`} style={{ borderRadius: "50%" }}></img>
                    </div>
                    <div className='articleDetailTimeIn2'>
                        <div className='articleDetailTimeInName' onClick={() => turnToUserInfo(detail.writer_id)}>
                            {detail.user.username}
                        </div>
                        <div className='articleDetailTimeInTime'>
                            {`${detail.createdAt}  阅读${detail.watchNum}  喜欢${detail.likes} `}
                        </div>
                    </div>
                </div>
                <div className='articleDetailMar'>
                    <img alt='' className='articleDetailImg' src={`http://localhost:8000/${detail.article_img}`} />
                    <div dangerouslySetInnerHTML={{ __html: detail.context }}></div>
                    {/* {detail.context} */}
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
                        <div>
                            {detail.likes}人点赞
                        </div>
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
    } else {
        return <div>加载中</div>
    }
}

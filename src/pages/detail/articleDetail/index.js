import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './articleDetail.css'
import { changeTime } from '../../../utils/changeTime'

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
                            {`${changeTime(detail.createdAt)}  ??????${detail.watchNum}  ??????${detail.likes} `}
                        </div>
                    </div>
                </div>
                <div className='articleDetailMar'>
                    <img alt='' className='articleDetailImg' src={`http://localhost:8000/${detail.article_img}`} />
                    <div dangerouslySetInnerHTML={{ __html: detail.context }}></div>
                </div>
                <div className='articleNext'>
                    <div className='articlePreBtn'>
                        ?????????
                    </div>
                    <div className='articleListBtn'>
                        ??????????????????
                    </div>
                    <div className='articleNextBtn'>
                        ?????????
                    </div>
                </div>
                <div className='dianzan'>
                    <div className='dianzanBox'>
                        <div className='dianzanImg' onClick={handleDianzan}>
                            {
                                isDianzan ? '???' : '???'
                            }
                        </div>
                        <div>
                            {detail.likes}?????????
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
        return <div>?????????</div>
    }
}

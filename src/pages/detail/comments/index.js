import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import './comments.css'

export default function Comments() {
    const [commentList, setCommentList] = useState([])
    const navigate = useNavigate()
    const params = useParams()
    const commentRef = useRef()
    const id = params.id
    const getComment = async () => {
        const res = await axios.get(`http://localhost:8000/command/get?article_id=${id}`)
        const data = res.data.result.rows
        setCommentList(data)
    }
    useEffect(() => {
        getComment(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    const handleSubmitCommand = () => {
        const user = JSON.parse(localStorage.getItem('jstoken'))
        if (!user) {
            navigate('/login')
        } else {
            if (!commentRef.current.value) {
                console.log('评论内容不能为空')
                return
            }
            let token = user.token
            axios.post('http://localhost:8000/command/write', {
                user_id: user.id,
                article_id: id,
                context: commentRef.current.value
            }, {
                headers: { 'Authorization': token }
            }).then((res) => {
                getComment()
                commentRef.current.value = ''
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const handleCancelCommand = () => {
        commentRef.current.value = ''
    }
    const turnToUserInfo = (id) => {
        navigate(`/writeSource/${id}`)
    }
    return (
        <div className='commentsWrapper'>
            <textarea className='commentArea' placeholder='请写下你的评论' ref={commentRef}></textarea>
            <div className='commitCom'>
                <div className='commitBtn'>
                    <button className='commitBtn1' onClick={handleSubmitCommand}>提交</button>
                    <button className='commitBtn2' onClick={handleCancelCommand}>取消</button>
                </div>
            </div>
            <div className='allCommentsTitle'>
                全部评论
            </div>
            {
                commentList.length ? commentList.map((item) => {
                    return <div className='allCommentsUsr' key={item.id}>
                        <div className='allCommentsUsrAvatar' onClick={() => turnToUserInfo(item.user_id)}>
                            <img alt='' src={`http://localhost:8000/${item.user.avatar}`} style={{ width: "40px", height: "40px", borderRadius: "50%" }}></img>
                        </div>
                        <div className='allCommentsUsrContext'>
                            <div className='allCommentsUsrName' onClick={() => turnToUserInfo(item.user_id)}>
                                {item.user.username}
                            </div>
                            <div className='allCommentsUsrTime'>
                                {item.createdAt}
                            </div>
                            <div className='allCommentsUsrCtx'>
                                {item.context}
                            </div>
                            <div className='allCommentsUsrDianzan'>
                                <div className='allCommentsUsrDianzan1'>赞 1</div>
                                <div className='allCommentsUsrDianzan2'>回复</div>
                            </div>
                        </div>
                    </div>
                }) : '暂无评论'
            }

        </div>
    )
}

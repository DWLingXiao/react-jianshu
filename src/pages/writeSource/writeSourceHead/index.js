import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './writeSourceHead.css'

export default function WriteSourceHead(props) {
    const { info, watchnums, likesnums } = props
    const { user_id } = useParams()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('jstoken'))
    let userId
    if (user) {
        userId = user.id
    }
    const [isFollow, setIsFollow] = useState(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getisFollow = async (userId) => {
        const res = await axios.get(`http://localhost:8000/follow/get?user_id=${userId}`, {
            headers: { 'Authorization': user.token }
        })
        const data = res.data.result.list
        if (data.length > 0) {
            const myfollow = []
            for (let i = 0; i < data.length; i++) {
                myfollow.push(data[i].writer_id)
            }
            if (myfollow.includes(Number(user_id))) {
                setIsFollow(true)
            }
        }
    }
    const CancelFollow = async (userId, writerId) => {
        setIsFollow(false)
        await axios.post('http://localhost:8000/follow/cancel', {
            user_id: userId,
            writer_id: writerId
        }, {
            headers: { 'Authorization': user.token }
        })
    }
    const handleFollow = async (userId, writerId) => {
        setIsFollow(true)
        if (user) {
            await axios.post('http://localhost:8000/follow', {
                user_id: userId,
                writer_id: writerId
            }, {
                headers: { 'Authorization': user.token }
            })
        } else {
            navigate('/login')
        }
    }
    useEffect(() => {
        if (user) {
            getisFollow(userId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])
    return (
        <div className='writeSourceInfo'>
            <div className='writeSourceInfoAvatar'>
                <img alt='' className='writeSourceInfoAvatar' src={`http://localhost:8000/${info.avatar}`}></img>
            </div>
            <div className='writeSourceInfoMax'>
                <div className='writeSourceInfoMaxName'>
                    {info.username}
                </div>
                <div className='writeSourceInfoMax2'>
                    <div className='writeSourceInfoMaxInfo'>
                        <div>
                            {watchnums}
                            <div className='writeSourceInfoMaxInfo2'>
                                阅读量
                            </div>
                        </div>
                    </div>
                    <div className='writeSourceInfoMaxInfo'>
                        <div>
                            {info.fans}
                            <div className='writeSourceInfoMaxInfo2'>
                                粉丝
                            </div>
                        </div>
                    </div>
                    <div className='writeSourceInfoMaxInfo'>
                        <div>
                            {likesnums}
                            <div className='writeSourceInfoMaxInfo2'>
                                喜欢
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='writeSourceFollow'>
                {
                    isFollow ? <button className='writeSourceFollowBtn2' onClick={() => CancelFollow(userId, user_id)}>取消关注</button> :
                        <button className='writeSourceFollowBtn' onClick={() => handleFollow(userId, user_id)}>+ 关注</button>
                }
            </div>
        </div>
    )
}

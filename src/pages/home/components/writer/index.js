import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './writer.css'
import { message } from 'antd'

export default function Writer() {
    const [fansList, setFansList] = useState([])
    const [page, setPage] = useState(1)
    const [myFollowList, setMyFollowList] = useState([])
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('jstoken'))
    let userId
    if (user) {
        userId = user.id
    }
    const getFollowList = async (page) => {
        const res = await axios.get(`http://localhost:8000/follow/all?currentPage=${page}`)
        const data = res.data.result.rows
        setFansList(data)
    }
    const changePageList = async (page) => {
        if (page >= 3) {
            setPage(1)
        }
        const res = await axios.get(`http://localhost:8000/follow/all?currentPage=${page}`)
        const data = res.data.result.rows
        setFansList(data)
        setPage(x => x + 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getUserList = async (userId) => {
        const res = await axios.get(`http://localhost:8000/follow/get?user_id=${userId}`, {
            headers: { 'Authorization': user.token }
        })
        const data = res.data.result.list
        if (data.length > 0) {
            const myfollow = []
            for (let i = 0; i < data.length; i++) {
                myfollow.push(data[i].writer_id)
            }
            setMyFollowList(myfollow)
        }
    }
    const handleClickWriter = (id) => {
        navigate(`/writeSource/${id}`)
    }
    const handleFollow = async (id) => {
        if (user) {
            await axios.post('http://localhost:8000/follow', {
                user_id: userId,
                writer_id: id
            }, {
                headers: { 'Authorization': user.token }
            })
            getUserList(userId)
            message.success('关注成功')
        } else {
            navigate('/login')
        }
    }
    const cancelFollow = async (id) => {
        await axios.post('http://localhost:8000/follow/cancel', {
            user_id: userId,
            writer_id: id
        }, {
            headers: { 'Authorization': user.token }
        })
        getUserList(userId)
        message.success('取消关注成功')
    }
    useEffect(() => {
        getFollowList(page)
    }, [page])
    useEffect(() => {
        if (user && myFollowList.length === 0) {
            getUserList(userId)
        }
    }, [userId, user, myFollowList, getUserList])
    return (
        <div className='writerWrapper'>
            <div className='Writetitle'>
                <span>推荐作者</span>
                <div className='page-change' onClick={() => changePageList(page)}><span className='iconfont' style={{ marginRight: "5px", fontSize: "14px", color: "#969696" }}>&#xe851;</span>换一批</div>
                {
                    fansList.length && fansList.map((item) => {
                        return (
                            <div className='writeCommList' key={item.id}>
                                <div className='writeCommListImg' onClick={() => handleClickWriter(item.id)}>
                                    <img alt='' className='writeCommListImg' src={`http://localhost:8000/${item.avatar}`} ></img>
                                </div>
                                <div className='writeCommListInfo'>
                                    <div className='writeCommListInfoName' onClick={() => handleClickWriter(item.id)}>
                                        {item.username}
                                    </div>
                                    <div className='writeCommListInfoNum'>
                                        粉丝数 {item.fans}
                                    </div>
                                </div>
                                <div className='writeCommListInfoFollow'>
                                    {

                                        (myFollowList.length > 0 && myFollowList.includes(item.id) === true) ?
                                            <span style={{ "cursor": 'pointer', "color": "red" }} onClick={() => cancelFollow(item.id, page)}>+ 取消</span> :
                                            <span style={{ "cursor": 'pointer' }} onClick={() => handleFollow(item.id)}>+ 关注</span>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}
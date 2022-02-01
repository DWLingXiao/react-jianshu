import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './writer.css'

let currentPage = 1
export default function Writer() {
    const [fansList, setFansList] = useState([])
    const navigate = useNavigate()
    const getFollowList = async () => {
        let page = currentPage || 1
        if (currentPage >= 3) {
            currentPage = 1
        }
        const res = await axios.get(`http://localhost:8000/follow/all?currentPage=${page}`)
        const data = res.data.result.rows
        setFansList(data)
        currentPage++
    }
    const handleClickWriter = (id) => {
        navigate(`/writeSource/${id}`)
    }
    useEffect((currentPage) => {
        if (fansList.length === 0) {
            getFollowList(currentPage)
        }
    })
    return (
        <div className='writerWrapper'>
            <div className='Writetitle'>
                <span>推荐作者</span>
                <div className='page-change' onClick={() => getFollowList()}><span className='iconfont' style={{ marginRight: "5px", fontSize: "14px", color: "#969696" }}>&#xe851;</span>换一批</div>
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
                                    <span>+ 关注</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}
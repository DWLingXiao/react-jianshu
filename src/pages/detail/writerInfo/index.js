import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RecoRead from './recoRead'
import axios from 'axios'
import './writerInfo.css'

export default function WriterInfo(props) {
    const { writer_id } = props
    const [writer, setWriter] = useState({})
    const navigate = useNavigate()
    const getWriterInfo = async (writer_id) => {
        const res = await axios.get(`http://localhost:8000/user/get?writer_id=${writer_id}`)
        let data = null
        if (res) {
            data = res.data.result
            data.rows = data.rows.sort((a, b) => (b.watchNum - a.watchNum)).slice(0, 3)
            setWriter(data)
        }
    }
    const getArticleDetail = (id) => {
        navigate(`/detail/${id}`)
    }
    const turnToUserInfo = (id) => {
        navigate(`/writeSource/${id}`)
    }
    useEffect(() => {
        getWriterInfo(writer_id)
    }, [writer_id])
    if (Object.keys(writer).length !== 0) {
        return (
            <>
                <div className='writerInfoWrapper'>
                    <div className='writerInfoMs'>
                        <div onClick={() => turnToUserInfo(writer_id)}>
                            <img alt='' src={`http://localhost:8000/${writer.writer_info.avatar}`} style={{ width: "45px", height: "45px", borderRadius: "50%" }}></img>
                        </div>
                        <div className='writeInfoFx'>
                            <div className='writeInfoFx1'>
                                <div style={{ "cursor": "pointer" }} onClick={() => turnToUserInfo(writer_id)}> {writer.writer_info.username}</div>
                                <div>
                                    <button className='writeInfoBtn'>关注</button>
                                </div>
                            </div>
                            <div className='writeInfoFx2'>
                                粉丝数{writer.writer_info.fans}
                            </div>
                        </div>
                    </div>
                    <div className='writerInfoLine'></div>
                    {
                        writer.rows.map((item) => {
                            return (
                                <div className='writerInfoXiangguan' key={item.id} onClick={() => getArticleDetail(item.id)}>
                                    <div className='writerInfoXiangguanTitle'>
                                        {item.article_title}
                                    </div>
                                    <div className='writerInfoXiangguanYuedu'>
                                        阅读 {item.watchNum}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='writerInfoLine2' ></div>
                <RecoRead />
            </>
        )
    } else {
        return <>加载中</>
    }
}

import React, { useEffect, useState } from 'react'
import './writeSource.css'
import Header from '../../common/header'
import WriteSourceHead from './writeSourceHead'
import WriteSourcePage from './writeSourcePage'
import WriteSourceRight from './writeSourceRight'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function WriteSource() {
    const { user_id } = useParams()
    const [writerInfo, setWriterInfo] = useState({})
    const getWriterSoruce = async (user_id) => {
        const res = await axios.get(`http://localhost:8000/user/get?writer_id=${user_id}`)
        const data = res.data.result
        setWriterInfo(data)
    }
    useEffect(() => {
        if (Object.keys(writerInfo).length === 0) {
            getWriterSoruce(user_id)
        }
    })
    if (Object.keys(writerInfo).length !== 0) {
        console.log(writerInfo)
        let likesNums = 0
        let watchNums = 0
        const { rows, writer_info } = writerInfo
        if (rows.length !== 0) {

            for (let i = 0; i < rows.length; i++) {
                likesNums += rows[i].likes
                watchNums += rows[i].watchNum
            }
        }
        return (
            <div>
                <Header />
                <div className='writeSourceBody'>
                    <div className='writeSourceWrapper'>
                        <div className='writeSourceRight'>
                            <WriteSourceHead info={writer_info} watchnums={watchNums} likesnums={likesNums} />
                            <WriteSourcePage rows={rows} name={writer_info.username} />
                        </div>
                        <div className='writeSourceAbout'>
                            <WriteSourceRight sign={writer_info.user_sign} />
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <div>加载中</div>
    }

}

import React, { useEffect, useState } from 'react'
import Header from '../../common/header'
import MyProfileHead from './myProfileHead'
import MyProfilePage from './myProfilePage'
import MyProfileRight from './myProfileRight'
import { useParams } from 'react-router-dom'
import './myProfile.css'
import axios from 'axios'

export default function MyProfile() {
    const { id } = useParams()
    const [myInfo, setMyInfo] = useState({})

    const getMyProfile = async (id) => {
        const res = await axios.get(`http://localhost:8000/user/get?writer_id=${id}`)
        const data = res.data.result
        setMyInfo(() => data)
    }
    useEffect(() => {
        getMyProfile(id)
    }, [id])
    if (Object.keys(myInfo).length !== 0) {
        return (
            <div>
                <Header />
                <div className='myProfileBody'>
                    <div className='myProfileWrapper'>
                        <div className='myProfileRight'>
                            <MyProfileHead head={myInfo} />
                            <MyProfilePage page={myInfo} />
                        </div>
                        <div className='myProfileAbout'>
                            <MyProfileRight right={myInfo} />
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <div>加载中...</div>
    }


}

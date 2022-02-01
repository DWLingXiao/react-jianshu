import React from 'react'
import Header from '../../common/header'
import MyProfileHead from './myProfileHead'
import MyProfilePage from './myProfilePage'
import MyProfileRight from './myProfileRight'
import './myProfile.css'

export default function MyProfile() {

    return (
        <div>
            <Header />
            <div className='myProfileBody'>
                <div className='myProfileWrapper'>
                    <div className='myProfileRight'>
                        <MyProfileHead />
                        <MyProfilePage />
                    </div>
                    <div className='myProfileAbout'>
                        <MyProfileRight />
                    </div>
                </div>
            </div>
        </div>
    )

}

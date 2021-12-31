import React from 'react'
import './writeSource.css'
import Header from '../../common/header'
import WriteSourceHead from './writeSourceHead'
import WriteSourcePage from './writeSourcePage'

export default function WriteSource() {
    return (
        <div>
            <Header />
            <div className='writeSourceBody'>
                <div className='writeSourceWrapper'>
                    <div className='writeSourceRight'>
                        <WriteSourceHead />
                        <WriteSourcePage />
                    </div>
                    <div className='writeSourceAbout'></div>
                </div>
            </div>
        </div>
    )
}

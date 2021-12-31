import React from 'react'
import './writeSourcePage.css'

export default function WriteSourcePage() {
    return (
        <div className='writeSourcePageWrapper'>
            <div className='writeSourcePageTitle'>
                文章
            </div>
            <div className='listItem'>
                <img className='list-img' src='https://upload-images.jianshu.io/upload_images/14715425-cfc7ca415d5b620e.JPG?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240' alt='' />
                <div className='listInfo'>
                    <div to='/detail' className='title'>故事：租房</div>
                    <p className='desc'> 作为一个中年女人来说，每次觉得走到婚姻尽头，仰天长啸地喊着：“我要离婚”的时候...</p>
                    <div className='listItemInfo'>
                        <div>
                            牛牛日常
                        </div>
                        <div style={{ marginLeft: "15px" }}>
                            赞 95
                        </div>
                        <div style={{ marginLeft: "15px" }}>
                            看 200
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

import React from 'react'
import './writerInfo.css'
import RecoRead from './recoRead'

export default function WriterInfo() {
    return (
        <>
            <div className='writerInfoWrapper'>
                <div className='writerInfoMs'>
                    <div>
                        <img alt='' src='https://upload.jianshu.io/users/upload_avatars/8981154/c925a4f5-9645-49ae-9530-12e8f80b15d4.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp' style={{ width: "45px", height: "45px", borderRadius: "50%" }}></img>
                    </div>
                    <div className='writeInfoFx'>
                        <div className='writeInfoFx1'>
                            <div>牛牛日常</div>
                            <div>
                                <button className='writeInfoBtn'>关注</button>
                            </div>
                        </div>
                        <div className='writeInfoFx2'>
                            总资产1,732
                        </div>
                    </div>
                </div>
                <div className='writerInfoLine'></div>
                <div className='writerInfoXiangguan'>
                    <div>
                        惹事碳
                    </div>
                    <div className='writerInfoXiangguanYuedu'>
                        阅读 2,400
                    </div>
                </div>
                <div className='writerInfoXiangguan'>
                    <div>
                        惹事碳
                    </div>
                    <div className='writerInfoXiangguanYuedu'>
                        阅读 2,400
                    </div>
                </div>
                <div className='writerInfoXiangguan'>
                    <div>
                        惹事碳
                    </div>
                    <div className='writerInfoXiangguanYuedu'>
                        阅读 2,400
                    </div>
                </div>
            </div>
            <div className='writerInfoLine2' ></div>
            <RecoRead />
        </>
    )
}

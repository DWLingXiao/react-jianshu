import React from 'react'
import './writer.css'

export default function Writer() {
    return (
        <div className='writerWrapper'>
            <div className='Writetitle'>
                <span>推荐作者</span>
                <a className='page-change' href='/'><span className='iconfont' style={{ marginRight: "5px", fontSize: "14px", color: "#969696" }}>&#xe851;</span>换一批</a>

                <div className='writeCommList'>
                    <div className='writeCommListImg'>
                        <img alt='' className='writeCommListImg' src='https://upload.jianshu.io/users/upload_avatars/14715425/e0668349-8c75-43db-8a9d-c388e5f00d0d.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp' ></img>
                    </div>
                    <div className='writeCommListInfo'>
                        <div className='writeCommListInfoName' >
                            简书钻首席小管家
                        </div>
                        <div className='writeCommListInfoNum'>
                            写了458.5k字 · 114.5k喜欢
                        </div>
                    </div>
                    <div className='writeCommListInfoFollow'>
                        <span>+ 关注</span>
                    </div>
                </div>
            </div>
        </div >
    )
}
import React, { useState } from 'react';
import './myProfilePage.css'

export default function MyProfilePage() {
    const [isShowArticle, setIsShowArticle] = useState(true)
    const changeShowArticle = () => {
        setIsShowArticle(true)
    }
    const changeShowActivity = () => {
        setIsShowArticle(false)
    }
    return (
        <div className='writeSourcePageWrapper'>
            <div className='writeSourcePageTitle'>
                <span className='myprofileTitle' onClick={changeShowArticle}>我的文章</span>
                <span className='myprofileTitle' onClick={changeShowActivity}>我的动态</span>
            </div>
            {
                isShowArticle ? <div className='listItem' >
                    <img className='list-img' src={`http://localhost:8000/defaultAvatar.jpg`} alt='' />
                    <div className='listInfo'>
                        <div className='title'><div className='writeSourcePageTitle2'>czx</div></div>
                        <p className='desc'>1111111</p>
                        <div className='listItemInfo'>
                            <div>
                                czx
                            </div>
                            <div style={{ marginLeft: "15px" }}>
                                赞 100
                            </div>
                            <div style={{ marginLeft: "15px" }}>
                                看 100
                            </div>
                        </div>
                    </div>

                </div> : <div className='myProfileActivity'>
                    <div className='myProfileActivityItem'><span className='myProfileName'>czx</span> 加入了简书 2021-10-21</div>
                    <div className='myProfileActivityItem'><span className='myProfileName'>czx</span> 加入了简书 2021-10-21</div>
                    <div className='myProfileActivityItem'><span className='myProfileName'>czx</span> 加入了简书 2021-10-21</div>
                    <div className='myProfileActivityItem'><span className='myProfileName'>czx</span> 加入了简书 2021-10-21</div>
                </div>
            }

        </div>
    )
}

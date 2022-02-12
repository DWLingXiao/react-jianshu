import React, { useRef, useState } from 'react'
import './header.css'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { searchFoucs, getList } from './store/actionCreators'
import { message } from 'antd';



function Header(props) {
    const [mouseFlag, setMouseFlag] = useState(false)
    const searchRef = useRef()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('jstoken'))
    const userToken = JSON.parse(localStorage.getItem('jstoken'))
    const [mouseFlagTwo, setMouseFlagTwo] = useState(false)
    const {
        focused,
        list,
        handleInputFocuse,
        handleInputBlur,
    } = props
    const userInfo = localStorage.getItem('jstoken')
    if (userInfo) {
        var { avatar } = JSON.parse(userInfo)
    }
    const displaySetUp = () => {
        setMouseFlag(!mouseFlag)
    }
    const undisplaySetUp = () => {
        setMouseFlag(!mouseFlag)
    }
    const displaySetUpTwo = () => {
        setMouseFlagTwo(!mouseFlagTwo)
    }
    const undisplaySetUpTwo = () => {
        setMouseFlagTwo(!mouseFlagTwo)
    }
    const turnToWritePage = () => {
        if (user) {
            navigate(`/write/${user.id}`)
        } else {
            navigate(`/login`)
        }
    }
    const handleSearch = () => {
        const searchContext = searchRef.current.value
        if (!searchContext) {

            message.error('搜索内容不能为空');
            return
        } else {
            navigate(`/search/${searchContext}`)
        }
    }
    const exit = () => {
        localStorage.removeItem('jstoken')
        window.location.reload()
    }
    const turnToMyProfile = (userToken) => {
        navigate(`/myProfile/${userToken.id}`)
    }
    const turnToSetting = (userToken) => {
        navigate(`/setting/${userToken.id}`)
    }
    return (
        <div>
            <div className='headerWrapper'>
                <div className='nav'>
                    <Link to='/' className='navItem'>首页</Link>
                    <div className='navItem'>下载App</div>
                    {userInfo ? '' : <Link className='navItem' to='/login'>登录</Link>}
                    <div className='navItem'><span className="iconfont" style={{ fontSize: "20px" }}>&#xe636;</span></div>
                    <div className='searchBox'>
                        <CSSTransition
                            in={focused}
                            timeout={300}
                            classNames="slide"
                        >
                            <input
                                className={'navInput ' + (focused ? 'focused' : '')}
                                placeholder="搜索"
                                ref={searchRef}
                                onFocus={() => handleInputFocuse(list)}
                                onBlur={handleInputBlur}
                            />
                        </CSSTransition>
                        <span className={'fd iconfont ' + (focused ? 'focusebg' : '')} onClick={handleSearch}>&#xe623;</span>
                    </div>

                </div>
                <div className='addition'>
                    <button className='write' onClick={turnToWritePage}>
                        <span className="iconfont">&#xe708;</span>
                        写文章
                    </button>
                    {userInfo ?
                        <div className='userHeadAvatar' onMouseEnter={displaySetUp} onMouseLeave={undisplaySetUp}>
                            <img alt='' className='userHeadAvatarImg' src={`http://localhost:8000/${avatar}`}></img>
                        </div>
                        :
                        <Link to='/register'>
                            <button className='register'>注册</button>
                        </Link>}
                </div>
            </div>
            {
                (mouseFlag || mouseFlagTwo) ? <div className='headerSetUp' onMouseEnter={displaySetUpTwo} onMouseLeave={undisplaySetUpTwo}>
                    <div className='headerSetUp1' onClick={() => turnToMyProfile(userToken)}>我的主页</div>
                    <div className='headerSetUp1' onClick={() => turnToSetting(userToken)}>设置</div>
                    <div className='headerSetUp1' onClick={exit}>退出</div>
                </div> : ''
            }
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        focused: state.getIn(['header', 'focused']),
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        totalPage: state.getIn(['header', 'totalPage']),
        mouseIn: state.getIn(['header', 'mouseIn']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocuse(list) {
            if (!list.size) {
                dispatch(getList())
            }
            dispatch(searchFoucs())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)



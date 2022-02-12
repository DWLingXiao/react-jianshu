import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './home.css'
import List from './components/list'
import Recommand from './components/recommand'
import Writer from './components/writer'
import Header from '../../common/header'
import { getHomeInfo, toggleTopShow } from './store/actionCreators'
import { Carousel } from 'antd';

function Home(props) {
    const { changeHomeData, showScroll, handleScroll } = props
    useEffect(() => {
        changeHomeData()
        document.addEventListener('scroll', handleScroll)
        return (() => {
            document.removeEventListener('scroll', handleScroll)
        })
    }, [changeHomeData, handleScroll])

    const handleScrollTop = () => {
        window.scrollTo(0, 0)
    }
    return (
        <div>
            <Header />
            <div className='homeWrapper'>
                <div className='homeLeft' >
                    <Carousel autoplay>
                        <div>
                            <img className='banner-img' alt='' referrerPolicy="no-referrer" src='https://img1.baidu.com/it/u=320506591,65565690&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281'></img>
                        </div>
                        <div>
                            <img className='banner-img' alt='' src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F53%2F0a%2Fda%2F530adad966630fce548cd408237ff200.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640672278&t=97b6ee1264790206a8b9f258f4e0ac6f'></img>
                        </div>
                    </Carousel>

                    <List />
                </div>
                <div className='homeRight'>
                    <Recommand />
                    <Writer />
                </div>
            </div>
            {
                showScroll ? <div className='backTop' onClick={handleScrollTop}>回到顶部</div> : ''
            }

        </div>
    )
}

const mapStateToProps = (state) => ({
    showScroll: state.getIn(['home', 'showScroll'])
})

const mapDispatchToProps = (dispatch) => ({
    changeHomeData() {
        const action = getHomeInfo()
        dispatch(action)
    },
    handleScroll() {
        if (document.documentElement.scrollTop > 400) {
            const action = toggleTopShow(true)
            dispatch(action)
        } else {
            const action = toggleTopShow(false)
            dispatch(action)
        }
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
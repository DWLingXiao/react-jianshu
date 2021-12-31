import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getMoreList } from '../../store/actionCreators'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './list.css'

function List(props) {
    const { handleMoreList, page } = props
    const [articleList, setArticleList] = useState([])
    const getArticleList = async () => {
        const res = await axios.get('http://localhost:8000/article')
        const data = res.data.result.list
        setArticleList(data)
    }
    useEffect(() => {
        getArticleList()
    }, [])
    return (
        <div>
            {
                articleList.map((item, index) => (
                    <div className='listItem' key={item.id}>
                        <img className='list-img' src={`http://localhost:8000/${item.article_img}`} alt='' />
                        <div className='listInfo'>
                            <Link to={`/detail/${item.id}`} className='title'>{item.article_title}</Link>
                            <p className='desc'>{item.context}</p>
                            <div className='listItemInfo'>
                                <div>
                                    {item.user.username}
                                </div>
                                <div style={{ marginLeft: "15px" }}>
                                    赞 {item.likes}
                                </div>
                                <div style={{ marginLeft: "15px" }}>
                                    看 {item.watchNum}
                                </div>
                            </div>
                        </div>

                    </div>
                ))
            }
            <div className='loadMore' onClick={() => handleMoreList(page)}>
                阅读更多
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    articleList: state.getIn(['home', 'articleList']),
    page: state.getIn(['home', 'articlePage'])
})

const mapDispatchToProps = (dispatch) => ({
    handleMoreList(page) {
        dispatch(getMoreList(page))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
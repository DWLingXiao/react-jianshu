import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SearchLeft from './searchLeft'
import SearchRight from './searchRight'
import SearchUser from './searchUser'
import Header from '../../common/header'
import './search.css'
import axios from 'axios'


export default function Search() {
    const { title } = useParams()
    const [articleList, setArticleList] = useState([])
    const [count, setCount] = useState(0)
    const [isshowArticle, setIsshowArticle] = useState(true)
    const searchArticle = async (title) => {
        const res = await axios.get(`http://localhost:8000/article/search?title=${title}`)
        const data = res.data.result
        const { count, rows } = data

        setArticleList(rows)
        setCount(count)
    }
    useEffect(() => {
        searchArticle(title)
    }, [title])

    return (
        <div>
            <Header />
            <div className='searchBody'>
                <div className='searchWrapper'>
                    <div className='searchLeft'>
                        <SearchLeft setcount={setCount} setarticleList={setArticleList} setisshowarticle={setIsshowArticle} />
                    </div>
                    <div className='searchRight'>

                        {
                            isshowArticle ? <SearchRight articlelist={articleList} count={count} /> : <SearchUser articlelist={articleList} count={count}></SearchUser>
                        }
                    </div>
                </div>
            </div>
        </div>
    )


}

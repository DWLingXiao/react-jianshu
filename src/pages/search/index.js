import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SearchLeft from './searchLeft'
import SearchRight from './searchRight'
import Header from '../../common/header'
import './search.css'
import axios from 'axios'


export default function Search() {
    const { title } = useParams()
    const [articleList, setArticleList] = useState([])
    const [count, setCount] = useState(0)
    const searchArticle = async (title) => {
        const { count, rows } = await (await axios.get(`http://localhost:8000/article/search?title=${title}`)).data.result
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
                        <SearchLeft />
                    </div>
                    <div className='searchRight'>
                        <SearchRight articlelist={articleList} count={count} />
                    </div>
                </div>
            </div>
        </div>
    )


}

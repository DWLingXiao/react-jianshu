import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './searchLeft.css'

export default function SearchLeft(props) {
    const { setcount, setarticleList, setisshowarticle } = props
    const { title } = useParams()
    const searchArticle = async (title) => {
        const res = await axios.get(`http://localhost:8000/article/search?title=${title}`)
        const data = res.data.result
        const { rows, count } = data
        setcount(count)
        setarticleList(rows)
        setisshowarticle(true)
    }
    const searchUser = async (title) => {
        setisshowarticle(false)
        const res = await axios.get(`http://localhost:8000/user/search?title=${title}`)
        const data = res.data.result
        const { rows, count } = data
        setcount(count)
        setarticleList(rows)
    }
    const addStyle = async (e) => {
        const siblings = e.target.parentNode.children
        for (let i = 0; i < siblings.length; i++) {
            siblings[i].className = 'searchLeftItem'
        }

        e.target.className = 'searchLeftItem selected'
    }

    return (
        <div className="searchLeftWrapper" onClick={(e) => addStyle(e)}>
            <div className='searchLeftItem selected' onClick={() => searchArticle(title)}>
                文章
            </div>
            <div className='searchLeftItem' onClick={() => searchUser(title)}>
                用户
            </div>
        </div>
    )
}

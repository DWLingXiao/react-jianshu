import React, { useState, useRef } from 'react';
import './writePage.css'
import BraftEditor from 'braft-editor'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import 'braft-editor/dist/index.css'

export default function WritePage() {
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))
    const [articlePic, setArticlePic] = useState('upload_5d8c9479be2f91c827f5a244c58ba0c8.jpg')
    const [title, setTitle] = useState('')
    const navigate = useNavigate()
    const { writer_id } = useParams()
    const picRef = useRef()
    const user = JSON.parse(localStorage.getItem('jstoken'))
    const handleEditorChange = (editorState) => {
        setEditorState(editorState)
    }

    const pushArticle = async () => {
        const artTitle = title
        const article = editorState.toHTML()
        const articlePicName = articlePic
        await axios.post('http://localhost:8000/article/write', {
            writer_id: writer_id,
            article_title: artTitle,
            context: article,
            article_img: articlePicName
        }, {
            headers: { 'Authorization': user.token }
        })
    }
    const uploadArticlePic = async (e) => {
        const formData = new FormData()
        formData.append("file", e.target.files[0])
        let config = {
            method: 'post',
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        const res = await axios.post('http://localhost:8000/article/write/upload', formData, config)
        if (res) {
            const picName = res.data.result.img
            setArticlePic(picName)
        }

    }

    const changePic = () => {
        picRef.current.click()
    }

    const turnToFirst = () => {
        navigate('/')
    }

    return <div className='writePageWrapper'>
        <div className='writePageLeft'>
            <button className='writePageLeftBtn' onClick={turnToFirst}>回首页</button>
        </div>
        <div className='writePageRight'>
            <div className='writePageRightTitle'>
                <div>
                    <div className='writePageRightTitle2'>文章标题</div>
                    <input className='writePageRightTitleIpt' value={title} onChange={(e) => {
                        setTitle(e.target.value)
                    }} />
                </div>
                <div className='writePageRightPic'>
                    <div className='writePageRightTitle3'>
                        文章配图
                        <input type='file' style={{ "height": "0" }} ref={picRef} onChange={(e) => uploadArticlePic(e)} />
                    </div>
                    <button className='writePageRightChangePic' onClick={changePic}>选择图片</button>
                    <div className='writePageRightPicDiv'>
                        <img alt='' className='writePageRightSmallPic' src={`http://localhost:8000/${articlePic}`}></img>
                    </div>
                    <div>
                        <button className='writePageRightPushArt' onClick={pushArticle}>发表文章</button>
                    </div>
                </div>

            </div>
            <div>
                <BraftEditor
                    value={editorState}
                    onChange={handleEditorChange}
                />
            </div>
        </div>
    </div>;
}

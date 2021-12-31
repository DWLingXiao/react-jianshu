import axios from "axios"
import { CHANGE_HOME_DATA, ADD_HOME_LIST, TOGGLE_SCROLL_TOP } from "./actionTypes"
import { fromJS } from 'immutable'

const changeHomeData = (result) => ({
    type: CHANGE_HOME_DATA,
    topicList: result.topicList,
    articleList: result.articleList,
    recommandList: result.recommandList,
})

const addHomeData = (list, nextPage) => ({
    type: ADD_HOME_LIST,
    list: fromJS(list),
    nextPage
})

export const getHomeInfo = () => {
    return (dispatch) => {
        axios.get('/api/home.json').then((res) => {
            const result = res.data.data
            dispatch(changeHomeData(result))
        })
    }
}


export const getMoreList = (page) => {
    return (dispatch) => {
        axios.get('/api/homeList.json?page=' + page).then((res) => {
            const result = res.data.data
            dispatch(addHomeData(result, page + 1))
        })
    }
}

export const toggleTopShow = (show) => ({
    type: TOGGLE_SCROLL_TOP,
    show
})



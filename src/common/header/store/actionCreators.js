import { SEARCH_FOCUS, SEARCH_BLUR, CHANGE_LIST, CHANGE_PAGE, MOUSE_ENTER, MOUSE_LEAVE } from './actionTypes'
import axios from 'axios'
import { fromJS } from 'immutable'

const changeList = (data) => ({
    type: CHANGE_LIST,
    data: fromJS(data),
    totalPage: Math.ceil(data.length / 10)
})

export const searchFoucs = () => ({
    type: SEARCH_FOCUS
})

export const searchBlur = () => ({
    type: SEARCH_BLUR
})

export const changePage = (page) => ({
    type: CHANGE_PAGE,
    page
})

export const mouseEnter = () => ({
    type: MOUSE_ENTER,
})

export const mouseLeave = () => ({
    type: MOUSE_LEAVE,
})

export const getList = () => {
    return (dispatch) => {
        axios.get('/api/headerList.json').then((res) => {
            const data = res.data
            dispatch(changeList(data.data))
        }).catch((err) => {
            console.log(err)
        })
    }
}


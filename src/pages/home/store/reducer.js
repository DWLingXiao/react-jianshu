import { fromJS } from 'immutable'
import { ADD_HOME_LIST, CHANGE_HOME_DATA, TOGGLE_SCROLL_TOP } from './actionTypes';

const defaultState = fromJS({
    topicList: [],
    articleList: [],
    recommandList: [],
    articlePage: 1,
    showScroll: false
})

export default function homeReaducer(state = defaultState, action) {
    switch (action.type) {
        case CHANGE_HOME_DATA:
            return state.merge({
                topicList: fromJS(action.topicList),
                articleList: fromJS(action.articleList),
                recommandList: fromJS(action.recommandList)
            });
        case ADD_HOME_LIST:
            return state.merge({
                articleList: state.get('articleList').concat(action.list),
                articlePage: action.nextPage
            });
        case TOGGLE_SCROLL_TOP:
            return state.set('showScroll', action.show);
        default:
            return state;
    }
}
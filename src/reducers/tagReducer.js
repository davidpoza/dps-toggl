import {
    FETCH_TAGS_ATTEMPT,
    FETCH_TAGS_FAIL,
    FETCH_TAGS_SUCCESS,
    UPDATE_TAGS
} from '../actions/types';

import initialState from './initialState';


export default function tagReducer (state = initialState.tagReducer, action){
    switch(action.type){
        case FETCH_TAGS_ATTEMPT:
            return {
                ...state,
                loading: true,
                error: {}
            }
        case FETCH_TAGS_SUCCESS:
            return {
                ...state,
                loading: false,
                tags: action.payload,
                need_refreshing: false
            }
        case FETCH_TAGS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_TAGS:
            return {
                ...state,
                tags: action.payload
            }
            
        default:
            return state;
    }
}
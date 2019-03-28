import {
    FETCH_TAGS_ATTEMPT,
    FETCH_TAGS_FAIL,
    FETCH_TAGS_SUCCESS
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
        console.log(action.payload);
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
        default:
            return state;
    }
}
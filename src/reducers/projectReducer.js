import {
    FETCH_PROJECTS_ATTEMPT,
    FETCH_PROJECTS_FAIL,
    FETCH_PROJECTS_SUCCESS,
    CLEAN_PROJECT_MESSAGE
} from '../actions/types';

import initialState from './initialState';


export default function projectReducer (state = initialState.projectReducer, action){
    switch(action.type){
        case FETCH_PROJECTS_ATTEMPT:
            return {
                ...state,
                loading: true,
                error: {}
            }
        case FETCH_PROJECTS_SUCCESS:
            return {
                ...state,
                loading: false,
                projects: action.payload,
                need_refreshing: false
            }
        case FETCH_PROJECTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAN_PROJECT_MESSAGE:
            return {
                ...state,
                error: {}
            }
        default:
            return state;
    }
}
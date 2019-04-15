import {
    FETCH_PROJECTS_ATTEMPT,
    FETCH_PROJECTS_FAIL,
    FETCH_PROJECTS_SUCCESS,
    CLEAN_PROJECT_MESSAGE,
    CREATE_PROJECT_ATTEMPT,
    CREATE_PROJECT_FAIL,
    CREATE_PROJECT_SUCCESS,
    FETCH_PROJECT_ATTEMPT,
    FETCH_PROJECT_FAIL,
    FETCH_PROJECT_SUCCESS
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
        case CREATE_PROJECT_ATTEMPT:
            return {
                ...state,
                loading: true,
                need_refreshing: false,
                error: {}
            }
        case CREATE_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                projects: [...state.projects, action.payload],
                need_refreshing: true,
                error: {}
            }
        case CREATE_PROJECT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case FETCH_PROJECT_ATTEMPT:
            return {
                ...state,
                loading: true,
                need_refreshing: false,
                project_detail: {},
                error: {}
            }
        case FETCH_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                project_detail: action.payload,
                error: {}
            }
        case FETCH_PROJECT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
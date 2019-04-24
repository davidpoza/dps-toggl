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
    FETCH_PROJECT_SUCCESS,
    DELETE_PROJECT_ATTEMPT,
    DELETE_PROJECT_FAIL,
    DELETE_PROJECT_SUCCESS,
    UPDATE_PROJECT_ATTEMPT,
    UPDATE_PROJECT_FAIL,
    UPDATE_PROJECT_SUCCESS,
    CHANGE_PROJECT_SORT,
    LOGOUT_USER
} from '../actions/types';

import initialState from './initialState';
import {normalize} from 'normalizr';
import * as schemas from './normalizr';


export default function projectReducer (state = initialState.projectReducer, action){
    switch(action.type){
        case FETCH_PROJECTS_ATTEMPT:
            return {
                ...state,
                loading: true,
                error: {}
            }
        case FETCH_PROJECTS_SUCCESS:
            action.payload = normalize(action.payload, schemas.projectsSchema);
            return {
                ...state,
                loading: false,
                projects_entities: action.payload.entities.projects,
                projects_id: action.payload.result,
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
                error: {}
            }
        case FETCH_PROJECT_SUCCESS:
        action.payload = normalize(action.payload, schemas.projectEntity);
        let new_projects_entities = Object.assign({},state.projects_entities);
        new_projects_entities[action.payload.result] = action.payload.entities.projects[action.payload.result];
            return {
                ...state,
                loading: false,
                projects_entities: new_projects_entities,
                error: {}
            }
        case FETCH_PROJECT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_PROJECT_ATTEMPT:
            return {
                ...state,
                loading: true,
                need_refreshing: false,
                project_detail: {},
                error: {}
            }
        case DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                need_refreshing: true,
                error: {}
            }
        case DELETE_PROJECT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_PROJECT_ATTEMPT:        
            return {
                ...state,
                loading: true,
                need_refreshing: false,
                error: {}
            }
        case UPDATE_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                need_refreshing: true,
                error: {}
            }
        case UPDATE_PROJECT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CHANGE_PROJECT_SORT:
            return {
                ...state,
                sortBy: action.payload.field,
                order: state.order=="asc"?"desc":"asc"
            }
        case LOGOUT_USER:
            return {
                ...initialState.projectReducer
            }
        default:
            return state;
    }
}
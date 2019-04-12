import {
    FETCH_PROJECTS_ATTEMPT,
    FETCH_PROJECTS_FAIL,
    FETCH_PROJECTS_SUCCESS,
    CLEAN_PROJECT_MESSAGE,
    FETCH_PROJECT_TASKS_ATTEMPT,
    FETCH_PROJECT_TASKS_FAIL,
    FETCH_PROJECT_TASKS_SUCCESS
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
        case FETCH_PROJECT_TASKS_ATTEMPT:
            return {
                ...state,
                loading: true,
                error: {}
            }
        case FETCH_PROJECT_TASKS_SUCCESS:
            let new_projects_array = [...state.projects].map(p=>{
                if(p.id == action.payload[0].project.id)
                    p.tasks = action.payload.filter(t=>{
                        return(t.project.id == p.id) //es una tarea del proyecto
                    });
                return p;
            });
            
            return {
                ...state,
                loading: false,
                projects: new_projects_array,
                error: {}
            }
        case FETCH_PROJECT_TASKS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
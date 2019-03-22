import {
    CREATE_TASK_ATTEMPT,
    CREATE_TASK_FAIL,
    CREATE_TASK_SUCCESS,
    FETCH_TASKS_ATTEMPT,
    FETCH_TASKS_FAIL,
    FETCH_TASKS_SUCCESS
} from '../actions/types';

import initialState from './initialState';


export default function taskReducer (state = initialState.taskReducer, action){
    switch(action.type){
        case CREATE_TASK_ATTEMPT:
        //vamos a crear una copia del estado, es como usar Object.assign
            return {
                ...state,
                loading: true,
                need_refreshing: false,
                error: {}
            }
        case CREATE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                need_refreshing: true,
                error: {}
            }
        case CREATE_TASK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case FETCH_TASKS_ATTEMPT:
            return {
                ...state,
                loading: true,
                error: {}
            }
        case FETCH_TASKS_SUCCESS:
        console.log(action.payload);
            return {
                ...state,
                loading: false,
                tasks: action.payload,
                need_refreshing: false
            }
        case FETCH_TASKS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
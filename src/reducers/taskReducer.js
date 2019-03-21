import {
    CREATE_TASK_ATTEMPT,
    CREATE_TASK_FAIL,
    CREATE_TASK_SUCCESS
} from '../actions/types';

import initialState from './initialState';


export default function taskReducer (state = initialState.taskReducer, action){
    switch(action.type){
        case CREATE_TASK_ATTEMPT:
        //vamos a crear una copia del estado, es como usar Object.assign
            return {
                ...state,
                loading: true,
                error: {}
            }
        case CREATE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {}
            }
        case CREATE_TASK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
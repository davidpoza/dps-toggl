import {
    CREATE_TASK_ATTEMPT,
    CREATE_TASK_FAIL,
    CREATE_TASK_SUCCESS,
    FETCH_TASKS_ATTEMPT,
    FETCH_TASKS_FAIL,
    FETCH_TASKS_SUCCESS,
    DELETE_TASK_ATTEMPT,
    DELETE_TASK_FAIL,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_VISUALLY,
    UPDATE_TASK_ATTEMPT,
    UPDATE_TASK_FAIL,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_VISUALLY,
    CLEAN_TASK_MESSAGE,
    FETCH_DATES_ATTEMPT,
    FETCH_DATES_FAIL,
    FETCH_DATES_SUCCESS,
    FETCH_TASK_ATTEMPT,
    FETCH_TASK_FAIL,
    FETCH_TASK_SUCCESS,
    COLLAPSE_DATE,
    LOGOUT_USER,
    UPDATE_DATE_VISUALLY
} from '../actions/types';

import utils from '../utils';
import {normalize} from 'normalizr';
import * as schemas from './normalizr';

import initialState from './initialState';



export default function dashboardReducer (state = initialState.dashboardReducer, action){
    switch(action.type){

        default:
            return state;
    }
}
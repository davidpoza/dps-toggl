import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,    
    LOGIN_USER_INIT
} from '../actions/types';

import initialState from './initialState';

export default function userReducer (state = initialState.user, action){
    switch(action.type){
        case LOGIN_USER_INIT:
        //vamos a crear una copia del estado, es como usar Object.assign
            return {
                ...state,
                loading: true,
                error: null
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                username: action.payload,
                loading: false,
                error: null
            }
        case LOGIN_USER_ERROR:
            return {
                ...state,
                username: null,
                loading: false,
                error: action.payload
            } 
        default:
            return state;
    }
}
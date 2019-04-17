import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_ATTEMPT,
    LOGOUT_USER,
    REFRESH_TOKEN_ATTEMPT,
    REFRESH_TOKEN_FAIL,
    REFRESH_TOKEN_SUCCESS,
    CLEAN_USER_MESSAGE,
    FETCH_USERS_ATTEMPT,
    FETCH_USERS_FAIL,
    FETCH_USERS_SUCCESS
} from '../actions/types';

import initialState from './initialState';

const thumbnail_path = "https://dpstogglapi1.davidinformatico.com/uploads/_/thumbnails/200/200/crop/good/";

export default function userReducer (state = initialState.userReducer, action){
    switch(action.type){
        case LOGIN_USER_ATTEMPT:
        //vamos a crear una copia del estado, es como usar Object.assign
            return {
                ...state,
                loading: true,
                error: {}
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                id: action.payload.id,
                token: action.payload.token,
                email: action.payload.email,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                avatar: thumbnail_path+action.payload.avatar.filename,
                loading: false,
                error: {}
            }
        case LOGIN_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case LOGOUT_USER:
            return {
                ...state,
                loading: false,
                token: null,
                email: null,
                first_name: null,
                last_name: null,
                avatar: null
            }
        case REFRESH_TOKEN_ATTEMPT:
            return {
                ...state,
                error: {}
            }
        case REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                error: {}
            }
        case REFRESH_TOKEN_FAIL:
            return {
                ...state,                
                token: null,
                error: action.payload
            }
        case FETCH_USERS_ATTEMPT:
            return {
                ...state,
                loading: true,
                error: {}
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload.result,
                users_entities: action.payload.entities.users,
                error: {}
            }
        case FETCH_USERS_FAIL:
            return {
                ...state,
                loading: false,                
                error: action.payload
            }
        case CLEAN_USER_MESSAGE:
            return {
                ...state,
                error: {}
            }
        default:
            return state;
    }
}
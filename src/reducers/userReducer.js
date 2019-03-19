import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_ATTEMPT,
    LOGOUT_USER
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
        default:
            return state;
    }
}

import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_ATTEMPT,
    LOGOUT_USER,
    REFRESH_TOKEN_ATTEMPT,
    REFRESH_TOKEN_FAIL,
    REFRESH_TOKEN_SUCCESS,
    CLEAN_USER_MESSAGE
} from './types';


import api from '../api';

/* Action creators síncronos */


export function loginUserSuccess(userData){
    return {
        type: LOGIN_USER_SUCCESS,
        payload: userData
    }
}

export function loginUserError(error){
    return {
        type: LOGIN_USER_FAIL,
        payload: error
    }
}

export function logoutUser(){
    return {
        type: LOGOUT_USER
    }
}


export function refreshTokenSuccess(token){
    return {
        type: REFRESH_TOKEN_SUCCESS,
        payload: token
    }
}

export function refreshTokenError(error){
    return {
        type: REFRESH_TOKEN_FAIL,
        payload: error
    }
}

export function cleanMessage(){
    return {
        type: CLEAN_USER_MESSAGE,
    }
}

/* Action creators asíncronos - thunks */

export function loginUser(email, password, history){
    return (dispatch) => {
        dispatch({
            type: LOGIN_USER_ATTEMPT
        });

        api.user.login(email, password).then(
            (data) => {
                //directus devuelve los errores en una objeto error y los datos en uno data
                if(data.data){
                    dispatch(loginUserSuccess(data.data));
                    history.push("/");
                }                    
                else if(data.error) //error en la peticion
                    dispatch(loginUserError(data.error))
            }                          
        ).catch(
            (error) => { //error en fetch, entonces error en la conexion
                dispatch(loginUserError(error));
        });
    }
}

export function refreshToken(token){
    return (dispatch) => {
        dispatch({
            type: REFRESH_TOKEN_ATTEMPT
        });

        api.user.refreshToken(token).then(
            (data) => {
                //directus devuelve los errores en una objeto error y los datos en uno data
                if(data.data){
                    dispatch(refreshTokenSuccess(data.data.token));
                }                    
                else if(data.error) //error en la peticion
                    dispatch(refreshTokenError(data.error))
            }                          
        ).catch(
            (error) => { //error en fetch, entonces error en la conexion
                dispatch(refreshTokenError(error));
        });
    }
}



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
    FETCH_USERS_SUCCESS,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_ATTEMPT,
    CHANGE_USER_SORT
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

export function registerUserSuccess(userData){
    return {
        type: REGISTER_USER_SUCCESS,
        payload: userData
    }
}

export function registerUserError(error){
    return {
        type: REGISTER_USER_FAIL,
        payload: error
    }
}

export function fetchUsersSuccess(userData){
    return {
        type: FETCH_USERS_SUCCESS,
        payload: userData
    }
}

export function fetchUsersError(error){
    return {
        type: FETCH_USERS_FAIL,
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

export function changeSort(field){
    return {
        type: CHANGE_USER_SORT,
        payload: {field}
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

export function registerUser(email, password, history){
    return (dispatch) => {
        dispatch({
            type: REGISTER_USER_ATTEMPT
        });

        api.user.register(email, password).then(
            (data) => {
                if(data.data){
                    dispatch(registerUserSuccess(data.data));
                    history.push("/login");
                }
                else if(data.error) //error en la peticion
                    dispatch(registerUserError(data.error))
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

//devuelve todos los usuarios menos a sí mismo
export function fetchUsers(token){
    return (dispatch) => {
        dispatch({
            type: FETCH_USERS_ATTEMPT
        });

        api.user.fetchUsers(token).then(
            (data) => {
                if(data.data){
                    dispatch(fetchUsersSuccess(data.data));
                }
                else if(data.error) //error en la peticion
                    dispatch(fetchUsersError(data.error))
            }
        ).catch(
            (error) => { //error en fetch, entonces error en la conexion
                dispatch(refreshTokenError(error));
        });
    }
}


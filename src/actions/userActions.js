
import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_ATTEMPT,
    LOGOUT_USER
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
                else if(data.error)
                    dispatch(loginUserError(data.error))
            }                          
        ).catch(
            (error) => {
                dispatch(loginUserError(error));
        });
    }
}


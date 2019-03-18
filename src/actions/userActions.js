
import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_ATTEMPT
} from './types';


import api from '../api';

/* Action creators síncronos */


export function loginUserSuccess(user){
    return {
        type: LOGIN_USER_SUCCESS,
        payload: user
    }
}

export function loginUserError(error){
    return {
        type: LOGIN_USER_FAIL,
        payload: error
    }
}


/* Action creators asíncronos - thunks */

export function loginUser(username, password){
    return (dispatch) => {
        dispatch({
            type: LOGIN_USER_ATTEMPT
        });


        api.user.login(username, password).then(
            (data) => dispatch(loginUserSuccess(data))                          
        ).catch(
            (error) => {
            dispatch(loginUserError(error))
        });
    }
}
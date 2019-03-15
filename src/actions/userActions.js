
import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGIN_USER_INIT
} from './types';


import api from './api';

/* Action creators síncronos */


export function loginUserSuccess(user){
    return {
        type: LOGIN_USER_SUCCESS,
        payload: user
    }
}

export function loginUserError(error){
    return {
        type: LOGIN_USER_ERROR,
        payload: error
    }
}


/* Action creators asíncronos */

export function loginUser(username, password){
    return function(dispatch){
        dispatch(function(){
            return {
                type: LOGIN_USER_INIT
            }
        });

        try{
            api.user.login(username, password).then(
                function(data){
                    return dispatch(loginUserSuccess(data));
                }                
            )
        }
        catch(error){
            return dispatch(loginUserSuccess(error))
        }
    }
}
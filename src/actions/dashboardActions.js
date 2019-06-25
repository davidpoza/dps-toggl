
import {
    FETCH_DASHBOARD_BAR_DATA_ATTEMPT,
    FETCH_DASHBOARD_BAR_DATA_FAIL,
    FETCH_DASHBOARD_BAR_DATA_SUCCESS
} from './types';


import api from '../api';
import * as userActions from './userActions';


/* Action creators síncronos */
export function fetchBarDataSuccess(data){
    return {
        type: FETCH_DASHBOARD_BAR_DATA_SUCCESS,
        payload: data
    }
}

export function fetchBarDataError(error){
    return {
        type: FETCH_DASHBOARD_BAR_DATA_FAIL,
        payload: error
    }
}

/* Action creators asíncronos (thunks) */

export function fetchBarData(token, start_date, end_date){
    return (dispatch) => {
        dispatch({
            type: FETCH_DASHBOARD_BAR_DATA_ATTEMPT
        });

        api.dashboard.fetchAllDatesBetween(token, start_date, end_date)
        .then(
            (data) => {
                //directus devuelve los errores en una objeto error y los datos en uno data
                if(data){
                    dispatch(fetchBarDataSuccess(data));
                }
            }
        )
        .catch(
            (error) => {
                dispatch(fetchBarDataError(error));
        });
    }
}
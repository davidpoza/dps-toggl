
import {
    FETCH_DASHBOARD_BAR_DATA_ATTEMPT,
    FETCH_DASHBOARD_BAR_DATA_FAIL,
    FETCH_DASHBOARD_BAR_DATA_SUCCESS
} from "./types";


import api from "../api";
import utils from "../utils";


/* Action creators síncronos */
export function fetchBarDataSuccess(data){
    return {
        type: FETCH_DASHBOARD_BAR_DATA_SUCCESS,
        payload: data
    };
}

export function fetchBarDataError(error){
    return {
        type: FETCH_DASHBOARD_BAR_DATA_FAIL,
        payload: error
    };
}

/* Action creators asíncronos (thunks) */

export function fetchBarData(token, date_start, date_end, preset){
    return (dispatch) => {
        dispatch({
            type: FETCH_DASHBOARD_BAR_DATA_ATTEMPT
        });

        api.dashboard.fetchAllDatesBetween(token, utils.standarizeDate(date_start), utils.standarizeDate(date_end))
            .then(
                (data) => {
                //directus devuelve los errores en una objeto error y los datos en uno data
                    if(data){
                        dispatch(fetchBarDataSuccess({data, preset, date_start, date_end}));
                    }
                }
            )
            .catch(
                (error) => {
                    dispatch(fetchBarDataError(error));
                });
    };
}
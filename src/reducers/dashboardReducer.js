import {
    FETCH_DASHBOARD_BAR_DATA_ATTEMPT,
    FETCH_DASHBOARD_BAR_DATA_FAIL,
    FETCH_DASHBOARD_BAR_DATA_SUCCESS

} from "../actions/types";

import {normalize} from "normalizr";
import * as schemas from "./normalizr";

import initialState from "./initialState";



export default function dashboardReducer (state = initialState.dashboardReducer, action){
    switch(action.type){
    case FETCH_DASHBOARD_BAR_DATA_ATTEMPT: {
        return {
            ...state,
            loading: true,
            error: {}
        };
    }
    case FETCH_DASHBOARD_BAR_DATA_FAIL: {
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    }
    case FETCH_DASHBOARD_BAR_DATA_SUCCESS: {
        let total_tasks = action.payload.data.total;
        action.payload.data = normalize(action.payload.data.dates, schemas.dateSchema);
        return {
            ...state,
            loading: false,
            data: action.payload.data,
            preset: action.payload.preset,
            date_start: action.payload.date_start,
            date_end: action.payload.date_end,
            total_tasks: total_tasks,
            error: {}
        };
    }
    default:
        return state;
    }
}
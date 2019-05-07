import {
    FETCH_DASHBOARD_BAR_DATA_ATTEMPT,
    FETCH_DASHBOARD_BAR_DATA_FAIL,
    FETCH_DASHBOARD_BAR_DATA_SUCCESS

} from '../actions/types';

import utils from '../utils';
import {normalize} from 'normalizr';
import * as schemas from './normalizr';

import initialState from './initialState';



export default function dashboardReducer (state = initialState.dashboardReducer, action){
    switch(action.type){
        case FETCH_DASHBOARD_BAR_DATA_ATTEMPT:
            return {
                ...state,
                loading: true,
                error: {}
            }
        break;

        case FETCH_DASHBOARD_BAR_DATA_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        break;

        case FETCH_DASHBOARD_BAR_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: {}
            }
        break;
        default:
            return state;
    }
}
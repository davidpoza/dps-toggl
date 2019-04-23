import {
    FETCH_TAGS_ATTEMPT,
    FETCH_TAGS_FAIL,
    FETCH_TAGS_SUCCESS,
    CLEAN_TAG_MESSAGE
} from '../actions/types';

import initialState from './initialState';
import {normalize} from 'normalizr';
import * as schemas from './normalizr';

export default function tagReducer (state = initialState.tagReducer, action){
    switch(action.type){
        case FETCH_TAGS_ATTEMPT:
            return {
                ...state,
                loading: true,
                error: {}
            }
        case FETCH_TAGS_SUCCESS:
            action.payload = normalize(action.payload, schemas.tagsSchema);
            return {
                ...state,
                loading: false,
                tags_id: action.payload.result,
                tags_entities: action.payload.entities.tags,
                need_refreshing: false
            }
        case FETCH_TAGS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAN_TAG_MESSAGE:
            return {
                ...state,
                error: {}
            }
            
        default:
            return state;
    }
}
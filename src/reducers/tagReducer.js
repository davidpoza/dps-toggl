import {
    FETCH_TAGS_ATTEMPT,
    FETCH_TAGS_FAIL,
    FETCH_TAGS_SUCCESS,
    CLEAN_TAG_MESSAGE,
    UPDATE_TAG_ATTEMPT,
    UPDATE_TAG_FAIL,
    UPDATE_TAG_SUCCESS,
    DELETE_TAG_ATTEMPT,
    DELETE_TAG_FAIL,
    DELETE_TAG_SUCCESS,
    CREATE_TAG_ATTEMPT,
    CREATE_TAG_SUCCESS,
    CREATE_TAG_FAIL,
    UPDATE_TAG_VISUALLY,
    DELETE_TAG_VISUALLY
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
                need_refreshing: false,
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
        case CREATE_TAG_ATTEMPT:
            return {
                ...state,
                loading: true,
                need_refreshing: false,
                error: {}
            }
        case CREATE_TAG_SUCCESS:
            return {                
                ...state,
                loading: false,
                need_refreshing: true,
            }
        case CREATE_TAG_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_TAG_VISUALLY:
            let new_tags_entities_updated=Object.assign({}, state.tags_entities);
            new_tags_entities_updated[action.payload.id].name = action.payload.name;
            return {                
                ...state,
                tags_entities: new_tags_entities_updated,
            }
        case UPDATE_TAG_ATTEMPT:
            return {
                ...state,
                loading: true,
                error: {}
            }
        case UPDATE_TAG_SUCCESS:
            return {                
                ...state,
                loading: false,
            }
        case UPDATE_TAG_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_TAG_ATTEMPT:
            return {
                ...state,
                loading: true,
                error: {}
            }
        case DELETE_TAG_SUCCESS:
            return {                
                ...state,
                loading: false,
            }
        case DELETE_TAG_FAIL:
            return {
                ...state,
                loading: false,                
                error: action.payload
            }
        case DELETE_TAG_VISUALLY:
            let new_tags_entities_deleted = Object.assign({}, state.tags_entities);
            let new_tags_id_deleted = state.tags_id.filter(e=>e!=action.payload.id);
            delete new_tags_entities_deleted[action.payload.id];
            return {                
                ...state,
                tags_entities: new_tags_entities_deleted,
                tags_id: new_tags_id_deleted
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
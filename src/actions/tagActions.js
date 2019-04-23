
import {
FETCH_TAGS_ATTEMPT,
FETCH_TAGS_FAIL,
FETCH_TAGS_SUCCESS,
CLEAN_TAG_MESSAGE,
CREATE_TAG_ATTEMPT,
CREATE_TAG_FAIL,
CREATE_TAG_SUCCESS,
DELETE_TAG_ATTEMPT,
DELETE_TAG_FAIL,
DELETE_TAG_SUCCESS,
UPDATE_TAG_ATTEMPT,
UPDATE_TAG_FAIL,
UPDATE_TAG_SUCCESS,
UPDATE_TAG_VISUALLY,
DELETE_TAG_VISUALLY
} from './types';


import api from '../api';



/* Action creators síncronos */


export function fetchTagsSuccess(tagData){
    return {
        type: FETCH_TAGS_SUCCESS,
        payload: tagData
    }
}

export function fetchTagsError(error){
    return {
        type: FETCH_TAGS_FAIL,
        payload: error
    }
}

export function createTagSuccess(tagData){
    return {
        type: CREATE_TAG_SUCCESS,
        payload: tagData
    }
}

export function createTagError(error){
    return {
        type: CREATE_TAG_FAIL,
        payload: error
    }
}

export function deleteTagSuccess(tagData){
    return {
        type: DELETE_TAG_SUCCESS,
        payload: tagData
    }
}

export function deleteTagError(error){
    return {
        type: DELETE_TAG_FAIL,
        payload: error
    }
}

export function updateTagSuccess(tagData){
    return {
        type: UPDATE_TAG_SUCCESS,
        payload: tagData
    }
}

export function updateTagError(error){
    return {
        type: UPDATE_TAG_FAIL,
        payload: error
    }
}

export function cleanMessage(){
    return {
        type: CLEAN_TAG_MESSAGE,
    }
}

/* Action creators asíncronos - thunks */

export function createTag(token, name, user_id){
    return (dispatch) => {
        dispatch({
            type: CREATE_TAG_ATTEMPT
        });

        api.tag.createTag(token, name, user_id).then(
            (data) => {
                //directus devuelve los errores en una objeto error y los datos en uno data
                if(data.data){
                    dispatch(createTagSuccess(data.data));
                }                    
                else if(data.error)
                    dispatch(createTagError(data.error))
            }                          
        )
        .catch(
            (error) => {
                dispatch(createTagError(error));
        });
    }
}

export function deleteTag(token, tag_id){
    return (dispatch) => {
        dispatch({
            type: DELETE_TAG_ATTEMPT
        });
        dispatch({
            type: DELETE_TAG_VISUALLY,
            payload: {id:tag_id}
        });
        api.tag.deleteTag(token, tag_id).then(
            (data) => {
                if(data.data)
                    dispatch(deleteTagSuccess(data.data));
                if(data.error)
                    dispatch(deleteTagError(data.error))
            }
        )
        .catch(
            (error) => {
                dispatch(deleteTagError(error));
        });
    }
}

export function updateTag(token, tag_id, tag_name){
    return (dispatch) => {
        dispatch({
            type: UPDATE_TAG_ATTEMPT
        });
        dispatch({
            type: UPDATE_TAG_VISUALLY,
            payload: {id:tag_id, name: tag_name}
        });
        api.tag.updateTag(token, tag_id, tag_name).then(
            (data) => {
                //directus devuelve los errores en una objeto error y los datos en uno data
                if(data.data){
                    dispatch(updateTagSuccess(data.data));
                }                    
                else if(data.error)
                    dispatch(updateTagError(data.error))
            }                          
        ).catch(
            (error) => {
                dispatch(updateTagError(error));
        });
        
        
    }
}

export function fetchTagsByUser(token,user_id){
    return (dispatch) => {
        dispatch({
            type: FETCH_TAGS_ATTEMPT
        });

        api.tag.fetchTagsByUser(token,user_id).then(
            (data) => {
                //directus devuelve los errores en una objeto error y los datos en uno data
                if(data.data){                    
                    dispatch(fetchTagsSuccess(data.data));
                }                    
                else if(data.error)
                    dispatch(fetchTagsError(data.error))
            }                          
        ).catch(
            (error) => {
                dispatch(fetchTagsError(error));
        });
    }
}


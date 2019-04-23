
import {
FETCH_TAGS_ATTEMPT,
FETCH_TAGS_FAIL,
FETCH_TAGS_SUCCESS,
CLEAN_TAG_MESSAGE,
CREATE_TAG_ATTEMPT,
CREATE_TAG_FAIL,
CREATE_TASK_SUCCESS,
CREATE_TAG_SUCCESS
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


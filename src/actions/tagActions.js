
import {
FETCH_TAGS_ATTEMPT,
FETCH_TAGS_FAIL,
FETCH_TAGS_SUCCESS,
CLEAN_TAG_MESSAGE
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

export function cleanMessage(){
    return {
        type: CLEAN_TAG_MESSAGE,
    }
}

/* Action creators asíncronos - thunks */

export function fetchTags(token){
    return (dispatch) => {
        dispatch({
            type: FETCH_TAGS_ATTEMPT
        });

        api.tag.fetchTags(token).then(
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



import {
FETCH_TAGS_ATTEMPT,
FETCH_TAGS_FAIL,
FETCH_TAGS_SUCCESS
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



import {
FETCH_PROJECTS_ATTEMPT,
FETCH_PROJECTS_FAIL,
FETCH_PROJECTS_SUCCESS,
CLEAN_PROJECT_MESSAGE,
} from './types';


import api from '../api';

/* Action creators síncronos */


export function fetchProjectsSuccess(projectData){
    return {
        type: FETCH_PROJECTS_SUCCESS,
        payload: projectData
    }
}

export function fetchProjectsError(error){
    return {
        type: FETCH_PROJECTS_FAIL,
        payload: error
    }
}

export function cleanMessage(){
    return {
        type: CLEAN_PROJECT_MESSAGE,
    }
}

/* Action creators asíncronos - thunks */
/*
export function fetchProjects(token){
    return (dispatch) => {
        dispatch({
            type: FETCH_PROJECTS_ATTEMPT
        });

        api.project.fetchProjects(token).then(
            (data) => {
                //directus devuelve los errores en una objeto error y los datos en uno data
                if(data.data){
                    dispatch(fetchProjectsSuccess(data.data));
                }                    
                else if(data.error)
                    dispatch(fetchProjectsError(data.error))
            }                          
        ).catch(
            (error) => {
                dispatch(fetchProjectsError(error));
        });
    }
}
*/
export function fetchProjectsByOwner(token, owner_id){
    return (dispatch) => {
        dispatch({
            type: FETCH_PROJECTS_ATTEMPT
        });

        api.project.fetchProjectsByOwner(token, owner_id).then(
            (data) => {
                //directus devuelve los errores en una objeto error y los datos en uno data
                if(data.data){
                    dispatch(fetchProjectsSuccess(data.data));
                }                    
                else if(data.error)
                    dispatch(fetchProjectsError(data.error))
            }                          
        )
        .catch(
            (error) => {
                dispatch(fetchProjectsError(error));
        });
    }
}


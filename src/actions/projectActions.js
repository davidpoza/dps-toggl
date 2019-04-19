
import {
FETCH_PROJECTS_ATTEMPT,
FETCH_PROJECTS_FAIL,
FETCH_PROJECTS_SUCCESS,
CLEAN_PROJECT_MESSAGE,
CREATE_PROJECT_ATTEMPT,
CREATE_PROJECT_FAIL,
CREATE_PROJECT_SUCCESS,
FETCH_PROJECT_ATTEMPT,
FETCH_PROJECT_FAIL,
FETCH_PROJECT_SUCCESS,
DELETE_PROJECT_ATTEMPT,
DELETE_PROJECT_FAIL,
DELETE_PROJECT_SUCCESS,
UPDATE_PROJECT_ATTEMPT,
UPDATE_PROJECT_FAIL,
UPDATE_PROJECT_SUCCESS
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

export function fetchProjectSuccess(projectData){
    return {
        type: FETCH_PROJECT_SUCCESS,
        payload: projectData
    }
}

export function fetchProjectError(error){
    return {
        type: FETCH_PROJECT_FAIL,
        payload: error
    }
}

export function deleteProjectSuccess(projectData){
    return {
        type: DELETE_PROJECT_SUCCESS,
        payload: projectData
    }
}

export function deleteProjectError(error){
    return {
        type: DELETE_PROJECT_FAIL,
        payload: error
    }
}

export function updateProjectSuccess(taskData){
    return {
        type: UPDATE_PROJECT_SUCCESS,
        payload: taskData
    }
}

export function updateProjectError(error){
    return {
        type: UPDATE_PROJECT_FAIL,
        payload: error
    }
}

export function createProjectSuccess(projectData){
    return {
        type: CREATE_PROJECT_SUCCESS,
        payload: projectData
    }
}

export function createProjectError(error){
    return {
        type: CREATE_PROJECT_FAIL,
        payload: error
    }
}

export function cleanMessage(){
    return {
        type: CLEAN_PROJECT_MESSAGE,
    }
}

/* Action creators asíncronos - thunks */

export function fetchProjectById(token, project_id){
    return (dispatch) => {
        dispatch({
            type: FETCH_PROJECT_ATTEMPT
        });

        api.project.fetchProjectById(token, project_id).then(
            (data) => {
                //directus devuelve los errores en una objeto error y los datos en uno data
                if(data.data){
                    dispatch(fetchProjectSuccess(data.data));
                }                    
                else if(data.error)
                    dispatch(fetchProjectError(data.error))
            }                          
        )
        .catch(
            (error) => {
                dispatch(fetchProjectsError(error));
        });
    }
}


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

export function createProject(token, name, color, owner_id){
    return (dispatch) => {
        dispatch({
            type: CREATE_PROJECT_ATTEMPT
        });

        api.project.createProject(token, name, color, owner_id).then(
            (data) => {
                //directus devuelve los errores en una objeto error y los datos en uno data
                if(data.data){
                    dispatch(createProjectSuccess(data.data));
                }                    
                else if(data.error)
                    dispatch(createProjectError(data.error))
            }                          
        )
        .catch(
            (error) => {
                dispatch(fetchProjectsError(error));
        });
    }
}

export function updateProject(token, project_id, project_name, project_color, project_members){
    return (dispatch) => {
        dispatch({
            type: UPDATE_PROJECT_ATTEMPT
        });
       
        api.project.updateProject(token, project_id, project_name, project_color, project_members).then(
            (data) => {
                //directus devuelve los errores en una objeto error y los datos en uno data
                if(data.data){
                    dispatch(updateProjectSuccess(data.data));
                }                    
                else if(data.error)
                    dispatch(updateProjectError(data.error))
            }                          
        ).catch(
            (error) => {
                dispatch(updateProjectError(error));
        });
        
        
    }
}

export function deleteProject(token, project_id){
    return (dispatch) => {
        dispatch({
            type: DELETE_PROJECT_ATTEMPT
        });

        api.project.deleteProject(token, project_id).then(
            (data) => {
                //directus devuelve los errores en una objeto error y los datos en uno data
                if(data.data){
                    dispatch(deleteProjectSuccess(data.data));
                }                    
                else if(data.error)
                    dispatch(deleteProjectError(data.error))
            }                          
        ).catch(
            (error) => {
                dispatch(deleteProjectError(error));
        });
    }
}
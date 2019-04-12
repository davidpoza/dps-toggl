
import {
FETCH_PROJECTS_ATTEMPT,
FETCH_PROJECTS_FAIL,
FETCH_PROJECTS_SUCCESS,
CLEAN_PROJECT_MESSAGE,
FETCH_PROJECT_TASKS_ATTEMPT,
FETCH_PROJECT_TASKS_FAIL,
FETCH_PROJECT_TASKS_SUCCESS
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

export function fetchProjectTasksSuccess(tasks){
    return {
        type: FETCH_PROJECT_TASKS_SUCCESS,
        payload: tasks
    }
}

export function fetchProjectTasksError(error){
    return {
        type: FETCH_PROJECT_TASKS_FAIL,
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
                    return data.data.map(e=>{
                        dispatch({
                            type: FETCH_PROJECT_TASKS_ATTEMPT
                        });
                        return api.task.fetchTasksByProject(token, e.id)
                    });                    
                }                    
                else if(data.error)
                    dispatch(fetchProjectsError(data.error))
            }                          
        )
        .then((data)=>
            Promise.all(data)
        )
        .then(
            (data)=>{
                data.forEach(data=>{
                    if(data.data.length >0 ){
                        dispatch(fetchProjectTasksSuccess(data.data));
                    }                    
                    else if(data.error)
                        dispatch(fetchProjectTasksError(data.error))
                })
               
            }                              
        )      
        .catch(
            (error) => {
                dispatch(fetchProjectsError(error));
        });
    }
}


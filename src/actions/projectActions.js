
import {
FETCH_PROJECTS_ATTEMPT,
FETCH_PROJECTS_FAIL,
FETCH_PROJECTS_SUCCESS
} from './types';


import api from '../api';

/* Action creators síncronos */

/*
export function createProjectSuccess(taskData){
    return {
        type: CREATE_TASK_SUCCESS,
        payload: taskData
    }
}

export function createProjectError(error){
    return {
        type: CREATE_TASK_FAIL,
        payload: error
    }
}*/

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



/* Action creators asíncronos - thunks */
/*
export function createTask(token, desc, date_start, date_end, project_id, tags_id){
    return (dispatch) => {
        dispatch({
            type: CREATE_TASK_ATTEMPT
        });

        api.task.createTask(token, desc, date_start, date_end, project_id, tags_id).then(
            (data) => {
                //directus devuelve los errores en una objeto error y los datos en uno data
                if(data.data){
                    dispatch(createTaskSuccess(data.data));
                }                    
                else if(data.error)
                    dispatch(createTaskError(data.error))
            }                          
        ).catch(
            (error) => {
                dispatch(createTaskError(error));
        });
    }
}
*/
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


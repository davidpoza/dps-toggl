
import {
    CREATE_TASK_ATTEMPT,
    CREATE_TASK_FAIL,
    CREATE_TASK_SUCCESS,
    FETCH_TASKS_ATTEMPT,
    FETCH_TASKS_FAIL,
    FETCH_TASKS_SUCCESS
} from './types';


import api from '../api';

/* Action creators síncronos */


export function createTaskSuccess(taskData){
    return {
        type: CREATE_TASK_SUCCESS,
        payload: taskData
    }
}

export function createTaskError(error){
    return {
        type: CREATE_TASK_FAIL,
        payload: error
    }
}

export function fetchTasksSuccess(taskData){
    return {
        type: FETCH_TASKS_SUCCESS,
        payload: taskData
    }
}

export function fetchTasksError(error){
    return {
        type: FETCH_TASKS_FAIL,
        payload: error
    }
}



/* Action creators asíncronos - thunks */

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

export function fetchTasks(token){
    return (dispatch) => {
        dispatch({
            type: FETCH_TASKS_ATTEMPT
        });

        api.task.fetchTasks(token).then(
            (data) => {
                //directus devuelve los errores en una objeto error y los datos en uno data
                if(data.data){
                    dispatch(fetchTasksSuccess(data.data));
                }                    
                else if(data.error)
                    dispatch(fetchTasksError(data.error))
            }                          
        ).catch(
            (error) => {
                dispatch(fetchTasksError(error));
        });
    }
}


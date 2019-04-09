
import {
    CREATE_TASK_ATTEMPT,
    CREATE_TASK_FAIL,
    CREATE_TASK_SUCCESS,
    FETCH_TASKS_ATTEMPT,
    FETCH_TASKS_FAIL,
    FETCH_TASKS_SUCCESS,
    DELETE_TASK_ATTEMPT,
    DELETE_TASK_FAIL,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_VISUALLY,
    UPDATE_TASK_ATTEMPT,
    UPDATE_TASK_FAIL,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_VISUALLY,
    CLEAN_TASK_MESSAGE
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

export function deleteTaskSuccess(taskData){
    return {
        type: DELETE_TASK_SUCCESS,
        payload: taskData
    }
}

export function deleteTaskError(error){
    return {
        type: DELETE_TASK_FAIL,
        payload: error
    }
}

export function deleteTasksVisually(taskData){
    return {
        type: DELETE_TASK_VISUALLY,
        payload: taskData
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


export function updateTaskSuccess(taskData){
    return {
        type: UPDATE_TASK_SUCCESS,
        payload: taskData
    }
}

export function updateTaskError(error){
    return {
        type: UPDATE_TASK_FAIL,
        payload: error
    }
}

export function updateTasksVisually(taskData){
    return {
        type: UPDATE_TASK_VISUALLY,
        payload: taskData
    }
}

export function cleanMessage(){
    return {
        type: CLEAN_TASK_MESSAGE,
    }
}


/* Action creators asíncronos - thunks */

//recibimos un array de objetos tag completos y el cliente api espera solo una array de ids
export function createTask(token, desc, date, start_hour, end_hour, project_id, tags){
    let tags_id;
    if(tags!=null )
        tags_id = tags.filter((e)=>(e.checked)).map((e)=>{return e.id});
    return (dispatch) => {
        dispatch({
            type: CREATE_TASK_ATTEMPT
        });

        api.task.createTask(token, desc, date, start_hour, end_hour, project_id, tags_id).then(
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

export function deleteTask(token, task_id){
    return (dispatch) => {
        dispatch({
            type: DELETE_TASK_ATTEMPT
        });

        api.task.deleteTask(token, task_id).then(
            (data) => {
                //directus devuelve los errores en una objeto error y los datos en uno data
                if(data.data){
                    dispatch(deleteTaskSuccess(data.data));
                }                    
                else if(data.error)
                    dispatch(deleteTaskError(data.error))
            }                          
        ).catch(
            (error) => {
                dispatch(deleteTaskError(error));
        });
    }
}

//recibimos un array de objetos tag completos y el cliente api espera solo una array de ids
export function updateTask(token, task_id, description, date, start_hour, end_hour, project_id, tags){
    return (dispatch) => {
        dispatch({
            type: UPDATE_TASK_ATTEMPT
        });
       
        api.task.updateTask(token, task_id, description, date, start_hour, end_hour, project_id, tags).then(
            (data) => {
                //directus devuelve los errores en una objeto error y los datos en uno data
                if(data.data){
                    dispatch(updateTaskSuccess(data.data));
                }                    
                else if(data.error)
                    dispatch(updateTaskError(data.error))
            }                          
        ).catch(
            (error) => {
                dispatch(updateTaskError(error));
        });
        
        
    }
}

/**
 * Anida dos promesas del cliente api para realizarlas secuencialmente: updateTask y fetchTasks.
   Para cada una despacha 2 de 3 actions posibles: ATTEMPT, SUCCESS, FAIL.
 */
export function updateAndFetchTask(token, task_id, description, date, start_hour, end_hour, project_id, tags){
    return (dispatch) => {
        dispatch({
            type: UPDATE_TASK_ATTEMPT
        });
       
        api.task.updateTask(token, task_id, description, date, start_hour, end_hour, project_id, tags).then(
            (data) => {
                //directus devuelve los errores en una objeto error y los datos en uno data
                if(data.data){
                    dispatch(updateTaskSuccess(data.data));
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
                else if(data.error)
                    dispatch(updateTaskError(data.error))
            }                          
        ).catch(
            (error) => {
                dispatch(updateTaskError(error));
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


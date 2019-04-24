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
    CLEAN_TASK_MESSAGE,
    FETCH_DATES_ATTEMPT,
    FETCH_DATES_SUCCESS,
    FETCH_DATES_FAIL,
    FETCH_TASK_ATTEMPT,
    FETCH_TASK_SUCCESS,
    FETCH_TASK_FAIL,
    COLLAPSE_DATE
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

export function collapseDate(date){
    return {
        type: COLLAPSE_DATE,
        payload: date
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

export function deleteTasksVisually(task_id, task_date){
    return {
        type: DELETE_TASK_VISUALLY,
        payload: {task_id, task_date}
    }
}

export function fetchTaskSuccess(taskData){
    return {
        type: FETCH_TASK_SUCCESS,
        payload: taskData
    }
}

export function fetchTaskError(error){
    return {
        type: FETCH_TASK_FAIL,
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

export function fetchDatesError(error){
    return {
        type: FETCH_DATES_FAIL,
        payload: error
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
 * Anida dos promesas del cliente api para realizarlas secuencialmente: updateTask y fetchTask.
   Para cada una despacha 2 de 3 actions posibles: ATTEMPT, SUCCESS, FAIL.
 */
export function updateAndFetchTask(token, task_id, description, date, start_hour, end_hour, project_id, tags){
    return (dispatch) => {
        dispatch({
            type: UPDATE_TASK_ATTEMPT
        });
       
        api.task.updateTask(token, task_id, description, date, start_hour, end_hour, project_id, tags)
        .then(
            (data) => {
                //directus devuelve los errores en una objeto error y los datos en uno data
                if(data.data){
                    dispatch(updateTaskSuccess(data.data));
                    dispatch({
                        type: FETCH_TASK_ATTEMPT
                    });
                    return api.task.fetchTask(token, task_id);                   
                }                    
                else if(data.error)
                    dispatch(updateTaskError(data.error))
            }                          
        )
        .then(
            (data) => {
                //directus devuelve los errores en una objeto error y los datos en uno data
                if(data.data){
                    dispatch(fetchTaskSuccess(data.data));
                }                    
                else if(data.error)
                    dispatch(fetchTaskError(data.error))
            }                          
        ).catch(
            (error) => {
                dispatch(updateTaskError(error));
        });
    }
}


/** Consulta todas las fechas distintas usango gruopby
 * y luego encadena una consulta de las tasks para cada una de ellas.
 * Devuelve un array de objetos {date:string, tasks:array de objetos task}
 */
export function fetchTasks(token, user_id){
    return (dispatch) => {
        dispatch({
            type: FETCH_DATES_ATTEMPT
        });

        api.task.fetchAllDates(token, user_id)
        .then(
            (data) => {
                //directus devuelve los errores en una objeto error y los datos en uno data
                if(data.data){
                    dispatch({
                        type: FETCH_DATES_SUCCESS
                    });
                    return data.data.map((e)=>{                        
                        dispatch({
                            type: FETCH_TASKS_ATTEMPT
                        });
                        return api.task.fetchTasksByDate(token, e.date, user_id)
                    });
                }                    
                else if(data.error)
                    dispatch(fetchDatesError(data.error))
            }                          
        )
        .then((data)=>
            Promise.all(data)
        )
        .then(
            (data)=>{
                //aqui no controlo errores porque van dentro de cada fecha
                //tendria que buscar la propiedad error en cada una de ellas...
                dispatch(fetchTasksSuccess(data));

            }                              
        )        
        .catch(
            (error) => {
                dispatch(fetchTasksError(error));
        });
    }
}


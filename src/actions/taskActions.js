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
    FETCH_TASK_ATTEMPT,
    FETCH_TASK_SUCCESS,
    FETCH_TASK_FAIL,
    COLLAPSE_DATE,
    UPDATE_DATE_VISUALLY,
    LOAD_MORE_TASKS,
    RESET_LIMIT
} from "./types";

import api from "../api";


/* Action creators síncronos */


export function createTaskSuccess(taskData){
    return {
        type: CREATE_TASK_SUCCESS,
        payload: taskData
    };
}

export function createTaskError(error){
    return {
        type: CREATE_TASK_FAIL,
        payload: error
    };
}

export function collapseDate(date){
    return {
        type: COLLAPSE_DATE,
        payload: date
    };
}

export function deleteTaskSuccess(taskData){
    return {
        type: DELETE_TASK_SUCCESS,
        payload: taskData
    };
}

export function deleteTaskError(error){
    return {
        type: DELETE_TASK_FAIL,
        payload: error
    };
}

export function deleteTasksVisually(task_id, task_date){
    return {
        type: DELETE_TASK_VISUALLY,
        payload: {task_id, task_date}
    };
}

export function fetchTaskSuccess(taskData){
    return {
        type: FETCH_TASK_SUCCESS,
        payload: taskData
    };
}

export function fetchTaskError(error){
    return {
        type: FETCH_TASK_FAIL,
        payload: error
    };
}

export function fetchTasksSuccess(taskData){
    return {
        type: FETCH_TASKS_SUCCESS,
        payload: taskData
    };
}

export function fetchTasksError(error){
    return {
        type: FETCH_TASKS_FAIL,
        payload: error
    };
}

export function loadMore(inc){
    return {
        type: LOAD_MORE_TASKS,
        payload: inc
    };
}

export function resetLimit(){
    return {
        type: RESET_LIMIT
    };
}


export function updateTaskSuccess(taskData){
    return {
        type: UPDATE_TASK_SUCCESS,
        payload: taskData
    };
}

export function updateTaskError(error){
    return {
        type: UPDATE_TASK_FAIL,
        payload: error
    };
}

export function updateTasksVisually(taskData){
    return {
        type: UPDATE_TASK_VISUALLY,
        payload: taskData
    };
}

export function cleanMessage(){
    return {
        type: CLEAN_TASK_MESSAGE,
    };
}



export function updateDateVisually(date, tasks_entities){
    return {
        type: UPDATE_DATE_VISUALLY,
        payload: {date, tasks_entities}
    };
}

/* Action creators asíncronos - thunks */

//recibimos un array de objetos tag completos y el cliente api espera solo una array de ids
export function createTask(token, desc, date, start_hour, end_hour, project_id, tags, hour_value, user_id){
    let tags_id;
    if(tags!=null )
        tags_id = tags.filter((e)=>(e.checked)).map((e)=>{return e._id;});
    return (dispatch) => {
        dispatch({
            type: CREATE_TASK_ATTEMPT
        });

        api.task.createTask(token, desc, date, start_hour, end_hour, project_id, tags_id, hour_value, user_id).then(
            (data) => {
                if(data.data){
                    dispatch(createTaskSuccess(data.data));
                }
                else if(data.error)
                    dispatch(createTaskError(data.error));
            }
        ).catch(
            (error) => {
                dispatch(createTaskError(error));
            });
    };
}

export function deleteTask(token, task_id){
    return (dispatch) => {
        dispatch({
            type: DELETE_TASK_ATTEMPT
        });

        api.task.deleteTask(token, task_id).then(
            (data) => {
                if(data.data){
                    dispatch(deleteTaskSuccess(data.data));
                }
                else if(data.error)
                    dispatch(deleteTaskError(data.error));
            }
        ).catch(
            (error) => {
                dispatch(deleteTaskError(error));
            });
    };
}

//recibimos un array de objetos tag completos y el cliente api espera solo una array de ids
export function updateTask(token, task_id, description, date, start_hour, end_hour, hour_value, project_id, add_tags, delete_tags){
    return (dispatch) => {
        dispatch({
            type: UPDATE_TASK_ATTEMPT
        });

        api.task.updateTask(token, task_id, description, date, start_hour, end_hour, hour_value, project_id, add_tags, delete_tags).then(
            (data) => {
                if(data.data){
                    dispatch(updateTaskSuccess(data.data));
                }
                else if(data.error)
                    dispatch(updateTaskError(data.error));
            }
        ).catch(
            (error) => {
                dispatch(updateTaskError(error));
            });


    };
}

/**
 * Anida dos promesas del cliente api para realizarlas secuencialmente: updateTask y fetchTask.
   Para cada una despacha 2 de 3 actions posibles: ATTEMPT, SUCCESS, FAIL.
 */
export function updateAndFetchTask(token, task_id, description, date, start_hour, end_hour, hour_value, project_id, add_tags, delete_tags){
    return (dispatch) => {
        dispatch({
            type: UPDATE_TASK_ATTEMPT
        });

        api.task.updateTask(token, task_id, description, date, start_hour, end_hour, hour_value, project_id, add_tags, delete_tags)
            .then(
                (data) => {
                    if(data.data){
                        dispatch(updateTaskSuccess(data.data));
                        dispatch({
                            type: FETCH_TASK_ATTEMPT
                        });
                        return api.task.fetchTask(token, task_id);
                    }
                    else if(data.error)
                        dispatch(updateTaskError(data.error));
                }
            )
            .then(
                (data) => {
                    if(data.data){
                        dispatch(fetchTaskSuccess(data.data));
                    }
                    else if(data.error)
                        dispatch(fetchTaskError(data.error));
                }
            ).catch(
                (error) => {
                    dispatch(updateTaskError(error));
                });
    };
}

/**
 * Anida dos promesas del cliente api para realizarlas secuencialmente: updateTask y fetchTasks.
   Para cada una despacha 2 de 3 actions posibles: ATTEMPT, SUCCESS, FAIL.
 */
export function updateAndFetchTasks(token, task_id, description, date, start_hour, end_hour, hour_value, project_id, add_tags, delete_tags, limit){
    return (dispatch) => {
        dispatch({
            type: UPDATE_TASK_ATTEMPT
        });

        api.task.updateTask(token, task_id, description, date, start_hour, end_hour, hour_value, project_id, add_tags, delete_tags)
            .then(
                (data) => {
                    if(data.data){
                        dispatch(updateTaskSuccess(data.data));
                        this.fetchTasks(token, limit);
                    }
                    else if(data.error)
                        dispatch(updateTaskError(data.error));
                }
            )
            .catch(
                (error) => {
                    dispatch(updateTaskError(error));
                });
    };
}


/** Consulta todas las fechas distintas usango gruopby
 * y luego encadena una consulta de las tasks para cada una de ellas.
 * Devuelve un array de objetos {date:string, tasks:array de objetos task}
 */
export function fetchTasks(token, limit){
    return (dispatch) => {
        dispatch({
            type: FETCH_TASKS_ATTEMPT
        });

        api.task.fetchTasks(token, limit, 0, null, null, null, null, null, null)
            .then((data) => dispatch(fetchTasksSuccess(data.data)))
            .catch((error) => dispatch(fetchTasksError(error)));
    };
}


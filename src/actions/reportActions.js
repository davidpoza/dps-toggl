import {
    REPORT_FETCH_TASKS_ATTEMPT,
    REPORT_FETCH_TASKS_FAIL,
    REPORT_FETCH_TASKS_SUCCESS,
    REPORT_CHANGE_FILTERS,
    REPORT_DELETE_TASK_ATTEMPT,
    REPORT_DELETE_TASK_FAIL,
    REPORT_DELETE_TASK_SUCCESS,
    REPORT_DELETE_TASK_VISUALLY,
    REPORT_UPDATE_TASK_ATTEMPT,
    REPORT_UPDATE_TASK_FAIL,
    REPORT_UPDATE_TASK_SUCCESS,
    REPORT_UPDATE_TASK_VISUALLY,
    REPORT_FETCH_TASK_ATTEMPT,
    REPORT_FETCH_TASK_FAIL,
    REPORT_FETCH_TASK_SUCCESS,
    REPORT_COLLAPSE_DATE,
    REPORT_UPDATE_DATE_VISUALLY,
} from "./types";

import api from "../api";
import utils from "../utils";


/* Action creators síncronos */


export function collapseDate(date){
    return {
        type: REPORT_COLLAPSE_DATE,
        payload: date
    };
}

export function deleteTaskSuccess(taskData){
    return {
        type: REPORT_DELETE_TASK_SUCCESS,
        payload: taskData
    };
}

export function deleteTaskError(error){
    return {
        type: REPORT_DELETE_TASK_FAIL,
        payload: error
    };
}

export function deleteTasksVisually(task_id, task_date){
    return {
        type: REPORT_DELETE_TASK_VISUALLY,
        payload: {task_id, task_date}
    };
}

export function fetchTaskSuccess(taskData){
    return {
        type: REPORT_FETCH_TASK_SUCCESS,
        payload: taskData
    };
}

export function fetchTaskError(error){
    return {
        type: REPORT_FETCH_TASK_FAIL,
        payload: error
    };
}

export function fetchTasksSuccess(taskData){
    return {
        type: REPORT_FETCH_TASKS_SUCCESS,
        payload: taskData
    };
}

export function fetchTasksError(error){
    return {
        type: REPORT_FETCH_TASKS_FAIL,
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
        type: REPORT_UPDATE_TASK_SUCCESS,
        payload: taskData
    };
}

export function updateTaskError(error){
    return {
        type: REPORT_UPDATE_TASK_FAIL,
        payload: error
    };
}

export function updateTasksVisually(taskData){
    return {
        type: REPORT_UPDATE_TASK_VISUALLY,
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
        type: REPORT_UPDATE_DATE_VISUALLY,
        payload: {date, tasks_entities}
    };
}

export function changeFilters(date_start, date_end, date_preset){
    return {
        type: REPORT_CHANGE_FILTERS,
        payload: {date_start, date_end, date_preset}
    };
}



export function deleteTask(token, task_id){
    return (dispatch) => {
        dispatch({
            type: REPORT_DELETE_TASK_ATTEMPT
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
export function updateTask(token, task_id, description, date, start_hour, end_hour, project_id, add_tags, delete_tags){
    return (dispatch) => {
        dispatch({
            type: REPORT_UPDATE_TASK_ATTEMPT
        });

        api.task.updateTask(token, task_id, description, date, start_hour, end_hour, project_id, add_tags, delete_tags).then(
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
            type: REPORT_UPDATE_TASK_ATTEMPT
        });

        api.task.updateTask(token, task_id, description, date, start_hour, end_hour, hour_value, project_id, add_tags, delete_tags)
            .then(
                (data) => {
                    if(data.data){
                        dispatch(updateTaskSuccess(data.data));
                        dispatch({
                            type: REPORT_FETCH_TASK_ATTEMPT
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
export function updateAndFetchTasks(token, task_id, description, date, start_hour, end_hour, hour_value, project_id, add_tags, delete_tags, limit, skip){
    return (dispatch) => {
        dispatch({
            type: REPORT_UPDATE_TASK_ATTEMPT
        });

        api.task.updateTask(token, task_id, description, date, start_hour, end_hour, hour_value, project_id, add_tags, delete_tags)
            .then(
                (data) => {
                    if(data.data){
                        dispatch(updateTaskSuccess(data.data));
                        this.fetchTasks(token, limit, skip, date_start, date_end, user_id, project_id, tags_ids, description);
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


export function fetchTasks(token, limit, skip, date_start, date_end, user_ids, project_ids, tags_ids, description){
    let date_start_std = date_start? utils.standarizeDate(date_start):null;
    let date_end_std = date_end? utils.standarizeDate(date_end):null;

    return (dispatch) => {
        dispatch({
            type: REPORT_FETCH_TASKS_ATTEMPT
        });

        api.task.fetchTasks(token, limit, skip, date_start_std, date_end_std, user_ids, project_ids, tags_ids, description)
            .then((data) => {
            //also fetch all projects and all tags
                Promise.all([api.project.fetchProjects(token), api.tag.fetchTags(token)])
                    .then(projectsandtags=>{
                        data.data.projects = projectsandtags[0].data;
                        data.data.tags = projectsandtags[1].data;
                        dispatch(fetchTasksSuccess(data.data));
                    });
            })
            .catch((error) => dispatch(fetchTasksError(error)));
    };
}


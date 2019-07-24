
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
    UPDATE_PROJECT_SUCCESS,
    CHANGE_PROJECT_SORT
} from "./types";


import api from "../api";
import * as userActions from "./userActions";


/* Action creators síncronos */


export function fetchProjectsSuccess(projectData){
    return {
        type: FETCH_PROJECTS_SUCCESS,
        payload: projectData
    };
}

export function fetchProjectsError(error){
    return {
        type: FETCH_PROJECTS_FAIL,
        payload: error
    };
}

export function fetchProjectSuccess(projectData){
    return {
        type: FETCH_PROJECT_SUCCESS,
        payload: projectData
    };
}

export function fetchProjectError(error){
    return {
        type: FETCH_PROJECT_FAIL,
        payload: error
    };
}

export function deleteProjectSuccess(projectData){
    return {
        type: DELETE_PROJECT_SUCCESS,
        payload: projectData
    };
}

export function deleteProjectError(error){
    return {
        type: DELETE_PROJECT_FAIL,
        payload: error
    };
}

export function updateProjectSuccess(taskData){
    return {
        type: UPDATE_PROJECT_SUCCESS,
        payload: taskData
    };
}

export function updateProjectError(error){
    return {
        type: UPDATE_PROJECT_FAIL,
        payload: error
    };
}

export function createProjectSuccess(projectData){
    return {
        type: CREATE_PROJECT_SUCCESS,
        payload: projectData
    };
}

export function createProjectError(error){
    return {
        type: CREATE_PROJECT_FAIL,
        payload: error
    };
}

export function cleanMessage(){
    return {
        type: CLEAN_PROJECT_MESSAGE,
    };
}

export function changeSort(field){
    return {
        type: CHANGE_PROJECT_SORT,
        payload: {field}
    };
}

/* Action creators asíncronos - thunks */


/**
 *
 En este action creator necesitamos hacer dos llamadas a la api, aunque no sea del mismo reducer.
 Estamos operando con el reducer project y tengo que llamar a un action de user que opera con userReducer.
 Pero necesito garantizarme tener la lista de usuarios para el dropdown. No puedo asumir que vendrá cargado de la
 navegación anterior que hizo el usuario ni tampoco quiero meterlo en el action login.
 Lo llamo aquí porque lo necesito aquí.
 */
export function fetchProjectById(token, project_id, user_id){
    return (dispatch) => {
        dispatch({
            type: FETCH_PROJECT_ATTEMPT
        });

        api.project.fetchProjectById(token, project_id).then(
            (data) => {
                if(data.data){
                    dispatch(fetchProjectSuccess(data.data));
                    return api.user.fetchUsers(token);
                }
                else if(data.error)
                    dispatch(fetchProjectError(data.error));
            }
        )
            .then(
                (data) =>{
                    if(data.data){
                        dispatch(userActions.fetchUsersSuccess(data.data));
                    }
                    else if(data.error)
                        dispatch(fetchProjectError(data.error));
                }
            )
            .catch(
                (error) => {
                    dispatch(fetchProjectsError(error));
                });
    };
}

/**
 * Devuelve los proyectos de los que somos propietarios y aquellos en los que somos miembros
 */
export function fetchUserProjects(token){
    return (dispatch) => {
        dispatch({
            type: FETCH_PROJECTS_ATTEMPT
        });

        api.project.fetchUserProjects(token).then(
            (data) => {
                if(data.data){
                    dispatch(fetchProjectsSuccess(data.data));
                }
                else if(data.error)
                    dispatch(fetchProjectsError(data.error));
            }
        )
            .catch(
                (error) => {
                    dispatch(fetchProjectsError(error));
                });
    };
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
                    dispatch(createProjectError(data.error));
            }
        )
            .catch(
                (error) => {
                    dispatch(fetchProjectsError(error));
                });
    };
}

export function updateProject(token, project_id, project_name, project_color, add_members, delete_members){
    return (dispatch) => {
        dispatch({
            type: UPDATE_PROJECT_ATTEMPT
        });

        api.project.updateProject(token, project_id, project_name, project_color, add_members, delete_members).then(
            (data) => {
                if(data.data){
                    dispatch(updateProjectSuccess(data.data));
                }
                else if(data.error)
                    dispatch(updateProjectError(data.error));
            }
        ).catch(
            (error) => {
                dispatch(updateProjectError(error));
            });


    };
}

export function deleteProject(token, project_id){
    return (dispatch) => {
        dispatch({
            type: DELETE_PROJECT_ATTEMPT
        });
        return api.project.deleteProject(token, project_id)
            .then(
                (data) => {
                    if(data.data){
                        dispatch(deleteProjectSuccess(data.data));
                    }
                    else if(data.error)
                        dispatch(deleteProjectError(data.error));
                }
            ).catch(
                (error) => {
                    dispatch(deleteProjectError(error));
                });
    };
}
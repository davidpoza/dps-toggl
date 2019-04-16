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
    FETCH_DATES_FAIL,
    FETCH_DATES_SUCCESS,
    FETCH_TASK_ATTEMPT,
    FETCH_TASK_FAIL,
    FETCH_TASK_SUCCESS,
    COLLAPSE_DATE
} from '../actions/types';

import initialState from './initialState';



export default function taskReducer (state = initialState.taskReducer, action){
    switch(action.type){
        case CREATE_TASK_ATTEMPT:        
            return {//vamos a extender una objeto vacio con una copia del estado con el spread operator, es como usar Object.assign
                ...state,
                loading: true,
                need_refreshing: false,
                error: {}
            }
        case CREATE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                need_refreshing: true,
                error: {}
            }
        case CREATE_TASK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_TASK_ATTEMPT:        
            return {
                ...state,
                loading: true,
                need_refreshing: false,
                error: {}
            }
        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                //need_refreshing: true, no vamos a volver a pedir la lista de tareas sino que vamos a borrar visualmente el elemento
                error: {}
            }
        case DELETE_TASK_VISUALLY:
            return {
                ...state,
                loading: false,
                tasks: action.payload,
                error: {}
            }
        case DELETE_TASK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_TASK_ATTEMPT:        
            return {
                ...state,
                loading: true,
                need_refreshing: false,
                error: {}
            }
        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                //need_refreshing: true, no vamos a volver a pedir la lista de tareas sino que vamos a borrar visualmente el elemento
                error: {}
            }
        case UPDATE_TASK_VISUALLY:
            return {
                ...state,
                loading: false,
                tasks: action.payload,
                error: {}
            }
        case UPDATE_TASK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case FETCH_TASK_ATTEMPT:
            return {
                ...state,
                loading: true,
                error: {}
            }
        case FETCH_TASK_SUCCESS:
            //buscamos actualizar solo el task indicado
            let tasks_updated_task = [...state.tasks].map(e=>{
                e.tasks = e.tasks.map(task=>{
                    if(task.id == action.payload.id){
                        task = action.payload
                    }
                    return task;
                })
                return e;
            });
            return {
                ...state,
                loading: false,
                tasks: tasks_updated_task,
                need_refreshing: false
            }
        case FETCH_TASK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case FETCH_TASKS_ATTEMPT:
            return {
                ...state,
                loading: true,
                //tasks: [],
                error: {}
            }
        case FETCH_TASKS_SUCCESS:
            //hay que ordenar los bloques de dates ya que van llegando de forma asíncrona
            let array_tasks = action.payload.sort((a,b)=>{
                if(a.date < b.date) return 1
                else if(a.date > b.date) return -1
                else return 0
            });
            return {
                ...state,
                loading: false,
                tasks: array_tasks,
                need_refreshing: false
            }
        case FETCH_TASKS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case FETCH_DATES_ATTEMPT:
            return {
                ...state,
                loading: true,
                error: {}
            }
        case FETCH_DATES_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case FETCH_DATES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAN_TASK_MESSAGE:
            return {
                ...state,
                error: {}
            }
        case COLLAPSE_DATE:
            return {
                ...state,
                tasks: state.tasks.map((e,index)=>{if(index==action.payload) e.collapsed=e.collapsed?false:true; return e;})
            }
        default:
            return state;
    }
}
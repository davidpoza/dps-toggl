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
import {normalize} from 'normalizr';
import * as schemas from './normalizr';

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
                error: {}
            }
        case UPDATE_TASK_SUCCESS:
            //let new_tasks_entities = Object.assign({}, state.tasks_entities);
            //new_tasks_entities[action.payload.id] = Object.assign(new_tasks_entities[action.payload.id],action.payload);
            return {
                ...state,
                //task_entitites: new_tasks_entities,
                loading: false,
                //need_refreshing: true, no vamos a volver a pedir la lista de tareas sino que vamos a borrar visualmente el elemento
                error: {}
            }
        case UPDATE_TASK_VISUALLY:
            return {
                ...state,
                loading: false,
                tasks_entities: action.payload,
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
            action.payload = normalize(action.payload, schemas.taskEntity);
            let new_tasks_entities = Object.assign({}, state.tasks_entities);
            new_tasks_entities[action.payload.result] = action.payload.entities.tasks[action.payload.result];
            let new_tasks_tags_entities = Object.assign({}, state.tasks_tags_entities);
            if(action.payload.entities.tasks[action.payload.result].tags.length > state.tasks_entities[action.payload.result].tags.length){ //se añade un tag
                //hay que añadir la relacion nueva al array de tasks_tags
                new_tasks_tags_entities = Object.assign(new_tasks_tags_entities, action.payload.entities.tags);
            }
            else{ //se borra el tag ¿cómo saber cual hay que borrar?
                new_tasks_entities[action.payload.result].tags.map(e=>{
                    if(!action.payload.entities.tasks[action.payload.result].tags.includes(e))
                        delete new_tasks_tags_entities[e];
                });                
            }
            return {
                ...state,
                loading: false,
                tasks_entities: new_tasks_entities,
                tasks_tags_entities: new_tasks_tags_entities,
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
            /*let array_tasks = action.payload.result.sort((a,b)=>{
                if(a.date < b.date) return 1
                else if(a.date > b.date) return -1
                else return 0
            });*/
            action.payload = normalize(action.payload, schemas.dateSchema);
            return {
                ...state,
                loading: false,
                dates_entities: action.payload.entities.dates,
                dates_id: action.payload.result,
                tasks_entities: action.payload.entities.tasks,
                tasks_tags_entities: action.payload.entities.tags,
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
            let new_dates_entities = Object.assign({},state.dates_entities);
            new_dates_entities[action.payload].collapsed=new_dates_entities[action.payload].collapsed?false:true
            return {
                ...state,
                dates_entities: new_dates_entities
            }
        default:
            return state;
    }
}
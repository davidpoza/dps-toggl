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
    FETCH_TASK_FAIL,
    FETCH_TASK_SUCCESS,
    COLLAPSE_DATE,
    LOGOUT_USER,
    UPDATE_DATE_VISUALLY,
    LOAD_MORE_TASKS,
    RESET_LIMIT
} from "../actions/types";

import utils from "../utils";
import {normalize} from "normalizr";
import * as schemas from "./normalizr";

import initialState from "./initialState";



export default function taskReducer (state = initialState.taskReducer, action){
    switch(action.type){
    case LOAD_MORE_TASKS: {
        return {
            ...state,
            timer_section_load_limit: state.timer_section_load_limit + action.payload
        };
    }
    case RESET_LIMIT: {
        return {
            ...state,
            timer_section_load_limit: 7
        };
    }
    case CREATE_TASK_ATTEMPT:
    {
        return {//vamos a extender una objeto vacio con una copia del estado con el spread operator, es como usar Object.assign
            ...state,
            loading: true,
            need_refreshing: false,
            error: {}
        };
    }
    case CREATE_TASK_SUCCESS:{
        return {
            ...state,
            loading: false,
            need_refreshing: true,
            error: {}
        };
    }
    case CREATE_TASK_FAIL: {
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    }
    case DELETE_TASK_ATTEMPT: {
        return {
            ...state,
            loading: true,
            need_refreshing: false,
            error: {}
        };
    }
    case DELETE_TASK_SUCCESS: {
        return {
            ...state,
            loading: false,
            error: {}
        };
    }
    case DELETE_TASK_VISUALLY: {
        let new_dates_entities_deleted = Object.assign({}, state.dates_entities);
        let new_tasks_entities_deleted = Object.assign({}, state.tasks_entities);
        new_dates_entities_deleted[action.payload.task_date].tasks = new_dates_entities_deleted[action.payload.task_date].tasks.filter(t=>(t!=action.payload.task_id));
        delete new_tasks_entities_deleted[action.payload.task_id];

        //recalculamos el total de horas de la fecha afectada por el borrado de la tarea
        new_dates_entities_deleted[action.payload.task_date].time = new_dates_entities_deleted[action.payload.task_date].tasks.reduce((prev,curr)=>{
            curr = utils.diffHoursBetHours(state.tasks_entities[curr].start_hour, state.tasks_entities[curr].end_hour);
            return (prev+curr);
        },0);

        return {
            ...state,
            loading: false,
            dates_entities: new_dates_entities_deleted,
            tasks_entities: new_tasks_entities_deleted,
            error: {}
        };
    }
    case DELETE_TASK_FAIL: {
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    }
    case UPDATE_TASK_ATTEMPT: {
        return {
            ...state,
            loading: true,
            error: {}
        };
    }
    case UPDATE_TASK_SUCCESS: {
        return {
            ...state,
            loading: false,
            error: {}
        };
    }
    case UPDATE_TASK_VISUALLY: {
        action.payload = normalize(action.payload, [schemas.taskEntity]);
        return {

            ...state,
            loading: false,
            tasks_entities: action.payload.entities.tasks,
            //project_entities: action.payload.entities.projects,
            error: {}
        };
    }
    case UPDATE_TASK_FAIL: {
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    }
    case FETCH_TASK_ATTEMPT: {
        return {
            ...state,
            loading: true,
            error: {}
        };
    }
    case FETCH_TASK_SUCCESS: {
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
            projects_entities: Object.assign(action.payload.entities.projects || {}, state.projects_entities),
            need_refreshing: false
        };
    }
    case FETCH_TASK_FAIL: {
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    }
    case FETCH_TASKS_ATTEMPT: {
        return {
            ...state,
            loading: true,
            //tasks: [],
            error: {}
        };
    }
    case FETCH_TASKS_SUCCESS: {
        let total_tasks = action.payload.total;
        action.payload = normalize(action.payload.dates, schemas.dateSchema);

        //el flag collapsed debe mantenerse en el valor que tuviera en el estado
        if(state.dates_entities)
            Object.keys(state.dates_entities).forEach(key=>{
                if(state.dates_entities[key].collapsed)
                    action.payload.entities.dates[key].collapsed = true;
            });
        return {
            ...state,
            loading: false,
            dates_entities: action.payload.entities.dates,
            dates_id: action.payload.result,
            tasks_entities: action.payload.entities.tasks,
            tasks_tags_entities: action.payload.entities.tags,
            projects_entities: action.payload.entities.projects,
            total_tasks: total_tasks,
            need_refreshing: false
        };
    }
    case FETCH_TASKS_FAIL: {
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    }
    case CLEAN_TASK_MESSAGE: {
        return {
            ...state,
            error: {}
        };
    }
    case COLLAPSE_DATE: {
        let new_dates_entities = Object.assign({},state.dates_entities);
        new_dates_entities[action.payload].collapsed=new_dates_entities[action.payload].collapsed?false:true;
        return {
            ...state,
            dates_entities: new_dates_entities
        };
    }
    case UPDATE_DATE_VISUALLY: {
        let new_dates_entities_updated_time = Object.assign({},state.dates_entities);
        let tasks = new_dates_entities_updated_time[action.payload.date].tasks.map(t=>action.payload.tasks_entities[t]);
        new_dates_entities_updated_time[action.payload.date].time = tasks.reduce((prev,curr)=>{
            curr = utils.diffHoursBetHours(curr?curr.start_hour:"00:00:00", curr?curr.end_hour:"00:00:00");
            return(prev+curr);
        },0);
        return {
            ...state,
            dates_entities: new_dates_entities_updated_time
        };
    }
    case LOGOUT_USER: {
        return {
            ...initialState.taskReducer
        };
    }
    default:
        return state;
    }
}
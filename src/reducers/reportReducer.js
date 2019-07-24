import {
    REPORT_FETCH_TASKS_ATTEMPT,
    REPORT_FETCH_TASKS_FAIL,
    REPORT_FETCH_TASKS_SUCCESS,
    REPORT_DELETE_TASK_ATTEMPT,
    REPORT_DELETE_TASK_FAIL,
    REPORT_DELETE_TASK_SUCCESS,
    REPORT_DELETE_TASK_VISUALLY,
    REPORT_UPDATE_TASK_ATTEMPT,
    REPORT_UPDATE_TASK_FAIL,
    REPORT_UPDATE_TASK_SUCCESS,
    REPORT_UPDATE_TASK_VISUALLY,
    REPORT_CLEAN_TASK_MESSAGE,
    REPORT_FETCH_TASK_ATTEMPT,
    REPORT_FETCH_TASK_FAIL,
    REPORT_FETCH_TASK_SUCCESS,
    REPORT_COLLAPSE_DATE,
    REPORT_UPDATE_DATE_VISUALLY,
    REPORT_LOAD_MORE_TASKS,
    REPORT_RESET_LIMIT,
    LOGOUT_USER,
    REPORT_CHANGE_FILTERS
} from "../actions/types";

import utils from "../utils";
import {normalize} from "normalizr";
import * as schemas from "./normalizr";

import initialState from "./initialState";


export default function reportReducer (state = initialState.reportReducer, action){
    switch(action.type){
    case REPORT_LOAD_MORE_TASKS: {
        return {
            ...state,
            timer_section_load_limit: state.timer_section_load_limit + action.payload
        };
    }
    case REPORT_RESET_LIMIT: {
        return {
            ...state,
            timer_section_load_limit: 7
        };
    }
    case REPORT_DELETE_TASK_ATTEMPT: {
        return {
            ...state,
            loading: true,
            need_refreshing: false,
            error: {}
        };
    }
    case REPORT_DELETE_TASK_SUCCESS: {
        return {
            ...state,
            loading: false,
            error: {}
        };
    }
    case REPORT_DELETE_TASK_VISUALLY: {
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
    case REPORT_DELETE_TASK_FAIL: {
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    }
    case REPORT_UPDATE_TASK_ATTEMPT: {
        return {
            ...state,
            loading: true,
            error: {}
        };
    }
    case REPORT_UPDATE_TASK_SUCCESS: {
        return {
            ...state,
            loading: false,
            error: {}
        };
    }
    case REPORT_UPDATE_TASK_VISUALLY: {
        return {
            ...state,
            loading: false,
            tasks_entities: action.payload,
            error: {}
        };
    }
    case REPORT_UPDATE_TASK_FAIL: {
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    }
    case REPORT_FETCH_TASK_ATTEMPT: {
        return {
            ...state,
            loading: true,
            error: {}
        };
    }
    case REPORT_FETCH_TASK_SUCCESS: {
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
        };
    }
    case REPORT_FETCH_TASK_FAIL: {
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    }
    case REPORT_FETCH_TASKS_ATTEMPT: {
        return {
            ...state,
            loading: true,
            //tasks: [],
            error: {}
        };
    }
    case REPORT_FETCH_TASKS_SUCCESS: {
        let total_results = action.payload.total;
        let all_projects = action.payload.projects;
        let all_tags = action.payload.tags;
        action.payload = normalize(action.payload.dates, schemas.dateSchema);
        all_tags = normalize(all_tags, schemas.tagsSchema);
        all_projects = normalize(all_projects, schemas.projectsSchema);
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
            tags_entities: all_tags.entities.tags, //aquí cargaremos los tags de todos los usuarios
            tags_id: all_tags.result,
            projects_entities: all_projects.entities.projects, //aquí cargaremos los projects de todos los usuarios
            projects_id: all_projects.result,
            // tasks_tags_entities: action.payload.entities.tags,
            total_results: total_results,
            need_refreshing: false
        };
    }
    case REPORT_FETCH_TASKS_FAIL: {
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    }
    case REPORT_CLEAN_TASK_MESSAGE: {
        return {
            ...state,
            error: {}
        };
    }
    case REPORT_COLLAPSE_DATE: {
        let new_dates_entities = Object.assign({},state.dates_entities);
        new_dates_entities[action.payload].collapsed=new_dates_entities[action.payload].collapsed?false:true;
        return {
            ...state,
            dates_entities: new_dates_entities
        };
    }
    case REPORT_UPDATE_DATE_VISUALLY: {
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
    case REPORT_CHANGE_FILTERS: {
        return {
            ...state,
            preset: action.payload.date_preset,
            date_start: action.payload.date_start,
            date_end: action.payload.date_end,
        };
    }
    case LOGOUT_USER: {
        return {
            ...initialState.reportReducer
        };
    }
    default:
        return state;
    }
}
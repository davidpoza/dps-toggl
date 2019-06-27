import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_ATTEMPT,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_ATTEMPT,
    LOGOUT_USER,
    REFRESH_TOKEN_ATTEMPT,
    REFRESH_TOKEN_FAIL,
    REFRESH_TOKEN_SUCCESS,
    CLEAN_USER_MESSAGE,
    FETCH_USERS_ATTEMPT,
    FETCH_USERS_FAIL,
    FETCH_USERS_SUCCESS,
    UPDATE_USER_ATTEMPT,
    UPDATE_USER_FAIL,
    UPDATE_USER_SUCCESS,
    FETCH_USER_ATTEMPT,
    FETCH_USER_FAIL,
    FETCH_USER_SUCCESS,
    DELETE_USER_ATTEMPT,
    DELETE_USER_FAIL,
    DELETE_USER_SUCCESS,
    CHANGE_USER_SORT
} from '../actions/types';

import initialState from './initialState';
import {normalize} from 'normalizr';
import * as schemas from './normalizr';

export default function userReducer (state = initialState.userReducer, action){
    switch(action.type){
        case LOGIN_USER_ATTEMPT:
        //vamos a crear una copia del estado, es como usar Object.assign
            return {
                ...state,
                loading: true,
                error: {}
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                id: action.payload._id,
                token: action.payload.token,
                email: action.payload.email,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                avatar: action.payload.avatar,
                admin: action.payload.admin,
                created_on: action.payload.created_on,
                updated_on: action.payload.updated_on,
                loading: false,
                error: {}
            }
        case LOGIN_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case REGISTER_USER_ATTEMPT:
                return {
                    ...state,
                    loading: true,
                    error: {}
                }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: {}
            }
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case LOGOUT_USER:
            return {
                ...initialState.userReducer
            }
        case REFRESH_TOKEN_ATTEMPT:
            return {
                ...state,
                error: {}
            }
        case REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                error: {}
            }
        case REFRESH_TOKEN_FAIL:
            return {
                ...state,
                token: null,
                error: action.payload
            }
        case FETCH_USERS_ATTEMPT:
            return {
                ...state,
                loading: true,
                error: {}
            }
        case FETCH_USERS_SUCCESS:
            action.payload = normalize(action.payload, schemas.usersSchema);
            return {
                ...state,
                loading: false,
                users_id: action.payload.result,
                users_entities: action.payload.entities.users,
                error: {}
            }
        case FETCH_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAN_USER_MESSAGE:
            return {
                ...state,
                error: {}
            }
        case CHANGE_USER_SORT:
            return {
                ...state,
                sortBy: action.payload.field,
                order: state.order=="asc"?"desc":"asc"
            }
        case UPDATE_USER_ATTEMPT:
            return {
                ...state,
                loading: true,
                error: {},
                need_refreshing: false
            }
        case UPDATE_USER_SUCCESS:
            action.payload = normalize(action.payload, schemas.userEntity);
            if(action.payload.result == state.id) //si estamos actualizando nuestro perfil
                return {
                    ...state,
                    loading: false,
                    first_name: action.payload.entities.users[action.payload.result].first_name,
                    updated_on: action.payload.entities.users[action.payload.result].updated_on,
                    avatar: action.payload.entities.users[action.payload.result].avatar,
                    error: {},
                    need_refreshing: true
                }
            else{
                let new_users_entities = Object.assign({},state.users_entities);
                new_users_entities[action.payload.result] = action.payload.entities.users[action.payload.result];
                return {
                    ...state,
                    loading: false,
                    users_entities: new_users_entities,
                    error: {}
                }
            }
        case UPDATE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case FETCH_USER_ATTEMPT:
            return {
                ...state,
                loading: true,
                error: {}
            }
        case FETCH_USER_SUCCESS:
            action.payload = normalize(action.payload, schemas.userEntity);
            if(action.payload.result == state.id){ //si estamos haciendo fetch a nuestro perfil
                return {
                    ...state,
                    loading: false,
                    avatar: action.payload.entities.users[action.payload.result].avatar,
                    first_name: action.payload.entities.users[action.payload.result].first_name,
                    last_name: action.payload.entities.users[action.payload.result].last_name,
                    updated_on: action.payload.entities.users[action.payload.result].updated_on,
                    error: {}
                }
            }
            else{
                let new_users_entities = Object.assign({},state.users_entities);
                new_users_entities[action.payload.result] = action.payload.entities.users[action.payload.result];
                return {
                    ...state,
                    loading: false,
                    users_entities: new_users_entities,
                    error: {}
                }
            }
        case FETCH_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_USER_ATTEMPT:
            return {
                ...state,
                loading: true,
                error: {}
            }
        case DELETE_USER_SUCCESS:
            let new_users_entities = Object.assign({},state.users_entities);
            let new_users_id = Object.assign({},state.users_id);
            delete new_users_entities[action.payload._id];
            new_users_id = new_users_id.filter(e=>e!=action.payload._id);
            return {
                ...state,
                loading: false,
                users_entities: new_users_entities,
                users_id: new_users_id,
                error: {}
            }
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
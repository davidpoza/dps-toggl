import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { save, load } from "redux-localstorage-simple"

import rootReducer from '../reducers';

const enhancer = compose(
    applyMiddleware(thunk, save())
);

export default function configureStore(initialState){
    return createStore(rootReducer, load({preloadedState:initialState }), enhancer);
}
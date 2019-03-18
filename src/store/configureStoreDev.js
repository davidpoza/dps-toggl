import {createStore, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const enhancer = composeWithDevTools(
    applyMiddleware(thunk, createLogger()) 
);

export default function configureStore(initialState){
    return createStore(rootReducer, initialState, enhancer);
}
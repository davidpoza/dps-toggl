import {createStore, applyMiddleware} from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";

import rootReducer from "../reducers";

const enhancer = composeWithDevTools(
    applyMiddleware(thunk, save(), createLogger())
);

export default function configureStore(initialState){
    return createStore(rootReducer, load({preloadedState:initialState }), enhancer);
}
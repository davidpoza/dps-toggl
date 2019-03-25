import { combineReducers } from 'redux';
import userReducer from './userReducer';
import taskReducer from './taskReducer';
import projectReducer from './ProjectReducer';

const rootReducer = combineReducers({

  //despues el estado estará dentro del objeto userReducer
    userReducer,
    taskReducer,
    projectReducer

  });

export default rootReducer;
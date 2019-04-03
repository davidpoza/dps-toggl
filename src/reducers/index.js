import { combineReducers } from 'redux';
import userReducer from './userReducer';
import taskReducer from './taskReducer';
import projectReducer from './projectReducer';
import tagReducer from './tagReducer';

const rootReducer = combineReducers({

  //despues el estado estará dentro del objeto userReducer
    userReducer,
    taskReducer,
    projectReducer,
    tagReducer
  });

export default rootReducer;
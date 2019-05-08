import { combineReducers } from 'redux';
import userReducer from './userReducer';
import taskReducer from './taskReducer';
import projectReducer from './projectReducer';
import tagReducer from './tagReducer';
import dashboardReducer from './dashboardReducer';

const rootReducer = combineReducers({

  
    userReducer,//despues el estado estará dentro del objeto userReducer
    taskReducer,//en taskReducer, etc
    projectReducer,
    tagReducer,
    dashboardReducer
  });

export default rootReducer;
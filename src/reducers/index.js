import { combineReducers } from 'redux';
import userReducer from './userReducer';
import taskReducer from './taskReducer';
import projectReducer from './projectReducer';
import tagReducer from './tagReducer';
import dashboardReducer from './dashboardReducer';
import reportReducer from './reportReducer';

const rootReducer = combineReducers({


    userReducer,//despues el estado estará dentro del objeto userReducer
    taskReducer,//en taskReducer, etc
    projectReducer,
    tagReducer,
    dashboardReducer,
    reportReducer
  });

export default rootReducer;
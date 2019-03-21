import { combineReducers } from 'redux';
import userReducer from './userReducer';
import taskReducer from './taskReducer';

const rootReducer = combineReducers({

  //despues el estado estará dentro del objeto userReducer
    userReducer,
    taskReducer
  });

export default rootReducer;
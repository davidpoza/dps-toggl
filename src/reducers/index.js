import { combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({

  //despues el estado estará dentro del objeto userReducer
    userReducer
  });

export default rootReducer;
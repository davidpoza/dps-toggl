
/**Entrypoint del proyecto */

import './imports.scss'; //provocamos que webpack procese el archivo con un filter que lo concatenará al style.css

import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import { Provider } from 'react-redux';


import AppContainer from './components/AppComponent/AppContainer';
import configureStore from './store/configureStore';
import './store/configureStore';
import initialState from './reducers/initialState';

const store = configureStore(initialState);


ReactDOM.render(

<Provider store={store}>
    <HashRouter>
        <AppContainer />
    </HashRouter>
</Provider>,

document.getElementById("app"));
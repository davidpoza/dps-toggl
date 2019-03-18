import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';


import 'bootstrap'; //importamos los js de bootstrap
import './imports.scss'; //provocamos que webpack procese el archivo con un filter que lo concatenará al style.css
import AppComponent from './components/AppComponent/AppComponent';
import configureStore from './store/configureStore';
import './store/configureStore';
import initialState from './reducers/initialState';

const store = configureStore(initialState);

ReactDOM.render(

<Provider store={store}>
    <BrowserRouter>
        <AppComponent />
    </BrowserRouter>
</Provider>,

document.getElementById("app"));
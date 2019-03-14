import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap'; //importamos los js de bootstrap
import AppComponent from './components/AppComponent/AppComponent';
import './imports.scss'; //provocamos que webpack procese el archivo con un filter que lo concatenará al style.css


ReactDOM.render(<AppComponent />, document.getElementById("app"));
import React, {Component} from 'react'
import {Route} from 'react-router-dom';


import styles from './MainSectionComponent.scss';
import ConfigComponent from '../ConfigComponent/ConfigComponent';
import LoginContainer from '../LoginComponent/LoginContainer';


class MainSectionComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Route exact path="/" component={ConfigComponent} />
                <Route path="/login" component={LoginContainer} />
            </div>
        )
    }
}

export default MainSectionComponent;
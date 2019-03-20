import React, {Component} from 'react'
import {Route} from 'react-router-dom';


import styles from './MainSectionComponent.scss';
import LoginContainer from '../LoginComponent/LoginContainer';
import PrivateRoute from '../PrivateRouteComponent/PrivateRouteComponent';
import TimerDashboardContainer from '../TimerDashboardComponent/TimerDashboardContainer';


class MainSectionComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <PrivateRoute exact path="/" component={TimerDashboardContainer} />
                <Route path="/login" component={LoginContainer} />
            </div>
        )
    }
}

export default MainSectionComponent;
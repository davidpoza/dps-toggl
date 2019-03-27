import React, {Component} from 'react'
import {Route} from 'react-router-dom';


import styles from './MainSectionComponent.scss';
import LoginContainer from '../LoginComponent/LoginContainer';
import PrivateRoute from '../PrivateRouteComponent/PrivateRouteComponent';
import TimerDashboardContainer from '../TimerDashboardComponent/TimerDashboardContainer';
import ConfigComponent from '../ConfigComponent/ConfigComponent';


class MainSectionComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="h-100">
                <PrivateRoute exact path="/" component={TimerDashboardContainer} />
                <PrivateRoute exact path="/config" component={ConfigComponent} />
                <Route path="/login" component={LoginContainer} />
            </div>
        )
    }
}

export default MainSectionComponent;
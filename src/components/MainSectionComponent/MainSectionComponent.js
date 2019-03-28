import React, {Component} from 'react'
import {Route} from 'react-router-dom';

import styles from './MainSectionComponent.scss';
import LoginContainer from '../LoginComponent/LoginContainer';
import PrivateRoute from '../PrivateRouteComponent/PrivateRouteComponent';
import TimerDashboardContainer from '../TimerDashboardComponent/TimerDashboardContainer';
import ConfigComponent from '../ConfigComponent/ConfigComponent';
import ToastComponent from '../ToastComponent/ToastComponent';


class MainSectionComponent extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
       // 
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.task.error.message && this.props.task.error.message)
            $('#toast1').toast("show");
        if (!prevProps.user.error.message && this.props.user.error.message)
            $('#toast2').toast("show");
        if (!prevProps.project.error.message && this.props.project.error.message)
            $('#toast3').toast("show");
    }


    render(){
        return(
            <div className="h-100">
                
                <PrivateRoute exact path="/" component={TimerDashboardContainer} />
                <PrivateRoute exact path="/config" component={ConfigComponent} />
                <Route path="/login" component={LoginContainer} />

                    <div className={styles.toasts}>
                        <ToastComponent id="toast1" message={this.props.task.error.message} />
                        <ToastComponent id="toast2" message={this.props.user.error.message} /> 
                        <ToastComponent id="toast3" message={this.props.project.error.message} />
                    </div>                 

            </div>
        )
    }
}

export default MainSectionComponent;
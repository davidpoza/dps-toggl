import React, {Component} from 'react'
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';



import styles from './MainSectionComponent.scss';
import LoginContainer from '../LoginComponent/LoginContainer';
import SignupContainer from '../SignupComponent/SignupContainer';
import PrivateRoute from '../PrivateRouteComponent/PrivateRouteComponent';
import ConfigComponent from '../ConfigComponent/ConfigComponent';
import ToastComponent from '../ToastComponent/ToastComponent';
import TimerSectionContainer from '../TimerSectionComponent/TimerSectionContainer';
import ProjectSectionContainer from '../ProjectSectionComponent/ProjectSectionContainer';
import ProjectDetailSectionContainer from '../ProjectDetailSectionComponent/ProjectDetailSectionContainer';
import ProfileSectionContainer from '../ProfileSectionComponent/ProfileSectionContainer';
import TagSectionContainer from '../TagSectionComponent/TagSectionContainer';
import UserSectionContainer from '../UserSectionComponent/UserSectionContainer';
import DashboardSectionContainer from '../DashboardSectionComponent/DashboardSectionContainer';


class MainSectionComponent extends Component{
    constructor(props){
        super(props);
   }

    render(){
        return(
            <div className="h-100">
                <PrivateRoute exact path="/" component={TimerSectionContainer} component_props = {{}}/>
                <PrivateRoute exact path="/projects" component={ProjectSectionContainer} component_props ={{}}/>
                <PrivateRoute exact path="/projects/:project_id" component={ProjectDetailSectionContainer} component_props ={{}}/>
                <PrivateRoute exact path="/profile/:user_id" component={ProfileSectionContainer} component_props ={{}}/>
                <PrivateRoute exact path="/tags" component={TagSectionContainer} component_props ={{}}/>
                <PrivateRoute exact path="/users" component={UserSectionContainer} component_props ={{}}/>
                <PrivateRoute exact path="/config" component={ConfigComponent} />
                <PrivateRoute exact path="/dashboard" component={DashboardSectionContainer} component_props = {{}} />
                <Route path="/login" component={LoginContainer} />
                <Route path="/signup" component={SignupContainer} />

                    <div className={styles.toasts}>
                        <ToastComponent
                        taskMessage={this.props.task_error_message}
                        userMessage={this.props.user_error_message}
                        projectMessage={this.props.project_error_message}
                        tagMessage={this.props.tag_error_message}
                        userActions={this.props.userActions}
                        taskActions={this.props.taskActions}
                        projectActions={this.props.projectActions}
                        tagActions={this.props.tagActions}/>
                    </div>

            </div>
        )
    }
}

MainSectionComponent.propTypes = {
    user_error_message: PropTypes.string,
    task_error_message: PropTypes.string,
    project_error_message: PropTypes.string,
    tag_error_message: PropTypes.string,
    userActions: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired,
    projectActions: PropTypes.object.isRequired,
    tagActions: PropTypes.object.isRequired,

}


export default MainSectionComponent;
import React, {Component} from 'react'
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';


import styles from './MainSectionComponent.scss';
import LoginContainer from '../LoginComponent/LoginContainer';
import PrivateRoute from '../PrivateRouteComponent/PrivateRouteComponent';
import ProjectDetailSectionComponent from '../ProjectDetailSectionComponent/ProjectDetailSectionComponent';
import ConfigComponent from '../ConfigComponent/ConfigComponent';
import ToastComponent from '../ToastComponent/ToastComponent';
import TimerSectionContainer from '../TimerSectionComponent/TimerSectionContainer';
import ProjectSectionContainer from '../ProjectSectionComponent/ProjectSectionContainer';


class MainSectionComponent extends Component{
    constructor(props){
        super(props);
   }

    render(){
        return(
            <div className="h-100">
                
                <PrivateRoute exact path="/" component={TimerSectionContainer} component_props = {{}}/>
                <PrivateRoute exact path="/projects" component={ProjectSectionContainer} component_props ={{}}/>
                <PrivateRoute exact path="/projects/:project_id" component={ProjectDetailSectionComponent} component_props ={{user:this.props.user, project:this.props.project, projectActions:this.props.projectActions, userActions: this.props.userActions}}/>
                <PrivateRoute exact path="/config" component={ConfigComponent} />
                <Route path="/login" component={LoginContainer} />

                    <div className={styles.toasts}>
                        <ToastComponent taskMessage={this.props.task.error.message}
                        userMessage={this.props.user.error.message} projectMessage={this.props.project.error.message}
                        tagMessage={this.props.tag.error.message} 
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
    user: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    tag: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired,
    projectActions: PropTypes.object.isRequired,
    tagActions: PropTypes.object.isRequired,

}


export default MainSectionComponent;
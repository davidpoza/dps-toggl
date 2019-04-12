import React, {Component} from 'react'
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';


import styles from './MainSectionComponent.scss';
import LoginContainer from '../LoginComponent/LoginContainer';
import PrivateRoute from '../PrivateRouteComponent/PrivateRouteComponent';
import TimerSectionComponent from '../TimerSectionComponent/TimerSectionComponent';
import ProjectSectionComponent from '../ProjectSectionComponent/ProjectSectionComponent';
import ConfigComponent from '../ConfigComponent/ConfigComponent';
import ToastComponent from '../ToastComponent/ToastComponent';


class MainSectionComponent extends Component{
    constructor(props){
        super(props);
   }

    render(){
        return(
            <div className="h-100">
                
                <PrivateRoute exact path="/" component={TimerSectionComponent} component_props ={{user:this.props.user, task:this.props.task, project:this.props.project, tag:this.props.tag, tagActions:this.props.tagActions, taskActions:this.props.taskActions, projectActions:this.props.projectActions}}/>
                <PrivateRoute exact path="/projects" component={ProjectSectionComponent} component_props ={{user:this.props.user, project:this.props.project}}/>
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
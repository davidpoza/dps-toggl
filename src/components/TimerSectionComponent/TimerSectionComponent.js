import React, {Component} from 'react';


import styles from './TimerSectionComponent.scss';
import NewBlockComponent from '../NewBlockComponent/NewBlockComponent';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import TaskDatesComponent from '../TaskDatesComponent/TaskDatesComponent';

class TimerSectionComponent extends Component{
    constructor(props){
        super(props);
        this.NewBlockComponent = React.createRef();
        this.handleOnClickResume = this.handleOnClickResume.bind(this);
       
    }

    handleOnClickResume(description, project_id, project_name, project_color, tags){
        this.NewBlockComponent.current.resumeTask(description, project_id, project_name, project_color, tags);
    }

    render(){
        return(

            <div className={"d-flex flex-column justify-content-start h-100"}>
                <div>
                    <NewBlockComponent ref={this.NewBlockComponent} user={this.props.user} project={this.props.project} tag={this.props.tag} tagActions={this.props.tagActions} taskActions={this.props.taskActions} projectActions={this.props.projectActions}/>
                </div>
                <div className={"flex-grow-1 " + styles.tasklist}>
                    <TaskDatesComponent token={this.props.user.token} tags={this.props.tag.tags} projects={this.props.project.projects} tasks={this.props.task.tasks} taskActions={this.props.taskActions} tagActions={this.props.tagActions} need_refreshing={this.props.task.need_refreshing} onResume={this.handleOnClickResume}/>
                </div>
                <LoadingComponent isLoading={this.props.user.loading|this.props.task.loading|this.props.project.loading|this.props.tag.loading} />
            </div>
        )
    }
}

export default TimerSectionComponent;
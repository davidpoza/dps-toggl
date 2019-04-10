import React, {Component} from 'react';


import styles from './TimerDashboardComponent.scss';
import NewBlockContainer from '../NewBlockComponent/NewBlockContainer';
import TaskDatesContainer from '../TaskDatesComponent/TaskDatesContainer';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

class TimerDashboardComponent extends Component{
    constructor(props){
        super(props);

       
    }

   

    render(){
        return(

            <div className={"d-flex flex-column justify-content-start h-100"}>
                <div>
                    <NewBlockContainer />
                </div>
                <div className={"flex-grow-1 " + styles.tasklist}>
                    <TaskDatesContainer />
                </div>
                <LoadingComponent isLoading={this.props.user.loading|this.props.task.loading|this.props.project.loading|this.props.tag.loading} />
            </div>
        )
    }
}

export default TimerDashboardComponent;
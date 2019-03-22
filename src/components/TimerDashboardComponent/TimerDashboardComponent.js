import React, {Component} from 'react'


import styles from './TimerDashboardComponent.scss';
import NewBlockContainer from '../NewBlockComponent/NewBlockContainer';
import TaskListContainer from '../TaskListComponent/TaskListContainer';


class TimerDashboardComponent extends Component{
    constructor(props){
        super(props);

       
    }

   

    render(){
        return(

            <div className={"d-flex flex-column h-100"}>
                <div>
                    <NewBlockContainer />
                </div>
                <div className={"flex-grow-1 " + styles.tasklist}>
                    <TaskListContainer />  
                </div>

            </div>
        )
    }
}

export default TimerDashboardComponent;
import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';


import styles from './TaskListComponent.scss';
import TaskComponent from '../TaskComponent/TaskComponent';


class TaskListComponent extends Component{
    constructor(props){
        super(props);

        this.handleDeleteTaskVisually = this.handleDeleteTaskVisually.bind(this);
        this.state = {

        };        
    }

    componentDidMount(){
        this.props.actions.fetchTasks(this.props.token);        
    }

    //ese flag de refresco lo modificamos cuando se ha creado una nueva task y hay que pedir un listado nuevo
    componentDidUpdate(prevProps) {
        if (!prevProps.task.need_refreshing && this.props.task.need_refreshing)
            this.props.actions.fetchTasks(this.props.token);
    }

    handleDeleteTaskVisually(task_id){
        let new_task_array = this.props.task.tasks.filter((e)=>{
            return e.id != task_id
        });

        this.props.actions.deleteTasksVisually(new_task_array);
    }


    render(){
        return(
            <div>
               <ul className="p-0">
               {
                   this.props.task.tasks.map((e,index) => {
                        return <TaskComponent token={this.props.token} key={index} task={e} projects={this.props.project.projects} actions={this.props.actions} onDeleteFromList={this.handleDeleteTaskVisually} />
                   })
               }
               </ul>
            </div>
          

        )
    }
}

export default TaskListComponent;
import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';


import styles from './TaskListComponent.scss';
import TaskComponent from '../TaskComponent/TaskComponent';


class TaskListComponent extends Component{
    constructor(props){
        super(props);

        this.handleDeleteTaskVisually = this.handleDeleteTaskVisually.bind(this);
        this.handleUpdateTaskVisually = this.handleUpdateTaskVisually.bind(this);
        this.state = {

        };        
    }

    componentDidMount(){
        this.props.taskActions.fetchTasks(this.props.token);        
    }

    //ese flag de refresco lo modificamos cuando se ha creado una nueva task y hay que pedir un listado nuevo
    componentDidUpdate(prevProps) {
        if (!prevProps.task.need_refreshing && this.props.task.need_refreshing)
            this.props.taskActions.fetchTasks(this.props.token);

        if(prevProps.tag.tags != this.props.tag.tags){
            //le añadimos la propiedad checked al objeto tag que viene de la api
            this.setState({
                tags: this.props.tag.tags.map((e)=>{
                    e.checked = false;
                    return e;
                })
            })
        }
    }

    handleDeleteTaskVisually(task_id){
        let new_task_array = this.props.task.tasks.filter((e)=>{
            return e.id != task_id
        });

        this.props.taskActions.deleteTasksVisually(new_task_array);
    }

    handleUpdateTaskVisually(task_id, desc, date_start, date_end, project, tags){
        let new_task_array = this.props.task.tasks.map((e)=>{
            if(e.id == task_id){
                return ({
                    id: task_id,
                    desc,
                    date_start,
                    date_end,
                    project,
                    tags: []
                });
            }
            else
                return e;
        });

        this.props.taskActions.updateTasksVisually(new_task_array);
    }


    render(){
        return(
            <div>
               <ul className="p-0">
               {
                   this.props.task.tasks.map((e,index) => {
                        return <TaskComponent token={this.props.token} key={index} task={e} projects={this.props.project.projects} tags={this.props.tag.tags} taskActions={this.props.taskActions} tagActions={this.props.tagActions} onDeleteFromList={this.handleDeleteTaskVisually} onUpdate={this.handleUpdateTaskVisually}/>
                   })
               }
               </ul>
            </div>
          

        )
    }
}

export default TaskListComponent;
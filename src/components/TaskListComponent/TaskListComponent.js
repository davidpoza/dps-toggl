import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';


import styles from './TaskListComponent.scss';
import TaskComponent from '../TaskComponent/TaskComponent';


class TaskListComponent extends Component{
    constructor(props){
        super(props);

       
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

    render(){
        return(
            <div>
               <ul className="p-0">
               {
                   this.props.task.tasks.map((e,index) => {
                        return <TaskComponent key={index} task={e} />
                   })
               }
               </ul>
            </div>
          

        )
    }
}

export default TaskListComponent;
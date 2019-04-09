import React, {Component} from 'react';
import PropTypes from 'prop-types';


import TaskComponent from '../TaskComponent/TaskComponent';


class TaskListComponent extends Component{
    constructor(props){
        super(props);

        this.handleDeleteTaskVisually = this.handleDeleteTaskVisually.bind(this);
        this.handleUpdateTaskVisually = this.handleUpdateTaskVisually.bind(this);
        this.state = {

        };        
    }

    //también hacemos un fetchTasks al montar el componente lista.
    componentDidMount(){
        this.props.taskActions.fetchTasks(this.props.token);       
    }

    //ese flag de refresco lo modificamos cuando se ha creado una nueva task y hay que pedir un listado nuevo
    componentDidUpdate(prevProps) {
        if (!prevProps.need_refreshing && this.props.need_refreshing)
            this.props.taskActions.fetchTasks(this.props.token);

    }

    /* hace una copia del array de tasks que llega via redux connect en el container, para modificarlo
    mediante un filter que elimine justo el task con id indicado.*/
    handleDeleteTaskVisually(task_id){
        let new_task_array = this.props.tasks.filter((e)=>{
            return e.id != task_id
        });

        //llamamos a un action síncrono que simplemente copia el nuevo array al store, estado taskReducer.tags
        this.props.taskActions.deleteTasksVisually(new_task_array);
    }

    /** hace un update de un task operando únicamente en el store de redux de forma síncrona.
     * Este tipo de action se lanza en paralelo a las action asíncronas para dar velocidad al manejo de la la interfaz,
     * sin esperar a peticiones ajax.
    */
    handleUpdateTaskVisually(task_id, desc, date, start_hour, end_hour, project, tags){        
        let new_task_array = this.props.tasks.map((e)=>{
            if(e.id == task_id){
                if(desc==null) desc = e.desc;
                if(date==null) date = e.date;
                if(start_hour==null) start_hour = e.start_hour;
                if(end_hour==null) end_hour = e.end_hour;
                if(project==null) project = e.project;
                if(tags==null) tags = e.tags;
                return ({
                    id: task_id,
                    desc,
                    date,
                    start_hour,
                    end_hour,
                    project,
                    tags
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
               <ul className="p-0 container-flex">
               {
                   this.props.tasks.map((e,index) => {
                        return <TaskComponent token={this.props.token} key={index} task={e} projects={this.props.projects} tags={this.props.tags} taskActions={this.props.taskActions} tagActions={this.props.tagActions} onDeleteFromList={this.handleDeleteTaskVisually} onUpdate={this.handleUpdateTaskVisually}/>
                   })
               }
               </ul>
            </div>
          

        )
    }
}


TaskListComponent.propTypes = {
    token: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
    need_refreshing: PropTypes.bool.isRequired,
    taskActions: PropTypes.object.isRequired,
    tagActions: PropTypes.object.isRequired,
}

export default TaskListComponent;
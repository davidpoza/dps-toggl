import React, {Component} from 'react';
import PropTypes from 'prop-types';


import TaskComponent from '../TaskComponent/TaskComponent';
import TaskListComponent from '../TaskListComponent/TaskListComponent';


class TaskDatesComponent extends Component{
    constructor(props){
        super(props);

        this.state = {

        };        
    }

    //también hacemos un fetchTasks al montar el componente lista.
    componentDidMount(){
        this.props.taskActions.fetchAllDates(this.props.token);       
    }

    //ese flag de refresco lo modificamos cuando se ha creado una nueva task y hay que pedir un listado nuevo
    componentDidUpdate(prevProps) {
        if (!prevProps.need_refreshing && this.props.need_refreshing)
            this.props.taskActions.fetchAllDates(this.props.token);   

    }

    //<TaskComponent token={this.props.token} key={index} task={e} projects={this.props.projects} tags={this.props.tags} taskActions={this.props.taskActions} tagActions={this.props.tagActions} onDeleteFromList={this.handleDeleteTaskVisually} onUpdate={this.handleUpdateTaskVisually}/>



    render(){
        return(
            <div>
               <ul className="p-0 container-flex">
               {
                   this.props.dates.map((e,index) => {
                        return (<li key={index}>
                            {e.date}
                            <TaskListComponent token={this.props.token} date={e.date} tags={this.props.tags} projects={this.props.projects} tasks={this.props.tasks} taskActions={this.props.taskActions} tagActions={this.props.tagActions} need_refreshing={this.props.need_refreshing}/>
                        </li>)
                   }, this)
               }
               </ul>
            </div>
          

        )
    }
}


/*TaskListComponent.propTypes = {
    token: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
    need_refreshing: PropTypes.bool.isRequired,
    taskActions: PropTypes.object.isRequired,
    tagActions: PropTypes.object.isRequired,
}
*/
export default TaskDatesComponent;
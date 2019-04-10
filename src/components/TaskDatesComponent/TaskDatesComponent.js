import React, {Component} from 'react';
import PropTypes from 'prop-types';


import TaskListComponent from '../TaskListComponent/TaskListComponent';
import styles from './TaskDatesComponent.scss';
import utils from '../../utils';


class TaskDatesComponent extends Component{
    constructor(props){
        super(props);

        this.state = {

        };        
    }

    //también hacemos un fetchTasks al montar el componente lista.
    componentDidMount(){
        if(this.props.tasks.length == 0)
            this.props.taskActions.fetchTasks(this.props.token);       
    }

    //ese flag de refresco lo modificamos cuando se ha creado una nueva task y hay que pedir un listado nuevo
    componentDidUpdate(prevProps) {
        if (!prevProps.need_refreshing && this.props.need_refreshing){
            this.props.taskActions.fetchTasks(this.props.token); 
            
        }
              

    }
   
    render(){
        return(
            <div>
               <ul className="p-0 container-flex">
               {
                   this.props.tasks && this.props.tasks.map((e,index) => {
                        return (<li className={styles.date} key={index}>
                            <h2>{utils.standarDateToHuman(e.date)}</h2>
                            <TaskListComponent token={this.props.token} date={e.date} tags={this.props.tags} projects={this.props.projects} tasks={e.tasks} taskActions={this.props.taskActions} tagActions={this.props.tagActions} need_refreshing={this.props.need_refreshing}/>
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
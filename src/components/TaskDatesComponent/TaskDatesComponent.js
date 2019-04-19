import React, {Component} from 'react';
import PropTypes from 'prop-types';


import TaskListContainer from '../TaskListComponent/TaskListContainer';
import styles from './TaskDatesComponent.scss';
import utils from '../../utils';


class TaskDatesComponent extends Component{
    constructor(props){
        super(props);
    }

    //también hacemos un fetchTasks al montar el componente lista.
    componentDidMount(){
            this.props.taskActions.fetchTasks(this.props.token);       
    }

    //ese flag de refresco lo modificamos cuando se ha creado una nueva task y hay que pedir un listado nuevo
    componentDidUpdate(prevProps) {
        if (!prevProps.need_refreshing && this.props.need_refreshing){
            this.props.taskActions.fetchTasks(this.props.token); 
            
        }
        
    }
   
    handleOnClick(date){
        this.props.taskActions.collapseDate(date);
    }

    render(){
        return(
            <div>
               <ul className="p-0 container-flex">
               {
                   this.props.dates && this.props.dates.map((e,index) => {
                        return (
                                <li className={styles.date} key={"date_group_"+index}>
                                <div className={"d-flex justify-content-between"}>
                                    <h2>{ e.collapsed?<i className="fas fa-plus-square" onClick={this.handleOnClick.bind(this,e.date)}></i>:<i className="fas fa-minus-square" onClick={this.handleOnClick.bind(this,e.date)}></i> } {utils.standarDateToHuman(e.date)}</h2>
                                    <div className="p-3">{e.time}h.</div>  
                                </div>
                           
                                { !e.collapsed &&
                                    <TaskListContainer date={e.date} onUpdate={this.handleUpdateTaskVisually} onResume={this.props.onResume}/>
                                }                                
                                </li>
                        )
                   }, this)
               }
               </ul>
            </div>
          

        )
    }
}


TaskDatesComponent.propTypes = {
    token: PropTypes.string.isRequired,
    dates: PropTypes.array.isRequired,
    need_refreshing: PropTypes.bool.isRequired,
    taskActions: PropTypes.object.isRequired,
    tagActions: PropTypes.object.isRequired,
}

export default TaskDatesComponent;
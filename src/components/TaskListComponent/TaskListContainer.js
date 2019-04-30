import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/userActions'
import * as taskActions from '../../actions/taskActions'
import * as projectActions from '../../actions/projectActions'
import * as tagActions from '../../actions/tagActions'

import TaskListComponent from './TaskListComponent';


class TaskListContainer extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    render(){
       
        return(
            <TaskListComponent
            token={this.props.token}
            tasks={this.props.tasks}
            onResume={this.props.onResume}
            />
        )
    }
}

function mapStateToProps (state, props) {
    let tasks = state.taskReducer.dates_entities[props.date].tasks;
    tasks = tasks.sort((a,b)=>{
      let task_a = state.taskReducer.tasks_entities[a];
      let task_b = state.taskReducer.tasks_entities[b];
      return task_b.start_hour.localeCompare(task_a.start_hour);    
    });
    return {
      token: state.userReducer.token,
      //aqui tengo que componer las tareas con igual desc
      tasks: tasks,
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      userActions: bindActionCreators(userActions, dispatch),
      taskActions: bindActionCreators(taskActions, dispatch),
      projectActions: bindActionCreators(projectActions, dispatch),
      tagActions: bindActionCreators(tagActions, dispatch),
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer);

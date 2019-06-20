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
    //aqui tengo que componer las tareas con igual desc e igual proyecto
    //los que tienen parent:-1 son padres, todos son padres inicialmente

    tasks = tasks.map(t=>({_id:t, parent:-1}));

    for(let i=0; i<tasks.length; i++){
      for(let j=i+1; j<tasks.length; j++){
        let task_a = state.taskReducer.tasks_entities[tasks[i]._id];
        let task_b = state.taskReducer.tasks_entities[tasks[j]._id];
        if(tasks[i].parent == -1 && task_a.desc == task_b.desc &&
          task_a.project == task_b.project ){
          tasks[j].parent = task_a._id;
        }
      }
    }

    let compound_tasks = tasks.map(t=>({id:t._id, parent:t.parent, children:tasks.filter(task=>task.parent == t._id)}));

    return {
      token: state.userReducer.token,
      tasks: compound_tasks,
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

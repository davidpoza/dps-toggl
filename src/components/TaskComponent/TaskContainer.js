import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/userActions'
import * as taskActions from '../../actions/taskActions'
import * as projectActions from '../../actions/projectActions'
import * as tagActions from '../../actions/tagActions'

import TaskComponent from './TaskComponent';


class TaskContainer extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    render(){
      
      
        return(
            <TaskComponent
            token={this.props.token}
            task={this.props.task}
            projects={this.props.projects}
            tags={this.props.tags}
            tasks_entities={this.props.tasks_entities}
            taskActions={this.props.taskActions}           
            onResume={this.props.onResume}
            />
        )
    }
}

function mapStateToProps (state, props) {
    //denormalizacion
    let task = Object.assign({}, state.taskReducer.tasks_entities[props.task_id]);
    task.tags = task.tags.map(t=>{
      return state.taskReducer.tasks_tags_entities[t]; //tasks_tags_entities está cargado porque lo pide un componente hermano
    },this);
    task.project = state.projectReducer.projects_entities?state.projectReducer.projects_entities[task.project]:null; //projects_entities está cargado porque lo pide un componente hermano

    return {
      token: state.userReducer.token,
      task: task,
      tasks_entities:  state.taskReducer.tasks_entities,
      tags_entities: state.tagReducer.tags_entities,
      tags: state.tagReducer.tags_id.map(e=>{
        return state.tagReducer.tags_entities[e];
      }),
      tasks_tags_entities: state.taskReducer.tasks_tags_entities,
      projects: state.projectReducer.projects_id.map(e=>state.projectReducer.projects_entities[e]),
      projects_entities: state.projectReducer.projects_entities
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
  
export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);

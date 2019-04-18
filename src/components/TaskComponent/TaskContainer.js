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
      //denormalizacion
      let task = this.props.task;
      task.tags = this.props.task.tags.map(t=>{
        return this.props.tasks_tags_entities[t];
      });
      task.project = this.props.projects_entities[task.project];
      
        return(
            <TaskComponent token={this.props.token} task={task} projects={this.props.projects} tags={this.props.tags}
            userActions={this.props.userActions}
            taskActions={this.props.taskActions}
            projectActions={this.props.projectActions}
            tagActions={this.props.tagActions}
            onResume={this.props.onResume}
            onDelete={this.props.onDelete}
            onUpdate={this.props.onUpdate}
            />
        )
    }
}

function mapStateToProps (state) {
    return {
      token: state.userReducer.token,
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
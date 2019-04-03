import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as taskActions from '../../actions/taskActions'
import * as tagActions from '../../actions/tagActions'
import TaskListComponent from './TaskListComponent';





class TaskListContainer extends Component{
    constructor(props){
        super(props);
    }

    

    render(){
        return(
            <TaskListComponent token={this.props.user.token} tags={this.props.tag.tags} projects={this.props.project.projects} tasks={this.props.task.tasks} taskActions={this.props.taskActions} tagActions={this.props.tagActions} need_refreshing={this.props.task.need_refreshing}/>
        )
    }
}

function mapStateToProps (state) {
    return {
      task: state.taskReducer,
      project: state.projectReducer,
      user: state.userReducer,
      tag: state.tagReducer,
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      taskActions: bindActionCreators(taskActions, dispatch),
      tagActions: bindActionCreators(tagActions, dispatch),
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer);

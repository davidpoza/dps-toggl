import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/userActions'
import * as taskActions from '../../actions/taskActions'
import * as projectActions from '../../actions/projectActions'
import * as tagActions from '../../actions/tagActions'

import TaskDatesComponent from './TaskDatesComponent';





class TaskDatesContainer extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    render(){
        return(
            <TaskDatesComponent token={this.props.token} tasks={this.props.tasks} projects={this.props.projects} tags={this.props.tags} need_refreshing={this.props.need_refreshing}
            userActions={this.props.userActions}
            taskActions={this.props.taskActions}
            projectActions={this.props.projectActions}
            tagActions={this.props.tagActions}
            onResume={this.props.onResume}
            />
        )
    }
}

function mapStateToProps (state) {
    return {
      token: state.userReducer.token,
      tasks: state.taskReducer.tasks,
      tags: state.tagReducer.tags,
      projects: state.projectReducer.projects,
      need_refreshing: state.taskReducer.need_refreshing,  
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
  
export default connect(mapStateToProps, mapDispatchToProps)(TaskDatesContainer);

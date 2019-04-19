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
        let tasks = this.props.dates[this.props.date].tasks;
       
        return(
            <TaskListComponent token={this.props.token} tasks={tasks}
            userActions={this.props.userActions}
            taskActions={this.props.taskActions}
            projectActions={this.props.projectActions}
            tagActions={this.props.tagActions}
            onResume={this.props.onResume}
            onUpdate={this.props.onUpdate}
            />
        )
    }
}

function mapStateToProps (state) {
    return {
      token: state.userReducer.token,
      dates: state.taskReducer.dates_entities,
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
  
export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer);

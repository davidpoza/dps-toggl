import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as taskActions from '../../actions/taskActions'
import TaskListComponent from './TaskListComponent';





class TaskListContainer extends Component{
    constructor(props){
        super(props);
    }

    

    render(){
        return(
            <TaskListComponent token={this.props.user.token} project={this.props.project} task={this.props.task} actions={this.props.actions}/>
        )
    }
}

function mapStateToProps (state) {
    return {
      task: state.taskReducer,
      project: state.projectReducer,
      user: state.userReducer
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      actions: bindActionCreators(taskActions, dispatch)
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer);

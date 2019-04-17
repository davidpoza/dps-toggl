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
            <TaskComponent token={this.props.token} task={this.props.task} projects={this.props.projects} tags={this.props.tags}
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
      tags: state.tagReducer.tags_ids.map(e=>state.tagReducer.tags_entities[e]),
      projects: state.projectReducer.projects,
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

import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/userActions'
import * as taskActions from '../../actions/taskActions'
import * as projectActions from '../../actions/projectActions'
import * as tagActions from '../../actions/tagActions'

import ProjectSectionComponent from './ProjectSectionComponent';





class ProjectSectionContainer extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    render(){
        return(
            <ProjectSectionComponent 
            user={this.props.user}
            user_loading={this.props.user_loading}
            project_loading={this.props.project_loading}
            need_refreshing={this.props.need_refreshing}
            projects={this.props.projects}
            history={this.props.history}
            userActions={this.props.userActions}
            taskActions={this.props.taskActions}
            projectActions={this.props.projectActions}
            tagActions={this.props.tagActions}/>
        )
    }
}

function mapStateToProps (state) {
    return {
      user: state.userReducer,
      need_refreshing: state.projectReducer.need_refreshing,
      user_loading: state.userReducer.loading,
      project_loading: state.projectReducer.loading,
      projects: state.projectReducer.projects_id.map(p=>state.projectReducer.projects_entities[p]),
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
  
export default connect(mapStateToProps, mapDispatchToProps)(ProjectSectionContainer);

import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/userActions'
import * as taskActions from '../../actions/taskActions'
import * as projectActions from '../../actions/projectActions'
import * as tagActions from '../../actions/tagActions'

import ProjectDetailSectionComponent from './ProjectDetailSectionComponent';





class ProjectDetailSectionContainer extends Component{
    constructor(props){
        super(props);
    }


    render(){    
        return(
            <ProjectDetailSectionComponent 
            user={this.props.user}
            users_entities={this.props.users_entities}
            users={this.props.users}
            user_loading={this.props.user_loading}
            project_loading={this.props.project_loading}
            need_refreshing={this.props.need_refreshing}
            projects={this.props.projects}
            project_detail={this.props.project_detail}
            history={this.props.history}
            userActions={this.props.userActions}
            taskActions={this.props.taskActions}
            projectActions={this.props.projectActions}
            tagActions={this.props.tagActions}/>
        )
    }
}

function mapStateToProps (state, ownProps) {
    //denormalización
      let project_detail= state.projectReducer.projects_entities[ownProps.match.params.project_id];
      project_detail.members_entities = project_detail.members.map(e=>(state.userReducer.users_entities[e]));
    return {
      project_detail: project_detail,
      user: state.userReducer,
      need_refreshing: state.projectReducer.need_refreshing,
      user_loading: state.userReducer.loading,
      project_loading: state.projectReducer.loading,
      projects: state.projectReducer.projects_id.map(p=>state.projectReducer.projects_entities[p]),
      projects_entities: state.projectReducer.projects_entities,
      users: state.userReducer.users_id.map(u=>(state.userReducer.users_entities[u])),
      users_entities: state.userReducer.users_entities,
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
  
export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailSectionContainer);

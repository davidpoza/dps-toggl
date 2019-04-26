import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import utils from '../../utils';
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
            users={this.props.users}
            user_loading={this.props.user_loading}
            project_loading={this.props.project_loading}
            need_refreshing={this.props.need_refreshing}
            project_detail={this.props.project_detail}
            history={this.props.history}
            userActions={this.props.userActions}
            projectActions={this.props.projectActions}
            />
        )
    }
}

function mapStateToProps (state, ownProps) {
    //denormalización
       let project_detail= state.projectReducer.projects_entities[ownProps.match.params.project_id];
       project_detail.member_relations = project_detail.members.map(e=>({member:state.userReducer.users_entities[e.directus_users_id], relation_id:e.id}));
       if(project_detail.tasks){
          project_detail.hours = project_detail.tasks.reduce((prev, curr)=>{
            curr = utils.diffHoursBetHours(curr?curr.start_hour:"00:00:00", curr?curr.end_hour:"00:00:00")
            return(prev+curr);
          },0);
          project_detail.tasks = project_detail.tasks.map(t=>{
            t.user_entity = state.userReducer.users_entities[t.user];
            return t;
          });
       }
      else
        p.hours = 0;
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

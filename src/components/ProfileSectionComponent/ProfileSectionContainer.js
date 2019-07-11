import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import utils from '../../utils';
import * as userActions from '../../actions/userActions'
import * as taskActions from '../../actions/taskActions'
import * as projectActions from '../../actions/projectActions'
import * as tagActions from '../../actions/tagActions'

import ProfileSectionComponent from './ProfileSectionComponent';



class ProfileSectionContainer extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <ProfileSectionComponent
            user={this.props.user}
            user_loading={this.props.user_loading}
            need_refreshing={this.props.need_refreshing}
            profile={this.props.profile}
            history={this.props.history}
            userActions={this.props.userActions}
            projectActions={this.props.projectActions}
            />
        )
    }
}

function mapStateToProps (state, ownProps) {
    //denormalización
      let profile;

      if(ownProps.match.params.user_id === undefined || ownProps.match.params.user_id == state.userReducer.id)
        profile = {
          _id: state.userReducer.id,
          active: state.userReducer.active,
          admin: state.userReducer.admin,
          avatar: state.userReducer.avatar,
          created_on: state.userReducer.created_on,
          updated_on: state.userReducer.updated_on,
          email: state.userReducer.email,
          first_name: state.userReducer.first_name,
          last_name: state.userReducer.last_name
        };
      else
        profile= state.userReducer.users_entities[ownProps.match.params.user_id];
    return {
      profile: profile,
      user: state.userReducer,
      need_refreshing: state.userReducer.need_refreshing,
      user_loading: state.userReducer.loading,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSectionContainer);

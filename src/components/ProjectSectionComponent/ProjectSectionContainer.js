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
            projectActions={this.props.projectActions}
            />
        )
    }
}

function sortBy(field="id", order="asc"){
  if (field=="id")
    return(
    (a,b)=>{
      if(a.id > b.id) return order=="asc"?1:-1;
      else if (a.id < b.id) return order=="asc"?-1:1;
      else return 0;
    })
  else if (field=="name")
    return(
    (a,b)=>{
      if(order == "asc")
        return(a.name.localeCompare(b.name));
      else if(order == "desc")
        return(b.name.localeCompare(a.name));
    })
  else if (field=="tasks")
    return(
    (a,b)=>{
      if(a.tasks.length > b.tasks.length) return order=="asc"?1:-1;
      else if (a.tasks.length < b.tasks.length) return order=="asc"?-1:1;
      else{ //si tienen mismo numero de tareas ordenamos alfabéticamente
        return(a.name.localeCompare(b.name))
      };
    })
}

function mapStateToProps (state) {
    return {
      user: state.userReducer,
      need_refreshing: state.projectReducer.need_refreshing,
      user_loading: state.userReducer.loading,
      project_loading: state.projectReducer.loading,
      projects: state.projectReducer.projects_id.map(p=>state.projectReducer.projects_entities[p])
        .sort(sortBy(state.projectReducer.sortBy, state.projectReducer.order)),
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

import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/userActions'
import * as taskActions from '../../actions/taskActions'
import * as projectActions from '../../actions/projectActions'
import * as tagActions from '../../actions/tagActions'
import MainSectionComponent from './MainSectionComponent';





class MainSectionContainer extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    render(){
        return(
            <MainSectionComponent user={this.props.user} task={this.props.task} project={this.props.project} tag={this.props.tag} 
            userActions={this.props.userActions}
            taskActions={this.props.taskActions}
            projectActions={this.props.projectActions}
            tagActions={this.props.tagActions}/>
        )
    }
}

function mapStateToProps (state) {
  //aqui compongo los objetos normalizados con normalizr

  state.userReducer.users = state.userReducer.users.map(e=>{
    return state.userReducer.users_entities[e];
  });


  if(state.taskReducer.dates != undefined){
    state.taskReducer.tasks = state.taskReducer.dates.map(e=>{
      if(e.tasks != undefined)
        e.tasks = e.tasks.map(t=>{
          return state.taskReducer.tasks_entities[t];
        });
      return e;
    });
  }

  state.projectReducer.projects = state.projectReducer.projects.map(e=>{
    return state.projectReducer.projects_entities[e];
  });



  state.tagReducer.tags = state.tagReducer.tags.map(e=>{
    return state.tagReducer.tags_entities[e];
  });




    return {
      user: state.userReducer,
      task: state.taskReducer,
      project: state.projectReducer,
      tag: state.tagReducer
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
  
export default connect(mapStateToProps, mapDispatchToProps)(MainSectionContainer);

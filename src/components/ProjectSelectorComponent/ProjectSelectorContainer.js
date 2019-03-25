import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as projectActions from '../../actions/projectActions'
import ProjectSelectorComponent from './ProjectSelectorComponent';





class ProjectSelectorContainer extends Component{
    constructor(props){
        super(props);
    }

  

    render(){
        return(
            <ProjectSelectorComponent token={this.props.user.token} project={this.props.project} actions={this.props.actions}/>
        )
    }
}

function mapStateToProps (state) {
    return {
      project: state.projectReducer,
      user: state.userReducer
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      actions: bindActionCreators(projectActions, dispatch)
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelectorContainer);

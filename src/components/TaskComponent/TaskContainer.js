import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/userActions'
import TaskComponent from './TaskComponent';





class TaskContainer extends Component{
    constructor(props){
        super(props);
    }

  

    render(){
        return(
            <TaskComponent user={this.props.user} actions={this.props.actions}/>
        )
    }
}

function mapStateToProps (state) {
    return {
      user: state.userReducer
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      actions: bindActionCreators(userActions, dispatch)
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);

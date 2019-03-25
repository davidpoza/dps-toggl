import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as taskActions from '../../actions/taskActions';
import * as projectActions from '../../actions/projectActions';
import NewBlockComponent from './NewBlockComponent';





class NewBlockContainer extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    render(){
        return(
            <NewBlockComponent user={this.props.user} project={this.props.project} taskActions={this.props.taskActions} projectActions={this.props.projectActions}/>
        )
    }
}

function mapStateToProps (state) {
    return {
      user: state.userReducer,
      project: state.projectReducer
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      taskActions: bindActionCreators(taskActions, dispatch),
      projectActions: bindActionCreators(projectActions, dispatch),
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(NewBlockContainer);

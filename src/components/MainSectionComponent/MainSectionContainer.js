import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/userActions'
import MainSectionComponent from './MainSectionComponent';





class MainSectionContainer extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    render(){
        return(
            <MainSectionComponent user={this.props.user} task={this.props.task} project={this.props.project} />
        )
    }
}

function mapStateToProps (state) {
    return {
      user: state.userReducer,
      task: state.taskReducer,
      project: state.projectReducer
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      actions: bindActionCreators(userActions, dispatch)
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(MainSectionContainer);

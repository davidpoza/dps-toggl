import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/userActions'
import LoggedInfoComponent from './LoggedInfoComponent';





class LoggedInfoContainer extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    render(){
        return(
            <LoggedInfoComponent user={this.props.user} userActions={this.props.userActions}/>
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
      userActions: bindActionCreators(userActions, dispatch)
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(LoggedInfoContainer);

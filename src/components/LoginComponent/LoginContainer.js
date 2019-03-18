import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/userActions'
import LoginComponent from './LoginComponent';





class LoginContainer extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    render(){
        return(
            <LoginComponent user={this.props.user} actions={this.props.actions}/>
        )
    }
}

function mapStateToProps (state) {
    return {
      user: state.user
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      actions: bindActionCreators(userActions, dispatch)
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

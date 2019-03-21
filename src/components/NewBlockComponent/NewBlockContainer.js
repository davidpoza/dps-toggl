import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as taskActions from '../../actions/taskActions'
import NewBlockComponent from './NewBlockComponent';





class NewBlockContainer extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    render(){
        return(
            <NewBlockComponent user={this.props.user} actions={this.props.actions}/>
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
      actions: bindActionCreators(taskActions, dispatch)
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(NewBlockContainer);

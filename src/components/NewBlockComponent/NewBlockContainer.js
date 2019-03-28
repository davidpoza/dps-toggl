import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as taskActions from '../../actions/taskActions';
import * as projectActions from '../../actions/projectActions';
import * as tagActions from '../../actions/tagActions';
import NewBlockComponent from './NewBlockComponent';





class NewBlockContainer extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    render(){
        return(
            <NewBlockComponent user={this.props.user} project={this.props.project} tag={this.props.tag} tagActions={this.props.tagActions} taskActions={this.props.taskActions} projectActions={this.props.projectActions}/>
        )
    }
}

function mapStateToProps (state) {
    return {
      user: state.userReducer,
      project: state.projectReducer,
      tag: state.tagReducer
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      taskActions: bindActionCreators(taskActions, dispatch),
      projectActions: bindActionCreators(projectActions, dispatch),
      tagActions: bindActionCreators(tagActions, dispatch),
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(NewBlockContainer);

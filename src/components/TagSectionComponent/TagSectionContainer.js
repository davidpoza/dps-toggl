import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/userActions'
import * as taskActions from '../../actions/taskActions'
import * as projectActions from '../../actions/projectActions'
import * as tagActions from '../../actions/tagActions'

import TagSectionComponent from './TagSectionComponent';





class TagSectionContainer extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }

    render(){
        return(
            <TagSectionComponent 
            user={this.props.user}
            user_loading={this.props.user_loading}
            tag_loading={this.props.tag_loading}
            need_refreshing={this.props.need_refreshing}
            tags={this.props.tags}
            history={this.props.history}
            tagActions={this.props.tagActions}
            />
        )
    }
}

function mapStateToProps (state) {
    return {
      user: state.userReducer,
      need_refreshing: state.projectReducer.need_refreshing,
      user_loading: state.userReducer.loading,
      tag_loading: state.tagReducer.loading,
      tags: state.tagReducer.tags_id.map(t=>state.tagReducer.tags_entities[t]),
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
  
export default connect(mapStateToProps, mapDispatchToProps)(TagSectionContainer);

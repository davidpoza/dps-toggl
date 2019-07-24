import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as userActions from "../../actions/userActions";
import * as taskActions from "../../actions/taskActions";
import * as projectActions from "../../actions/projectActions";
import * as tagActions from "../../actions/tagActions";
import TimerSectionComponent from "./TimerSectionComponent";

class TimerSectionContainer extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <TimerSectionComponent
                user_loading={this.props.user_loading}
                task_loading={this.props.task_loading}
                project_loading={this.props.project_loading}
                tag_loading={this.props.tag_loading}
                userActions={this.props.userActions}
                taskActions={this.props.taskActions}
                projectActions={this.props.projectActions}
                tagActions={this.props.tagActions}/>
        );
    }
}

function mapStateToProps (state) {
    return {
        user_loading: state.userReducer.loading,
        task_loading: state.taskReducer.loading,
        project_loading: state.projectReducer.loading,
        tag_loading: state.tagReducer.loading
    };
}

function mapDispatchToProps (dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        taskActions: bindActionCreators(taskActions, dispatch),
        projectActions: bindActionCreators(projectActions, dispatch),
        tagActions: bindActionCreators(tagActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerSectionContainer);

import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as userActions from "../../actions/userActions";
import * as taskActions from "../../actions/taskActions";
import * as projectActions from "../../actions/projectActions";
import * as tagActions from "../../actions/tagActions";

import NewBlockComponent from "./NewBlockComponent";





class NewBlockContainer extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }
    render(){


        return(
            <NewBlockComponent
                ref={this.props.setRef}
                projects={this.props.projects}
                tags={this.props.tags}
                user={this.props.user}
                taskActions={this.props.taskActions}
                userActions={this.props.userActions}
                projectActions={this.props.projectActions}
                tagActions={this.props.tagActions}
            />
        );
    }
}

function mapStateToProps (state) {
    return {
        user: state.userReducer,
        projects: state.projectReducer.projects_id.map(e=>state.projectReducer.projects_entities[e]),
        tags: state.tagReducer.tags_id.map(e=>(state.tagReducer.tags_entities[e])),
        tasks_tags_entities: state.taskReducer.tasks_tags_entities,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
        projectActions: bindActionCreators(projectActions, dispatch),
        tagActions: bindActionCreators(tagActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBlockContainer);

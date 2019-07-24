import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import utils from "../../utils";
import * as userActions from "../../actions/userActions";
import * as taskActions from "../../actions/taskActions";
import * as projectActions from "../../actions/projectActions";
import * as tagActions from "../../actions/tagActions";

import ProjectSectionComponent from "./ProjectSectionComponent";


class ProjectSectionContainer extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ProjectSectionComponent
                user={this.props.user}
                user_loading={this.props.user_loading}
                project_loading={this.props.project_loading}
                need_refreshing={this.props.need_refreshing}
                projects={this.props.projects}
                history={this.props.history}
                projectActions={this.props.projectActions}
                order={this.props.order}
                sortBy={this.props.sortBy}
            />
        );
    }
}

function sortBy(field="name", order="asc"){
    if (field=="name")
        return(
            (a,b)=>{
                if(order == "asc")
                    return(a.name.localeCompare(b.name));
                else if(order == "desc")
                    return(b.name.localeCompare(a.name));
            });
    else if (field=="tasks")
        return(
            (a,b)=>{
                if(a.tasks.length > b.tasks.length) return order=="asc"?1:-1;
                else if (a.tasks.length < b.tasks.length) return order=="asc"?-1:1;
                else{ //si tienen mismo numero de tareas ordenamos alfabéticamente
                    return(a.name.localeCompare(b.name));
                }
            });
    else if (field=="hours")
        return(
            (a,b)=>{
                if(a.hours > b.hours) return order=="asc"?1:-1;
                else if (a.hours < b.hours) return order=="asc"?-1:1;
                else return 0;
            });
    else if (field=="date") //el formato estándar yyyy-mm-dd se ordena alfabéticamente
        return(
            (a,b)=>{
                if(order == "asc")
                    return(a.created_on.localeCompare(b.created_on));
                else if(order == "desc")
                    return(b.created_on.localeCompare(a.created_on));
            });
}

function mapStateToProps (state) {
    let projects = state.projectReducer.projects_id.map(p=>state.projectReducer.projects_entities[p])
        .sort(sortBy(state.projectReducer.sortBy, state.projectReducer.order));
    projects.forEach(p=>{ //hacemos el recuento de horas
        if(p.tasks)
            p.hours = p.tasks.reduce((prev, curr)=>{
                curr = utils.diffHoursBetHours(curr?curr.start_hour:"00:00:00", curr?curr.end_hour:"00:00:00");
                return(prev+curr);
            },0);
        else
            p.hours = 0;
    });
    return {
        user: state.userReducer,
        need_refreshing: state.projectReducer.need_refreshing,
        user_loading: state.userReducer.loading,
        project_loading: state.projectReducer.loading,
        projects: projects,
        order: state.projectReducer.order,
        sortBy: state.projectReducer.sortBy
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSectionContainer);

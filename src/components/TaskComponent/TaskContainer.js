import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as userActions from "../../actions/userActions";
import * as taskActions from "../../actions/taskActions";
import * as reportActions from "../../actions/reportActions";
import * as projectActions from "../../actions/projectActions";
import * as tagActions from "../../actions/tagActions";

import TaskComponent from "./TaskComponent";


class TaskContainer extends Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.children.length > 0){
            return(
                <div>
                    <TaskComponent
                        toggle_id={"toggle-"+this.props.task._id}
                        token={this.props.token}
                        user_id={this.props.user_id}
                        task={this.props.task}
                        child={false}
                        children={this.props.children}
                        projects={this.props.projects}
                        tags={this.props.tags}
                        tasks_entities={this.props.tasks_entities}
                        taskActions={this.props.taskActions}
                        reportActions={this.props.reportActions}
                        onResume={this.props.onResume || null}
                        container={this.props.container}
                    />
                    <div style={{display: "none"}} id={"toggle-"+this.props.task._id}>
                        <TaskComponent
                            token={this.props.token}
                            user_id={this.props.user_id}
                            task={this.props.task}
                            child={true}
                            projects={this.props.projects}
                            tags={this.props.tags}
                            tasks_entities={this.props.tasks_entities}
                            taskActions={this.props.taskActions}
                            reportActions={this.props.reportActions}
                            onResume={this.props.onResume || null}
                            limit={this.props.limit}
                            container={this.props.container}
                        />
                        {this.props.children.map((c,index)=>(
                            <TaskComponent
                                key={index}
                                token={this.props.token}
                                user_id={this.props.user_id}
                                task={c}
                                child={true}
                                projects={this.props.projects}
                                tags={this.props.tags}
                                tasks_entities={this.props.tasks_entities}
                                taskActions={this.props.taskActions}
                                reportActions={this.props.reportActions}
                                onResume={this.props.onResume || null}
                                limit={this.props.limit}
                                container={this.props.container}
                            />
                        ))}

                    </div>
                </div>
            );
        }
        else{
            return(
                <TaskComponent
                    token={this.props.token}
                    user_id={this.props.user_id}
                    task={this.props.task}
                    child={false}
                    children={null}
                    projects={this.props.projects} //to call ProjectSelectorComponent
                    tags={this.props.tags}
                    tasks_entities={this.props.tasks_entities}
                    taskActions={this.props.taskActions}
                    reportActions={this.props.reportActions}
                    onResume={this.props.onResume || null}
                    limit={this.props.limit}
                    skip={this.props.skip}
                    container={this.props.container}
                />
            );
        }
    }
}

function mapStateToProps (state, props) {
    //denormalizacion
    let task = Object.assign({}, props.tasks_entities[props.task_id]);
    task.tags = task.tags.map(t=>{
        return props.tasks_tags_entities[t]; //tasks_tags_entities está cargado porque lo pide un componente hermano
    },this);
    if(props.container == "TaskDatesReportComponent")
        task.project = state.reportReducer.projects_entities?state.reportReducer.projects_entities[task.project]:null;
    else
        task.project = state.taskReducer.projects_entities?state.taskReducer.projects_entities[task.project]:null;

    let children = props.task_children.map(t=>{
        t=Object.assign({}, props.tasks_entities[t._id]);
        t.tags = t.tags.map(t=>{
            return props.tasks_tags_entities[t]; //tasks_tags_entities está cargado porque lo pide un componente hermano
        },this);
        t.project = state.projectReducer.projects_entities?state.projectReducer.projects_entities[t.project]:null;
        return t;
    });

    let projects = props.container == "TaskDatesReportComponent" ? state.reportReducer.projects_id.map(e=>state.reportReducer.projects_entities[e]):
        state.projectReducer.projects_id.map(e=>state.projectReducer.projects_entities[e]); //cambiarlo por taskReducer, donde normalizando guardaremos las entidades

    //we filter projects to keep only those which are owned by task owner or those which task owner is member of

    projects = projects.filter(p=>p.owner == task.user._id || p.members.includes(task.user._id));

    return {
        token: state.userReducer.token,
        task: task,
        children: children,

        user_id: task.user._id,

        tasks_entities:  props.tasks_entities,

        tags: props.container == "TaskDatesReportComponent" ? state.reportReducer.tags_id.map(e=>state.reportReducer.tags_entities[e]):
            state.tagReducer.tags_id.map(e=>state.tagReducer.tags_entities[e]),
        tasks_tags_entities: props.tasks_tags_entities,

        projects: projects, // to call ProjectSelectorComponent

        projects_entities: props.container == "TaskDatesReportComponent" ? state.reportReducer.projects_entities:
            state.projectReducer.projects_entities,
        limit: props.limit
    };
}

function mapDispatchToProps (dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        taskActions: bindActionCreators(taskActions, dispatch),
        reportActions: bindActionCreators(reportActions, dispatch),
        projectActions: bindActionCreators(projectActions, dispatch),
        tagActions: bindActionCreators(tagActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);

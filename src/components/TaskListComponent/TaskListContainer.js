import React, {Component} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as userActions from "../../actions/userActions";
import * as taskActions from "../../actions/taskActions";
import * as projectActions from "../../actions/projectActions";
import * as tagActions from "../../actions/tagActions";
import TaskListComponent from "./TaskListComponent";


class TaskListContainer extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <TaskListComponent
                container={this.props.container}
                token={this.props.token}
                tasks={this.props.tasks}
                tasks_entities={this.props.tasks_entities}
                tasks_tags_entities={this.props.tasks_tags_entities}
                projects_entities={this.props.projects_entities}
                projects_id={this.props.projects_id}
                tags_id={this.props.tags_id}
                limit={this.props.limit}
                skip={this.props.skip}
                onResume={this.props.onResume || null}
            />
        );
    }
}

function mapStateToProps (state, props) {
    let tasks = props.dates_entities[props.date].tasks;
    tasks = tasks.sort((a,b)=>{
        let task_a = props.tasks_entities[a];
        let task_b = props.tasks_entities[b];
        return task_b.start_hour.localeCompare(task_a.start_hour);
    });
    //aqui tengo que componer las tareas con igual desc e igual proyecto
    //los que tienen parent:-1 son padres, todos son padres inicialmente

    tasks = tasks.map(t=>({_id:t, parent:-1, user:props.tasks_entities[t].user._id}));

    for(let i=0; i<tasks.length; i++){
        for(let j=i+1; j<tasks.length; j++){
            let task_a = props.tasks_entities[tasks[i]._id];
            let task_b = props.tasks_entities[tasks[j]._id];
            if(tasks[i].parent == -1 && task_a.desc == task_b.desc &&
          task_a.project == task_b.project ){
                tasks[j].parent = task_a._id;
            }
        }
    }

    let compound_tasks = tasks.map(t=>({id:t._id, parent:t.parent, children:tasks.filter(child=>child.parent == t._id && child.user == t.user)}));

    return {
        token: state.userReducer.token,
        tasks: compound_tasks,
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer);

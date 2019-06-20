import React, {Component} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/userActions'
import * as taskActions from '../../actions/taskActions'
import * as projectActions from '../../actions/projectActions'
import * as tagActions from '../../actions/tagActions'

import TaskComponent from './TaskComponent';


class TaskContainer extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

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
            onResume={this.props.onResume}
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
              onResume={this.props.onResume}
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
                onResume={this.props.onResume}
                />
              ))}

            </div>
            </div>
          )
        }
        else{
          return(
            <TaskComponent
            token={this.props.token}
            user_id={this.props.user_id}
            task={this.props.task}
            child={false}
            children={null}
            projects={this.props.projects}
            tags={this.props.tags}
            tasks_entities={this.props.tasks_entities}
            taskActions={this.props.taskActions}
            onResume={this.props.onResume}
            />
          )
        }
    }
}

function mapStateToProps (state, props) {
    //denormalizacion
    let task = Object.assign({}, state.taskReducer.tasks_entities[props.task_id]);
    task.tags = task.tags.map(t=>{
      return state.taskReducer.tasks_tags_entities[t]; //tasks_tags_entities está cargado porque lo pide un componente hermano
    },this);
    task.project = state.projectReducer.projects_entities?state.projectReducer.projects_entities[task.project]:null; //projects_entities está cargado porque lo pide un componente hermano

    let children = props.task_children.map(t=>{
      t=Object.assign({}, state.taskReducer.tasks_entities[t._id]);
      t.tags = t.tags.map(t=>{
        return state.taskReducer.tasks_tags_entities[t]; //tasks_tags_entities está cargado porque lo pide un componente hermano
      },this);
      t.project = state.projectReducer.projects_entities?state.projectReducer.projects_entities[t.project]:null;
      return t;
    });

    return {
      token: state.userReducer.token,
      task: task,
      children: children,
      user_id: state.userReducer.id,
      tasks_entities:  state.taskReducer.tasks_entities,
      tags_entities: state.tagReducer.tags_entities,
      tags: state.tagReducer.tags_id.map(e=>{
        return state.tagReducer.tags_entities[e];
      }),
      tasks_tags_entities: state.taskReducer.tasks_tags_entities,
      projects: state.projectReducer.projects_id.map(e=>state.projectReducer.projects_entities[e]),
      projects_entities: state.projectReducer.projects_entities
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);

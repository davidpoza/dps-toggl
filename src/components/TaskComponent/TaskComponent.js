import React, {Component} from 'react'

import utils from '../../utils'
import styles from './TaskComponent.scss';
import ProjectSelectorComponent from '../ProjectSelectorComponent/ProjectSelectorComponent';



class TaskComponent extends Component{
    constructor(props){
        super(props);
        this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
        this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnDelete = this.handleOnDelete.bind(this);
        this.handleOnChangeProject = this.handleOnChangeProject.bind(this);

        this.state = {
            hide_btns: true
        }
    }

    handleOnClick(){
        this.setState(
            {
                hide_btns: this.state.hide_btns?true:false
            }
        );
    }

    handleOnMouseOver(){
        if(this.state.hide_btns)
            this.setState(
                {
                    hide_btns: false
                }
            );
    }

    handleOnMouseOut(){
        if(!this.state.hide_btns)
        this.setState(
            {
                hide_btns: true
            }
        );
    }

    handleOnDelete(e){
        this.props.actions.deleteTask(this.props.token, this.props.task.id);
        let task_id = e.target.id.match(/btn-delete-(\d{0,4})/)[1];
        this.props.onDeleteFromList(task_id);
    }

    handleOnChangeProject(e){
        let project = {};        
        if(e.target.id=="project0")
            project = null
        else{
            project.id = e.target.id.match(/project(\d{0,4})/)[1];
            project.color = window.getComputedStyle(e.target.childNodes[0]).color;
            project.name = e.target.innerText;
        }
        this.props.actions.updateTask(this.props.token, this.props.task.id, this.props.task.desc, this.props.task.date_start, this.props.task.date_end, project!=null? project.id:null, null);
        this.props.onUpdate(this.props.task.id, this.props.task.desc, this.props.task.date_start, this.props.task.date_end, project, null);
    }

    render(){
        return(
            <li className={"d-flex " + styles.task } onClick={utils.isMobile() ? this.handleOnClick : undefined} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut}>
                <div className={"flex-grow-1 " + styles.desc}>
                {!utils.isMobile()?this.props.task.desc:this.props.task.desc.substring(0,10)}
                {utils.isMobile() && this.props.task.desc.length>10 && "..."}
                    {this.props.task.project!=null ?
                    <ProjectSelectorComponent onClick={this.handleOnChangeProject} project_selected_name={this.props.task.project.name} project_selected_color={this.props.task.project.color} projects={this.props.projects}/>
                    :
                    <ProjectSelectorComponent onClick={this.handleOnChangeProject} project_selected_name={null} project_selected_color={null} projects={this.props.projects}/>
                    //<span style={{color: this.props.task.project.color}} className={styles.label}><i className="fas fa-circle"></i> {this.props.task.project.name}</span>
                    }
                </div>                
                {!utils.isMobile() && <div className={styles.dates}>{utils.getHour(this.props.task.date_start)} - {utils.getHour(this.props.task.date_end)}</div>}                
                <div className={styles.dates}>{utils.diffHoursBetDates(this.props.task.date_start, this.props.task.date_end)}</div>
                <div><button style={this.state.hide_btns?{opacity:0}:{opacity:1}} className={styles.btn}><i className="fas fa-play"></i></button></div>
                <div><button style={this.state.hide_btns?{opacity:0}:{opacity:1}} className={styles.btn} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></button>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" id={"btn-delete-"+this.props.task.id} onClick={this.handleOnDelete}>Borrar</a>
                        <a className="dropdown-item">Duplicar</a>
                    </div>
                </div>
                    
                
            </li>
        )
    }
}

export default TaskComponent;
import React, {Component} from 'react'
import utils from '../../utils'

import styles from './NewBlockComponent.scss';
import ChronometerComponent from '../ChronometerComponent/ChronometerComponent';
import ProjectSelectorComponent from '../ProjectSelectorComponent/ProjectSelectorComponent';



class NewBlockComponent extends Component{
    constructor(props){
        super(props);

        this.handleOnClickCronoMode = this.handleOnClickCronoMode.bind(this);
        this.handleOnClickManualMode = this.handleOnClickManualMode.bind(this);
        this.handleOnClickCreate = this.handleOnClickCreate.bind(this);
        this.handleOnClickStart = this.handleOnClickStart.bind(this);
        this.handleOnClickReset = this.handleOnClickReset.bind(this);
        this.incCounter = this.incCounter.bind(this);
        this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
        this.handleOnClickProjectSelector = this.handleOnClickProjectSelector.bind(this);

        this.state = {
            placeholder: "¿En qué vas a trabajar?",
            description: "",
            mode: "chrono",
            time: 0, //seconds,
            chrono_status: "paused", //paused, running
            set_interval: null,
            project_selected_name: null,
            project_selected_color: null,
            project_selected_id: null,
            projects: []
        };        
    }

    componentDidMount(){
        $('#btn-chrono-mode').popover({content: "Modo cronómetro", trigger: "hover"});
        $('#btn-manual-mode').popover({content: "Modo manual", trigger: "hover"});
        $('#btn-chrono-reset').popover({content: "Parar cuenta y borrar tarea", trigger: "hover"});
        this.props.projectActions.fetchProjects(this.props.user.token);
    }

    componentWillUnmount(){
        if(this.state.set_interval != null)
            clearInterval(this.state.set_interval)
    }

    handleOnClickProjectSelector(e){
        if(e.target.id=="project0")
        {
            this.setState({
                project_selected_name: null,
                project_selected_color:null,
                project_selected_id:null
            });
        }
        else if(e.target.id){
            let project_id = e.target.id.match(/project(\d{0,4})/)[1];
            this.setState({
                project_selected_name: e.target.innerText,
                project_selected_color: window.getComputedStyle(e.target.childNodes[0]).color,
                project_selected_id: project_id
            });
        }
    }


    handleOnClickCronoMode(){
        this.setState({
            mode: "chrono",
            placeholder: "¿En qué vas a trabajar?"
        });
    }

    handleOnClickManualMode(){
        this.setState({
            mode: "manual",
            placeholder: "¿En qué has estado trabajando?"
        });
    }
    
    handleOnClickCreate(){

    }

    handleOnClickReset(){
        this.setState({
            placeholder: "¿En qué vas a trabajar?",
            time: 0,
            description: "",
            chrono_status: "paused",
            project_selected_name: null,
            project_selected_color: null,
            project_selected_id: null
        });
    }

    incCounter(){
        if(this.state.chrono_status == "running")
            this.setState({
                time: this.state.time + 1
            })
    }

    handleOnClickStart(){
        if(this.state.chrono_status == "paused"){
            this.setState({
                chrono_status: "running"
            })            
        }
        else if(this.state.chrono_status == "running"){            
            let date_end = new Date();
            let date_start = new Date(date_end - this.state.time*1000);
            let formated_date_start = utils.standarizeDate(date_start);
            let formated_date_end = utils.standarizeDate(date_end);
            this.props.taskActions.createTask(this.props.user.token, this.state.description, formated_date_start, formated_date_end, this.state.project_selected_id, [2,3]);

            
            this.setState({
                chrono_status: "paused",
                time: 0,
                description: ""
            });
        }
        if(this.state.set_interval == null){
            this.setState({
                set_interval: setInterval(this.incCounter, 1000)
            });
        }
    }

    handleOnChangeInput(e){
        this.setState({
            description: e.target.value
        });
    }

    render(){
        return(

            <div className={"d-flex w-100 " + styles.box}>
                <div className={"flex-grow-1"}>
                    <input className={styles.description} id="task-description" onChange={this.handleOnChangeInput} placeholder={this.state.placeholder} value={this.state.description}></input>
                </div>
                <div className="d-flex align-items-center">
                   <ProjectSelectorComponent onClick={this.handleOnClickProjectSelector} project_selected_name={this.state.project_selected_name} project_selected_color={this.state.project_selected_color} projects={this.props.project.projects}/>
                </div>
                <div className="d-flex align-items-center">
                { this.state.mode == "chrono" ?
                    <ChronometerComponent time={this.state.time} />:
                    <div></div>
                }
                </div>               
                <div className="d-flex align-items-center">
                    <button id="btn-create-block" className={this.state.chrono_status=="running"? styles.btn_stop:styles.btn_create} onClick={
                        this.state.mode == "chrono" ? this.handleOnClickStart : this.handleOnClickCreate
                    }>
                        { this.state.mode == "chrono" ?
                            (this.state.chrono_status == "paused" ? <i className="fas fa-play-circle"></i>:<i className="fas fa-stop-circle"></i>): 
                            (<i className="fas fa-check-circle"></i>)
                        }                        
                    </button>
                </div>
                <div className="d-flex align-items-center">
                    <div className="d-flex flex-column">
                        <button id="btn-chrono-reset" style={this.state.chrono_status == "running" ? {display:"block"}:{display:"none"}} className={styles.btn} onClick={this.handleOnClickReset}><i className="fas fa-trash"></i></button>
                        <button id="btn-chrono-mode" style={this.state.chrono_status == "paused" ? {display:"block"}:{display:"none"}} className={this.state.mode=="chrono"? styles.btn_active:styles.btn} onClick={this.handleOnClickCronoMode}><i className="fas fa-stopwatch"></i></button>
                        <button id="btn-manual-mode" style={this.state.chrono_status == "paused" ? {display:"block"}:{display:"none"}} className={this.state.mode=="manual"? styles.btn_active:styles.btn} onClick={this.handleOnClickManualMode}><i className="fas fa-align-justify"></i></button>
                    </div>

                </div>
            </div>

        )
    }
}

export default NewBlockComponent;
import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';


import styles from './NewBlockComponent.scss';
import ChronometerComponent from '../ChronometerComponent/ChronometerComponent';



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

        this.state = {
            placeholder: "¿En qué vas a trabajar?",
            description: "",
            mode: "chrono",
            time: 0, //seconds,
            chrono_status: "paused", //paused, running
            set_interval: null
        };        
    }

    componentDidMount(){
        $('#btn-chrono-mode').popover({content: "Modo cronómetro", trigger: "hover"});
        $('#btn-manual-mode').popover({content: "Modo manual", trigger: "hover"});
        $('#btn-chrono-reset').popover({content: "Parar cuenta y borrar tarea", trigger: "hover"});
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
            chrono_status: "paused"
        });
    }

    incCounter(){
        if(this.state.chrono_status == "running")
            this.setState({
                time: this.state.time + 1
            })
    }

    handleOnClickStart(){
        function pad (str, max) {
            str = str.toString();
            return str.length < max ? pad("0" + str, max) : str;
        }
        if(this.state.chrono_status == "paused"){
            this.setState({
                chrono_status: "running"
            })            
        }
        else if(this.state.chrono_status == "running"){            
            let date_end = new Date();
            let date_start = new Date(date_end - this.state.time*1000);
            let formated_date_start = `${date_start.getFullYear()}-${pad(date_start.getMonth(),2)}-${pad(date_start.getDay(),2)} ${pad(date_start.getHours(),2)}:${pad(date_start.getMinutes(),2)}:${pad(date_start.getSeconds(),2)}`;
            let formated_date_end = `${date_end.getFullYear()}-${pad(date_end.getMonth(),2)}-${pad(date_end.getDay(),2)} ${pad(date_end.getHours(),2)}:${pad(date_end.getMinutes(),2)}:${pad(date_end.getSeconds(),2)}`;
            console.log(formated_date_start);
            console.log(formated_date_end);
            this.props.actions.createTask(this.props.user.token, this.state.description, formated_date_start, formated_date_end, 1, [2,3]);
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
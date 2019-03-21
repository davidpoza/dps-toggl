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
        this.incCounter = this.incCounter.bind(this);

        this.state = {
            placeholder: "¿En qué vas a trabajar?",
            mode: "chrono",
            time: 0, //seconds,
            chrono_status: "paused", //paused, running
            set_interval: null
        };        
    }

    componentDidMount(){
        $('#btn-chrono-mode').popover({content: "Modo cronómetro", trigger: "hover"});
        $('#btn-manual-mode').popover({content: "Modo manual", trigger: "hover"})
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

    incCounter(){
        if(this.state.chrono_status == "running")
            this.setState({
                time: this.state.time + 1
            })
    }

    handleOnClickStart(){
        if(this.state.chrono_status == "paused")
            this.setState({
                chrono_status: "running"
            });
        else if(this.state.chrono_status == "running")
            this.setState({
                chrono_status: "paused"
            });
        if(this.state.set_interval == null){
            this.setState({
                set_interval: setInterval(this.incCounter, 1000)
            });
        }
    }

    render(){
        return(

            <div className={"d-flex w-100 " + styles.box}>
                <div className={"flex-grow-1"}>
                    <input className={styles.description} id="task-description" placeholder={this.state.placeholder}></input>
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
                <div className="d-flex flex-column">
                    <button id="btn-chrono-mode" className={this.state.mode=="chrono"? styles.btn_active:styles.btn} onClick={this.handleOnClickCronoMode}><i className="fas fa-stopwatch"></i></button>
                    <button id="btn-manual-mode" className={this.state.mode=="manual"? styles.btn_active:styles.btn} onClick={this.handleOnClickManualMode}><i className="fas fa-align-justify"></i></button>
                </div>
            </div>

        )
    }
}

export default NewBlockComponent;
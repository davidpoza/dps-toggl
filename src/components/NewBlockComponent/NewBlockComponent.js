import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';


import styles from './NewBlockComponent.scss';



class NewBlockComponent extends Component{
    constructor(props){
        super(props);

        this.handleOnClickCronoMode = this.handleOnClickCronoMode.bind(this);
        this.handleOnClickManualMode = this.handleOnClickManualMode.bind(this);
        this.handleOnClickCreate = this.handleOnClickCreate.bind(this);

        this.state = {
            placeholder: "¿En qué vas a trabajar?",
            mode: "chrono"
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

    render(){
        return(

            <div className={"d-flex w-100 " + styles.box}>
                <div className={"flex-grow-1"}>
                    <input className={styles.description} id="task-description" placeholder={this.state.placeholder}></input>
                </div>
                <div className="d-flex align-content-center p-10">
                    <button id="btn-create-block" className={styles.btn_create} onClick={this.handleOnClickCreate}><i class="fas fa-check-circle"></i></button>
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
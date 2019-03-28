import React, {Component} from 'react'
import utils from '../../utils'

import styles from './NewBlockComponent.scss';
import ChronometerComponent from '../ChronometerComponent/ChronometerComponent';
import ProjectSelectorComponent from '../ProjectSelectorComponent/ProjectSelectorComponent';
import TagSelectorComponent from '../TagSelectorComponent/TagSelectorComponent';
import ManualComponent from '../ManualComponent/ManualComponent';



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
        this.handleOnClickTagSelector = this.handleOnClickTagSelector.bind(this);        
        this.handleHourChange = this.handleHourChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);

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
            tags: [], // listado de ids de tags marcados
            start_date: new Date(),            
            start_hour: null, // solo modo manual. hora de inicio en HH:MM
            end_hour: null // solo modo manual. hora de fin en HH:MM
        };        
    }

    componentDidMount(){
        this.start = new Date(Date.now());
        this.end = new Date();
        this.end.setHours(this.start.getHours()+1);
        this.setState({
            start_hour: utils.getHourFromDate(this.start),
            end_hour: utils.getHourFromDate(this.end)
        });
        if(!utils.isMobile()){ //en móvil no existe hover y se queda fijo, asi que no lo aplico en ese caso
            $('#btn-chrono-mode').popover({content: "Modo cronómetro", trigger: "hover"});
            $('#btn-manual-mode').popover({content: "Modo manual", trigger: "hover"});
            $('#btn-chrono-reset').popover({content: "Parar cuenta y borrar tarea", trigger: "hover"});
        }        
        
    }

    componentWillMount(){
        this.props.projectActions.fetchProjects(this.props.user.token);
        this.props.tagActions.fetchTags(this.props.user.token);
    }

    componentWillUnmount(){
        if(this.state.set_interval != null)
            clearInterval(this.state.set_interval)
    }

    /** Al producirse un click en un proyecto del dropdown del ProjectSelectorComponent */
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

    /** Al producirse un click en un checkbox de tag del dropdown del TagSelectorComponent */
    handleOnClickTagSelector(e){
        let tag_id = parseInt(e.target.id.match(/tag(\d{0,4})/)[1]);
        let array_tags = this.state.tags;
        if(!array_tags.includes(tag_id)){ //si no estaba marcado lo apuntamos en la lista
            array_tags.push(parseInt(tag_id));            
        }
        else{
            array_tags.splice(array_tags.indexOf(tag_id), 1); //pero si ya estaba marcado lo borramos de la lista
        }
        this.setState({
            tags: array_tags
        });
    }

    /** Al producirse un cambio en el input de la hora inicio o fin del componente ManualComponent */
    handleHourChange(e) {
        let regex = /^\d{0,2}:\d{0,2}$/;
        if(e.target.id == "start_hour"){
            if(e.target.value.match(regex))
                this.setState({
                    start_hour: e.target.value          
                });
        }
        else if(e.target.id == "end_hour"){
            if(e.target.value.match(regex))
                this.setState({
                    end_hour: e.target.value          
                });
        }
        
    }

    /** Al hacer click en botón de modo cronómetro */
    handleOnClickCronoMode(){
        this.setState({
            mode: "chrono",
            placeholder: "¿En qué vas a trabajar?"
        });
    }

    /** Al hacer click en botón de modo manual */
    handleOnClickManualMode(){
        this.setState({
            mode: "manual",
            placeholder: "¿En qué has estado trabajando?"
        });
    }
    
    /** Al cambiar la fecha en el selector de tipo calendario del componente DatePicker */
    handleDateChange(date) {
        this.setState({
          start_date: date          
        });
    }

    /** Al hacer click en el botón crear tarea del modo manual.
     * LLama a un action creator asíncrono para crear la tarea
    */
    handleOnClickCreate(){
        let start_date = new Date(this.state.start_date);
        let formated_date_start = utils.standarizeDate(start_date).slice(0,-9); //quitamos hh:mm:ss
        let formated_date_end = utils.standarizeDate(start_date).slice(0,-9); 

        if(utils.validateHour(this.state.start_hour) && utils.validateHour(this.state.end_hour)){
            if(utils.hourIsGreater(this.state.end_hour,this.state.start_hour)){
                formated_date_start = formated_date_start + " " + utils.getHour(this.state.start_hour) + ":" + utils.getMinutes(this.state.start_hour) + ":00";
                formated_date_end = formated_date_end + " " + utils.getHour(this.state.end_hour) + ":" + utils.getMinutes(this.state.end_hour) + ":00";        
                this.props.taskActions.createTask(this.props.user.token, this.state.description, formated_date_start, formated_date_end, this.state.project_selected_id, [2,3]);
                this.setState({
                    description: "",
                    project_selected_name: null,
                    project_selected_color: null,
                    project_selected_id: null,
                });
            }
            else{
                this.props.taskActions.createTaskError({message:"Ending hour must occur after starting hour."});
            }           
        }
        else{
            this.props.taskActions.createTaskError({message:"Invalid hour format. Must be 24h and HH:MM"});
        }
        
    }

    /** Al hacer click en el botón reset/borrar cuando estamos en modo cronómetros y hay una cuenta en marcha. */
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

    /** Se ejecuta en cada disparo del timer de intervalo configurado en el this.state.set_interval */
    incCounter(){
        if(this.state.chrono_status == "running")
            this.setState({
                time: this.state.time + 1
            })
    }

    /** Al hacer click en el botón empezar cuenta cuando estamos en el modo cronómetro.
     * LLama a un action creator asíncrono para crear la tarea
    */
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

    /** Se ejecuta cada vez que modificamos el input de descripción de nueva tarea */
    handleOnChangeInput(e){
        this.setState({
            description: e.target.value
        });
    }

    render(){
        return(
            <div className="container-flex" >
                <div className={"row align-items-center justify-content-between " + styles.box} >

                        <div className="col-8 col-sm-9 col-md-10 col-lg order-1 order-lg-1 p-0">
                            <input className={styles.description} id="task-description" autoComplete="false" onChange={this.handleOnChangeInput} placeholder={this.state.placeholder} value={this.state.description}></input>
                        </div>
                        <div className="col-1 col-lg-auto order-4 order-lg-2 p-1">
                        <ProjectSelectorComponent onClick={this.handleOnClickProjectSelector} project_selected_name={this.state.project_selected_name} project_selected_color={this.state.project_selected_color} projects={this.props.project.projects}/>
                        </div>
                        <div className="col-1 col-lg-auto order-5 order-lg-3 p-1">
                        <TagSelectorComponent onClick={this.handleOnClickTagSelector} selected_tags={this.state.tags} tags={this.props.tag.tags}/>
                        </div>
                        <div className="col col-lg-auto order-6 order-lg-4">
                        { this.state.mode == "chrono" ?
                            <ChronometerComponent time={this.state.time} />:
                            <ManualComponent handleDateChange={this.handleDateChange} handleHourChange={this.handleHourChange} start_date={this.state.start_date} start_hour={this.state.start_hour} end_hour={this.state.end_hour}/>
                        }
                        </div>
                        
                        <div className="col-auto col-lg-auto order-3 order-lg-5 p-0 d-flex">

                                    <button id="btn-create-block" className={this.state.chrono_status=="running"? styles.btn_stop:styles.btn_create} onClick={
                                        this.state.mode == "chrono" ? this.handleOnClickStart : this.handleOnClickCreate
                                    }>
                                        { this.state.mode == "chrono" ?
                                            (this.state.chrono_status == "paused" ? <i className="fas fa-play-circle"></i>:<i className="fas fa-stop-circle"></i>): 
                                            (<i className="fas fa-check-circle"></i>)
                                        }                        
                                    </button>
                                    <div className="d-flex flex-column">
                                        <button id="btn-chrono-reset" style={this.state.chrono_status == "running" ? {display:"block"}:{display:"none"}} className={styles.btn} onClick={this.handleOnClickReset}><i className="fas fa-trash"></i></button>
                                        <button id="btn-chrono-mode" style={this.state.chrono_status == "paused" ? {display:"block"}:{display:"none"}} className={this.state.mode=="chrono"? styles.btn_active:styles.btn} onClick={this.handleOnClickCronoMode}><i className="fas fa-stopwatch"></i></button>
                                        <button id="btn-manual-mode" style={this.state.chrono_status == "paused" ? {display:"block"}:{display:"none"}} className={this.state.mode=="manual"? styles.btn_active:styles.btn} onClick={this.handleOnClickManualMode}><i className="fas fa-align-justify"></i></button>
                                    </div>

                        </div>
                         
                        
                </div>
            </div>
        )
    }
}

export default NewBlockComponent;
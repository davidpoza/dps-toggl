import React, {Component} from 'react';
import PropTypes from 'prop-types';

import utils from '../../utils';
import config from '../../config/config';
import lang from '../../config/lang';

import styles from './NewBlockComponent.scss';
import ChronometerComponent from '../ChronometerComponent/ChronometerComponent';
import ProjectSelectorComponent from '../ProjectSelectorComponent/ProjectSelectorComponent';
import ValueSelectorComponent from '../ValueSelectorComponent/ValueSelectorComponent';
import TagSelectorComponent from '../TagSelectorComponent/TagSelectorComponent';
import ManualComponent from '../ManualComponent/ManualComponent';



class NewBlockComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            placeholder: lang[config.lang].desc_placeholder_chrono_mode,
            description: "",
            mode: "chrono",
            time: 0, //seconds,
            chrono_status: "paused", //paused, running
            set_interval: null,
            project_selected_name: null,
            project_selected_color: null,
            project_selected_id: null,
            tags: [], // listado los id de los tag que hemos seleccionado
            start_date: new Date(),    //borrar
            start_hour: this.props.user.current_task_start_hour,
            end_hour: null,
            hour_value: 0,
            date: new Date(),

        };

        this.chronoResetBtn = React.createRef();
        this.chronoModeBtn = React.createRef();
        this.manualModeBtn = React.createRef();
        this.NewBlockComponent = React.createRef();
        this.createBtn = React.createRef();

        this.handleOnClickCronoMode = this.handleOnClickCronoMode.bind(this);
        this.handleOnClickManualMode = this.handleOnClickManualMode.bind(this);
        this.handleOnClickCreate = this.handleOnClickCreate.bind(this);
        this.handleOnClickStart = this.handleOnClickStart.bind(this);
        this.handleOnClickReset = this.handleOnClickReset.bind(this);
        this.incCounter = this.incCounter.bind(this);
        this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
        this.handleOnClickProjectSelector = this.handleOnClickProjectSelector.bind(this);
        this.handleOnClickTagSelector = this.handleOnClickTagSelector.bind(this);
        this.handleOnChangeHourValue = this.handleOnChangeHourValue.bind(this);
        this.handleHourChange = this.handleHourChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.resumeTask = this.resumeTask.bind(this);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    }


    componentDidMount(){
        if(this.state.start_hour != null)
            this.handleOnClickStart();
        else
            this.updateStartEndHours();
        if(!utils.isMobile()){ //en móvil no existe hover y se queda fijo, asi que no lo aplico en ese caso
            $(this.chronoModeBtn.current).popover({content: lang[config.lang].hover_chrono_mode, trigger: "hover"});
            $(this.manualModeBtn.current).popover({content: lang[config.lang].hover_manual_mode, trigger: "hover"});
            $(this.chronoResetBtn.current).popover({content: lang[config.lang].hover_stop_chrono, trigger: "hover"});
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.tags != this.props.tags){
            //le añadimos la propiedad checked al objeto tag que viene de la api
            this.setState({
                tags: this.props.tags //hacemos una copia del array con todos los tags que viene de un thunk de redux
            })
        }
    }

    componentWillMount(){
        this.props.projectActions.fetchUserProjects(this.props.user.token);
        this.props.tagActions.fetchUserTags(this.props.user.token);
    }

    /**hay que ir limpiando los setInterval para que no se acumulen según navegamos entre routes */
    componentWillUnmount(){
        if(this.state.set_interval != null)
            clearInterval(this.state.set_interval)
    }

    updateStartEndHours(){
        this.start = new Date(Date.now());
        this.end = new Date();
        this.end.setHours(this.start.getHours()+1);
        this.setState({
            start_hour: utils.getHourFromDate(this.start),
            end_hour: utils.getHourFromDate(this.end)
        });
    }

    /** Al producirse un click en un proyecto del dropdown del ProjectSelectorComponent */
    handleOnClickProjectSelector(project_id, project_name, project_color){
        if(project_id==-1)
        {
            this.setState({
                project_selected_name: null,
                project_selected_color:null,
                project_selected_id:null
            });
        }
        else{
            this.setState({
                project_selected_name: project_name,
                project_selected_color: project_color,
                project_selected_id: project_id
            });
        }
    }

    /** Al producirse un click en un checkbox de tag del dropdown del TagSelectorComponent */
    handleOnClickTagSelector(tag_id){
        let array_tags = this.state.tags.slice();
        for(let i=0; i<array_tags.length;i++){
            if(array_tags[i]._id == tag_id)
                array_tags[i].checked = array_tags[i].checked ? false: true;
        }
        this.setState({
            tags: array_tags
        });
    }

    //recupera el valor de importe por hora que asignamos a la tarea a través de ValueSelectorComponent
    handleOnChangeHourValue(value){
        this.setState({
            hour_value: value
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
            placeholder: lang[config.lang].desc_placeholder_chrono_mode
        });
        this.createBtn.current.disabled = false;
    }

    /** Al hacer click en botón de modo manual */
    handleOnClickManualMode(){
        this.setState({
            mode: "manual",
            placeholder: lang[config.lang].desc_placeholder_manual_mode
        });
        if(this.state.description == "")
            this.createBtn.current.disabled = true;
        else
            this.createBtn.current.disabled = false;
        this.updateStartEndHours();
    }

    /** Al cambiar la fecha en el selector de tipo calendario del componente DatePicker */
    handleDateChange(date) {
        this.setState({
          date: date
        });
    }

    /** Al hacer click en el botón crear tarea del modo manual.
     * LLama a un action creator asíncrono para crear la tarea
    */
    handleOnClickCreate(){
        if(this.state.description != "")
            if(utils.validateHour(this.state.start_hour) && utils.validateHour(this.state.end_hour)){
                if(utils.hourIsGreater(this.state.end_hour,this.state.start_hour)){
                    this.props.taskActions.createTask(this.props.user.token, this.state.description, utils.standarizeDate(this.state.date), this.state.start_hour+":00", this.state.end_hour+":00", this.state.project_selected_id, this.state.tags, this.state.hour_value, this.props.user.id);
                    this.setState({
                        description: "",
                        project_selected_name: null,
                        project_selected_color: null,
                        project_selected_id: null,
                        hour_value: 0,
                        tags: this.props.tags.map((e)=>{
                            e.checked = false;
                            return e;
                        })
                    });
                    this.createBtn.current.disabled = true;
                }
                else{
                    this.props.taskActions.createTaskError({message:lang[config.lang].err_end_hour_before});
                }
            }
            else{
                this.props.taskActions.createTaskError({message:lang[config.lang].err_hour_format});
            }
    }

    /** Al hacer click en el botón reset/borrar cuando estamos en modo cronómetros y hay una cuenta en marcha. */
    handleOnClickReset(){
        this.setState({
            placeholder: lang[config.lang].desc_placeholder_chrono_mode,
            time: 0,
            description: "",
            chrono_status: "paused",
            project_selected_name: null,
            project_selected_color: null,
            project_selected_id: null,
            hour_value: 0,
            start_hour: null,
            tags: this.props.tags.map((e)=>{ //desmarco todos los tags
                e.checked = false;
                return e;
            })
        });
        document.title = config.app_title;
        this.createBtn.current.disabled = false;
        let update = {};
        update["current_task_start_hour"] = null;
        this.props.userActions.updateUser(this.props.user.token, this.props.user.id, update);
    }

    /** Se ejecuta en cada disparo del timer de intervalo configurado en el this.state.set_interval */
    incCounter(){
        if(this.state.chrono_status == "running"){
            this.setState({
                time: this.state.time + 1
            }, ()=>{
                document.title = utils.secondsToFormatedString(this.state.time);
            });

        }
    }

    /** Al hacer click en el botón empezar/parar cuenta cuando estamos en el modo cronómetro.
     * Si se comienza la cuenta llama a un action creator asíncrono para crear la tarea
    */
    handleOnClickStart(){
        if(this.state.chrono_status == "paused"){ //iniciamos contador
            let counter_date = new Date(Date.now());
            let hour = "";
            let min = "";
            if(this.props.user.current_task_start_hour != null){
                hour = utils.getHour(this.state.start_hour);
                min = utils.getMinutes(this.state.start_hour);
                counter_date = new Date(counter_date.getFullYear(), counter_date.getMonth(), counter_date.getDate(), hour, min);
            }
            this.setState({
                chrono_status: "running",
                time: this.props.user.current_task_start_hour!=null? Math.floor(Date.now()/1000) - Math.floor(counter_date.getTime()/1000):0
            });
            this.createBtn.current.disabled = this.state.description == "" ? true:false;

            if(this.state.start_hour){
                let update = {};
                update["current_task_start_hour"] = this.state.start_hour + ":00";
                this.props.userActions.updateUser(this.props.user.token, this.props.user.id, update);
            }
        }
        else if(this.state.chrono_status == "running" && this.state.description != ""){  // paramos contador
            let end_seconds = utils.getHourInSecFromDate(new Date());
            let start_seconds = end_seconds-this.state.time;
            this.props.taskActions.createTask(this.props.user.token, this.state.description, utils.standarizeDate(this.state.date), utils.secondsToFormatedString(start_seconds), utils.secondsToFormatedString(end_seconds), this.state.project_selected_id, this.state.tags, this.state.hour_value, this.props.user.id);
            this.setState({
                  chrono_status: "paused",
                  time: 0,
                  description: "",
                  project_selected_name: null,
                  project_selected_color: null,
                  project_selected_id: null,
                  hour_value: 0,
                  start_hour: null,
                  tags: this.props.tags.map((e)=>{
                      e.checked = false;
                      return e;
                  })
              },()=>{
                  document.title = config.app_title;
              });
              let update = {};
              update["current_task_start_hour"] = null;
              this.props.userActions.updateUser(this.props.user.token, this.props.user.id, update);
        }
        if(this.state.set_interval == null){
            this.setState({
                set_interval: setInterval(this.incCounter, 1000)
            });
        }
    }

    /** Se ejecuta cada vez que modificamos el input de descripción de nueva tarea */
    handleOnChangeInput(e){
        if(e.target.value == "" && this.state.mode == "chrono" && this.state.chrono_status=="running"){
            this.createBtn.current.disabled = true;
        }
        else if(e.target.value == "" && this.state.mode == "manual")
            this.createBtn.current.disabled = true;
        else if(e.target.value != "")
            this.createBtn.current.disabled = false;
        this.setState({
            description: e.target.value
        });
    }

    handleOnKeyPress(e){
        if(event.keyCode == 13){
            if(this.state.mode == "manual" && this.state.description != "")
                this.handleOnClickCreate();
            else if(this.state.mode == "chrono"){
                if(this.state.chrono_status == "paused")
                    this.handleOnClickStart();
                if(this.state.chrono_status == "running" && this.state.description != "")
                    this.handleOnClickStart();
            }
        }
    }

    resumeTask(description, project_id, project_name, project_color, tags){
        if(this.state.chrono_status == "paused"){
            this.setState({
                description: description,
                project_selected_name: project_name,
                project_selected_color: project_color,
                project_selected_id: project_id,
                tags: tags
            });
            this.handleOnClickStart();
        }
    }



    render(){
        return(
            <div className="container-flex" >
                <div className={"row align-items-center justify-content-between " + styles.box} >

                        <div className="col-8 col-sm-7 col-md-7 col-lg order-1 order-lg-1 p-0">
                            <input className={styles.description} id="task-description" autoComplete="false" onChange={this.handleOnChangeInput} placeholder={this.state.placeholder} value={this.state.description} onKeyPress={this.handleOnKeyPress}></input>
                        </div>

                        <div className="col-4 col-md-auto col-lg-auto order-6 order-md-2 order-lg-2 p-1">
                            <ProjectSelectorComponent onClick={this.handleOnClickProjectSelector} project_selected_name={this.state.project_selected_name} project_selected_color={this.state.project_selected_color} projects={this.props.projects}/>
                        </div>

                        <div className="col-1 col-md-auto col-lg-auto order-5 order-md-3 order-lg-3 py-1 px-0 px-lg-1">
                            <TagSelectorComponent onClick={this.handleOnClickTagSelector} tags={this.state.tags} />
                        </div>

                        <div className="col-auto col-lg-auto order-4 order-md-4 order-lg-4 p-1">
                            <ValueSelectorComponent value={this.state.hour_value} onChangeValue={this.handleOnChangeHourValue} />
                        </div>

                        <div className={"col p-0 col-md-auto col-lg-auto order-6 order-md-4 order-lg-4 text-right "+styles.manual_component}>
                        { this.state.mode == "chrono" ?
                            <ChronometerComponent time={this.state.time} />:
                            <ManualComponent handleDateChange={this.handleDateChange} handleHourChange={this.handleHourChange} date={this.state.date} start_hour={this.state.start_hour} end_hour={this.state.end_hour}/>
                        }
                        </div>

                        <div className="col-auto col-lg-auto order-3 order-md-5 order-lg-5 p-1 d-flex">

                                    <button id="btn-create-block" ref={this.createBtn} className={this.state.chrono_status=="running"? styles.btn_stop:styles.btn_create} onClick={
                                        this.state.mode == "chrono" ? this.handleOnClickStart : this.handleOnClickCreate
                                    }>
                                        { this.state.mode == "chrono" ?
                                            (this.state.chrono_status == "paused" ? <i className="fas fa-play-circle"></i>:<i className="fas fa-stop-circle"></i>):
                                            (<i className="fas fa-check-circle"></i>)
                                        }
                                    </button>
                                    <div className="d-flex flex-column" style={{height:"60px"}}>
                                        <button id="btn-chrono-reset" ref={this.chronoResetBtn} style={this.state.chrono_status == "running" ? {display:"block"}:{display:"none"}} className={styles.btn} onClick={this.handleOnClickReset}><i className="fas fa-trash"></i></button>
                                        <button id="btn-chrono-mode" ref={this.chronoModeBtn} style={this.state.chrono_status == "paused" ? {display:"block"}:{display:"none"}} className={this.state.mode=="chrono"? styles.btn_active:styles.btn} onClick={this.handleOnClickCronoMode}><i className="fas fa-stopwatch"></i></button>
                                        <button id="btn-manual-mode" ref={this.manualModeBtn} style={this.state.chrono_status == "paused" ? {display:"block"}:{display:"none"}} className={this.state.mode=="manual"? styles.btn_active:styles.btn} onClick={this.handleOnClickManualMode}><i className="fas fa-align-justify"></i></button>
                                    </div>

                        </div>


                </div>
            </div>
        )
    }
}

NewBlockComponent.propTypes = {
    user: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
    taskActions: PropTypes.object.isRequired,
    tagActions: PropTypes.object.isRequired,
    projectActions: PropTypes.object.isRequired,
}

export default NewBlockComponent;
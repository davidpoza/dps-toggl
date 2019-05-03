import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";

import utils from '../../utils';
import config from '../../config/config';
import lang from '../../config/lang';
import styles from './TaskComponent.scss';
import ProjectSelectorComponent from '../ProjectSelectorComponent/ProjectSelectorComponent';
import TagSelectorComponent from '../TagSelectorComponent/TagSelectorComponent';


class ExampleCustomInput extends React.Component {
    constructor(props){
        super(props);
    }
    render () {
      return (
        <a
          className="dropdown-item custom-input-datepicker"
          onClick={this.props.onClick}>
          {lang[config.lang].aditional_menu_opt_change_date}
        </a>
      )
    }
  }


class TaskComponent extends Component{
    constructor(props){
        super(props);
        this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
        this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnDelete = this.handleOnDelete.bind(this);
        this.handleOnChangeDesc = this.handleOnChangeDesc.bind(this);
        this.handleOnBlurDesc = this.handleOnBlurDesc.bind(this);
        this.handleOnChangeProject = this.handleOnChangeProject.bind(this);
        this.handleOnClickTagSelector = this.handleOnClickTagSelector.bind(this);
        this.composeTagsListState = this.composeTagsListState.bind(this);
        this.handleUpdateTaskVisually = this.handleUpdateTaskVisually.bind(this);
        this.handleOnChangeDate = this.handleOnChangeDate.bind(this);
        this.handleOnChangeStartHour = this.handleOnChangeStartHour.bind(this);
        this.handleOnChangeEndHour = this.handleOnChangeEndHour.bind(this);
        this.handleOnBlurStartHour = this.handleOnBlurStartHour.bind(this);
        this.handleOnBlurEndHour = this.handleOnBlurEndHour.bind(this);
        
        /** 
         * tags: almacena un array de tags con las propiedades:
         * - id
         * - name
         * - slug
         * - checked
         * - relation_id (si checked: true)
         */
        this.state = {
            hide_btns: true,
            desc: "",
            tags: [],
            start_hour: utils.removeSeconds(this.props.task.start_hour),
            end_hour: utils.removeSeconds(this.props.task.end_hour),
        }
    }

   componentWillMount(){
        this.setState({
            desc: this.props.task.desc
        });
        this.composeTagsListState();
   }

   componentDidMount(){
    /*con esto queremos evitar que el dropdown se cierre antes de que salte el evento 
    que abre el datepicker para el cambio de fecha de un task*/
      $(document).on('click', '.custom-input-datepicker', function (e) {
        e.stopPropagation();
      });
   }

   componentDidUpdate(prevProps){
        //if(prevProps.task.tags != this.props.task.tags)
            
        if(prevProps.task != this.props.task){
            this.composeTagsListState();
            this.setState({
                desc: this.props.task.desc,
                start_hour: utils.removeSeconds(this.props.task.start_hour),
                end_hour: utils.removeSeconds(this.props.task.end_hour),
            });
        }
   }

   /** Esta función hace un join de dos arrays:
    * - El array con todos los tags disponibles. (tendrán prop checked=false)
    * - El array con los tags que tiene asignados una tarea (tendrán prop checked=true y un relation_id)
    * El join se realiza con la propiedad id de que tienen los objetos de ambos arrays.
    * El relation_id es el id de la entrada que relaciona esa tag con ese task en la tabla tasks_tags, ya que 
    * es una relación m:m
    */
   composeTagsListState(){
        let all_tags = this.props.tags.map((e)=>{
            e.checked = false;
            return e
        });


        let selected_tags = this.props.task.tags.map((e)=>{
            return {
                id: e.tags_id.id,
                relation_id: e.id,
                checked: true
            }});

        /**
         * se concatenan ambos arrays.
         * vamos creando un objeto con propiedades cuyo identificador será el id. (como si fuera un array).
         * en cada id vamos combinando/extendiendo(con Object.assign) todos los objetos que existan con ese mismo id,
         * pero si con ese id no tenemos nada entonces comenzamos un nuevo objeto.
         */
        let merged_tags = all_tags.concat(selected_tags).reduce((prev, curr) => {
            prev[curr.id] = Object.assign(prev[curr.id] || {}, curr);
            return prev;
        }, {});

        //al final hemos objetenido un objeto y nosotros queremos convertirlo a un array
        merged_tags = Object.values(merged_tags);

        this.setState({
            hide_btns: true,
            tags: merged_tags
        });
   }

   /** Se dispara cuando hacemos click en una tarea y muestra los controles adicionales.    * 
    * Pensado para móviles donde no tenemos onMouseOver. */
    handleOnClick(){
        this.setState(
            {
                hide_btns: this.state.hide_btns?true:false
            }
        );
    }

    /**Al pasar por encima de una tarea muestra los controles adicionales*/
    handleOnMouseOver(){
        if(this.state.hide_btns)
            this.setState(
                {
                    hide_btns: false
                }
            );
    }

    /**Al quitar el cursor de la tarea se ocultan los controles adicionales */
    handleOnMouseOut(){
        if(!this.state.hide_btns)
        this.setState(
            {
                hide_btns: true
            }
        );
    }

    handleOnChangeDesc(e){
        this.setState({
            desc: e.target.value
        })
    }

    handleOnBlurDesc(e){
        /*actualizamos la tarea actual cambiando su descripción pero manteniendo fechas, tags e id del proyecto*/
       this.props.taskActions.updateAndFetchTask(this.props.token, this.props.task.id, e.target.value, null, null, null, -1, null);     
    }

    /** manejador del evento de click sobre la opción borrar del menu adicional */
    handleOnDelete(e){
        this.props.taskActions.deleteTask(this.props.token, this.props.task.id); //llama al api
        this.props.taskActions.deleteTasksVisually(this.props.task.id, this.props.task.date);
    }

    /**
     * manejador para el evento onClick del componente ProjectSelectorComponent del TaskComponent
     */
    handleOnChangeProject(project_id, project_name, project_color){
        let project = {};        
        if(project_id == -1) //el id=project0 lo hemos reservado para la opción sin proyecto que equivale a a ponerlo a null
            project = null
        else{
            project.id = project_id;
            project.color = project_color; //obtenemos el color del elemento seleccionado actualmente en el DOM
            project.name = project_name; //el nombre del proyecto lo sacamos del elemento con esa id
        }
        
        /*actualizamos la tarea actual manteniendo su descripción, fechas y tags, cambiando solo el id del proyecto
        y acto seguido se realiza un fetch únicamente de la tarea que ha sido modificada
        */
       this.props.taskActions.updateAndFetchTask(this.props.token, this.props.task.id, null, null, null, null, project!=null? project.id:null, null)
       
       //actualizamos visualmente sin consultar a la api para ver el cambio instantáneamente.
       this.handleUpdateTaskVisually(this.props.task.id, null, null, null, null, project!=null? project.id:null, null);
    }


    /**actualiza la entidad de la tarea con task_id y dispara una acción para 
     * actualizar tasks_entities en el redux store con los cambios.
     * Únicamente cambia los valores que pasemos como parametro.
     */
    handleUpdateTaskVisually(task_id, desc, date, start_hour, end_hour, project, tags){        
        let new_task_entities = Object.assign({}, this.props.tasks_entities);
        if(desc!=null) new_task_entities[task_id].desc = desc;
        if(date!=null) new_task_entities[task_id].date = date;
        if(start_hour!=null) new_task_entities[task_id].start_hour = start_hour;
        if(end_hour!=null) new_task_entities[task_id].end_hour = end_hour;
        if(project!=-1) new_task_entities[task_id].project = project;
        if(tags!=null) new_task_entities[task_id].tags = tags;

        this.props.taskActions.updateTasksVisually(new_task_entities);
    }

    /** Al producirse un click en un checkbox de tag del dropdown del TagSelectorComponent 
     * Se recorre el array buscando el id que coincide con el tag marcado para hacer un toggle a la prop. checked.
     * Apuntamos el índice del array del tag que hemos chequeado para saber si estamos añadiendo o quitando el tag y para
     * poder obtener su relation_id en caso de estar borrando.
     * 
    */
    handleOnClickTagSelector(tag_id){
        let array_tags = this.state.tags.slice();
        let index;

        array_tags.map((e,indx)=>{
            if(e.id == tag_id){
                e.checked = e.checked?false:true;
                index = indx;
            }
        });

        this.setState({
            tags: array_tags
        });

        /*preparamos el array de tags que necesita el api.

        Dicho array debe el objetos con un contenido u otro según si añadimos o borramos un tag a un task (m:m):
        - añadimos: el objeto debe contener la propiedad tags_id que es un objeto con {id: tag_id}
        - borramos: el objeto debe contener la propiedad id que debe ser el relation_id o id de la entrada en la tabla tasks_tags (m:m)
                    y además particularmente el api directus usa una propiedad "$delete":true para indicar que queremos borrarla.
        */
        let array_tags_api = [];
        if(array_tags[index].checked == false) { //estamos borrando
                    array_tags_api.push({
                        id: array_tags[index].relation_id,
                        "$delete": true
                    });

        }else{ //estampos añadiendo un tag
            array_tags_api.push({
                tags_id: { id: tag_id }
            });            
        }
        
        
        /*actualizamos la tarea actual manteniendo su descripción, fechas y proyecto. cambiando solo el array de tags
        y acto seguido se realiza un fetch de todas las tareas. (esto lo voy a cambiar mas adelante para que solo haga el fetch de la tarea modificada)
        */
        this.props.taskActions.updateAndFetchTask(this.props.token, this.props.task.id, null, null, null, null, -1, array_tags_api)
        
    }

    handleOnChangeDate(date){
        
        this.props.taskActions.updateAndFetchTasks(this.props.token, this.props.task.id, this.props.user_id, null, utils.standarizeDate(date), null, null, -1, null)
        console.log(date)
    }

    handleOnChangeStartHour(e){
        let regex = /^\d{0,2}:\d{0,2}$/;
        if(e.target.value.match(regex))
            this.setState({
                start_hour: e.target.value
            });        
    }

    handleOnChangeEndHour(e){
        let regex = /^\d{0,2}:\d{0,2}$/;
        if(e.target.value.match(regex))
            this.setState({
                end_hour: e.target.value
            });
    }

    handleOnBlurStartHour(e){
        if(utils.validateHour(e.target.value) && utils.hourIsGreater(this.state.end_hour, e.target.value)){
            this.props.taskActions.updateAndFetchTask(this.props.token, this.props.task.id, null, null, e.target.value+":00", null, -1, null)
       
            //actualizamos visualmente sin consultar a la api para ver el cambio instantáneamente.
            this.handleUpdateTaskVisually(this.props.task.id, null, null, e.target.value+":00", null, -1, null);
            this.props.taskActions.updateDateVisually(this.props.task.date, this.props.tasks_entities);
        }
        else{ //si la hora es formato incorrecto volvemos el input al valor anterior
            this.setState({
                start_hour: utils.removeSeconds(this.props.task.start_hour)
            });
        }
        
    }

    handleOnBlurEndHour(e){
        if(utils.validateHour(e.target.value) && utils.hourIsGreater(e.target.value, this.state.start_hour)){
            this.props.taskActions.updateAndFetchTask(this.props.token, this.props.task.id, null, null, null, e.target.value+":00", -1, null)
       
            //actualizamos visualmente sin consultar a la api para ver el cambio instantáneamente.
            this.handleUpdateTaskVisually(this.props.task.id, null, null, null, e.target.value+":00", -1, null);
            this.props.taskActions.updateDateVisually(this.props.task.date, this.props.tasks_entities);
        }
        else{ //si la hora es formato incorrecto volvemos el input al valor anterior
            this.setState({
                end_hour: utils.removeSeconds(this.props.task.end_hour)
            });
        }
    }

    handleOnToggle(toggle_id, toggle_span_id){
        $( "#"+ toggle_id).toggle();
        $( "#"+ toggle_span_id).toggleClass( styles.toggled );
    }
    
    render(){
        return(
            <li className={this.props.child? "row m-1 justify-content-between " + styles.child_task:"row m-1 justify-content-between " + styles.task } onClick={utils.isMobile() ? this.handleOnClick : undefined} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut}>
                <div className={"col-10 col-lg-4 col-xl-5 order-1 order-lg-1 p-0 " + styles.desc} >
                    <div className={"w-100 "}>
                        <div className="w-100" >
                            {this.props.toggle_id && <span id={this.props.toggle_id+"-span"} onClick={this.handleOnToggle.bind(this, this.props.toggle_id, this.props.toggle_id+"-span")} className={styles.toggle}>{this.props.children.length+1}</span>}
                                <input style={{width:this.props.children?"80%":"100%"}}  className={styles.input_desc} value={this.state.desc} onBlur={this.handleOnBlurDesc} onChange={this.handleOnChangeDesc}/>
                        </div>

                        <div className={"dropdown-menu p-2 " + styles.desc_dropdown } aria-labelledby="dropdownMenuButton" >
                            {this.state.desc}
                        </div>
                    </div>
                </div>
                <div className={this.props.task.project!=null ? "col-3 col-lg-2 col-xl-1 p-0 order-4 order-lg-2 " : "col-4 col-lg-2 col-xl-1 p-0 order-4 order-lg-2 text-right "}>                
                    {this.props.task.project!=null ?
                    <ProjectSelectorComponent onClick={this.handleOnChangeProject} project_selected_name={this.props.task.project.name} project_selected_color={this.props.task.project.color} projects={this.props.projects}/>
                    :
                    <ProjectSelectorComponent onClick={this.handleOnChangeProject} project_selected_name={null} project_selected_color={null} projects={this.props.projects}/>
                    }
                </div>
                <div className="col-5 p-0 col-lg-2 order-3 order-lg-3">
                    <TagSelectorComponent displayAsLabel={true} onClick={this.handleOnClickTagSelector} tags={this.state.tags}/>
                </div>               
                {!utils.isMobile() && !this.props.children ? 
                    <div className={"col-auto col-lg-auto order-lg-4 p-0 " + styles.dates}>
                        
                            <input 
                                className={styles.input_hour}
                                value={this.state.start_hour}
                                onChange={this.handleOnChangeStartHour}
                                onBlur={this.handleOnBlurStartHour}
                                size="5" maxLength="5" 
                            />&nbsp;-&nbsp;
                            <input
                                className={styles.input_hour}
                                value={this.state.end_hour}
                                onChange={this.handleOnChangeEndHour}
                                onBlur={this.handleOnBlurEndHour}
                                size="5" maxLength="5"
                            />
                    
                    </div> : !utils.isMobile() && this.props.children &&
                    <div className={"col-auto col-lg-auto order-lg-4 p-0 " + styles.dates}>
                            <span 
                                className={styles.input_hour}
                            >{utils.removeSeconds(this.props.children[this.props.children.length-1].start_hour)}</span>
                            &nbsp;-&nbsp;
                            <span
                                className={styles.input_hour}
                            >{utils.removeSeconds(utils.maxEndHourTasks([...this.props.children, this.props.task]))}</span>
                    </div>
                }                
                <div className={"col-auto order-5 order-lg-5 p-0 px-lg-2 " + styles.dates}>
                {!this.props.children ?
                    utils.diffHoursBetDates(this.props.task.start_hour, this.props.task.end_hour):
                    utils.diffHoursBetDatesArray([...this.props.children, this.props.task])
                }
                </div>
                <div className="col-auto order-2 order-lg-6 p-0"><button style={this.state.hide_btns?{opacity:0}:{opacity:1}} className={styles.btn} onClick={this.props.onResume.bind(this,this.state.desc, this.props.task.project!=null?this.props.task.project.id:-1, this.props.task.project!=null?this.props.task.project.name:null, this.props.task.project!=null?this.props.task.project.color:null, this.state.tags?this.state.tags:null)}><i className="fas fa-play"></i></button>
                <button style={this.state.hide_btns?{opacity:0}:{opacity:1}} className={styles.btn} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></button>
                    <div className={"dropdown-menu "+styles.dropdown_menu}>
                        <a className="dropdown-item" id={"btn-delete-"+this.props.task.id} onClick={this.handleOnDelete}>{lang[config.lang].aditional_menu_opt_delete}</a>
                        <DatePicker
                        locale={es} 
                        popperPlacement="left"
                        dateFormat="dd/MM/yyyy"
                        calendarClassName={styles.calendar}
                        customInput={<ExampleCustomInput/>}
                        selected={new Date(this.props.task.date)}
                        onSelect={this.handleOnChangeDate} />
                    </div>
                </div>
            </li>
        )
    }
}

TaskComponent.propTypes = {
    token: PropTypes.string.isRequired,
    task: PropTypes.object.isRequired,
    projects: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    taskActions: PropTypes.object.isRequired,
    onResume: PropTypes.func.isRequired,
    tasks_entities: PropTypes.object.isRequired
}


export default TaskComponent;
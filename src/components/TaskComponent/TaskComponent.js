import React, {Component} from 'react';
import PropTypes from 'prop-types';

import utils from '../../utils';
import config from '../../config/config';
import lang from '../../config/lang';
import styles from './TaskComponent.scss';
import ProjectSelectorComponent from '../ProjectSelectorComponent/ProjectSelectorComponent';
import TagSelectorComponent from '../TagSelectorComponent/TagSelectorComponent';



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
            tags: [] 
        }
    }

   componentWillMount(){
        this.setState({
            desc: this.props.task.desc
        });
        this.composeTagsListState();
   }

   componentDidUpdate(prevProps){
        if(prevProps.task.tags != this.props.task.tags)
            this.composeTagsListState();
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
        let task_id = e.target.id.match(/btn-delete-(\d{0,4})/)[1];
        this.props.onDeleteFromList(task_id); //eliminar visualmente, para lo cual llama al padre
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
       this.props.onUpdate(this.props.task.id, null, null, null, null, project, null);
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
    
    render(){
        return(
            <li className={"row m-1 justify-content-between " + styles.task } onClick={utils.isMobile() ? this.handleOnClick : undefined} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut}>
                <div className={"col-8 col-lg-4 col-xl-5 order-1 order-lg-1 p-0 " + styles.desc} >
                    <div className={"btn-group dropleft w-100 "}>
                        <div id="dropdownMenuButton" className="w-100" data-toggle={(utils.isMobile() || this.state.desc.length > 30) ?"dropdown":""} aria-haspopup="true" aria-expanded="false" >
                            <input className={styles.input_desc} value={this.state.desc} onBlur={this.handleOnBlurDesc} onChange={this.handleOnChangeDesc}/>
                        </div>

                        <div className={"dropdown-menu p-2 " + styles.desc_dropdown } aria-labelledby="dropdownMenuButton" >
                            {this.state.desc}
                        </div>
                    </div>
                </div>
                <div className={this.props.task.project!=null ? "col-4 col-lg-2 col-xl-1 p-0 order-4 order-lg-2 " : "col-4 col-lg-2 col-xl-1 p-0 order-4 order-lg-2 text-right "}>                
                    {this.props.task.project!=null ?
                    <ProjectSelectorComponent onClick={this.handleOnChangeProject} project_selected_name={this.props.task.project.name} project_selected_color={this.props.task.project.color} projects={this.props.projects}/>
                    :
                    <ProjectSelectorComponent onClick={this.handleOnChangeProject} project_selected_name={null} project_selected_color={null} projects={this.props.projects}/>
                    }
                </div>
                <div className="col-5 p-0 col-lg-2 order-3 order-lg-3">
                    <TagSelectorComponent displayAsLabel={true} onClick={this.handleOnClickTagSelector} tags={this.state.tags}/>
                </div>               
                {!utils.isMobile() && <div className={"col-auto col-lg-auto order-lg-4 p-0 " + styles.dates}>{utils.removeSeconds(this.props.task.start_hour)} - {utils.removeSeconds(this.props.task.end_hour)}</div>}                
                <div className={"col-auto order-5 order-lg-5 p-0 px-lg-2 " + styles.dates}>{utils.diffHoursBetDates(this.props.task.start_hour, this.props.task.end_hour)}</div>
                <div className="col-auto order-2 order-lg-6 p-0"><button style={this.state.hide_btns?{opacity:0}:{opacity:1}} className={styles.btn}><i className="fas fa-play"></i></button>
                <button style={this.state.hide_btns?{opacity:0}:{opacity:1}} className={styles.btn} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></button>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" id={"btn-delete-"+this.props.task.id} onClick={this.handleOnDelete}>{lang[config.lang].aditional_menu_opt_delete}</a>
                        <a className="dropdown-item">{lang[config.lang].aditional_menu_opt_duply}</a>
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
    tagActions: PropTypes.object.isRequired,
    onDeleteFromList: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
}


export default TaskComponent;
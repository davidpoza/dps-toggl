import React, {Component} from 'react'

import utils from '../../utils'
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
        this.handleOnChangeProject = this.handleOnChangeProject.bind(this);
        this.handleOnClickTagSelector = this.handleOnClickTagSelector.bind(this);
        this.composeTagsListState = this.composeTagsListState.bind(this);

        this.state = {
            hide_btns: true,
            tags: []
        }
    }

   componentWillMount(){
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

    handleOnDelete(e){
        this.props.taskActions.deleteTask(this.props.token, this.props.task.id);
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
        // persistimos el cambio en la bd
        //this.props.taskActions.updateTask(this.props.token, this.props.task.id, null, null, null, project!=null? project.id:null, null);
        
        //lanzamos la función del padre para que borre el elemento de la lita visualmente
        //this.props.onUpdate(this.props.task.id, this.props.task.desc, this.props.task.date_start, this.props.task.date_end, project, null);
    
        this.props.taskActions.updateAndFetchTask(this.props.token, this.props.task.id, this.props.task.desc, this.props.task.date_start, this.props.task.date_end, project!=null? project.id:null, null)
    }

    /** Al producirse un click en un checkbox de tag del dropdown del TagSelectorComponent */
    handleOnClickTagSelector(e){
        
        console.log("handleOnClickTagSelector");
        let tag_id = parseInt(e.target.id.match(/tag(\d{0,4})/)[1]);
        let array_tags = this.state.tags.slice();
        let index;
        for(let i=0; i<array_tags.length;i++){
            if(array_tags[i].id == tag_id){
                array_tags[i].checked = array_tags[i].checked ? false: true;
                index = i;
            }
               
        }

        array_tags = array_tags.map(e => Object.assign({}, e));

        this.setState({
            tags: array_tags
        });

        //preparamos el array de tags que necesita el api
        let array_tags_api = [];
        if(array_tags[index].checked == false) { //estamos borrando

                    console.log("borrando el tag de la posicion");
                    array_tags_api.push({
                        id: array_tags[index].relation_id,
                        "$delete": true
                    });

        }else{ //estampos añadiendo un tag
            console.log("añadiendo el tag con id: "+tag_id);
            array_tags_api.push({
                tags_id: { id: tag_id }
            });
            
        }
        
        
        //aquí vamos persistiendo los cambios en la base de datos, solo aquellos que sean necesarios
        //this.props.taskActions.updateTask(this.props.token, this.props.task.id, null, null, null, null, array_tags_api);
        //this.props.taskActions.fetchTasks(this.props.token);  //necesitamos conocer el id de relacion que ha dado al nuevo tag.
        this.props.taskActions.updateAndFetchTask(this.props.token, this.props.task.id, null, null, null, -1, array_tags_api)
        
    }

//<TagSelectorComponent displayAsLabel={true} onClick={this.handleOnClickTagSelector} selected_tags={this.state.tags} tags={this.props.tags}/>
    render(){
        return(
            <li className={"row m-1 justify-content-between " + styles.task } onClick={utils.isMobile() ? this.handleOnClick : undefined} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut}>
                <div className={"col-8 col-lg-4 col-xl-5 order-1 order-lg-1 p-0 " + styles.desc} >
                    <div className={"btn-group dropleft "}>
                        <div id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                            {!utils.isMobile()?this.props.task.desc.substring(0,100):this.props.task.desc.substring(0,10)}
                            {utils.isMobile() && this.props.task.desc.length>10 && "..."}
                            {!utils.isMobile() && this.props.task.desc.length>100 && "..."}
                        </div>

                        <div className={"dropdown-menu p-2 " + styles.desc_dropdown } aria-labelledby="dropdownMenuButton" >
                            {this.props.task.desc}
                        </div>
                    </div>
                </div>
                <div className="col-auto col-lg-auto p-0 order-4 order-lg-2">                
                    {this.props.task.project!=null ?
                    <ProjectSelectorComponent onClick={this.handleOnChangeProject} project_selected_name={this.props.task.project.name} project_selected_color={this.props.task.project.color} projects={this.props.projects}/>
                    :
                    <ProjectSelectorComponent onClick={this.handleOnChangeProject} project_selected_name={null} project_selected_color={null} projects={this.props.projects}/>
                    }
                </div>
                <div className="col-5 p-0 col-lg-2 order-3 order-lg-3">
                    <TagSelectorComponent displayAsLabel={true} onClick={this.handleOnClickTagSelector} tags={this.state.tags}/>
                </div>               
                {!utils.isMobile() && <div className={"col-auto col-lg-auto order-lg-4 p-0 " + styles.dates}>{utils.removeSeconds(this.props.task.date_start)} - {utils.removeSeconds(this.props.task.date_end)}</div>}                
                <div className={"col-auto order-5 order-lg-5 p-0 px-lg-2 " + styles.dates}>{utils.diffHoursBetDates(this.props.task.date_start, this.props.task.date_end)}</div>
                <div className="col-auto order-2 order-lg-6 p-0"><button style={this.state.hide_btns?{opacity:0}:{opacity:1}} className={styles.btn}><i className="fas fa-play"></i></button>
                <button style={this.state.hide_btns?{opacity:0}:{opacity:1}} className={styles.btn} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-ellipsis-v"></i></button>
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
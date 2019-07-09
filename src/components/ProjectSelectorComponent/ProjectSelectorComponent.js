import React, {Component} from 'react'
import PropTypes from 'prop-types';

import utils from '../../utils';
import config from '../../config/config';
import lang from '../../config/lang';
import styles from './ProjectSelectorComponent.scss';


/**Properties
 * onClick               : handler function called on selecting a project.
 *                         The handler must have the next prototype:
 *       handler(project_id, project_name, project_color)
 *
 * onReset               : To use as filter input, with a button to reset filter which triggers this handle function no remove filter
 * project_selected_name : name of currently selected project. (null if no project selected)
 * project_selected_color: color of currently selected project (null if no project selected)
 * projects              : list of all available projects as array of objects with this structure:
 *     - _id
 *     - color
 *     - created_on
 *     - members: members ObjectId
 *     - name
 *     - owner
 *     - tasks
*/

class ProjectSelectorComponent extends Component{
    constructor(props){
        super(props);


        this.state = {
            projects: [],
            value: "" //es el valor del input para filtrar el listado de proyectos
        }

        this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
    }

    componentDidMount(){
        this.setState({
            projects: this.props.projects.slice()
        });
    }

    /** cuando redux cambia las propiedades hay que cambiar el estado para que se ejecute el render,
     * si no lo hacemos la primera carga de la pagina no muestra las props que vienen de async actions
     * porque no ha dado tiempo a llegar en las props cuando se monta el componente
     */
    componentDidUpdate(prevProps){
        if(prevProps.projects != this.props.projects)
            this.setState({
                projects: this.props.projects.slice()
            });
    }

    /** se ejecuta onChange del input de filtrado de proyectos */
    handleOnChangeInput(e){
        this.setState({
            value: e.target.value
        });
        let filtered_projects = this.props.projects.filter((elem)=>{
            let regex = new RegExp(e.target.value, "i");  //para el filtrado usamos una regex que ignore mayus/min
            return regex.test(elem.name);
        });
        this.setState({
            projects: filtered_projects
        });
    }

    /**se ejecuta cuando seleccionamos un proyecto.
     * Pasamos el evento al padre: NewBlockComponent
     * Además cuando hacemos esto se resetea el componente a la lista inicial y se borra el input
     */
    handleOnSelect(project_id, project_name, project_color){
        this.props.onClick(project_id, project_name, project_color);
        this.setState({
            value: "",
            projects: this.props.projects.slice()
        });
    }

    render(){
        return(<div className={this.props.project_selected_name==null? "btn-group dropleft "+styles.dropleft_null:"btn-group dropleft "+styles.dropleft}>
                {
                    this.props.project_selected_name==null?

                    <button className={styles.btn} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                        <i style={{verticalAlign:"baseline"}} className="fas fa-folder-open"></i>
                    </button>
                    :
                    <button className={styles.label} style={{color: this.props.project_selected_color}} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                    {!utils.isMobile() && <i style={{verticalAlign:"baseline"}} className="fas fa-circle"></i>} {utils.isMobile() && this.props.project_selected_name.length>12? this.props.project_selected_name.substr(0,12)+"...":this.props.project_selected_name}
                    </button>
                }
                {
                    this.props.onReset && this.props.project_selected_name != null &&

                    <button className={styles.reset} onClick={this.props.onReset}>
                        <i style={{verticalAlign:"baseline"}} className="fas fa-times-circle"></i>
                    </button>
                }



                <div className={"dropdown-menu " + styles.menu } aria-labelledby="dropdownMenuButton" >
                    <div className={"input-group "+styles.selector}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-search"></i></span>
                        </div>
                        <input onChange={this.handleOnChangeInput} className={"form-control "+styles.search_input}  aria-describedby="basic-addon1" placeholder={lang[config.lang].project_selector_search+"..."} value={this.state.value}/>
                    </div>
                    <ul className={styles.projectlist}>
                    <li id={"project0"} className={"dropdown-item " + styles.item} onClick={this.handleOnSelect.bind(this, -1, null, null)} ><i style={{color: "lightgrey"}} className="fas fa-circle"></i> {lang[config.lang].project_selector_no_project}</li>
                    { this.state.projects.map((e, index)=>{
                        return(<li id={"project"+e._id} key={"projectlist-"+index} onClick={this.handleOnSelect.bind(this, e._id, e.name, e.color)} className={"dropdown-item " + styles.item}><i id={"projectdot"+e._id} style={{color: e.color}} className="fas fa-circle"></i> {e.name}</li>)
                    })}
                    </ul>
                </div>
            </div>
        )
    }
}

ProjectSelectorComponent.propTypes = {
    onClick: PropTypes.func.isRequired,
    project_selected_name: PropTypes.string,
    project_selected_color: PropTypes.string,
    projects: PropTypes.array.isRequired,
}

export default ProjectSelectorComponent;
import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';


import styles from './ProjectSelectorComponent.scss';
import utils from '../../utils';

const colors = [
 "#09a9f4", "#c87bf6", "#eb548d", "#fa8e49", "#c67639", "#51c93d", "#33bb9b", "#e19a86", "#3853b5", "#a354a6", "#f1c451", "#1f5615", "º#89211f", "#e23c39", "#000000"
];



class ProjectSelectorComponent extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            project_selected: "",
            project_selected_index: null,
            project_selected_id: null,
        }
    }

    render(){
        return(<div className={"btn-group dropleft "+styles.selector}>            
                <button className={styles.btn} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-folder-open"></i>
                </button>
                
                

                <div className={"dropdown-menu " + styles.menu } aria-labelledby="dropdownMenuButton">
                    <div className={"input-group "+styles.selector}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><i class="fas fa-search"></i></span>
                        </div>
                        <input className={"form-control "+styles.search_input}  aria-describedby="basic-addon1" placeholder="Buscar proyecto..." />
                    </div>
                    <a className="dropdown-item" href="#">Sin proyecto</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                    <div className="dropdown-divider"></div>
                    <button type="button" className="btn btn-primary w-100">Crear nuevo proyecto</button>
                </div>
            </div>
        )
    }
}

export default ProjectSelectorComponent;
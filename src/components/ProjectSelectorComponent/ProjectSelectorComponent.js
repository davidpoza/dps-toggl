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
        this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
        this.state = {
            projects: []
        }
    }

    componentDidMount(){
        this.setState({
            projects: this.props.projects.slice()
        });
    }

    handleOnChangeInput(e){        
        console.log(e.target);
        let filtered_projects = this.props.projects.filter((elem)=>{
            let regex = new RegExp(e.target.value, "i");            
            return regex.test(elem.name);
        })
        this.setState({
            projects: filtered_projects
        });
    }

    render(){
        return(<div className={"btn-group dropleft "+styles.selector}>
                {
                    this.props.project_selected_name==null?

                    <button className={styles.btn} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-folder-open"></i>
                    </button>
                    :
                    <button className={styles.label} style={{color: this.props.project_selected_color}} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-circle"></i> {this.props.project_selected_name}
                    </button>    
                
                }
                
                

                <div className={"dropdown-menu " + styles.menu } aria-labelledby="dropdownMenuButton">
                    <div className={"input-group "+styles.selector}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><i className="fas fa-search"></i></span>
                        </div>
                        <input onChange={this.handleOnChangeInput} className={"form-control "+styles.search_input}  aria-describedby="basic-addon1" placeholder="Buscar proyecto..." />
                    </div>
                    <ul className={styles.projectlist}>
                    <li id={"project0"} className={"dropdown-item " + styles.item} onClick={this.props.onClick} ><i style={{color: "lightgrey"}} className="fas fa-circle"></i> Sin proyecto</li>
                    { this.state.projects.map((e, index)=>{
                        return(<li id={"project"+e.id} key={"projectlist-"+index} onClick={this.props.onClick} className={"dropdown-item " + styles.item}><i id={"projectdot"+e.id} style={{color: e.color}} className="fas fa-circle"></i> {e.name}</li>)
                    })}
                    </ul>
                    <div className="dropdown-divider"></div>
                    <button type="button" className="btn btn-primary w-100">Crear nuevo proyecto</button>
                </div>
            </div>
        )
    }
}

export default ProjectSelectorComponent;
import React, {Component} from 'react';

import config from '../../config/config';
import lang from '../../config/lang';
import styles from './ProjectSectionComponent.scss';
import utils from '../../utils';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import ProjectListComponent from '../ProjectListComponent/ProjectListComponent';

class ProjectSectionComponent extends Component{
    constructor(props){
        super(props);
        this.projectNameInput = React.createRef();
        this.state = {
            colorPicker:  null
        }
        this.handleOpenColorPicker = this.handleOpenColorPicker.bind(this);
        this.handleColorPick = this.handleColorPick.bind(this);
    }

    componentWillMount(){
        this.props.projectActions.fetchProjectsByOwner(this.props.user.token, this.props.user.id);
       
    }
   
    //cada vez que se abre el modal de creacion de proyecot escoge un color aleatorio del array de colores del config
    handleOpenColorPicker(){
        this.setState({
            colorPicker: config.project_colors[utils.random(0,config.project_colors.length)]
        });
    }

    //cuando marcamos un color, se cambia en el estado el color elegido para el nuevo proyecto
    handleColorPick(e){
        let project_color = utils.rgb2hex(window.getComputedStyle(e.target).color);
        this.setState({
            colorPicker: project_color
        });
    }

    render(){
        return(
            <div className={"d-flex flex-column justify-content-start h-100"}>
                <div className={"d-flex justify-content-between m-2"}>
                    <h1>{lang[config.lang].project_section_title}</h1>
                    <button className="btn btn-primary" data-toggle="modal" data-target="#projectCreateModal" onClick={this.handleOpenColorPicker}>{lang[config.lang].btn_new_project}</button>
                </div>
                <div className={"flex-grow-1 " + styles.tasklist}>
                    <ProjectListComponent user={this.props.user} project={this.props.project} />
                </div>

                <div className="modal fade" id="projectCreateModal" tabIndex="-1" role="dialog" aria-labelledby="createProjectLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createProjectLabel">{lang[config.lang].btn_new_project}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className={"modal-body "+styles.modal_body}>
                        <input className={styles.input} ref={this.projectNameInput} placeholder={lang[config.lang].project_name_placeholder}></input>
                        <div className="dropdown">
                            <button className={"btn dropdown-toggle "+styles.dropdown_btn} type="button" id="dropdownProjectColorButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className={"fas fa-square "+styles.color} style={{color: this.state.colorPicker}}></i>
                            </button>
                            <div className={"dropdown-menu "+styles.color_dropdown} aria-labelledby="dropdownProjectColorButton">
                                <div className="container">
                                    <div className="row justify-content-center">
                                    {
                                        config.project_colors.map((e,index)=>(
                                            <i key={"color"+index} className={"fas fa-square "+styles.color} style={{color: e}} onClick={this.handleColorPick}></i>
                                        ))
                                    }
                                     
                                    </div>
                                </div>
                            </div>
                        </div>
                                            
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">{lang[config.lang].btn_save_changes}</button>
                    </div>
                    </div>
                </div>
                </div>
                <LoadingComponent isLoading={this.props.user.loading||this.props.project.loading} />
            </div>
        )
    }
}

export default ProjectSectionComponent;
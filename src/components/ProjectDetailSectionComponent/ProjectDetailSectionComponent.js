import React, {Component} from 'react';

import config from '../../config/config';
import lang from '../../config/lang';
import styles from './ProjectDetailSectionComponent.scss';
import utils from '../../utils';
import LoadingComponent from '../LoadingComponent/LoadingComponent';


class ProjectDetailSectionComponent extends Component{
    constructor(props){
        super(props);
        this.projectNameInput = React.createRef();
        this.modal = React.createRef();
        this.state = {
            colorPicker:  null,
            project_name: "",
        }
        this.handleColorPick = this.handleColorPick.bind(this);
        this.handleDeleteProject = this.handleDeleteProject.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }


    componentDidMount(){
        this.props.projectActions.fetchProjectById(this.props.user.token, this.props.match.params.project_id);
        
       
    }

    componentDidUpdate(prevProps) {
        if(prevProps.project.project_detail != this.props.project.project_detail){
            this.setState({
                colorPicker: this.props.project.project_detail.color,
                project_name: this.props.project.project_detail.name
            });
        }
    }
   
    //cuando marcamos un color, se cambia en el estado el color elegido para el nuevo proyecto
    handleColorPick(e){
        let project_color = utils.rgb2hex(window.getComputedStyle(e.target).color);
        this.setState({
            colorPicker: project_color
        });
    }
    
    handleDeleteProject(){
        this.props.projectActions.deleteProject(this.props.user.token, this.props.match.params.project_id);
        $(this.modal.current).modal('hide');
        this.props.history.push("/projects");
    }

    handleOnChange(e){
        this.setState({
            project_name: e.target.value
        });
    }
   
    render(){
        return(
            <div className={"d-flex flex-column justify-content-start h-100"}>
                <div className={"d-flex justify-content-between m-2"}>
                    <h1>{lang[config.lang].project_detail_section_title}</h1>
                    <div>
                        <button className="btn btn-danger p-3 m-2" data-toggle="modal" data-target="#deleteModal">{lang[config.lang].btn_delete}</button> 
                        <button className="btn btn-primary p-3 m-2">{lang[config.lang].btn_save_changes}</button>
                    </div>                    
                </div>
                <div className={"flex-grow-1 " + styles.tasklist}>
                    <input className={styles.input} ref={this.projectNameInput} placeholder={lang[config.lang].project_name_placeholder} value={this.state.project_name} onChange={this.handleOnChange}></input>
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

                <div className="modal fade" id="deleteModal" ref={this.modal} tabIndex="-1" role="dialog" aria-labelledby="createProjectLabel" aria-hidden="true" onKeyPress={this.handleOnKeyPress}>
                <div className="modal-dialog modal-sm" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createProjectLabel">{lang[config.lang].title_delete_project_modal}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">{lang[config.lang].btn_cancel}</button>
                        <button type="button" className="btn btn-danger" onClick={this.handleDeleteProject}>{lang[config.lang].btn_confirm_delete}</button>
                    </div>
                    </div>
                </div>
                </div>


                <LoadingComponent isLoading={this.props.user.loading||this.props.project.loading} />
            </div>
        )
    }
}

export default ProjectDetailSectionComponent;
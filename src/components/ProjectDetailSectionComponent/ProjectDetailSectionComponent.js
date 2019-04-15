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
            colorPicker:  null
        }
        this.handleColorPick = this.handleColorPick.bind(this);

    }

    componentDidMount(){
        this.props.projectActions.fetchProjectById(this.props.user.token, this.props.match.params.project_id);

       
    }

    componentDidUpdate(prevProps) {
        if(prevProps.project.project_detail != this.props.project.project_detail){
            this.setState({
                colorPicker: this.props.project.project_detail.color
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
   
    render(){
        return(
            <div className={"d-flex flex-column justify-content-start h-100"}>
                <div className={"d-flex justify-content-between m-2"}>
                    <h1>{lang[config.lang].project_detail_section_title}</h1>
                    <button className="btn btn-primary" data-toggle="modal" data-target="#projectCreateModal" onClick={this.handleOpenModal}>{lang[config.lang].btn_save_changes}</button>
                </div>
                <div className={"flex-grow-1 " + styles.tasklist}>
                    <input className={styles.input} ref={this.projectNameInput} placeholder={lang[config.lang].project_name_placeholder} value={this.props.project.loading?"":this.props.project.project_detail.name}></input>
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

                
                <LoadingComponent isLoading={this.props.user.loading||this.props.project.loading} />
            </div>
        )
    }
}

export default ProjectDetailSectionComponent;
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import config from '../../config/config';
import lang from '../../config/lang';
import styles from './ProjectDetailSectionComponent.scss';
import utils from '../../utils';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import MemberSelectorComponent from '../MemberSelectorComponent/MemberSelectorComponent';


class ProjectDetailSectionComponent extends Component{
    constructor(props){
        super(props);
        this.projectNameInput = React.createRef();
        this.modal = React.createRef();
        this.state = {
            colorPicker:  this.props.project_detail.color,
            project_name: this.props.project_detail.name,
        }
        this.handleColorPick = this.handleColorPick.bind(this);
        this.handleDeleteProject = this.handleDeleteProject.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSaveProject = this.handleOnSaveProject.bind(this);
        this.handleOnAddMember = this.handleOnAddMember.bind(this);
    }

    componentWillMount(){
        this.props.projectActions.fetchProjectById(this.props.user.token, this.props.project_detail._id, this.props.user._id);
    }


    componentDidUpdate(prevProps) {
        if (!prevProps.need_refreshing && this.props.need_refreshing){
            this.props.projectActions.fetchProjectById(this.props.user.token, this.props.project_detail._id, this.props.user._id);
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
        this.props.projectActions.deleteProject(this.props.user.token, this.props.project_detail._id);
        $(this.modal.current).modal('hide');
        this.props.history.push("/projects");
    }

    handleOnSaveProject(){
        this.props.projectActions.updateProject(this.props.user.token, this.props.project_detail._id, this.state.project_name, this.state.colorPicker, null, null);
        this.props.history.push("/projects");
    }

    handleOnChange(e){
        this.setState({
            project_name: e.target.value
        });
    }

    handleOnAddMember(member_id){
        this.props.projectActions.updateProject(this.props.user.token, this.props.project_detail._id, null, null,  [member_id], null);
    }

    handleOnDeleteMember(member_id){
        this.props.projectActions.updateProject(this.props.user.token, this.props.project_detail._id, null, null, null, [member_id]);
    }

    render(){
            return(
                <div className={"d-flex flex-column justify-content-start h-100"}>
                    <div className={"d-flex justify-content-between "+styles.header}>
                        <h1>{lang[config.lang].project_detail_section_title}</h1>
                        <div>
                            <button className="btn btn-danger p-3 mr-2" data-toggle="modal" data-target="#deleteModal" title={lang[config.lang].btn_title_delete_project}><i className="fas fa-trash"></i></button>
                            <button className="btn btn-primary p-3" onClick={this.handleOnSaveProject} title={lang[config.lang].btn_title_save_project}><i className="fas fa-save"></i></button>
                        </div>
                    </div>
                    <div className={"flex-grow-1 " + styles.project_detail}>
                        <div className="d-flex justify-content-between my-2 my-lg-5 mx-2 mx-md-5 mx-lg-5">
                            <input className={styles.input} type="text" ref={this.projectNameInput} placeholder={lang[config.lang].project_name_placeholder} value={this.state.project_name} onChange={this.handleOnChange} />
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
                        <div className="my-2 my-lg-5 mx-2 mx-md-5 mx-lg-5 ">
                        <h2>{lang[config.lang].project_data_title}</h2>
                        <ul className="p-0">
                        <li className={styles.li}><strong>{lang[config.lang].project_creation}</strong>: {utils.standarDateToHuman(this.props.project_detail.created_on)}</li>
                        <li className={styles.li}><strong>{lang[config.lang].project_owner}</strong>: {this.props.project_detail.owner.first_name} {this.props.project_detail.owner.last_name}</li>
                        <li className={styles.li}><strong>{lang[config.lang].project_hours}</strong>: {this.props.project_detail.hours}h.</li>
                        </ul>
                        </div>

                        <div className="my-2 my-lg-5 mx-2 mx-md-5 mx-lg-5 ">
                            <h2>{lang[config.lang].members_title}</h2>
                            {
                                this.props.project_detail.owner._id == this.props.user.id && //si somos el propietario del proyecto
                                    <MemberSelectorComponent users={this.props.users} project_id={this.props.project_detail._id} userActions={this.props.userActions} onSelect={this.handleOnAddMember} />
                            }

                            <ul className="p-0">
                            {this.props.project_detail.members_entities &&  this.props.project_detail.members_entities.map((e,index)=>
                                {
                                    return(
                                    <li className={styles.member} key={"member"+index}>
                                    <div className="d-flex justify-content-between">
                                        {e.first_name} {e.last_name}
                                        {
                                            this.props.project_detail.owner._id == this.props.user.id && //si somos el propietario del proyecto
                                                <i title={lang[config.lang].delete_project_member} className="fas fa-user-minus" onClick={this.handleOnDeleteMember.bind(this,e._id)}></i>
                                        }
                                        </div>
                                    </li>
                                    )
                                }

                            )}
                            </ul>
                        </div>

                        <div className="my-2 my-lg-5 mx-2 mx-md-5 mx-lg-5 ">
                        <h2>{lang[config.lang].project_tasks_title}</h2>
                        <ul className="p-0">
                        {this.props.project_detail.tasks.map((t,index)=>
                            {
                                return(
                                <li className={styles.li} key={"task"+index}>
                                <div className="d-flex flex-column flex-md-row justify-content-between">
                                    <div>{t.desc} ({t.user_entity? t.user_entity.email : "propia"})</div>
                                    <div>{utils.standarDateToSpanish(t.date)} ({utils.diffHoursBetDates(t.start_hour,t.end_hour)})</div>
                                </div>
                                </li>
                                )
                            }

                        )}
                        </ul>
                        </div>
                    </div>

                    <div className="modal fade" id="deleteModal" ref={this.modal} tabIndex="-1" role="dialog" aria-labelledby="deleteProjectLabel" aria-hidden="true" onKeyPress={this.handleOnKeyPress}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-body">
                            <h5 className="modal-title" id="deleteProjectLabel">{lang[config.lang].title_delete_project_modal}</h5>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">{lang[config.lang].btn_cancel}</button>
                            <button type="button" className="btn btn-danger" onClick={this.handleDeleteProject}>{lang[config.lang].btn_confirm_delete}</button>
                        </div>
                        </div>
                    </div>
                    </div>


                    <LoadingComponent isLoading={this.props.user_loading||this.props.project_loading} />
                </div>
            )
    }
}

ProjectDetailSectionComponent.propTypes = {
    user:PropTypes.object.isRequired,
    user_loading: PropTypes.bool.isRequired,
    project_loading: PropTypes.bool.isRequired,
    need_refreshing: PropTypes.bool.isRequired,
    project_detail: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    projectActions: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired
}

export default ProjectDetailSectionComponent;
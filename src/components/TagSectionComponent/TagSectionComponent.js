import React, {Component} from 'react';
import PropTypes from 'prop-types';

import config from '../../config/config';
import lang from '../../config/lang';
import styles from './TagSectionComponent.scss';
import utils from '../../utils';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import TagListComponent from '../TagListComponent/TagListComponent';

class TagSectionComponent extends Component{
    constructor(props){
        super(props);
        this.tagNameInput = React.createRef();
        this.modal = React.createRef();
        this.handleOpenModal = this.handleOpenModal.bind(this);

        this.handleCreateTag = this.handleCreateTag.bind(this);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
        this.handleOnUpdate = this.handleOnUpdate.bind(this);
        this.handleOnDelete = this.handleOnDelete.bind(this);
    }

    componentDidMount(){
        this.props.tagActions.fetchTagsByUser(this.props.user.token, this.props.user.id);
       
    }

    //ese flag de refresco lo modificamos cuando se ha creado un nuevo proyecto y hay que pedir un listado nuevo
    componentDidUpdate(prevProps) {
        if (!prevProps.need_refreshing && this.props.need_refreshing){
            this.props.tagActions.fetchTagsByUser(this.props.user.token, this.props.user.id);         
        }
    }

    //cada vez que se abre el modal de creacion de tag
    handleOpenModal(){
        setTimeout(function (){
            this.tagNameInput.current.focus();
        }.bind(this), 1000);
       
    }

    handleCreateTag(){
        this.props.tagActions.createTag(this.props.user.token, this.tagNameInput.current.value, this.props.user.id);
        $(this.modal.current).modal('hide');
        this.tagNameInput.current.value = "";
    }

    handleOnKeyPress(e){
        if(event.keyCode == 13)
            this.handleCreateTag();
    }

    handleOnDelete(){

    }

    handleOnUpdate(){

    }

    render(){
        return(
            <div className={"d-flex flex-column justify-content-start h-100"}>
                <div className={"d-flex justify-content-between m-3"}>
                    <h1>{lang[config.lang].tag_section_title}</h1>
                    <button className="btn btn-primary" data-toggle="modal" data-target="#tagtCreateModal" onClick={this.handleOpenModal}>{lang[config.lang].btn_new_tag}</button>
                </div>
                <div className={"flex-grow-1 p-5 " + styles.taglist}>
                    <TagListComponent tags={this.props.tags} onDelete={this.handleOnDelete} onUpdate={this.handleOnUpdate} />
                </div>

                <div className="modal fade" id="tagtCreateModal" ref={this.modal} tabIndex="-1" role="dialog" aria-labelledby="createTagLabel" aria-hidden="true" onKeyPress={this.handleOnKeyPress}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createTagLabel">{lang[config.lang].btn_new_tag}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className={"modal-body "+styles.modal_body}>
                        <input className={styles.input} ref={this.tagNameInput} placeholder={lang[config.lang].tag_name_placeholder}></input>                                            
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.handleCreateTag}>{lang[config.lang].btn_save_changes}</button>
                    </div>
                    </div>
                </div>
                </div>
                <LoadingComponent isLoading={this.props.user_loading||this.props.tag_loading} />
            </div>
        )
    }
}

TagSectionComponent.propTypes = {
    user:PropTypes.object.isRequired,
    user_loading: PropTypes.bool.isRequired,
    tag_loading: PropTypes.bool.isRequired,
    need_refreshing: PropTypes.bool.isRequired,
    tags: PropTypes.array.isRequired,
    tagActions: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}


export default TagSectionComponent;
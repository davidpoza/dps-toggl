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
        this.tagNameInputCreate = React.createRef();
        this.tagNameInputUpdate = React.createRef();
        this.modalCreateTag = React.createRef();
        this.modalUpdateTag = React.createRef();
        this.modalDeleteTag = React.createRef();

        this.handleOpenModalCreateTag = this.handleOpenModalCreateTag.bind(this);
        this.handleCreateTag = this.handleCreateTag.bind(this);
        this.handleUpdateTag = this.handleUpdateTag.bind(this);
        this.handleDeleteTag = this.handleDeleteTag.bind(this);
        this.handleOnKeyPressForCreateModal = this.handleOnKeyPressForCreateModal.bind(this);
        this.handleOnKeyPressForUpdateModal = this.handleOnKeyPressForUpdateModal.bind(this);

        this.state = {
            tag_id: null
        };
    }

    componentDidMount(){
        this.props.tagActions.fetchUserTags(this.props.user.token);

    }

    //ese flag de refresco lo modificamos cuando se ha creado un nuevo proyecto y hay que pedir un listado nuevo
    componentDidUpdate(prevProps) {
        if (!prevProps.need_refreshing && this.props.need_refreshing){
            this.props.tagActions.fetchUserTags(this.props.user.token);
        }
    }

    //cada vez que se abre el modal de creacion de tag
    handleOpenModalCreateTag(){
        setTimeout(function (){
            this.tagNameInputCreate.current.focus();
        }.bind(this), 500);

    }

    handleCreateTag(){
        this.props.tagActions.createTag(this.props.user.token, this.tagNameInputCreate.current.value, this.props.user.id);
        $(this.modalCreateTag.current).modal('hide');
        this.tagNameInputCreate.current.value = "";
    }

    handleOnKeyPressForCreateModal(e){
        if(e.which == 13)
            this.handleCreateTag();
    }

    handleOnKeyPressForUpdateModal(e){
        if(e.which == 13)
            this.handleUpdateTag();
    }

    handleDeleteTag(){
        this.props.tagActions.deleteTag(this.props.user.token, this.state.tag_id);
        $(this.modalDeleteTag.current).modal('hide');
    }

    handleUpdateTag(){
        this.props.tagActions.updateTag(this.props.user.token, this.state.tag_id, this.tagNameInputUpdate.current.value);
        $(this.modalUpdateTag.current).modal('hide');
    }

    handleOpenDeleteModal(tag_id){
        this.setState({
            tag_id
        });
    }

    handleOpenUpdateModal(tag_id, tag_name){
        this.setState({
            tag_id
        });
        setTimeout(function (){
            this.tagNameInputUpdate.current.focus();
        }.bind(this), 500);
        this.tagNameInputUpdate.current.value = tag_name;
    }

    render(){
        return(
            <div className={"d-flex flex-column justify-content-start h-100"}>
                <div className={"d-flex justify-content-between "+ styles.header}>
                    <h1>{lang[config.lang].tag_section_title}</h1>
                    <button className="btn-lg btn-primary" data-toggle="modal" data-target="#tagCreateModal" onClick={this.handleOpenModalCreateTag}><i className="fas fa-plus-circle"></i></button>
                </div>
                <div className={"flex-grow-1 py-5 px-2 px-lg-5 " + styles.taglist}>
                    <TagListComponent ctx={this} tags={this.props.tags} onOpenDeleteModal={this.handleOpenDeleteModal} onOpenUpdateModal={this.handleOpenUpdateModal} />
                </div>

                {/**Modal para crear tag */}
                <div className="modal fade" id="tagCreateModal" ref={this.modalCreateTag} tabIndex="-1" role="dialog" aria-labelledby="createTagLabel" aria-hidden="true" >
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createTagLabel">{lang[config.lang].btn_new_tag}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className={"modal-body "+styles.modal_body}>
                        <input className={styles.input} ref={this.tagNameInputCreate} placeholder={lang[config.lang].tag_name_placeholder} onKeyPress={this.handleOnKeyPressForCreateModal}></input>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.handleCreateTag}>{lang[config.lang].btn_save_changes}</button>
                    </div>
                    </div>
                </div>
                </div>

                {/**Modal para modificar tag */}
                <div className="modal fade" id="tagUpdateModal" ref={this.modalUpdateTag} tabIndex="-1" role="dialog" aria-labelledby="updateTagLabel" aria-hidden="true" onKeyPress={this.handleOnKeyPressForUpdateModal}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="updateTagLabel">{lang[config.lang].btn_update_tag}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className={"modal-body "+styles.modal_body}>
                        <input className={styles.input} ref={this.tagNameInputUpdate} placeholder={lang[config.lang].tag_name_placeholder}></input>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.handleUpdateTag}>{lang[config.lang].btn_save_changes}</button>
                    </div>
                    </div>
                </div>
                </div>

                {/**Modal para borrar tag */}
                <div className="modal fade" id="tagDeleteModal" ref={this.modalDeleteTag} tabIndex="-1" role="dialog" aria-labelledby="deleteTagLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-body">
                        <h5 className="modal-title" id="deleteTagLabel">{lang[config.lang].btn_delete_tag}</h5>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">{lang[config.lang].btn_cancel}</button>
                        <button type="button" className="btn btn-danger" onClick={this.handleDeleteTag}>{lang[config.lang].btn_confirm_delete}</button>
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
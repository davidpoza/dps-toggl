import React, {Component} from 'react';
import PropTypes from 'prop-types';

import utils from '../../utils';
import config from '../../config/config';
import lang from '../../config/lang';
import styles from './TagComponent.scss';




class TagComponent extends Component{
    constructor(props){
        super(props);

    }

  
    
    render(){
        return(<li className={styles.label}>{this.props.tag.name} {" "}
        <i title={lang[config.lang].btn_title_update_tag} data-toggle="modal" data-target="#tagUpdateModal" className="fas fa-edit" onClick={this.props.onOpenUpdateModal.bind(this.props.ctx,this.props.tag.id, this.props.tag.name)}></i>{" | "}
        <i title={lang[config.lang].btn_title_delete_tag} data-toggle="modal" data-target="#tagDeleteModal" className="fas fa-trash-alt" onClick={this.props.onOpenDeleteModal.bind(this.props.ctx,this.props.tag.id)}></i></li>);
    }
            
}

TagComponent.propTypes = {
    ctx: PropTypes.object.isRequired,
    tag: PropTypes.object.isRequired,
    onOpenDeleteModal: PropTypes.func.isRequired,
    onOpenUpdateModal: PropTypes.func.isRequired,
}


export default TagComponent;
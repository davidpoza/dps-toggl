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
        return(<li className={styles.label}>{this.props.tag.name} <i title={lang[config.lang].btn_title_update_tag} className="fas fa-edit"></i> | <i title={lang[config.lang].btn_title_delete_tag} className="fas fa-trash-alt"></i></li>);
    }
            
}

TagComponent.propTypes = {
    tag: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
}


export default TagComponent;
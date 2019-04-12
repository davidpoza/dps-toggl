import React, {Component} from 'react';
import PropTypes from 'prop-types';

import utils from '../../utils';
import config from '../../config/config';
import lang from '../../config/lang';
import styles from './ProjectComponent.scss';




class ProjectComponent extends Component{
    constructor(props){
        super(props);


        /** 
         * tags: almacena un array de tags con las propiedades:
         * - id
         * - name
         * - slug
         * - checked
         * - relation_id (si checked: true)
         */
        this.state = {
            hide_btns: true,
            tags: [] 
        }
    }

   componentWillMount(){
        
   }

   componentDidUpdate(prevProps){

   }

     
    render(){
        return(
            <li className={"row m-1 justify-content-between " + styles.project } >
                <div className={"col-8 col-lg-4 col-xl-5 order-1 order-lg-1 p-0 " + styles.desc} >
                            {this.props.project.name}           
                </div>     
                
            </li>
        )
    }
}

ProjectComponent.propTypes = {
    token: PropTypes.string.isRequired,

}


export default ProjectComponent;
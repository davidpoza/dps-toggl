import React, {Component} from 'react';

import config from '../../config/config';
import lang from '../../config/lang';
import styles from './ProjectSectionComponent.scss';

import LoadingComponent from '../LoadingComponent/LoadingComponent';

class ProjectSectionComponent extends Component{
    constructor(props){
        super(props);

       
    }

   

    render(){
        return(

            <div className={"d-flex flex-column justify-content-start h-100"}>
                <h1>{lang[config.lang].project_section_title}</h1>
                <LoadingComponent isLoading={this.props.user.loading|this.props.task.loading|this.props.project.loading|this.props.tag.loading} />
            </div>
        )
    }
}

export default ProjectSectionComponent;
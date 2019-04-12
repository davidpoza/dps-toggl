import React, {Component} from 'react';

import config from '../../config/config';
import lang from '../../config/lang';
import styles from './ProjectSectionComponent.scss';

import LoadingComponent from '../LoadingComponent/LoadingComponent';
import ProjectListComponent from '../ProjectListComponent/ProjectListComponent';

class ProjectSectionComponent extends Component{
    constructor(props){
        super(props);

       
    }

   

    render(){
        return(
            <div className={"d-flex flex-column justify-content-start h-100"}>
                <div>
                    <h1>{lang[config.lang].project_section_title}</h1>
                    
                </div>
                <div className={"flex-grow-1 " + styles.tasklist}>
                    <ProjectListComponent user={this.props.user} project={this.props.project} />
                </div>
                <LoadingComponent isLoading={this.props.user.loading||this.props.project.loading} />
            </div>
        )
    }
}

export default ProjectSectionComponent;
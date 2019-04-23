import React, {Component} from 'react';
import PropTypes from 'prop-types';

import utils from '../../utils';
import ProjectComponent from '../ProjectComponent/ProjectComponent';
import styles from './ProjectListComponent.scss';

class ProjectListComponent extends Component{
    constructor(props){
        super(props);



        this.state = {

        };        
    }

    componentDidUpdate(prevProps){

    }

    handleChangeSort(field){
        this.props.projectActions.changeSort(field);
    }

    render(){
        return(
            <div>
               <div className={"container-flex " + styles.header}>
                <div className={"row m-1 justify-content-between " } >
                    <div className={"col-8"} >
                        Nombre <i className="fas fa-sort" onClick={this.handleChangeSort.bind(this,"name")}></i>          
                    </div>
                    <div className={"col-2"} >
                        Horas <i className="fas fa-sort" onClick={this.handleChangeSort.bind(this,"hours")}></i>          
                    </div>  
                    <div className={"col-2"} >
                        Tareas <i className="fas fa-sort" onClick={this.handleChangeSort.bind(this,"tasks")}></i>          
                    </div>  
                </div>
               </div> 
               <ul className="p-0 container-flex">
               {
                   this.props.projects.map((e,index) => {
                        return <ProjectComponent token={this.props.user.token} key={index} project={e} history={this.props.history} />
                   })
               }
               </ul>
            </div>
          

        )
    }
}


ProjectListComponent.propTypes = {
    user: PropTypes.object.isRequired,
    projects: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    projectActions: PropTypes.object.isRequired
}

export default ProjectListComponent;
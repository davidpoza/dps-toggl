import React, {Component} from 'react';
import PropTypes from 'prop-types';

import utils from '../../utils';
import ProjectComponent from '../ProjectComponent/ProjectComponent';


class ProjectListComponent extends Component{
    constructor(props){
        super(props);



        this.state = {

        };        
    }

    componentDidUpdate(prevProps){

    }

    

    render(){
        return(
            <div>
               <div className="p-0 container-flex">
                <div className={"row m-1 justify-content-between " } >
                    <div className={"col-8"} >
                        Nombre           
                    </div>
                    <div className={"col-2"} >
                        Horas           
                    </div>  
                    <div className={"col-2"} >
                        Tareas           
                    </div>  
                </div>
               </div> 
               <ul className="p-0 container-flex">
               {
                   this.props.project.projects.map((e,index) => {
                        return <ProjectComponent token={this.props.user.token} key={index} project={e} />
                   })
               }
               </ul>
            </div>
          

        )
    }
}


ProjectListComponent.propTypes = {


}

export default ProjectListComponent;
import React, {Component} from 'react';
import PropTypes from 'prop-types';


import ProjectComponent from '../ProjectComponent/ProjectComponent';


class ProjectListComponent extends Component{
    constructor(props){
        super(props);

        
        this.state = {

        };        
    }

    

    render(){
        return(
            <div>
               <ul className="p-0 container-flex">
               {
                   this.props.project.projects.map((e,index) => {
                        return <ProjectComponent token={this.props.user.token} key={index} project={e}/>
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
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import utils from '../../utils';
import styles from './ProjectComponent.scss';




class ProjectComponent extends Component{
    constructor(props){
        super(props);



    }

   componentWillMount(){
        
   }

   componentDidUpdate(prevProps){ 
      
   }

   handleOnClick(id){
        this.props.history.push("/projects/"+id);
   }
     
    render(){
        return(
            <li className={"row m-1 justify-content-between " + styles.project } onClick={this.handleOnClick.bind(this,this.props.project.id)}>
                <div className={"col-8 "} >
                    <i className="fas fa-circle" style={{color: this.props.project.color}}></i> {this.props.project.name}           
                </div>
                <div className={"col-2 "} >
                    {this.props.project.tasks && this.props.project.tasks.reduce((prev, curr)=>{
                        curr = utils.diffHoursBetHours(curr?curr.start_hour:"00:00:00", curr?curr.end_hour:"00:00:00")
                        return(prev+curr);
                    },0)} h.           
                </div>   
                <div className={"col-2 "} >
                    {this.props.project.tasks && this.props.project.tasks.length} tareas           
                </div>
            </li>
        )
    }
}

ProjectComponent.propTypes = {
    token: PropTypes.string.isRequired,

}


export default ProjectComponent;
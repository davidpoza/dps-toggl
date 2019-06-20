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
            <li className={"row m-0 m-lg-1 justify-content-between " + styles.project } onClick={this.handleOnClick.bind(this,this.props.project._id)}>
                { utils.isMobile() ?
                <div className={"col-12 "} >
                    <i className="fas fa-circle" style={{color: this.props.project.color}}></i> {this.props.project.name}
                </div>:
                <div className={"col-6 "} >
                    <i className="fas fa-circle" style={{color: this.props.project.color}}></i> {this.props.project.name}
                </div>
                }
                { !utils.isMobile() &&
                <div className={"col-2 "} >
                    {utils.standarDateToSpanish(this.props.project.created_on)}
                </div>
                }
                { !utils.isMobile() &&
                <div className={"col-2 "} >
                    {this.props.project.hours} h.
                </div>
                }
                { !utils.isMobile() &&
                <div className={"col-2 "} >
                    {this.props.project.tasks && this.props.project.tasks.length} tareas
                </div>
                }
            </li>
        )
    }
}

ProjectComponent.propTypes = {
    token: PropTypes.string.isRequired,

}


export default ProjectComponent;
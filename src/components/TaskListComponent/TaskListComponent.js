import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TaskContainer from '../TaskComponent/TaskContainer';


class TaskListComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
               <ul className="p-0 container-flex">
               {
                   this.props.tasks.map((e,index) => {
                        return (<TaskContainer key={index} task_id={e} onResume={this.props.onResume}/>)
                   })
               }
               </ul>
            </div>
          

        )
    }
}


TaskListComponent.propTypes = {
    tasks: PropTypes.array.isRequired,
    taskActions: PropTypes.object.isRequired,
    tagActions: PropTypes.object.isRequired,
}

export default TaskListComponent;
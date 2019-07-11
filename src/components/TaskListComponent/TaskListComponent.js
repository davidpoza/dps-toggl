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
                        if(e.parent == -1)
                        return (<TaskContainer
                            container={this.props.container}
                            key={index}
                            task_id={e.id}
                            task_children={e.children}
                            tasks_entities={this.props.tasks_entities}
                            tasks_tags_entities={this.props.tasks_tags_entities}
                            projects_entities={this.props.projects_entities}
                            tags_id={this.props.tags_id}
                            projects_id={this.props.projects_id}
                            limit={this.props.limit}
                            skip={this.props.skip}
                            onResume={this.props.onResume || null}/>)
                   })
               }
               </ul>
            </div>


        )
    }
}


TaskListComponent.propTypes = {
    token: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
}

export default TaskListComponent;
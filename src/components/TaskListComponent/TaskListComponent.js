import React, {Component} from 'react';
import PropTypes from 'prop-types';


import TaskComponent from '../TaskComponent/TaskComponent';


class TaskListComponent extends Component{
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
                   this.props.tasks.map((e,index) => {
                        return <TaskComponent token={this.props.token} key={index} task={e} projects={this.props.projects} tags={this.props.tags} taskActions={this.props.taskActions} tagActions={this.props.tagActions} onDeleteFromList={this.props.onDeleteFromList} onUpdate={this.props.onUpdate}/>
                   })
               }
               </ul>
            </div>
          

        )
    }
}


TaskListComponent.propTypes = {
    token: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
    need_refreshing: PropTypes.bool.isRequired,
    taskActions: PropTypes.object.isRequired,
    tagActions: PropTypes.object.isRequired,
    onDeleteFromList: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
}

export default TaskListComponent;
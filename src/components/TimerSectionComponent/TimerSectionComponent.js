import React, {Component} from "react";
import PropTypes from "prop-types";

import styles from "./TimerSectionComponent.scss";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import NewBlockContainer from "../NewBlockComponent/NewBlockContainer";
import TaskDatesContainer from "../TaskDatesComponent/TaskDatesContainer";

class TimerSectionComponent extends Component{
    constructor(props){
        super(props);
        this.NewBlockComponent = React.createRef();
        this.handleOnClickResume = this.handleOnClickResume.bind(this);
        this.setRef = this.setRef.bind(this);
    }

    handleOnClickResume(description, project_id, project_name, project_color, tags){
        this.NewBlockComponent.resumeTask(description, project_id, project_name, project_color, tags);
    }

    setRef(NewBlockComponent){
        this.NewBlockComponent = NewBlockComponent;
    }

    render(){
        return(

            <div className={"d-flex flex-column justify-content-start h-100"}>
                <div>
                    <NewBlockContainer setRef={this.setRef}/>
                </div>
                <div className={"flex-grow-1 " + styles.tasklist}>
                    <TaskDatesContainer onResume={this.handleOnClickResume}/>
                </div>
                <LoadingComponent isLoading={this.props.user_loading|this.props.task_loading|this.props.project_loading|this.props.tag_loading} />
            </div>
        );
    }
}

TimerSectionComponent.propTypes = {
    user_loading: PropTypes.bool.isRequired,
    task_loading: PropTypes.bool.isRequired,
    project_loading: PropTypes.bool.isRequired,
    tag_loading: PropTypes.bool.isRequired,
    userActions: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired,
    projectActions: PropTypes.object.isRequired,
    tagActions: PropTypes.object.isRequired,
};

export default TimerSectionComponent;
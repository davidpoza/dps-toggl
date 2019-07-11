import React, {Component} from 'react';
import PropTypes from 'prop-types';


import TaskListContainer from '../TaskListComponent/TaskListContainer';
import styles from './TaskDatesReportComponent.scss';
import utils from '../../utils';
import config from '../../config/config';
import lang from '../../config/lang';


class TaskDatesReportComponent extends Component{
    constructor(props){
        super(props);
        this.handleOnClickLoadMore = this.handleOnClickLoadMore.bind(this);
    }

    handleOnClick(date){
        this.props.reportActions.collapseDate(date);
    }

    handleOnClickLoadMore(){
        this.props.taskActions.loadMore(7);
    }

    render(){
        return(
            <div>
               <ul className="p-0 container-flex">
               {
                   this.props.dates && this.props.dates.map((e,index) => {
                        return (
                                <li className={styles.date} key={"date_group_"+index}>
                                <div className={"d-flex justify-content-between "+styles.header}>
                                    <h2>{ e.collapsed?<i className="fas fa-plus-square" onClick={this.handleOnClick.bind(this,e.date)}></i>:<i className="fas fa-minus-square" onClick={this.handleOnClick.bind(this,e.date)}></i> } {utils.standarDateToHuman(e.date)}</h2>
                                    <div>{e.time}h.</div>
                                </div>

                                { !e.collapsed &&
                                    <TaskListContainer
                                    container="TaskDatesReportComponent"
                                    date={e.date}
                                    dates_entities={this.props.dates_entities}
                                    tasks_entities={this.props.tasks_entities}
                                    tasks_tags_entities={this.props.tags_entities}
                                    projects_entities={this.props.projects_entities}
                                    tags_id={this.props.tags_id}
                                    projects_id={this.props.projects_id}
                                    onUpdate={this.handleUpdateTaskVisually}
                                    onResume={this.props.onResume || null}
                                    limit={this.props.limit}
                                    skip={this.props.skip}
                                    />
                                }
                                </li>
                        )
                   }, this)
               }
               </ul>
            </div>


        )
    }
}


TaskDatesReportComponent.propTypes = {
    token: PropTypes.string.isRequired,
    user_id: PropTypes.string.isRequired,
    dates: PropTypes.array.isRequired,
    need_refreshing: PropTypes.bool.isRequired,
    reportActions: PropTypes.object.isRequired,
    tagActions: PropTypes.object.isRequired,
}

export default TaskDatesReportComponent;
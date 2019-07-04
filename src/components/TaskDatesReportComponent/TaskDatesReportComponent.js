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

    //ese flag de refresco lo modificamos cuando se ha creado una nueva task y hay que pedir un listado nuevo
    componentDidUpdate(prevProps) {
        // if (!prevProps.need_refreshing && this.props.need_refreshing)
        // this.props.reportActions.fetchTasks(this.props.token, null, this.props.start_date, this.props.end_date, this.props.date_preset, null, null, null);

        // if(prevProps.limit < this.props.limit)
        // this.props.reportActions.fetchTasks(this.props.token, null, this.props.start_date, this.props.end_date, this.props.date_preset, null, null, null);
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
                                    onResume={this.props.onResume || null}/>
                                }
                                </li>
                        )
                   }, this)
               }
               </ul>
               {
                   //solo mostramos el boton de cargar mas si hay más tareas de las que estamos tomando con limit
                   this.props.total_tasks > this.props.limit &&
                   <p style={{textAlign: "center", margin: "20px"}}><button type="button" className="btn btn-info" onClick={this.handleOnClickLoadMore}>{lang[config.lang].load_more}</button></p>
               }
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
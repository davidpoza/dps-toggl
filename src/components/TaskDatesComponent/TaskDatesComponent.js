import React, {Component} from "react";
import PropTypes from "prop-types";


import TaskListContainer from "../TaskListComponent/TaskListContainer";
import styles from "./TaskDatesComponent.scss";
import utils from "../../utils";
import config from "../../config/config";
import lang from "../../config/lang";


class TaskDatesComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            limit: this.props.limit
        };
        this.handleOnClickLoadMore = this.handleOnClickLoadMore.bind(this);
        if (window.performance) {
            if (performance.navigation.type == 1){ //page is reloaded
                this.props.taskActions.resetLimit();
            }
        }
    }

    //también hacemos un fetchTasks al montar el componente lista.
    componentDidMount(){
        this.props.taskActions.fetchTasks(this.props.token, this.state.limit);
    }

    //ese flag de refresco lo modificamos cuando se ha creado una nueva task y hay que pedir un listado nuevo
    componentDidUpdate(prevProps) {
        if (!prevProps.need_refreshing && this.props.need_refreshing)
            return this.props.taskActions.fetchTasks(this.props.token, this.props.limit);

        if(prevProps.limit != this.props.limit){
            this.props.taskActions.fetchTasks(this.props.token, this.props.limit);
            this.setState({
                limit: this.props.limit
            });
        }
    }

    handleOnClick(date){
        this.props.taskActions.collapseDate(date);
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
                                        container="TaskDatesComponent"
                                        date={e.date}
                                        tasks_entities={this.props.tasks_entities}
                                        dates_entities={this.props.dates_entities}
                                        limit={this.props.limit}
                                        tasks_tags_entities={this.props.tasks_tags_entities}
                                        onUpdate={this.handleUpdateTaskVisually}
                                        onResume={this.props.onResume || null}/>
                                    }
                                </li>
                            );
                        }, this)
                    }
                </ul>
                {
                    //solo mostramos el boton de cargar mas si hay más tareas de las que estamos tomando con limit
                    this.props.total_tasks > this.props.limit &&
                   <p style={{textAlign: "center", margin: "20px"}}><button type="button" className="btn btn-info" onClick={this.handleOnClickLoadMore}>{lang[config.lang].load_more}</button></p>
                }
            </div>


        );
    }
}


TaskDatesComponent.propTypes = {
    token: PropTypes.string.isRequired,
    user_id: PropTypes.string.isRequired,
    dates: PropTypes.array.isRequired,
    need_refreshing: PropTypes.bool.isRequired,
    taskActions: PropTypes.object.isRequired,
    tagActions: PropTypes.object.isRequired,
};

export default TaskDatesComponent;
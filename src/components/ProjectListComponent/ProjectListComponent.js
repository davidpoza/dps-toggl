import React, {Component} from "react";
import PropTypes from "prop-types";

import utils from "../../utils";
import config from "../../config/config";
import lang from "../../config/lang";
import ProjectComponent from "../ProjectComponent/ProjectComponent";
import styles from "./ProjectListComponent.scss";

class ProjectListComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
        };
    }

    handleChangeSort(field){
        this.props.projectActions.changeSort(field);
    }

    render(){
        return(
            <div className="d-flex flex-column">
                <div className={styles.header}>
                    <div className={"container-flex " + styles.paddings}>
                        <div className={"row justify-content-between " } >
                            { !utils.isMobile() ?
                                <div className={"col-6 pl-0"} onClick={this.handleChangeSort.bind(this,"name")}>
                                    {lang[config.lang].th_project_name} <i className={this.props.sortBy!="name" ? "fas fa-sort" : this.props.order =="asc" ?"fas fa-sort-up":"fas fa-sort-down"} ></i>
                                </div>:
                                <div className={"col-12"} onClick={this.handleChangeSort.bind(this,"name")}>
                                    {lang[config.lang].th_project_name} <i className={this.props.sortBy!="name" ? "fas fa-sort" : this.props.order =="asc" ?"fas fa-sort-up":"fas fa-sort-down"} ></i>
                                </div>
                            }
                            { !utils.isMobile() &&
                            <div className={"col-2"} onClick={this.handleChangeSort.bind(this,"date")}>
                                {lang[config.lang].th_project_created} <i className={this.props.sortBy!="date" ? "fas fa-sort" : this.props.order =="asc" ?"fas fa-sort-up":"fas fa-sort-down"} ></i>
                            </div>
                            }
                            { !utils.isMobile() &&
                            <div className={"col-2"} onClick={this.handleChangeSort.bind(this,"hours")}>
                                {lang[config.lang].th_project_hours} <i className={this.props.sortBy!="hours" ? "fas fa-sort" : this.props.order =="asc" ?"fas fa-sort-up":"fas fa-sort-down"} ></i>
                            </div>
                            }
                            { !utils.isMobile() &&
                            <div className={"col-2"} onClick={this.handleChangeSort.bind(this,"tasks")}>
                                {lang[config.lang].th_project_tasks} <i className={this.props.sortBy!="tasks" ? "fas fa-sort" : this.props.order =="asc" ?"fas fa-sort-up":"fas fa-sort-down"} ></i>
                            </div>
                            }
                        </div>
                    </div>
                </div>
                <ul className={"p-0 container-flex "+styles.list }>
                    {
                        this.props.projects.map((e,index) => {
                            return <ProjectComponent token={this.props.user.token} key={index} project={e} history={this.props.history} />;
                        })
                    }
                </ul>
            </div>


        );
    }
}


ProjectListComponent.propTypes = {
    user: PropTypes.object.isRequired,
    projects: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    projectActions: PropTypes.object.isRequired,
    order: PropTypes.string.isRequired,
    sortBy: PropTypes.string.isRequired
};

export default ProjectListComponent;
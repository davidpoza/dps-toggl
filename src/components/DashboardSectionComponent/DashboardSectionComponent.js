import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import es from 'date-fns/locale/es';

import config from '../../config/config';
import lang from '../../config/lang';
import styles from './DashboardSectionComponent.scss';

import LoadingComponent from '../LoadingComponent/LoadingComponent';
import BarChartComponent from '../BarChartComponent/BarChartComponent';


class DashboardSectionComponent extends Component{
    constructor(props){
        super(props);
        this.dropdown = React.createRef();
        this.handleOnClickDateBtn = this.handleOnClickDateBtn.bind(this);
        this.closeDateDropdown = this.closeDateDropdown.bind(this);
        this.handleOnChangeStartDate = this.handleOnChangeStartDate.bind(this);
        this.handleOnChangeEndDate = this.handleOnChangeEndDate.bind(this);
        this.state = {
            start_date: new Date(Date.now()),
            end_date: new Date(Date.now()),
        }

    }

    componentDidMount(){
        let week_ago = new Date(this.state.end_date);
        week_ago.setDate(this.state.start_date.getDate() -7);

        this.setState({
            start_date: week_ago
        });
    }

    handleOnClickDateBtn(){
        this.dropdown.current.style.display = "block";
    }

    closeDateDropdown(){
        this.dropdown.current.style.display = "none";
    }

    handleOnChangeStartDate(date){
        this.setState({
            start_date: date
        })
    }

    handleOnChangeEndDate(date){
        this.setState({
            end_date: date
        })
    }

    render(){
        return(
            <div className={"d-flex flex-column justify-content-start h-100"}>
                <div className={"d-flex justify-content-between "+styles.header}>
                    <h1>{lang[config.lang].dashboard_section_title}</h1>
                    <div className="btn-group dropleft">
                        <button className="btn-lg btn-primary" type="button" id="dropdownMenuButton" onClick={this.handleOnClickDateBtn} >
                            <i className="fas fa-calendar-alt"></i>
                        </button>
                        <div className={"dropdown-menu "+styles.dropdown} ref={this.dropdown}>
                        <h2>{lang[config.lang].dashboard_date_dropdown_title}</h2>
                        <DatePicker
                            inline
                            locale={es} 
                            popperPlacement="left"
                            dateFormat="dd/MM/yyyy"
                            calendarClassName={styles.calendar}
                            selected={this.state.start_date}
                            onSelect={this.handleOnChangeStartDate}                            
                        />

                        <DatePicker
                            inline
                            locale={es} 
                            popperPlacement="left"
                            dateFormat="dd/MM/yyyy"
                            calendarClassName={styles.calendar}
                            selected={this.state.end_date}
                            onSelect={this.handleOnChangeEndDate}                            
                        />

                        <div className={"container "+styles.container_dates}>
                            <div className="row">
                                <div className="col-3">{lang[config.lang].date_today}</div>
                                <div className="col-3">{lang[config.lang].date_this_week}</div>
                                <div className="col-3">{lang[config.lang].date_this_month}</div>
                                <div className="col-3">{lang[config.lang].date_this_year}</div>
                            </div>
                            <div className="row">
                                <div className="col-3">{lang[config.lang].date_yesterday}</div>
                                <div className="col-3">{lang[config.lang].date_last_week}</div>
                                <div className="col-3">{lang[config.lang].date_last_month}</div>
                                <div className="col-3">{lang[config.lang].date_last_year}</div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <BarChartComponent />
                <LoadingComponent isLoading={this.props.user_loading||this.props.project_loading} />
            </div>
        )
    }
}

DashboardSectionComponent.propTypes = {
    user_loading: PropTypes.bool.isRequired,
    task_loading: PropTypes.bool.isRequired,
    project_loading: PropTypes.bool.isRequired,
    tag_loading: PropTypes.bool.isRequired,
    userActions: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired,
    projectActions: PropTypes.object.isRequired,
    tagActions: PropTypes.object.isRequired,
}

export default DashboardSectionComponent;
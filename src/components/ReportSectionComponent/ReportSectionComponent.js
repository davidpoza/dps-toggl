import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import es from 'date-fns/locale/es';

import utils from '../../utils';
import config from '../../config/config';
import lang from '../../config/lang';
import styles from './ReportSectionComponent.scss';

import LoadingComponent from '../LoadingComponent/LoadingComponent';
import CheckboxFilterComponent from '../CheckboxFilterComponent/CheckboxFilterComponent';
import TaskDatesReportContainer from '../TaskDatesReportComponent/TaskDatesReportContainer';
import TextFilterComponent from '../TextFilterComponent/TextFilterComponent';




class ReportSectionComponent extends Component{
    constructor(props){
        super(props);
        this.dropdown = React.createRef();
        this.handleOnClickDateBtn = this.handleOnClickDateBtn.bind(this);
        this.closeDateDropdown = this.closeDateDropdown.bind(this);
        this.handleOnChangeStartDate = this.handleOnChangeStartDate.bind(this);
        this.handleOnChangeEndDate = this.handleOnChangeEndDate.bind(this);
        this.handleOnChangePresetDate = this.handleOnChangePresetDate.bind(this);
        this.handleOnFilterByProject = this.handleOnFilterByProject.bind(this);
        this.handleOnFilterByUser = this.handleOnFilterByUser.bind(this);
        this.handleOnFilterByDesc = this.handleOnFilterByDesc.bind(this);
        this.handleOnResetFilterByProject = this.handleOnResetFilterByProject.bind(this);
        this.state = {
            //filtros por defecto
            start_date: null, //objeto Date
            end_date: null, //objeto Date
            description: null,
            user_ids: null,
            project_ids: null, //array de ids de proyectos que estamos filtrando
            preset: ""
        }
    }

    componentDidMount(){
        // por defecto mostramos el último preset que usamos o en caso de no existir last_preset, el intervalo de la última semana
        this.handleOnChangePresetDate(this.props.preset ? this.props.preset : "preset_last_week");
    }

    componentDidUpdate(prevProps, prevState){
        //hacemos la consulta cada vez que cambian las fechas
       if(prevState.start_date != this.state.start_date ||
        prevState.end_date != this.state.end_date ||
        prevState.project_ids != this.state.project_ids ||
        prevState.user_ids != this.state.user_ids ||
        prevState.description != this.state.description){
           this.props.reportActions.changeFilters(this.state.start_date, this.state.end_date, this.state.preset);
           this.props.reportActions.fetchTasks(this.props.token, null, this.state.start_date, this.state.end_date, this.state.user_ids, this.state.project_ids, null, this.state.description);
       }
    }

    handleOnClickDateBtn(){
        (!this.dropdown.current.style.display || this.dropdown.current.style.display=="none")?this.dropdown.current.style.display="block":this.dropdown.current.style.display="none";
    }

    closeDateDropdown(){
        this.dropdown.current.style.display = "none";
    }

    handleOnChangeStartDate(date){
        this.setState({
            start_date: date,
            preset: "preset_custom"
        })
    }

    handleOnChangeEndDate(date){
        this.setState({
            end_date: date,
            preset: "preset_custom"
        })
    }

    /**
    Cambia el preset de fechas según el id del elemento que hayamos pulsado.
    -
     */
    handleOnChangePresetDate(preset){
        if(typeof preset == "object")preset=preset.target.id;
        let start_date=this.props.date_start ? new Date(this.props.date_start): "";
        let end_date=this.props.date_end ? new Date(this.props.date_end) : "";
        let today = new Date(Date.now());
        let day = today.getDay()==0?7:today.getDay();
        switch(preset){
            case "preset_today":
                start_date = today;
                end_date = today;
                break;
            case "preset_week":
                let monday = new Date();
                monday.setDate(today.getDate() - day + 1);
                let sunday = new Date(monday);
                sunday.setDate(monday.getDate() + 6);
                start_date = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
                end_date = new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate());
                break;
            case "preset_month":
                start_date = new Date(today.getFullYear(), today.getMonth(), 1);
                let last_day = new Date();
                last_day.setFullYear(today.getFullYear(), today.getMonth()+1, 0);
                end_date = new Date(today.getFullYear(), today.getMonth(), last_day.getDate());
                break;
            case "preset_year":
                start_date = new Date(today.getFullYear(), 0, 1);
                end_date = new Date(today.getFullYear(), 11, 31);
                break;
            case "preset_yesterday":
                let yesterday = new Date();
                yesterday.setDate(today.getDate() - 1);
                start_date = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
                end_date = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());

                break;
            case "preset_last_week":
                let past_monday = new Date();
                past_monday.setDate(today.getDate() - day + 1 - 7);
                let past_sunday = new Date(past_monday);
                past_sunday.setDate(past_monday.getDate() + 6);
                start_date = new Date(past_monday.getFullYear(), past_monday.getMonth(), past_monday.getDate());
                end_date = new Date(past_sunday.getFullYear(), past_sunday.getMonth(), past_sunday.getDate());
                break;
            case "preset_last_month":
                start_date = new Date(today.getFullYear(), today.getMonth()-1, 1);
                let last_month_last_day = new Date();
                last_month_last_day.setFullYear(today.getFullYear(), today.getMonth(), 0);
                end_date = new Date(today.getFullYear(), today.getMonth()-1, last_month_last_day.getDate());
                break;
            case "preset_last_year":
                start_date = new Date(today.getFullYear()-1, 0, 1);
                end_date = new Date(today.getFullYear()-1, 11, 31);
                break;


        }
        this.setState({
            start_date: start_date,
            end_date: end_date,
            preset: preset
        });
    }

    handleOnFilterByUser(ids_array){
        this.setState({
            user_ids: ids_array
        });
    }

    handleOnFilterByProject(ids_array){
        this.setState({
            project_ids: ids_array
        });
    }

    handleOnFilterByDesc(desc){
        this.setState({
            description: desc
        });
    }

    handleOnResetFilterByProject(){
        this.setState({
            project_ids: null
        })
    }

    render(){
        return(
            <div className={"d-flex flex-column justify-content-start h-100"}>
                <div className={"d-flex justify-content-between "+styles.header}>
                    <h1>{lang[config.lang].reports_section_title}</h1>
                    <div className="btn-group dropleft">
                        <button className="btn-lg btn-primary" type="button" id="dropdownMenuButton" onClick={this.handleOnClickDateBtn} >
                            <i className="fas fa-calendar-alt"></i>
                        </button>
                        <div className={"dropdown-menu "+styles.dropdown} ref={this.dropdown}>
                        {!utils.isMobile() && <h2>{lang[config.lang].dashboard_date_dropdown_title}</h2>}
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

                        <div className={"container "+styles.date_preset_container}>
                            <div className="row">
                                <div className="col-6"><strong>{utils.standarDateToSpanish(this.state.start_date)}</strong></div>
                                <div className="col-6"><strong>{utils.standarDateToSpanish(this.state.end_date)}</strong></div>
                            </div>
                            <div className="row">
                                <div id="preset_today" className={"col " + styles.date_preset} onClick={this.handleOnChangePresetDate}>{lang[config.lang].date_today}</div>
                                <div id="preset_week" className={"col " + styles.date_preset} onClick={this.handleOnChangePresetDate}>{lang[config.lang].date_this_week}</div>
                                <div id="preset_month" className={"col " + styles.date_preset} onClick={this.handleOnChangePresetDate}>{lang[config.lang].date_this_month}</div>
                                <div id="preset_year" className={"col " + styles.date_preset} onClick={this.handleOnChangePresetDate}>{lang[config.lang].date_this_year}</div>
                            </div>
                            <div className="row">
                                <div id="preset_yesterday" className={"col " + styles.date_preset} onClick={this.handleOnChangePresetDate}>{lang[config.lang].date_yesterday}</div>
                                <div id="preset_last_week" className={"col " + styles.date_preset} onClick={this.handleOnChangePresetDate}>{lang[config.lang].date_last_week}</div>
                                <div id="preset_last_month" className={"col " + styles.date_preset} onClick={this.handleOnChangePresetDate}>{lang[config.lang].date_last_month}</div>
                                <div id="preset_last_year" className={"col " + styles.date_preset} onClick={this.handleOnChangePresetDate}>{lang[config.lang].date_last_year}</div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                <div className={"d-flex flex-row justify-content-between "+styles.filters_bar}>
                    <div>
                        {!utils.isMobile() && <span className={styles.filter_span}>{lang[config.lang].reports_filters_bar}:</span>}
                        <CheckboxFilterComponent list={this.props.projects} list_checked={this.state.project_ids==null?[]:this.state.project_ids} apply_filter_callback={this.handleOnFilterByProject} reset_filter_callback={this.handleOnFilterByProject} icon="fa-folder-open" placeholder={lang[config.lang].project_selector_search+"..."} />
                        <CheckboxFilterComponent list={this.props.users} list_checked={this.state.user_ids==null?[]:this.state.user_ids} apply_filter_callback={this.handleOnFilterByUser} reset_filter_callback={this.handleOnFilterByProject} icon="fa-users" placeholder={lang[config.lang].user_filter_search+"..."} />
                        <TextFilterComponent apply_filter_callback={this.handleOnFilterByDesc} icon="fa-font" placeholder={lang[config.lang].description_filter_search+"..."} />
                    </div>
                    <div>
                        <span className={styles.filter_span}>{!utils.isMobile()?lang[config.lang].total_results+": ":"x"}{this.props.total_results}</span>
                    </div>
                </div>

                <div className={"flex-grow-1 " + styles.tasklist}>
                    <TaskDatesReportContainer/>
                </div>

                <LoadingComponent isLoading={this.props.user_loading||this.props.report_loading||this.props.project_loading} />
            </div>
        )
    }
}

ReportSectionComponent.propTypes = {
    user_loading: PropTypes.bool.isRequired,
    report_loading: PropTypes.bool.isRequired,
    project_loading: PropTypes.bool.isRequired,
    tag_loading: PropTypes.bool.isRequired,
    userActions: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired,
    projectActions: PropTypes.object.isRequired,
    tagActions: PropTypes.object.isRequired,
}

export default ReportSectionComponent;
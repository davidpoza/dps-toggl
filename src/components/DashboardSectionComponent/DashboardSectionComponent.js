import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import es from 'date-fns/locale/es';

import utils from '../../utils';
import config from '../../config/config';
import lang from '../../config/lang';
import styles from './DashboardSectionComponent.scss';

import LoadingComponent from '../LoadingComponent/LoadingComponent';
import BarChartComponent from '../BarChartComponent/BarChartComponent';
import PieChartComponent from '../PieChartComponent/PieChartComponent';


class DashboardSectionComponent extends Component{
    constructor(props){
        super(props);
        this.dropdown = React.createRef();
        this.handleOnClickDateBtn = this.handleOnClickDateBtn.bind(this);
        this.closeDateDropdown = this.closeDateDropdown.bind(this);
        this.handleOnChangeStartDate = this.handleOnChangeStartDate.bind(this);
        this.handleOnChangeEndDate = this.handleOnChangeEndDate.bind(this);
        this.handleOnChangePresetDate = this.handleOnChangePresetDate.bind(this);
        this.state = {
            start_date: null, //objeto Date
            end_date: null, //objeto Date
            preset: ""
        }
    }   

    componentDidMount(){
        // por defecto mostramos el intervalo de la última semana
        this.handleOnChangePresetDate("preset_last_week");
        
    }

    componentDidUpdate(prevProps, prevState){
        //hacemos la consulta cada vez que cambian las fechas
       if(prevState.start_date != this.state.start_date || prevState.end_date != this.state.end_date){
           this.props.dashboardActions.fetchBarData(this.props.token, this.props.user_id, utils.standarizeDate(this.state.start_date), utils.standarizeDate(this.state.end_date));
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
        let start_date="";
        let end_date="";
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
                <div className={styles.content}>
                    <div className={"p-0 p-xl-5 "+styles.barchart_height}>
                    {this.state.start_date && this.state.end_date && Object.keys(this.props.data).length!=0 &&
                        <BarChartComponent preset={this.state.preset} start_date={this.state.start_date} end_date={this.state.end_date} data={this.props.data}/>
                    }
                    </div>
                    <div>
                        <ul className={styles.project_list}>
                        {this.props.data.entities && 
                        this.props.data.entities.projects &&
                        Object.keys(this.props.data.entities.projects).map((p,index)=>{
                            return (
                                <li key={"pli"+index}><i className="fas fa-circle" style={{color: this.props.data.entities.projects[p].color}}></i> {this.props.data.entities.projects[p].name}</li>
                            )
                        })}
                        </ul>

                    </div>

                    <div className={"p-0 p-xl-5 "+styles.piechart_height}>
                    {this.state.start_date && this.state.end_date && Object.keys(this.props.data).length!=0 &&
                        <PieChartComponent data={this.props.data}/>
                    }                     
                    </div>
                </div>
                
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
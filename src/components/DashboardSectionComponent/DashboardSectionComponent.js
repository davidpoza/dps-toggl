import React, {Component} from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";

import utils from "../../utils";
import config from "../../config/config";
import lang from "../../config/lang";
import styles from "./DashboardSectionComponent.scss";

import LoadingComponent from "../LoadingComponent/LoadingComponent";
import BarChartComponent from "../BarChartComponent/BarChartComponent";
import PieChartComponent from "../PieChartComponent/PieChartComponent";


class DashboardSectionComponent extends Component{
    constructor(props){
        super(props);
        this.dropdown = React.createRef();
        this.handleOnClickDateBtn = this.handleOnClickDateBtn.bind(this);
        this.closeDateDropdown = this.closeDateDropdown.bind(this);
        this.handleOnChangeStartDate = this.handleOnChangeStartDate.bind(this);
        this.handleOnChangeEndDate = this.handleOnChangeEndDate.bind(this);
        this.handleOnChangePresetDate = this.handleOnChangePresetDate.bind(this);
        this.formatDataToPieChart = this.formatDataToPieChart.bind(this);
        this.formatDataToBarChart = this.formatDataToBarChart.bind(this);

        this.state = {
            start_date: null, //objeto Date
            end_date: null, //objeto Date
            preset: "",
            pie_data: [],
            bar_data: [],
            bar_keys: []
        };
    }

    componentDidMount(){
        // por defecto mostramos el último preset que usamos o en caso de no existir last_preset, el intervalo de la última semana
        this.handleOnChangePresetDate(this.props.preset ? this.props.preset : "preset_last_week");
        let bar_obj = this.formatDataToBarChart(this.state.preset, this.state.start_date, this.state.end_date, this.props.data.entities);
        let pie_data = this.formatDataToPieChart(this.props.data.entities);
        this.setState({
            pie_data: pie_data,
            bar_data: bar_obj.dates || [] ,
            bar_keys: bar_obj.bar_keys || []
        });
    }

    componentDidUpdate(prevProps, prevState){
        //hacemos la consulta cada vez que cambian las fechas
        if(prevState.start_date != this.state.start_date || prevState.end_date != this.state.end_date){
            this.props.dashboardActions.fetchBarData(this.props.token, this.state.start_date, this.state.end_date, this.state.preset);
        }
        if(prevProps.data != this.props.data){
            let bar_obj = this.formatDataToBarChart(this.state.preset, this.state.start_date, this.state.end_date, this.props.data.entities);
            let pie_data = this.formatDataToPieChart(this.props.data.entities);
            this.setState({
                pie_data: pie_data,
                bar_data: bar_obj.dates || [],
                bar_keys: bar_obj.bar_keys || []
            });
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
        });
    }

    handleOnChangeEndDate(date){
        this.setState({
            end_date: date,
            preset: "preset_custom"
        });
    }

    /**
    Cambia el preset de fechas según el id del elemento que hayamos pulsado.
    -
     */
    handleOnChangePresetDate(preset){
        if(typeof preset == "object")preset=preset.target.id;
        let start_date=this.props.date_start ? new Date(this.props.date_start): "";
        let end_date=this.props.date_end ? new Date(this.props.date_end): "";
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


    /**
     *
     * @param {*} entities: object with the following normalized arrays of entities:
     *
     *      {
     *          "dates": []
     *          "tasks": []
     *          "projects":[]
     *      }
     * @returns Object array with following structure:
     *      {
     *          id:"PROYECTo B!!!"
     *          label:"PROYECTo B!!!"
     *          value:7.3
     *          color:"#51c93d"
     *      }
     */
    formatDataToPieChart(entities){
        let projects = {};
        let array_result = [];
        let sin_proyecto = {id:"Sin proyecto", label:"Sin proyecto", value:0, color:"#e7e7e6"};

        if(!entities)
            return array_result;

        if(entities.tasks){
            if(entities.projects)
                Object.keys(entities.projects).forEach(p=>{
                    projects[p]={id:entities.projects[p].name, label:entities.projects[p].name, value:0, color:entities.projects[p].color};
                });
            projects["null"]=sin_proyecto;
            Object.keys(entities.tasks).forEach(t=>{
                //vamos sumando las horas de cada tarea a su proyecto
                projects[entities.tasks[t].project]["value"]+=utils.diffHoursBetHours(entities.tasks[t].start_hour, entities.tasks[t].end_hour);
            });

            Object.keys(projects).forEach(p=>{
                if(projects[p].value>0)
                    array_result.push({
                        id: projects[p].id,
                        label: projects[p].label,
                        value: Math.floor(projects[p].value * 10) / 10,
                        color: projects[p].color
                    });
            }); //convertimos el objeto a un array de objetos
        }
        if(array_result.length == 0){
            array_result.push(sin_proyecto);
        }
        return array_result;
    }

    /**
     *
     * @param {*} preset: string with defines date range: eg. "preset_last_week"
     * @param {*} start_date: Date object
     * @param {*} end_date: Date object
     * @param {*} entities: object with the following normalized arrays of entities:
     *
     *      {
     *          "dates": []
     *          "tasks": []
     *          "projects":[]
     *      }
     *
     * @returns Object with the following structure:
     *      {
     *          dates: Array of objects:
     *              {
     *                  date: string with x value (abscissas)
     *              }
     *          bar_keys: Array of strings with the chart keys. eg. proyecto1, proyecto2
     *      }
     */
    formatDataToBarChart(preset, start_date, end_date, entities){
        let dates = [];
        let date_entities_as_months = {};
        let timeUnit = "days";
        let keys = [];

        if(start_date == null || end_date == null)
            return({dates: [], bar_keys:keys});

        if(entities.projects){
            keys = Object.keys(entities.projects).map(p=>entities.projects[p].name);
            keys.push("Sin proyecto");
        }
        else //aunque no venga ningun proyecto, al menos tiene que existir un valor en de keys para la gráfica.
            keys.push("Sin proyecto");

        if(preset == "preset_year" || preset == "preset_last_year" || utils.diffHoursBetDatesAsDays(start_date, end_date)>31)
            timeUnit = "months";
        dates = utils.getDatesRange(start_date, end_date, timeUnit);
        if(timeUnit == "months"){
            if(entities.dates)
                Object.keys(entities.dates).forEach(d=>{
                    if(!date_entities_as_months[utils.standarDateToHumanMonth(d)])
                        date_entities_as_months[utils.standarDateToHumanMonth(d)] = Object.assign({}, entities.dates[d]);
                    else //acumulamos las tareas de un mismo mes
                        date_entities_as_months[utils.standarDateToHumanMonth(d)].tasks =
                        [...date_entities_as_months[utils.standarDateToHumanMonth(d)].tasks,
                            ...entities.dates[d].tasks
                        ];
                });
        }
        dates = dates.map(d=>{
            if(timeUnit=="days"){
                if(entities.dates && entities.dates[d]){
                    d = Object.assign({},entities.dates[d]);
                    d.date=utils.standarDateToHumanShort(d.date);
                    d.tasks = d.tasks.map(t=>entities.tasks[t]);
                    d.tasks.forEach(t=>{
                        if(t.project){
                            let pname = entities.projects[t.project].name;
                            d[pname] = d.tasks.reduce((prev, curr)=>{
                                if(curr.project == t.project)
                                    curr = utils.diffHoursBetHours(curr?curr.start_hour:"00:00:00", curr?curr.end_hour:"00:00:00");
                                else
                                    curr = 0;
                                return(prev+curr);
                            },0);
                            d[pname+"Color"] = entities.projects[t.project].color;

                        }
                        else{
                            d["Sin proyecto"] = d.tasks.reduce((prev, curr)=>{
                                if(curr.project == null)
                                    curr = utils.diffHoursBetHours(curr?curr.start_hour:"00:00:00", curr?curr.end_hour:"00:00:00");
                                else
                                    curr = 0;
                                return(prev+curr);
                            },0);
                            d["Sin proyectoColor"] = "#e7e7e6";
                        }
                    });
                    delete d.tasks;
                    delete d.time;
                    delete d.collapsed;
                    delete d.task_count;
                }
                else
                    d = {date:utils.standarDateToHumanShort(d)};
                return d;
            }
            else if(timeUnit=="months"){
                if(date_entities_as_months && date_entities_as_months[d]){
                    d = Object.assign({},date_entities_as_months[d]);
                    d.date=utils.standarDateToHumanMonth(d.date);
                    d.tasks = d.tasks.map(t=>entities.tasks[t]);
                    d.tasks.forEach(t=>{
                        if(t.project){
                            let pname = entities.projects[t.project].name;
                            d[pname] = d.tasks.reduce((prev, curr)=>{
                                if(curr.project == t.project)
                                    curr = utils.diffHoursBetHours(curr?curr.start_hour:"00:00:00", curr?curr.end_hour:"00:00:00");
                                else
                                    curr = 0;
                                return(Math.floor((prev+curr) * 10) / 10);
                            },0);
                            d[pname+"Color"] = entities.projects[t.project].color;

                        }
                        else{
                            d["Sin proyecto"] = d.tasks.reduce((prev, curr)=>{
                                if(curr.project == null)
                                    curr = utils.diffHoursBetHours(curr?curr.start_hour:"00:00:00", curr?curr.end_hour:"00:00:00");
                                else
                                    curr = 0;
                                return(Math.floor((prev+curr) * 10) / 10);
                            },0);
                            d["Sin proyectoColor"] = "#e7e7e6";
                        }
                    });
                    delete d.tasks;
                    delete d.time;
                    delete d.collapsed;
                    delete d.task_count;
                }
                else
                    d = {date:d};
                return d;
            }
            return dates;
        });
        return({dates,bar_keys:keys});
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
                        {this.state.bar_data.length != 0 && this.state.bar_keys.length != 0 &&
                        <BarChartComponent preset={this.state.preset} start_date={this.state.start_date} end_date={this.state.end_date} data={this.state.bar_data} keys={this.state.bar_keys} ordinates_label={lang[config.lang].hours} />
                        }
                    </div>

                    <div className="p-md-3">
                        <ul className={styles.project_list}>
                            {this.props.data.entities &&
                        this.props.data.entities.projects &&
                        Object.keys(this.props.data.entities.projects).map((p,index)=>{
                            return (
                                <li key={"pli"+index}><i className="fas fa-circle" style={{color: this.props.data.entities.projects[p].color}}></i> {this.props.data.entities.projects[p].name}</li>
                            );
                        })}
                        </ul>

                    </div>

                    <div className={"p-0 p-xl-5 "+styles.piechart_height}>
                        {this.state.pie_data.length != 0 &&
                        <PieChartComponent data={this.state.pie_data}/>
                        }
                    </div>
                </div>

                <LoadingComponent isLoading={this.props.user_loading||this.props.project_loading} />
            </div>
        );
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
};

export default DashboardSectionComponent;
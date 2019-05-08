import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { ResponsiveBar } from '@nivo/bar'



import styles from './BarChartComponent.scss';
import utils from '../../utils';
import config from '../../config/config';
import lang from '../../config/lang';


class BarChartComponent extends Component{
    constructor(props){
        super(props);
        this.presetToTitle = this.presetToTitle.bind(this);
        this.getTimeUnitsForPreset = this.getTimeUnitsForPreset.bind(this);
        this.formatData = this.formatData.bind(this);   
    }

    presetToTitle(preset){
        switch(preset){
            case "preset_custom": return lang[config.lang].date_custom;
            case "preset_today": return lang[config.lang].date_today;
            case "preset_week": return lang[config.lang].date_this_week;
            case "preset_month": return lang[config.lang].date_this_month;
            case "preset_year": return lang[config.lang].date_this_year;
            case "preset_yerterday": return lang[config.lang].date_yesterday;
            case "preset_last_week": return lang[config.lang].date_last_week;
            case "preset_last_month": return lang[config.lang].date_last_month;
            case "preset_last_year": return lang[config.lang].date_last_year;
        }
    }

    getTimeUnitsForPreset(preset){
        switch(preset){
            case "preset_custom": return lang[config.lang].time_unit_days;
            case "preset_today": return lang[config.lang].time_unit_days;
            case "preset_week": return lang[config.lang].time_unit_days;
            case "preset_month": return lang[config.lang].time_unit_days;
            case "preset_year": return lang[config.lang].time_unit_months;
            case "preset_yerterday": return lang[config.lang].time_unit_days;
            case "preset_last_week": return lang[config.lang].time_unit_days;
            case "preset_last_month": return lang[config.lang].time_unit_days;
            case "preset_last_year": return lang[config.lang].time_unit_months;
        }
    }



    formatData(preset, start_date, end_date, data){
        let dates = [];
        let date_entities_as_months = {};
        let timeUnit = "days";
        if(preset == "preset_year" || preset == "preset_last_year" || utils.diffHoursBetDatesAsDays(start_date, end_date)>31)
            timeUnit = "months";
        dates = utils.getDatesRange(start_date, end_date, timeUnit);
        if(timeUnit == "months"){
            if(data.entities.dates)           
            Object.keys(data.entities.dates).forEach(d=>{
                if(!date_entities_as_months[utils.standarDateToHumanMonth(d)])
                    date_entities_as_months[utils.standarDateToHumanMonth(d)] = Object.assign({}, data.entities.dates[d]);
                else //acumulamos las tareas de un mismo mes
                    date_entities_as_months[utils.standarDateToHumanMonth(d)].tasks = 
                        [...date_entities_as_months[utils.standarDateToHumanMonth(d)].tasks, 
                         ...data.entities.dates[d].tasks
                        ];
            });
        }
        return dates.map(d=>{
            if(timeUnit=="days"){
                if(data.entities.dates && data.entities.dates[d]){
                    d = Object.assign({},data.entities.dates[d]);
                    d.date=utils.standarDateToHumanShort(d.date);
                    d.tasks = d.tasks.map(t=>data.entities.tasks[t]);
                    d.tasks.forEach(t=>{
                        if(t.project){
                            let pname = data.entities.projects[t.project].name;
                            d[pname] = d.tasks.reduce((prev, curr)=>{
                                if(curr.project == t.project)
                                    curr = utils.diffHoursBetHours(curr?curr.start_hour:"00:00:00", curr?curr.end_hour:"00:00:00")
                                else
                                    curr = 0;
                                return(prev+curr);
                              },0);
                            d[pname+"Color"] = data.entities.projects[t.project].color;
                            
                        }
                        else{
                            d["Sin proyecto"] = d.tasks.reduce((prev, curr)=>{
                                if(curr.project == null)
                                    curr = utils.diffHoursBetHours(curr?curr.start_hour:"00:00:00", curr?curr.end_hour:"00:00:00")
                                else
                                    curr = 0;
                                return(prev+curr);
                              },0);
                            d["Sin proyectoColor"] = "#fafafa"
                        }
                    })
                    delete d.tasks;
                    delete d.time;
                    delete d.collapsed;
                }
                else
                    d = {date:utils.standarDateToHumanShort(d)};
                return d;
            }
            else if(timeUnit=="months"){
                if(date_entities_as_months && date_entities_as_months[d]){
                    d = Object.assign({},date_entities_as_months[d]);
                    d.date=utils.standarDateToHumanMonth(d.date);
                    d.tasks = d.tasks.map(t=>data.entities.tasks[t]);
                    d.tasks.forEach(t=>{
                        if(t.project){
                            let pname = data.entities.projects[t.project].name;
                            d[pname] = d.tasks.reduce((prev, curr)=>{
                                if(curr.project == t.project)
                                    curr = utils.diffHoursBetHours(curr?curr.start_hour:"00:00:00", curr?curr.end_hour:"00:00:00")
                                else
                                    curr = 0;
                                return(Math.floor((prev+curr) * 10) / 10);
                              },0);
                            d[pname+"Color"] = data.entities.projects[t.project].color;
                            
                        }
                        else{
                            d["Sin proyecto"] = d.tasks.reduce((prev, curr)=>{
                                if(curr.project == null)
                                    curr = utils.diffHoursBetHours(curr?curr.start_hour:"00:00:00", curr?curr.end_hour:"00:00:00")
                                else
                                    curr = 0;
                                return(Math.floor((prev+curr) * 10) / 10);
                              },0);
                            d["Sin proyectoColor"] = "#fafafa"
                        }
                    })
                    delete d.tasks;
                    delete d.time;
                    delete d.collapsed;
                }
                else
                    d = {date:d};
                return d;
            }         
            
            
        })
    }



    render(){
        if(this.props.data){
            let keys = [];
            if(this.props.data.entities.projects){
                keys = Object.keys(this.props.data.entities.projects).map(p=>this.props.data.entities.projects[p].name);
                keys.push("Sin proyecto");
            }
            console.log(this.formatData(this.props.preset, this.props.start_date, this.props.end_date, this.props.data));
            console.log(keys);        
            return(
                <div>
                    <h2 className="text-center">{this.presetToTitle(this.props.preset)}</h2>
                    <ResponsiveBar
                        data={this.formatData(this.props.preset, this.props.start_date, this.props.end_date, this.props.data)}
                        keys={keys}
                        indexBy="date"
                        margin={{
                            "top": 20,
                            "right": 35,
                            "bottom": 40,
                            "left": 55
                        }}
                        padding={utils.isMobile()?0.0:0.3}
                        colors={(d)=>(d.data[d.id+"Color"])}       
                        borderColor={{
                            "from": "color",
                            "modifiers": [
                                [
                                    "darker",
                                    1.6
                                ]
                            ]
                        }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            "tickSize": 5,
                            "tickPadding": 5,
                            "tickRotation": utils.isMobile()?90:0,
                            "legend": this.getTimeUnitsForPreset(this.props.preset),
                            "legendPosition": "end",
                            "legendOffset": utils.isMobile()?50:32
                        }}
                        axisLeft={{
                            "tickSize": 5,
                            "tickPadding": 5,
                            "tickRotation": 0,
                            "legend": "horas",
                            "legendPosition": "middle",
                            "legendOffset": -40
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{
                            "from": "color",
                            "modifiers": [
                                [
                                    "darker",
                                    1.6
                                ]
                            ]
                        }}

                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                    />

                </div>
            )
        }
    }
}

BarChartComponent.propTypes = {

}

export default BarChartComponent;
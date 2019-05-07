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



    formatData(start_date, end_date, data){
        let dates = utils.getDatesRange(start_date, end_date);
        return dates.map(d=>{
            if(data.entities.dates && data.entities.dates[d]){
                d = Object.assign({},data.entities.dates[d]);
                d.date = utils.standarDateToHumanShort(d.date);
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
        })
    }



    render(){
        if(this.props.data){
            let keys = {};
            if(this.props.data.entities.projects){
                keys = Object.keys(this.props.data.entities.projects).map(p=>this.props.data.entities.projects[p].name);
                keys.push("Sin proyecto");
            }
            console.log(this.formatData(this.props.start_date, this.props.end_date, this.props.data));
            console.log(keys);        
            return(
                <div>
                    <h2 className="text-center">{this.presetToTitle(this.props.preset)}</h2>
                    <ResponsiveBar
                        data={this.formatData(this.props.start_date, this.props.end_date, this.props.data)}
                        keys={keys}
                        indexBy="date"
                        margin={{
                            "top": 20,
                            "right": 35,
                            "bottom": utils.isMobile()?200:100,
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
                            "tickRotation": 0,
                            "legend": this.getTimeUnitsForPreset(this.props.preset),
                            "legendPosition": "end",
                            "legendOffset": 32
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
                        legends={[
                            {
                                "dataFrom": "keys",
                                "anchor": utils.isMobile()?"bottom-left":"bottom",
                                "direction": utils.isMobile()?"column":"row",
                                "justify": false,
                                "translateX": 0,
                                "translateY": utils.isMobile()?150:65,
                                "itemsSpacing": 2,
                                "itemWidth": 100,
                                "itemHeight": 20,
                                "itemDirection": "left-to-right",
                                "itemOpacity": 0.85,
                                "symbolSize": 20,
                                "effects": [
                                    {
                                        "on": "hover",
                                        "style": {
                                            "itemOpacity": 1
                                        }
                                    }
                                ]
                            }
                        ]}
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
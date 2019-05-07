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
            case "preset_custom": return lang[config.lang].date_custom; break;
            case "preset_today": return lang[config.lang].date_today; break;
            case "preset_week": return lang[config.lang].date_this_week; break;
            case "preset_month": return lang[config.lang].date_this_month; break;
            case "preset_year": return lang[config.lang].date_this_year; break;
            case "preset_yerterday": return lang[config.lang].date_yesterday; break;
            case "preset_last_week": return lang[config.lang].date_last_week; break;
            case "preset_last_month": return lang[config.lang].date_last_month; break;
            case "preset_last_year": return lang[config.lang].date_last_year; break;
        }
    }

    getTimeUnitsForPreset(preset){
        switch(preset){
            case "preset_custom": return lang[config.lang].time_unit_days; break;
            case "preset_today": return lang[config.lang].time_unit_days; break;
            case "preset_week": return lang[config.lang].time_unit_days; break;
            case "preset_month": return lang[config.lang].time_unit_days; break;
            case "preset_year": return lang[config.lang].time_unit_months; break;
            case "preset_yerterday": return lang[config.lang].time_unit_days; break;
            case "preset_last_week": return lang[config.lang].time_unit_days; break;
            case "preset_last_month": return lang[config.lang].time_unit_days; break;
            case "preset_last_year": return lang[config.lang].time_unit_months; break;
        }
    }



    formatData(start_date, end_date, data){
        let dates = utils.getDatesRange(start_date, end_date);
        return dates.map(d=>{
            if(data.entities.dates[d]){
                d = Object.assign({},data.entities.dates[d]);
                d.date = utils.standarDateToHumanShort(d.date);
                d.tasks = d.tasks.map(t=>data.entities.tasks[t]);
                d.tasks.forEach(t=>{
                    if(t.project){
                        let pname = data.entities.projects[t.project].name;
                        d[pname] = 33; //aqui hay que realizar el recuento de horas que tiene cada proyecto
                        d[pname+"Color"] = data.entities.projects[t.project].color;
                    }
                    else{
                        d["Sin proyecto"] = 32;
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
                            "top": 50,
                            "right": 130,
                            "bottom": 50,
                            "left": 60
                        }}
                        padding={0.3}
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
                            "legendPosition": "middle",
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
                                "anchor": "bottom-right",
                                "direction": "column",
                                "justify": false,
                                "translateX": 120,
                                "translateY": 0,
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
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { ResponsivePie } from '@nivo/pie'



import styles from './PieChartComponent.scss';
import utils from '../../utils';
import config from '../../config/config';
import lang from '../../config/lang';


class BarChartComponent extends Component{
    constructor(props){
        super(props);
        this.presetToTitle = this.presetToTitle.bind(this);
        this.getTimeUnitsForPreset = this.getTimeUnitsForPreset.bind(this);
        this.formatData = this.formatData.bind(this);   

        this.data = [
            {
              "id": "ruby",
              "label": "ruby",
              "value": 85,
              "color": "hsl(149, 70%, 50%)"
            },
            {
              "id": "c",
              "label": "c",
              "value": 9,
              "color": "hsl(322, 70%, 50%)"
            },
            {
              "id": "hack",
              "label": "hack",
              "value": 296,
              "color": "hsl(197, 70%, 50%)"
            },
            {
              "id": "lisp",
              "label": "lisp",
              "value": 312,
              "color": "hsl(242, 70%, 50%)"
            },
            {
              "id": "css",
              "label": "css",
              "value": 278,
              "color": "hsl(25, 70%, 50%)"
            }
          ];
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



    formatData(data){
        let projects = {};
        Object.keys(data.entities.projects).forEach(p=>{
            projects[p]={id:p, label:data.entities.projects[p].name, value:0, color:data.entities.projects[p].color};
        });
        projects["null"]={id:null, label:"Sin proyecto", value:0, color:"#fafafa"};
        Object.keys(data.entities.tasks).forEach(t=>{
            projects[data.entities.tasks[t].project]["value"]+=utils.diffHoursBetHours(t.start_hour, t.end_hour);
        });

        return projects;
    }



    render(){
        console.log(this.formatData(this.props.data));
        if(this.props.data){
            return(
                <div>
                    <ResponsivePie
                        data={this.data}
                        margin={{
                            "top": 40,
                            "right": 80,
                            "bottom": 80,
                            "left": 80
                        }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        colors={{
                            "scheme": "nivo"
                        }}
                        borderWidth={1}
                        borderColor={{
                            "from": "color",
                            "modifiers": [
                                [
                                    "darker",
                                    0.2
                                ]
                            ]
                        }}
                        radialLabelsSkipAngle={10}
                        radialLabelsTextXOffset={6}
                        radialLabelsTextColor="#333333"
                        radialLabelsLinkOffset={0}
                        radialLabelsLinkDiagonalLength={16}
                        radialLabelsLinkHorizontalLength={24}
                        radialLabelsLinkStrokeWidth={1}
                        radialLabelsLinkColor={{
                            "from": "color"
                        }}
                        slicesLabelsSkipAngle={10}
                        slicesLabelsTextColor="#333333"
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                        
                        legends={[
                            {
                                "anchor": "bottom",
                                "direction": "row",
                                "translateY": 56,
                                "itemWidth": 100,
                                "itemHeight": 18,
                                "itemTextColor": "#999",
                                "symbolSize": 18,
                                "symbolShape": "circle",
                                "effects": [
                                    {
                                        "on": "hover",
                                        "style": {
                                            "itemTextColor": "#000"
                                        }
                                    }
                                ]
                            }
                        ]}
                    />

                </div>
            )
        }
    }
}

BarChartComponent.propTypes = {

}

export default BarChartComponent;
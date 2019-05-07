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

        this.data = [
            {
              "country": "AD",
              "hot dog": 130,
              "hot dogColor": "hsl(82, 70%, 50%)",
              "burger": 176,
              "burgerColor": "hsl(211, 70%, 50%)",
              "sandwich": 137,
              "sandwichColor": "hsl(325, 70%, 50%)",
              "kebab": 194,
              "kebabColor": "hsl(230, 70%, 50%)",
              "fries": 151,
              "friesColor": "hsl(330, 70%, 50%)",
              "donut": 115,
              "donutColor": "hsl(41, 70%, 50%)"
            },
            {
              "country": "AE",
              "hot dog": 72,
              "hot dogColor": "hsl(162, 70%, 50%)",
              "burger": 43,
              "burgerColor": "hsl(316, 70%, 50%)",
              "sandwich": 74,
              "sandwichColor": "hsl(139, 70%, 50%)",
              "kebab": 154,
              "kebabColor": "hsl(123, 70%, 50%)",
              "fries": 92,
              "friesColor": "hsl(78, 70%, 50%)",
              "donut": 141,
              "donutColor": "hsl(113, 70%, 50%)"
            },
            
          ];     
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
                d = data.entities.dates[d];
                d.tasks = d.tasks.map(t=>data.entities.tasks[t]);
            }
            else
                d = {date:d, time:0};
            return d;
        })
    }



    render(){
        if(this.props.data){
            console.log(this.formatData(this.props.start_date, this.props.end_date, this.props.data));        
            return(
                <div>
                    <h2 className="text-center">{this.presetToTitle(this.props.preset)}</h2>
                    <ResponsiveBar
                        data={this.formatData(this.props.start_date, this.props.end_date, this.props.data.entities.dates)}
                        keys={Object.keys(this.props.data.entities.projects).map(p=>this.props.data.entities.projects[p].name)}
                        indexBy="date"
                        margin={{
                            "top": 50,
                            "right": 130,
                            "bottom": 50,
                            "left": 60
                        }}
                        padding={0.3}
                        colors={{
                            "scheme": "nivo"
                        }}                
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
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { ResponsiveBar } from '@nivo/bar'

import styles from './BarChartComponent.scss';
import utils from '../../utils';
import config from '../../config/config';
import lang from '../../config/lang';


/**Properties
 * ==========
 * -preset={this.state.preset} start_date={this.state.start_date} end_date={this.state.end_date} data={this.state.bar_data} keys={this.state.bar_keys}
 * -start_date: Date object
 * -end_date: Date object
 * -ordinates_label: String with the label used for ordinates axis.
 * -preset: string with configuration no determine time range. Posible values:
 *
 *      "preset_custom"
 *      "preset_today"
 *      "preset_week"
 *      "preset_month"
 *      "preset_year"
 *      "preset_yerterday"
 *      "preset_last_week"
 *      "preset_last_month"
 *      "preset_last_year"
 *
 * -keys: Array of string, with diferents keys of the chart
 * -data: Array of objects with the following content:
 *
 *      {
 *       "key name": key_value, i.e. y value (ordinate) [number]
 *       "key name+Color": #FFFFFF; //whatever hex color
 *       "date": x value (abscissa) [string]
 *      }
*/

class BarChartComponent extends Component{
    constructor(props){
        super(props);
        this.presetToTitle = this.presetToTitle.bind(this);
        this.getTimeUnitsForPreset = this.getTimeUnitsForPreset.bind(this);
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



    render(){
        if(this.props.data && this.props.keys){
            return(
                <div>
                    <h2 className={styles.h2}>{this.presetToTitle(this.props.preset)}</h2>
                    <ResponsiveBar
                        data={this.props.data}
                        keys={this.props.keys}
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
                            "legend": this.props.ordinates_label,
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
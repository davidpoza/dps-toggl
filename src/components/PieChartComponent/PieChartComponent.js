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
        let data = this.props.data;
        if(data.length > 0){
            return(
                <div>
                    <ResponsivePie
                        data={data}
                        margin={{
                            "top": 20,
                            "right": 80,
                            "bottom": 20,
                            "left": 80
                        }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        colors={(p)=>(p.color)}
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
                        enableRadialLabels={utils.isMobile()?false:true}
                        radialLabel={(p)=>(p.label)}
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
                    />

                </div>
            )
        }
        return null;
    }
}

BarChartComponent.propTypes = {

}

export default BarChartComponent;
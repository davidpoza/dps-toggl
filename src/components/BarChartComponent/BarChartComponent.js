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
            {
              "country": "AF",
              "hot dog": 159,
              "hot dogColor": "hsl(323, 70%, 50%)",
              "burger": 90,
              "burgerColor": "hsl(32, 70%, 50%)",
              "sandwich": 10,
              "sandwichColor": "hsl(304, 70%, 50%)",
              "kebab": 180,
              "kebabColor": "hsl(351, 70%, 50%)",
              "fries": 72,
              "friesColor": "hsl(208, 70%, 50%)",
              "donut": 114,
              "donutColor": "hsl(147, 70%, 50%)"
            },
            {
              "country": "AG",
              "hot dog": 97,
              "hot dogColor": "hsl(285, 70%, 50%)",
              "burger": 177,
              "burgerColor": "hsl(158, 70%, 50%)",
              "sandwich": 136,
              "sandwichColor": "hsl(102, 70%, 50%)",
              "kebab": 139,
              "kebabColor": "hsl(185, 70%, 50%)",
              "fries": 8,
              "friesColor": "hsl(196, 70%, 50%)",
              "donut": 64,
              "donutColor": "hsl(61, 70%, 50%)"
            },
            {
              "country": "AI",
              "hot dog": 194,
              "hot dogColor": "hsl(181, 70%, 50%)",
              "burger": 6,
              "burgerColor": "hsl(229, 70%, 50%)",
              "sandwich": 2,
              "sandwichColor": "hsl(52, 70%, 50%)",
              "kebab": 158,
              "kebabColor": "hsl(314, 70%, 50%)",
              "fries": 173,
              "friesColor": "hsl(36, 70%, 50%)",
              "donut": 77,
              "donutColor": "hsl(265, 70%, 50%)"
            },
            {
              "country": "AL",
              "hot dog": 48,
              "hot dogColor": "hsl(69, 70%, 50%)",
              "burger": 28,
              "burgerColor": "hsl(100, 70%, 50%)",
              "sandwich": 101,
              "sandwichColor": "hsl(31, 70%, 50%)",
              "kebab": 103,
              "kebabColor": "hsl(272, 70%, 50%)",
              "fries": 44,
              "friesColor": "hsl(201, 70%, 50%)",
              "donut": 52,
              "donutColor": "hsl(356, 70%, 50%)"
            },
            {
              "country": "AM",
              "hot dog": 173,
              "hot dogColor": "hsl(103, 70%, 50%)",
              "burger": 104,
              "burgerColor": "hsl(307, 70%, 50%)",
              "sandwich": 25,
              "sandwichColor": "hsl(107, 70%, 50%)",
              "kebab": 115,
              "kebabColor": "hsl(21, 70%, 50%)",
              "fries": 67,
              "friesColor": "hsl(228, 70%, 50%)",
              "donut": 129,
              "donutColor": "hsl(207, 70%, 50%)"
            }
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

    render(){
        return(
            <div>
                <h2 className="text-center">{this.presetToTitle(this.props.preset)}</h2>
                <ResponsiveBar
                    data={this.data}
                    keys={[
                        "hot dog",
                        "burger",
                        "sandwich",
                        "kebab",
                        "fries",
                        "donut"
                    ]}
                    indexBy="country"
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
                    defs={[
                        {
                            "id": "dots",
                            "type": "patternDots",
                            "background": "inherit",
                            "color": "#38bcb2",
                            "size": 4,
                            "padding": 1,
                            "stagger": true
                        },
                        {
                            "id": "lines",
                            "type": "patternLines",
                            "background": "inherit",
                            "color": "#eed312",
                            "rotation": -45,
                            "lineWidth": 6,
                            "spacing": 10
                        }
                    ]}
                    fill={[
                        {
                            "match": {
                                "id": "fries"
                            },
                            "id": "dots"
                        },
                        {
                            "match": {
                                "id": "sandwich"
                            },
                            "id": "lines"
                        }
                    ]}
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
                        "legend": "country",
                        "legendPosition": "middle",
                        "legendOffset": 32
                    }}
                    axisLeft={{
                        "tickSize": 5,
                        "tickPadding": 5,
                        "tickRotation": 0,
                        "legend": "food",
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

BarChartComponent.propTypes = {

}

export default BarChartComponent;
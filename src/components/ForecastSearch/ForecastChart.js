
import React, {Component} from 'react';
import { ResponsiveBar } from '@nivo/bar'

const data = [
    {
      "country": "AD",
      "hot dog": 135,
      "hot dogColor": "hsl(274, 70%, 50%)",
      "burger": 63,
      "burgerColor": "hsl(250, 70%, 50%)",
      "sandwich": 7,
      "sandwichColor": "hsl(334, 70%, 50%)",
      "kebab": 104,
      "kebabColor": "hsl(150, 70%, 50%)",
      "fries": 72,
      "friesColor": "hsl(101, 70%, 50%)",
      "donut": 5,
      "donutColor": "hsl(50, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 125,
      "hot dogColor": "hsl(54, 70%, 50%)",
      "burger": 145,
      "burgerColor": "hsl(217, 70%, 50%)",
      "sandwich": 147,
      "sandwichColor": "hsl(332, 70%, 50%)",
      "kebab": 11,
      "kebabColor": "hsl(14, 70%, 50%)",
      "fries": 125,
      "friesColor": "hsl(58, 70%, 50%)",
      "donut": 77,
      "donutColor": "hsl(281, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 126,
      "hot dogColor": "hsl(158, 70%, 50%)",
      "burger": 169,
      "burgerColor": "hsl(221, 70%, 50%)",
      "sandwich": 131,
      "sandwichColor": "hsl(35, 70%, 50%)",
      "kebab": 197,
      "kebabColor": "hsl(105, 70%, 50%)",
      "fries": 110,
      "friesColor": "hsl(164, 70%, 50%)",
      "donut": 166,
      "donutColor": "hsl(38, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 64,
      "hot dogColor": "hsl(143, 70%, 50%)",
      "burger": 28,
      "burgerColor": "hsl(69, 70%, 50%)",
      "sandwich": 57,
      "sandwichColor": "hsl(116, 70%, 50%)",
      "kebab": 172,
      "kebabColor": "hsl(144, 70%, 50%)",
      "fries": 52,
      "friesColor": "hsl(278, 70%, 50%)",
      "donut": 43,
      "donutColor": "hsl(93, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 32,
      "hot dogColor": "hsl(208, 70%, 50%)",
      "burger": 109,
      "burgerColor": "hsl(52, 70%, 50%)",
      "sandwich": 23,
      "sandwichColor": "hsl(114, 70%, 50%)",
      "kebab": 75,
      "kebabColor": "hsl(239, 70%, 50%)",
      "fries": 61,
      "friesColor": "hsl(125, 70%, 50%)",
      "donut": 50,
      "donutColor": "hsl(7, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 8,
      "hot dogColor": "hsl(122, 70%, 50%)",
      "burger": 111,
      "burgerColor": "hsl(295, 70%, 50%)",
      "sandwich": 1,
      "sandwichColor": "hsl(78, 70%, 50%)",
      "kebab": 197,
      "kebabColor": "hsl(239, 70%, 50%)",
      "fries": 180,
      "friesColor": "hsl(249, 70%, 50%)",
      "donut": 199,
      "donutColor": "hsl(91, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 27,
      "hot dogColor": "hsl(328, 70%, 50%)",
      "burger": 142,
      "burgerColor": "hsl(315, 70%, 50%)",
      "sandwich": 184,
      "sandwichColor": "hsl(17, 70%, 50%)",
      "kebab": 131,
      "kebabColor": "hsl(331, 70%, 50%)",
      "fries": 20,
      "friesColor": "hsl(356, 70%, 50%)",
      "donut": 38,
      "donutColor": "hsl(182, 70%, 50%)"
    }
  ];
class ForecastChart extends Component {
    componentDidMount=()=> {
      this.drawChart();
    }

    componentDidUpdate=()=> {
        this.drawChart();
      }

    drawChart() {
        
    }

          
    render(){
        return (
            <div>
            <ResponsiveBar
                data={data}
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
                groupMode="grouped"
                colors="nivo"
                colorBy="id"
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
                borderColor="inherit:darker(1.6)"
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
                labelTextColor="inherit:darker(1.6)"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
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
            />
            </div>
        );
    }
  }
      
  export default ForecastChart;
  
  
import React, {Component} from 'react';
import * as d3 from "d3";
import moment from 'moment';
import {Tile} from 'carbon-components-react'
import "./BarChart.css";  

const dataForecast = [{
          "dt": 1553439600,
          "main": {
            "temp": 5.4,
            "temp_min": 4.74,
            "temp_max": 5.4,
            "pressure": 1009.23,
            "sea_level": 1009.23,
            "grnd_level": 980.04,
            "humidity": 71,
            "temp_kf": 0.67
          },
          "weather": [
            {
              "id": 801,
              "main": "Clouds",
              "description": "few clouds",
              "icon": "02d"
            }
          ],
          "clouds": {
            "all": 24
          },
          "wind": {
            "speed": 3.18,
            "deg": 231.006
          },
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2019-03-24 15:00:00"
        },
        {
          "dt": 1553450400,
          "main": {
            "temp": 1.97,
            "temp_min": 1.47,
            "temp_max": 1.97,
            "pressure": 1006.71,
            "sea_level": 1006.71,
            "grnd_level": 977.48,
            "humidity": 74,
            "temp_kf": 0.5
          },
          "weather": [
            {
              "id": 800,
              "main": "Clear",
              "description": "clear sky",
              "icon": "02n"
            }
          ],
          "clouds": {
            "all": 8
          },
          "wind": {
            "speed": 2.56,
            "deg": 212.501
          },
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2019-03-24 18:00:00"
        }
    ]
class BarChart extends Component {
    componentDidMount=()=> {
      this.drawChart();
    }

    componentWillReceiveProps=(nextProps)=> {
        if(nextProps.data !== this.props.data){
            this.drawChart();
        }
      }
    drawChart=()=>{

        var data = [10, 15, 20, 25, 30];

        var width = 500,
        height = 200;

        var svgWidth = width; 
        var svgHeight = height;
        var barPadding = 10;
        var barWidth = (svgWidth / data.length);        


    
    // Append SVG 
    var svg = d3.select("svg")
                .attr("width", width)
                .attr("height", height);

    var barChart = svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("y", function(d) {
                     return svgHeight - (d)
                })
                .attr("height", function(d) { 
                    return (d ); 
                })
                .attr("width", barWidth - barPadding)
                .attr("transform", function (d, i) {
                    var translate = [ 50+(barWidth * i), -30]; 
                    return "translate("+ translate +")";
                });                

    // Create scale
    var scale = d3.scaleLinear()
                  .domain([d3.min(data), d3.max(data)])
                  .range([0, width - 100]);

    // Add scales to axis
    var x_axis = d3.axisBottom()
                   .scale(scale);


    var scaleY = d3.scaleLinear()
    .domain([d3.min(data), d3.max(data)])
    .range([height, 0]);
                                      
    var y_axis = d3.axisLeft()
    .scale(scaleY)
    .ticks(10);           

    //Append group and insert axis

    svg.append("g")
       .attr("transform", "translate(50, 10)")
       .call(y_axis);

       svg.append("g")
       .attr("transform", `translate(50, ${height-20})`)
       .call(x_axis);       
    }



    drawChart1() {
        var dataset = dataForecast.map(f=> { return f.main.temp });
        console.log("dataset", dataset);

        var svgWidth = 100; 
        var svgHeight = 200;
        var barPadding = 10;
        var barWidth = (svgWidth / dataset.length);
        
        
        var svg = d3.select('svg')
            .attr("width", svgWidth)
            .attr("height", svgHeight);
            
        var barChart = svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("y", function(d) {
                 return svgHeight - (d *50)
            })
            .attr("height", function(d) { 
                return (d *50); 
            })
            .attr("width", barWidth - barPadding)
            .attr("transform", function (d, i) {
                var translate = [barWidth * i, 0]; 
                return "translate("+ translate +")";
            });

            var axisScale = d3.scaleLinear()
                                    .domain([0,100])
                                    .range([0,100]);      
    
    }
      
    // drawChart1() {
    // // let dataTest = this.props.data; 

    //  let data = dataForecast; 
    

    // //  let width = this.props.width;
    // //  let height = this.props.height; 
    // var svg = d3.select(`#${this.props.divId}`),
    // margin = 200,
    // width = svg.attr("width") - margin,
    // height = svg.attr("height") - margin;

    // var xScale = d3.scaleBand().range ([0, width]).padding(0.4),
    //     yScale = d3.scaleLinear().range ([height, 0]);

    // var g = svg.append("g")
    //         .attr("transform", "translate(" + 100 + "," + 100 + ")");

    // xScale.domain(data.map((d)=> { return moment.unix(d.dt).format("D/MM hh:mm") }));
    // yScale.domain([d3.min(data, (d)=> { return d.main.temp_min; }), d3.max(data, (d)=> { return d.main.temp_max; })]);

    // g.append("g")
    //  .attr("transform", "translate(0," + height + ")")
    //  .call(d3.axisBottom(xScale));

    // g.append("g")
    //  .call(d3.axisLeft(yScale).tickFormat((d)=>{
    //      return "ºC " + d;
    //  }).ticks(10))
    //  .append("text")
    //  .attr("y", 6)
    //  .attr("dy", "0.71em")
    //  .attr("text-anchor", "end")
    //  .text("value");    

    //  g.selectAll(".bar")
    //  .data(data)
    //  .enter().append("rect")
    //  .attr("class", "bar")
    //      .attr("x", (d)=>{ return xScale(moment.unix(d.dt).format("D hh:mm")); })
    //      .attr("y", (d)=>{ return yScale(d.main.temp); })
    //      .attr("width", xScale.bandwidth())
    //      .attr("height", (d)=> { return height - yScale(d.main.temp); });
      
    // }
          
    render(){
      return <Tile><svg width="600" height="500"></svg></Tile>
    }
  }
      
  export default BarChart;
  
  
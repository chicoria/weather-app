import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import moment from 'moment';

am4core.useTheme(am4themes_dataviz);
am4core.useTheme(am4themes_animated);

class Chart extends Component {
  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.paddingRight = 20;

    let data = this.getData();

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
   
    dateAxis.tooltipDateFormat = "HH:mm, d MMMM";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;


    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "temp";
    series.fillOpacity = 0.3;


    series.tooltipText = "{valueY.temp}";
    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    this.chart = chart;
  }

  componentDidUpdate(oldProps) {
    if (oldProps.forecast !== this.props.forecast) {
        this.chart.data = this.getData();
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  getData=()=>{
    if(this.props.forecast.city!== undefined){
        return this.props.forecast.list.map( f =>{
            return { date: moment.unix(f.dt), temp: f.main.temp }; 
        })
     }
     return [];
    }

    
  
  render() {
    return (
      <div id={`chartdiv`+this.props.date} style={{ width: "100%", height: "500px" }}></div>
    );
  }
}

export default connect(
    (state) => ({
      forecast : state.forecast.forecastData,
    }),{}
  )(Chart);


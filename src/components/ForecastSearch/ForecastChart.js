import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import moment from 'moment';

am4core.useTheme(am4themes_animated);

class ForecastChart extends Component {
  componentDidMount() {
    const chartDiv = this.getChartDiv(); 
    let chart = am4core.create(chartDiv, am4charts.XYChart);

    chart.paddingRight = 20;

    let data = this.getData();

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.dateFormats.setKey("day", "MMMM dt");


    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    valueAxis.title.text = "ºC";
    valueAxis.title.fontWeight = "300";

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "temp";
    series.fillOpacity = 0.3;


    series.tooltipText = "{valueY.temp}";
    chart.cursor = new am4charts.XYCursor();

    // let scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;

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

  getChartDiv(){
    let chartDiv = "chartdiv-"; 
    if ( this.props.date !== undefined ){
        return chartDiv+this.props.date ;
    }else {
        return chartDiv+"mainChart";
    }
  }

  getData=()=>{
    const {date, forecast} = this.props;
    if(forecast!== undefined){
        return forecast.map( f =>{
            let temp  ; 
            if(f.main!== undefined && f.main.temp !== undefined ){
                temp = f.main.temp
            }
            return { date: moment.unix(f.dt).toDate(), temp: temp }; 
        })
     }
     return [];
    }

    
  
  render() {
    const date = this.props.date || "main";

    return (
      <div id={this.getChartDiv()} style={{ width: "100%", height: "150px" }}></div>
    );
  }
}

export default ForecastChart;


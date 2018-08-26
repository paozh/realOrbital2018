import React, { Component } from 'react';
import HDB_prices from './data/new_HDB_prices_3room.json';
import './TimeSeries_3room.css';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';

//generate random colour 
var randomColor = require('randomcolor');

// var color = ['#F1948A', '#C39BD3', '#AED6F1', '#A3E4D7', '#F9E79F', '#DC7633']
// var counter = -1;


class TimeSeries_3room extends Component {
   // LineChart = require("react-chartjs").Line;

    render(){
        return (
        <LineChart width = {770} height = {230} 
        margin={{top: 30, right: 30, left: 20, bottom: 5}}>>
                
                <XAxis dataKey = "financial_year" type = "category" allowDuplicatedCategory={false} />
                <YAxis domain = {['dataMin', 'dataMax']} label = {{value: 'Cost of BTO ($)', position: 'left', angle: -90, offset: 10}}/>
                <Tooltip/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Legend verticalAlign = "bottom"/>
                {HDB_prices.map(s => (
                    <Line dataKey = "max_selling_price" data = {s.data} name = {s.name} key = {s.financial_year} stroke = {randomColor()}/>
                    ))}

                <Label value = "3-Room BTO Time Series" position = "top"/>

            </LineChart>
            );
    }
}

export default TimeSeries_3room;
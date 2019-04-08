import React, {Component} from 'react';
import  * as d3 from 'd3';

export default class Axis extends React.Component {

    componentDidMount(){
        this.renderAxis();
    }
    componentDidUpdate(){
        this.renderAxis();
    }
    renderAxis=()=>{
        let axisType = `axis${this.props.orient}`;
        const axis = d3[axisType]()
            .scale(this.props.scale)
            .tickSize(-this.props.tickSize)
            .tickPadding(this.props.padding)
            .ticks(this.props.ticks)
            .tickFormat(this.props.format)
        
        d3.select(this.axisElement)
            .call(axis)
    }
    render(){
        return (
            <g className={this.props.className} ref={el => this.axisElement = el} transform={this.props.translate}>
            </g>
        )
    }
}
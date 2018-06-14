import * as d3 from 'd3';
import React, { Component } from 'react'


class Line extends React.Component {


  drawLine() {
    let xScale = d3.scaleTime()
      .domain(d3.extent(this.props.data, ({ date }) => date))
      .rangeRound([0, this.props.width]);

    let yScale = d3.scaleLinear()
      .domain(d3.extent(this.props.data, ({ value }) => value))
      .rangeRound([this.props.height, 0]);

    let line = d3.line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value));

    return (
      <path
        className = "line"
        d         = {line(this.props.data)}
      />
    );
  }

  render() {
    <svg
      className = "line-container"
      width     = {this.props.width}
      height    = {this.props.height}
    >
      {this.drawLine()}
    </svg>
  }
}
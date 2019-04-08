import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
export default class Axis extends Component {
  componentDidMount() {
    this.drawAxis();
  }
  componentDidUpdate() {
    this.drawAxis();
  }
  drawAxis = ()=> this.props.variable === 'x' ? this.drawXAxis() : this.drawYAxis();
  drawXAxis =()=>{
    const height = this.props.height;
    return d3
      .select(this.container)
      .attr('transform', `translate(0, ${height})`)
      .call(this.createAxis())
      .selectAll('text')
      .style('text-anchor', this.props.textAnchor)
      .attr('font-size', this.props.fontSize + 'px')
      .attr('transform', `rotate(${this.props.textAngle})`);
  }

  drawYAxis=()=>{
    if (!this.props.body) return;

    d3.select(this.container)
      .call(this.createAxis())
      .selectAll('text')
      .style('text-anchor', this.props.textAnchor)
      .style('font-size', this.props.fontSize)
      .attr('transform', `rotate(${this.props.textAngle})`);
  }

  createAxis() {
    const axis =
      this.props.variable === 'x'
        ? d3.axisBottom(this.props.xScale)
        : d3.axisLeft(this.props.yScale);
    return axis
      .ticks(this.props.ticks)
      .tickSize(this.props.tickSize)
      .tickPadding(this.props.tickPadding);
  }

  render() {
    return (
      <g
        className={`rd3__${this.props.variable}Axis`}
        ref={c => (this.container = c)}
      />
    );
  }
}

Axis.propTypes = {
  variable: PropTypes.oneOf(['x', 'y']),
  svg: PropTypes.element,
  xScale: PropTypes.object,
  targetHeight: PropTypes.number,
  ticks: PropTypes.number,
  tickSize: PropTypes.number,
  tickPadding: PropTypes.number,
  textAnchor: PropTypes.string,
  textAngle: PropTypes.number,
  fontSize: PropTypes.number
};

Axis.defaultProps = {
  ticks: 5,
  tickSize: 10,
  tickPadding: 5,
  textAnchor: 'end',
  textAngle: 0,
  fontSize: 10
};

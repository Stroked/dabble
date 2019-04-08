import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export default class Line extends Component {
  render() {
    const {
      className,
      pathClassName,
      data,
      xScale,
      xAccesor,
      yScale,
      yAccesor,
      stroke,
      strokeWidth,
      fill,
      alpha
    } = this.props;

    const line = d3
      .line()
      .x(d => xScale(xAccesor(d)))
      .y(d => yScale(yAccesor(d)));

    if (alpha) line.curve(d3.curveCatmullRom.alpha(alpha));

    return (
      <g className={className}>
        <path
          className={pathClassName}
          d={line(data)}
          style={{
            stroke,
            strokeWidth,
            fill
          }}
        />
      </g>
    );
  }
}

Line.propTypes = {
  className: PropTypes.string,
  pathClassName: PropTypes.string,
  data: PropTypes.array,
  xScale: PropTypes.object, // D3 Scale
  xAccesor: PropTypes.func,
  yScale: PropTypes.object, // D3 Scale
  yAccesor: PropTypes.func,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  fill: PropTypes.string,
  alpha: PropTypes.number
};

Line.defaultProps = {
  className: 'rd3__line',
  pathClassName: 'rd3__line-path',
  stroke: 'steelblue',
  strokeWidth: 2,
  fill: 'none',
  alpha: 0
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export default class Area extends Component {
  render() {
    const {
      className,
      areaClassName,
      data,
      xScale,
      xAccesor,
      yScale,
      yAccesor,
      stroke,
      strokeWidth,
      fill,
      fillOpacity,
      alpha
    } = this.props;

    const area = d3
      .area()
      .x(d => xScale(xAccesor(d)))
      .y0(yScale(yScale.domain()[0]))
      .y1(d => yScale(yAccesor(d)));

    if (alpha) area.curve(d3.curveCatmullRom.alpha(alpha));

    return (
      <g className={className}>
        <path
          className={areaClassName}
          d={area(data)}
          style={{
            stroke,
            strokeWidth,
            fill,
            fillOpacity
          }}
        />
      </g>
    );
  }
}

Area.propTypes = {
  className: PropTypes.string,
  areaClassName: PropTypes.string,
  xScale: PropTypes.object, // D3 Scale
  xAccesor: PropTypes.func,
  yScale: PropTypes.object, // D3 Scale
  yAccesor: PropTypes.func,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  fill: PropTypes.string,
  fillOpacity: PropTypes.number,
  alpha: PropTypes.number
};

Area.defaultProps = {
  className: 'rd3__area',
  areaClassName: 'rd3__area-path',
  stroke: 'steelblue',
  strokeWidth: 2,
  fill: 'steelblue',
  fillOpacity: 0.5,
  alpha: 0
};

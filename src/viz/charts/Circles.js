import * as _ from 'lodash';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Circles extends Component {
  render() {
    const {
      className,
      circleClassName,
      labelClassName,
      data,
      xScale,
      xAccesor,
      yScale,
      yAccesor,
      zScale,
      zAccesor,
      fill,
      fillOpacity,
      labels,
      labelAccesor,
      labelY,
      labelFontSize
    } = this.props;

    return (
      <g className={className}>
        {data.map(d => (
          <g
            key={_.uniqueId('circle')}
            transform={`translate(${xScale(xAccesor(d))}, ${yScale(
              yAccesor(d)
            )})`}
          >
            {labels && (
              <text
                className={labelClassName}
                y={labelY}
                style={{
                  textAnchor: 'middle',
                  fill: 'black',
                  fontSize: labelFontSize
                }}
              >
                {labelAccesor ? labelAccesor(d) : zAccesor(d)}
              </text>
            )}
            <circle
              className={circleClassName}
              cx={0}
              cy={0}
              r={zScale(zAccesor(d))}
              fill={fill}
              fillOpacity={fillOpacity}
            />
          </g>
        ))}
      </g>
    );
  }
}

Circles.propTypes = {
  className: PropTypes.string,
  circleClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  labelAccesor: PropTypes.func,
  labels: PropTypes.bool,
  labelFontSize: PropTypes.string,
  labelY: PropTypes.number,
  data: PropTypes.array,
  xScale: PropTypes.object, // D3 Scale
  xAccesor: PropTypes.func,
  yScale: PropTypes.object, // D3 Scale
  yAccesor: PropTypes.func,
  zScale: PropTypes.object, // D3 Scale
  zAccesor: PropTypes.func,
  radius: PropTypes.number,
  fill: PropTypes.string,
  fillOpacity: PropTypes.number
};

Circles.defaultProps = {
  className: 'rd3__circles',
  circleClassName: 'rd3__circles',
  labelClassName: 'rd3__label',
  labelFontSize: '6px',
  labelY: 2,
  labels: true,
  fill: 'steelblue',
  fillOpacity: 1,
  radius: 5
};

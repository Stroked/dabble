import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as _ from 'lodash';
export default class Bars extends Component {
  render() {
    const {
      className,
      barClassName,
      data,
      xScale,
      xAccesor,
      yScale,
      yAccesor,
      height
    } = this.props;

    return (
      <g className={className}>
        {data.map(d => (
          <rect
            key={_.uniqueId('bar')}
            className={barClassName}
            x={xScale(xAccesor(d))}
            y={yScale(yAccesor(d))}
            width={xScale.bandwidth()}
            height={height - yScale(yAccesor(d))}
          />
        ))}
      </g>
    );
  }
}

Bars.propTypes = {
  className: PropTypes.string,
  barClassName: PropTypes.string,
  data: PropTypes.array,
  xScale: PropTypes.object, // D3 Scale
  xAccesor: PropTypes.func,
  yScale: PropTypes.object, // D3 Scale
  yAccesor: PropTypes.func,
  height: PropTypes.number
};

Bars.defaultProps = {
  className: 'rd3__bars',
  barClassName: 'rd3__bar'
};

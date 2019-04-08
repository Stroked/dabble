import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class ChartBackground extends Component {
  render() {
    return (
      <rect
        className="rd3__chart-svg-body-bg"
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

ChartBackground.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

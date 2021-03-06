import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as _ from 'lodash';

const IMargin = PropTypes.shape({
  top: PropTypes.number,
  right: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number
});
const IScale = PropTypes.oneOf(['band', 'linear']);
const IAxisOptions = PropTypes.shape({
  padding: PropTypes.number,
  minRange: PropTypes.number,
  maxRange: PropTypes.number
});

export default class Chart extends Component {

  state = {
    width: 0,
    height: 0,
    targetWidth: 0,
    targetHeight: 0
  };
  
  componentDidMount() {
    d3.select(window).on('resize.' + this.container.id, this.resize.bind(this));
    this.resize();
  }

  resize=()=> {
    const { margin: m, width: w, height: h } = this.props;

    const width = w - m.left - m.right;
    const height = h - m.top - m.bottom;
    const targetWidth = parseInt(this.container.offsetWidth, 10);
    const targetHeight = Math.round(targetWidth / (w / h));

    this.setState({
      width,
      height,
      targetWidth,
      targetHeight
    });
  }

  accesorFor=(axis)=> {
    switch (axis) {
      case 'x':
        return this.props.xAccesor;
      case 'y':
        return this.props.yAccesor;
      case 'z':
        return this.props.zAccesor;
    }
  }

  rangeFor=(axis)=> {
    switch (axis) {
      case 'z':
      case 'x':
        return [0, this.state.width];
      case 'y':
        return [this.state.height, 0];
    }
  }

  createBandScale=(axis, { padding } = {}) =>{
    const scale = d3.scaleBand();

    if (padding) {
      scale.padding(padding);
    }

    return scale
      .domain(this.props.data.map(this.accesorFor(axis)))
      .range(this.rangeFor(axis));
  }

  createLinearScale=(axis, { minRange, maxRange } = {})=> {
    const min =
      minRange !== undefined
        ? minRange
        : d3.min(this.props.data, this.accesorFor(axis));
    const max =
      maxRange !== undefined
        ? maxRange
        : d3.max(this.props.data, this.accesorFor(axis));

    return d3
      .scaleLinear()
      .domain([min, max])
      .range(this.rangeFor(axis))
      .nice();
  }

  createSqrtScale=(axis, { maxRadius } = {}) =>{
    return d3
      .scaleSqrt()
      .domain([0, d3.max(this.props.data, this.accesorFor(axis))])
      .range([0, maxRadius]);
  }

  createTimeScale=(axis, { startDate, endDate } = {})=> {
    return d3
      .scaleTime()
      .domain([startDate, endDate])
      .range(this.rangeFor(axis));
  }

  createScale=(axis, type, options) =>{
    switch (type) {
      case 'time':
        return this.createTimeScale(axis, options);
      case 'band':
        return this.createBandScale(axis, options);
      case 'sqrt':
        return this.createSqrtScale(axis, options);
      case 'linear':
        return this.createLinearScale(axis, options);
    }
  }

  render() {
    const { targetWidth, targetHeight } = this.state;

    const {
      margin: m,
      width: w,
      height: h,
      xScale: xScaleType,
      xScaleOptions,
      yScale: yScaleType,
      yScaleOptions,
      zScale: zScaleType,
      zScaleOptions,
      children = []
    } = this.props;

    const { svg = {}, container = {} } = this;

    const xScale = this.createScale('x', xScaleType, xScaleOptions);
    const yScale = this.createScale('y', yScaleType, yScaleOptions);
    const zScale = this.createScale('z', zScaleType, zScaleOptions);

    return (
      <div
        className="rd3__chart"
        id={_.uniqueId('chart')}
        ref={c => (this.container = c)}
      >
        <svg
          className="rd3__chart-svg"
          ref={c => (this.svg = c)}
          width={targetWidth || w}
          height={targetHeight || h}
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="xMinYMid"
        >
          <g
            className="rd3__chart-svg-body"
            transform={`translate(${m.left}, ${m.top})`}
            ref={c => (this.body = c)}
          >
            {(_.isArray(children) ? children : [children]).map(child =>
              React.cloneElement(
                child,
                Object.assign(
                  {},
                  this.props,
                  this.state,
                  {
                    xScale,
                    yScale,
                    zScale,
                    svg: this.svg,
                    body: this.body
                  },
                  child.props
                )
              )
            )}
          </g>
        </svg>
      </div>
    );
  }
}

Chart.propTypes = {
  data: PropTypes.array,
  accesor: PropTypes.func,
  margin: IMargin,
  width: PropTypes.number,
  height: PropTypes.number,
  xScale: IScale,
  xScaleOptions: IAxisOptions,
  xAccesor: PropTypes.func,
  yScale: IScale,
  yScaleOptions: IAxisOptions,
  yAccesor: PropTypes.func,
  zScale: IScale,
  zScaleOptions: IAxisOptions,
  zAccesor: PropTypes.func
};

Chart.defaultProps = {
  margin: { top: 10, right: 20, bottom: 60, left: 30 },
  width: 300,
  height: 200,
  xScale: 'band',
  data: [],
  xAccesor: d => d,
  yAccesor: d => d
};

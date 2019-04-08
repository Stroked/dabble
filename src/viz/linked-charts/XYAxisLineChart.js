import React, { Component } from 'react';
import * as d3 from 'd3';
import Axis from './Axis';

const XYAxisLineChart = ({scales,margins,svgDimensions}) => {
  const xAxisProps = {
        orient: 'Bottom',
        translate: `translate(0,${svgDimensions.height - margins.bottom})`,
        scale: scales.xScale,
        tickSize: svgDimensions.height - margins.top - margins.bottom,
        ticks: 4,
        className: 'axisBottom',
        padding: 10,
        format: d3.format("")
    }
    const yAxisProps = {
        orient: 'Left',
        translate: `translate(${margins.left},0)`,
        scale: scales.yScale,
        tickSize: svgDimensions.width - margins.left - margins.right,
        ticks: 5,
        className: 'axisLeft',
        padding: 15,
        format: null
    }

    return <g>
        <Axis {...xAxisProps} />
      <Axis {...yAxisProps} />
    </g>
}


export default XYAxisLineChart;
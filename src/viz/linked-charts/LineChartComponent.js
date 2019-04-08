import * as d3 from "d3";
import React, { Component } from "react";
import XYAxisLineChart from "./XYAxisLineChart";
import Line from "./Line";
import Area from "./Area";
import Tooltip from "./Tooltip";

const LineChartComponent = ({ data, onChangeYear, svgDimensions, margins }) => {
  const xScaleMinValue = Math.min(...data.map(d => d.year));
  const xScaleMaxValue = Math.max(...data.map(d => d.year));
  const yScaleMaxValue = Math.max(...data.map(d => d.income));

  const xScale = d3
    .scaleLinear()
    .domain([xScaleMinValue, xScaleMaxValue])
    .range([margins.left, svgDimensions.width - margins.right])
    .clamp(true);
  const yScale = d3
    .scaleLinear()
    .domain([0, yScaleMaxValue])
    .range([svgDimensions.height - margins.top, margins.bottom])
    .clamp(true);
  const text = (
    <text transform='translate(60,140)rotate(-90)' fontSize='13'>
      Annual Income ($)
    </text>
  );
  const rectOverlay = (
    <rect
      transform={`translate(${margins.left / 2},${margins.top / 2})`}
      className='rectOverlayLineChart'
      width={svgDimensions.width - margins.right}
      height={svgDimensions.height - margins.top}
      rx='5'
      ry='5'
    />
  );
  return (
    <svg
      className='lineChartSvg'
      width={svgDimensions.width}
      height={svgDimensions.height}>
      {rectOverlay}
      {text}
      <XYAxisLineChart
        scales={{ xScale, yScale }}
        margins={margins}
        svgDimensions={svgDimensions}
      />
      <Line scales={{ xScale, yScale }} data={data} />
      <Area
        scales={{ xScale, yScale }}
        data={data}
        svgDimensions={svgDimensions}
        margins={margins}
      />
      <Tooltip
        svgDimensions={svgDimensions}
        margins={margins}
        scales={{ xScale, yScale }}
        data={data}
        onChangeYear={onChangeYear}
      />
    </svg>
  );
};
export default LineChartComponent;

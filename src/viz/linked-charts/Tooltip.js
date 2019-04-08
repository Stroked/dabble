import React from "react";
import * as d3 from "d3";
export default class Tooltip extends React.Component {
  state = {
    year: ""
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.year !== this.state.year) {
      this.props.onChangeYear(this.state.year.toString());
    }
  }
  render() {
    const { svgDimensions, scales, margins, data } = this.props;
    const { xScale, yScale } = scales;
    let bisectMouseValue = d3.bisector(d => d.year).left;
    let mouseValue, d0, d1, i, d;
    const translateX = xScale(data[0].year),
      translateY = yScale(data[0].income);
    const tooltip = (
      <g
        className='lineChartTooltip'
        transform={`translate(${translateX},${translateY})`}>
        <line
          className='tooltipHoverLine'
          y1='0'
          y2={svgDimensions.height - translateY - margins.bottom}
          stroke='#FFF056'
          strokeWidth='1px'
          strokeDasharray='5'
        />
        <circle r='6px' stroke='#FFF056' strokeWidth='3px' fill='#333333' />
        <text x='-10' y='-10' fontSize='12px'>
          {data[1].income}
        </text>
      </g>
    );
    const overlay = (
      <rect
        transform={`translate(${margins.left},${margins.top})`}
        className='lineChartOverlay'
        width={svgDimensions.width - margins.left - margins.right}
        height={svgDimensions.height - margins.top - margins.bottom}
        opacity='0'
        onMouseMove={event => {
          mouseValue = xScale.invert(event.nativeEvent.offsetX);
          i = bisectMouseValue(data, mouseValue, 0, 5);
          d0 = data[i - 1];
          d1 = data[i];
          d = (((mouseValue - d0.year) < (d1.year - mouseValue)) ? d0 : d1);
          d3.select(".lineChartTooltip").attr(
            "transform",
            "translate(" + xScale(d.year) + "," + yScale(d.income) + ")"
          );
          d3.select(".lineChartTooltip line").attr(
            "y2",
            svgDimensions.height - yScale(d.income) - margins.bottom
          );
          d3.select(".lineChartTooltip text").text(d.income);
          this.setState({
            year: d.year
          });
        }}
        // onMouseOut={() => {
        //   d3.select(".lineChartTooltip").attr(
        //     "transform",
        //     "translate(" + translateX + "," + translateY + ")"
        //   );
        //   d3.select(".lineChartTooltip line").attr(
        //     "y2",
        //     svgDimensions.height - translateY - margins.bottom
        //   );
        //   d3.select(".lineChartTooltip text").text(data[2].income);
        //   this.setState({
        //     year: xScale.invert(translateX)
        //   });
        // }}
      />
    );
    return (
      <g>
        {overlay}
        {tooltip}
      </g>
    );
  }
}

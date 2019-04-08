import * as d3 from 'd3';
import React, { Component } from 'react';


const Line = ({scales,data}) => {    
        const {xScale,yScale} = scales;
        const line = d3.line()
            .x((d) => xScale(d.year))
            .y((d) => yScale(d.income))
            .curve(d3.curveMonotoneX);

        const path =
            <path
                d={line(data)}
                stroke="#FFF056"
                strokeWidth="3px"
                fill="none"
            />
        return(
            <g>{path}</g>
        )
}
export default Line;

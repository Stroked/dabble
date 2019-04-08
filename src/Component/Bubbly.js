import React, { Component } from 'react';
import * as d3 from 'd3';
export default class Bubbly extends Component {

  
  createVisualization() {
    var width  = 449;
    var height = 249;
    var radiusScale;

    var svg = d3
      .select('body') // select the 'body' element
      .append('svg') // append an SVG element to the body
      .attr('width', width) // make the SVG element 449 pixels wide
      .attr('height', height); // make the SVG element 249 pixels hig

    // draw a circle
    svg
      .append('circle') // attach a circle
      .attr('cx', 200) // position the x-centerElements, Attributes and Styles 11// draw a circle
      .attr('cy', 100) // position the x-centerElements, Attributes and Styles 11
      .attr('r', 50);

    var simulation = d3
      .forceSimulation()
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceX(width / 2).strength(0.05))
      .force(
        'collide',
        d3.forceCollide(function(d) {
          return radiusScale(d.sales) + 1;
        })
      );

d3.csv('../../data/sales.csv',ready);

    function ready(err, datapoints) {
      var circles = svg
        .selectAll('.artist')
        .data(datapoints)
        .enter()
        .append('circle')
        .attr('class', 'artist')
        .attr('r', 10)
        .attr('fill', 'lightblue')
        .attr('cx', 100)
        .attr('cy', 100);
    }
  }
  render() {


    this.createVisualization();


    
    return (
      <div className="chart">
        <svg height="500" width="800">
          <defs>
            <marker
              id           = "arrow"
              viewBox      = "0 -5 10 0"
              refX         = "0"
              refY         = "0"
              markerWidth  = "12"
              markerHeight = "12"
              orient       = "auto"
            >
              <path d="M0,-5L10,0L9,5" />
            </marker>
            <linearGradient
              id = "neonGradient"
              x1 = "0%"
              y1 = "100%"
              x2 = "0%"
              y2 = "100%"
            >
              <stop offset="0%" stopColor="#F433FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#3DFF33" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="circleGradient">
              <stop offset="0%" stopColor="#F433FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#3DFF33" stopOpacity="1" />
            </linearGradient>

            <linearGradient
              id = "divergingGradient"
              x1 = "0%"
              y1 = "0%"
              x2 = "100%"
              y2 = "0%"
            >
              <stop offset="0%" stopColor="#d73027" stopOpacity="1" />
              <stop offset="30%" stopColor="#ffffbf" stopOpacity="1" />
              <stop offset="70%" stopColor="#ffffbf" stopOpacity="1" />
              <stop offset="100%" stopColor="#1a9850" stopOpacity="1" />
            </linearGradient>

            {/* <pattern id="jon-snow" height="100%" width="100%" patternContentUnits="objectBoundingBox">
                <image height="1" width="1" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="snow.jpg"/>



              </pattern> */}
          </defs>
          <circle cx="100" cy="100" r="40" fill="url(#neonGradient)" />
          <circle cx="100" cy="100" r="40" fill="black" />
          <rect x="200" y="200" width="100" height="100" fill="orange" />
          <circle cx="400" cy="100" r="50" fill="blue" />
          <circle cx="500" cy="100" r="30" fill="pink" />
        </svg>
      </div>
    );
  }

  
}

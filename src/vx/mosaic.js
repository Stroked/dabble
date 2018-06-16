import * as d3 from 'd3';
import React, { Component } from 'react';


export default class mosaic extends Component {

   const width = 960;
   const  height = 500;

    constructor(props) {
        super(props);

        this.state = {};
        var sampler = poissonDiscSampler(width, height, 30),
            samples = [],
            sample;

        while (sample = sampler()) samples.push(sample);

        var voronoi = d3.voronoi()
            .extent([[-1, -1], [width + 1, height + 1]]);

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

        svg.selectAll("path")
            .data(voronoi.polygons(samples))
            .enter().append("path")
            .attr("d", function (d) { return "M" + d.join("L") + "Z"; })
            .style("fill", function (d) { return color(d.data) })
            .style("stroke", function (d) { return color(d.data) });

    }




    color = (d) => {
        var dx = d[0] - width / 2,
            dy = d[1] - height / 2;
        return d3.lab(100 - (dx * dx + dy * dy) / 5000, dx / 10, dy / 10);
        //  return d3.lab(`100 - (${dx} * ${dx} + ${dy} * ${dy}) / 5000, ${dx} / 10, ${dy} / 10)`)}
        //return d3.color(`lab(100 - (${dx} * ${dx} + ${dy} * ${dy}) / 5000, ${dx} / 10, ${dy} / 10)`);
        // d3.lab(`lab(100 - (${d.x} * ${d.x} + ${d.y} * ${d.y}) / 5000, ${d.x} / 10, ${d.y} / 10)`
    }


    // Based on https://www.jasondavies.com/poisson-disc/
    poissonDiscSampler = (width, height, radius) => {
        var k = 30, // maximum number of samples before rejection
            radius2 = radius * radius,
            R = 3 * radius2,
            cellSize = radius * Math.SQRT1_2,
            gridWidth = Math.ceil(width / cellSize),
            gridHeight = Math.ceil(height / cellSize),
            grid = new Array(gridWidth * gridHeight),
            queue = [],
            queueSize = 0,
            sampleSize = 0;

        return function () {
            if (!sampleSize) return sample(Math.random() * width, Math.random() * height);

            // Pick a random existing sample and remove it from the queue.
            while (queueSize) {
                var i = Math.random() * queueSize | 0,
                    s = queue[i];

                // Make a new candidate between [radius, 2 * radius] from the existing sample.
                for (var j = 0; j < k; ++j) {
                    var a = 2 * Math.PI * Math.random(),
                        r = Math.sqrt(Math.random() * R + radius2),
                        x = s[0] + r * Math.cos(a),
                        y = s[1] + r * Math.sin(a);

                    // Reject candidates that are outside the allowed extent,
                    // or closer than 2 * radius to any existing sample.
                    if (0 <= x && x < width && 0 <= y && y < height && far(x, y)) return sample(x, y);
                }

                queue[i] = queue[--queueSize];
                queue.length = queueSize;
            }
        };

        function far(x, y) {
            var i = x / cellSize | 0,
                j = y / cellSize | 0,
                i0 = Math.max(i - 2, 0),
                j0 = Math.max(j - 2, 0),
                i1 = Math.min(i + 3, gridWidth),
                j1 = Math.min(j + 3, gridHeight);

            for (j = j0; j < j1; ++j) {
                var o = j * gridWidth;
                for (i = i0; i < i1; ++i) {
                    if (s = grid[o + i]) {
                        var s,
                            dx = s[0] - x,
                            dy = s[1] - y;
                        if (dx * dx + dy * dy < radius2) return false;
                    }
                }
            }

            return true;
        }

        function sample(x, y) {
            var s = [x, y];
            queue.push(s);
            grid[gridWidth * (y / cellSize | 0) + (x / cellSize | 0)] = s;
            ++sampleSize;
            ++queueSize;
            return s;
        }
    }



    render() {
        return (
            <div>
                {voronoi}
            </div>
        );
    }

}

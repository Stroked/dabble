import React, { Component } from 'react';
// import logo from './logo.png';
import './App.css';
import { mosaic } from './Visualizations/mosaic';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <mosaic>

          </mosaic>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </header>
        <p className="App-intro">
        </p>

      </div>
    );
  }
}

export default App;

  // }

  // const fisheye = {
  //   scale: function (scaleType) {
  //     return d3_fisheye_scale(scaleType(), 3, 0);
  //   }
  // };

  // function d3_fisheye_scale(scale, d, a) {

  //   function fisheye(_) {
  //     var x    = scale(_),
  //         left = x < a,
  //       v,
  //          range      = d3.extent(scale.range()),
  //          min        = range[0],
  //          max        = range[1],
  //          m          = left ? a - min : max - a;
  //       if (m == 0) m = max - min;
  //     return (left ? -1 : 1) * m * (d + 1) / (d + (m / Math.abs(x - a))) + a;
  //   }

  //   fisheye.focus = function (_) {
  //     if (!arguments.length) return a;
  //     a = +_;
  //     return fisheye;
  //   };

  //   return d3.rebind(fisheye, scale, "domain", "range");
  // }
  // (function chart3() {
  //   console.clear()
  //   var width  = 960,
  //       height = 180,
  //       xSteps = d3.range(0, width, 16);

  //   var xFisheye = fisheye.scale(d3.scale.identity).domain([0, width]).focus(0),
  //       yFisheye = d3.scale.linear().domain([0, height]);

  //   console.log('xfisheye', xFisheye.ticks);
  //   var svg = d3.select("#chart3").append("svg")
  //     .attr("width", width)
  //     .attr("height", height)
  //     .append("g")
  //     .attr("transform", "translate(-.5,-.5)");

  //   svg.append("rect")
  //     .attr("class", "background")
  //     .attr("width", width)
  //     .attr("height", height);

  //   var xLine = svg.selectAll(".x")
  //     .data(xSteps)
  //     .enter().append("line")
  //     .attr("class", "x")
  //     .attr("y2", height);

  //   redraw();

  //   svg.on("mousemove", function () {
  //     var mouse = d3.mouse(this);

  //     xFisheye.focus(mouse[0]);
  //     yFisheye(mouse[1]);
  //     redraw();
  //   });

  //   function redraw() {
  //     xLine.attr("x1", xFisheye).attr("x2", xFisheye);
  //   }
  // })();



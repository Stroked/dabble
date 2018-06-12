import * as d3 from 'd3';









(function chart3() {
  console.clear()
  var width = 960,
    height = 180,
    xSteps = d3.range(0, width, 16);

  var xFisheye = d3_fisheye_scale(scaleType(), 3, 0).domain([0, width]).focus(0),
    yFisheye = d3.scale.linear().domain([0, height]);

  console.log('xfisheye', xFisheye.ticks);
  var svg = d3.select("#chart3").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(-.5,-.5)");

  svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height);

  var xLine = svg.selectAll(".x")
    .data(xSteps)
    .enter().append("line")
    .attr("class", "x")
    .attr("y2", height);

  redraw();

  svg.on("mousemove", function () {
    var mouse = d3.mouse(this);

    xFisheye.focus(mouse[0]);
    yFisheye(mouse[1]);
    redraw();
  });

  function redraw() {
    xLine.attr("x1", xFisheye).attr("x2", xFisheye);
  }
})();

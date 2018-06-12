import * as d3 from 'd3'

//THIS WORKS ONLY WITH D3 V3.X


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
};
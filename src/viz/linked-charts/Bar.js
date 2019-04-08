import React, {Component} from 'react';
import * as d3 from 'd3';
export default class Bar extends Component {
    constructor(props){
        super(props);
        this.colorScale = d3.scaleLinear()
            .domain([0,this.props.yMaxValue])
            .range(['#999999','#333333']);

    }
    componentDidMount() {
        this.renderBar();
    }
    renderBar(){
        let node = this.refs.bar;
        const { scales , margins, svgDimensions, data} = this.props;
        const { xScale, yScale } = scales;
        const { height } = svgDimensions;

        let bar = d3.select(node).append("g");
        bar.attr("class","rect-group")
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x",(d) => xScale(d.month))
            .attr("y",height - margins.bottom)
           
            .attr("x",(d) => xScale(d.month))
            .attr("y",(d) => yScale(d.income))
            .attr("width",xScale.bandwidth())
            .attr("height",(d) => height - yScale(d.income) - margins.bottom)
            .style("fill",(d) => this.colorScale(d.income))


        bar.attr("class","text-group")
            .selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("x",(d)=> xScale(d.month))
            .attr("y",(d)=>height - margins.bottom)
            
            .text((d) => d.income)
            .attr("x",(d) => xScale(d.month) + xScale.bandwidth()/4)
            .attr("y",(d) => yScale(d.income) - 5)
            .style("fill","#333333")
            .style("font-size","12px")

    }

    componentWillReceiveProps(nextProps){
        let node = this.refs.bar;
        const { scales , margins, svgDimensions,data} = nextProps;
        const { xScale, yScale } = scales;
        const { height } = svgDimensions;

        let bar = d3.select(node).append("g");

        d3.select(".rect-group").remove();
        bar.attr("class","rect-group")
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x",(d) => xScale(d.month))
            .attr("y",(d) => height - margins.bottom)
           // .transition().duration(2500).ease(d3.easeElastic)
            .attr("x",(d) => xScale(d.month))
            .attr("y",(d) => yScale(d.income))
            .attr("width",xScale.bandwidth())
            .attr("height",(d) => height - yScale(d.income) - margins.bottom)
            .style("fill",(d) => this.colorScale(d.income));

        d3.select(".text-group").remove();
        bar.append("g")
            .attr("class","text-group")
            .selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("x",(d)=> xScale(d.month))
            .attr("y",(d)=>height - margins.bottom)
            //.transition().duration(2500).ease(d3.easeElastic)
            .text((d) => d.income)
            .attr("x",(d) => xScale(d.month) + xScale.bandwidth()/4)
            .attr("y",(d) => yScale(d.income) - 5)
            .style("fill","#333333")
            .style("font-size","12px")
      
    }
    render() {
        return (
            <g ref="bar"></g>
        )
    }
}
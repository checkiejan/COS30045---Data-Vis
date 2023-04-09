function init(){
    var w = 600;
    var h = 300;
    var dataset = [45,25,20,10,6,5];
    var outerRadius = w/5;
    var innerRadius = 0;
    var arc = d3.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);

    var pie = d3.pie();
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height",h);

    var arcs = svg.selectAll("g.arc")
                    .data(pie(dataset))
                    .enter()
                    .append("g")
                    .attr("class","arc")
                    .attr("transform",`translate(${outerRadius+w/4},${innerRadius+150})`);

    arcs.append("path")
        .attr("fill", function(d,i){
            return color(i);
        })
        .attr("d",function(d,i){
            return arc(d,i);
        })
    arcs.append("text")
        .text(function(d){
            return d.value;
        })
        .attr("transform", function(d){
            return `translate(${arc.centroid(d)})`;
        })
}
window.onload = init;
function init(){
    var w = 600;
    var h = 300;
    var dataset;
    var padding = 60;

    

    var lineChart = function(dataset){
        xScale = d3.scaleTime()
                .domain([
                    d3.min(dataset,function(d) {return d.date;}),
                    d3.max(dataset,function(d) {return d.date;})
                ])
                .range([0,w]);

        yScale = d3.scaleLinear()
                    .domain([0,d3.max(dataset,function(d) {return d.number; })])
                    .range([h,0]);
        line = d3.line()
                    .x(function(d) {return xScale(d.date) + padding; })
                    .y(function(d) {return yScale(d.number); });
        var svg =  d3.select("#chart")
                        .append("svg")
                        .attr("width", w + 100)
                        .attr("height", h +padding);

        area = d3.area()
            .x(function(d) {  return xScale(d.date) + padding; })
            .y0( function() {return yScale.range()[0]; })
            .y1(function(d) {return yScale(d.number); });

       
        
        var xAxis = d3.axisBottom().ticks(8).scale(xScale);


        var yAxis = d3.axisLeft().ticks(8).scale(yScale);

        

        svg.append("g")
        // .attr("transform",`translate(0,${h-padding})`)
        .attr("transform",`translate(${padding},${h})`)
         .call(xAxis);
 
        svg.append("g")
            .attr("transform",`translate(${padding},0)`)
            .call(yAxis);

       
        

        svg.append("path")
            .datum(dataset)
            .attr("class", "area")
            .attr("d", area)
            .attr("fill","#C8B6A6");
        
        svg.append("line")
            .attr("class","line halfMilMark")
            .attr("x1",padding)
            .attr("y1", yScale(500000))
            .attr("x2",w + padding)
            .attr("y2", yScale(500000));

        svg.append("text")
            .attr("class", "halfMilMark")
            .attr("x", padding +10)
            .attr("y", yScale(500000) - 7)
            .text("Half a million unemployed")
            .attr("fill","red");
        
    }


    d3.csv("Unemployment_78-95.csv",function(d){
        return {
            date: new Date(+d.year, +d.month -1),
            number: +d.number
        }
    }).then(function(data){
        dataset = data;
        console.log(dataset,["date","number"]);
      lineChart(dataset);
    })

    
}
window.onload = init;
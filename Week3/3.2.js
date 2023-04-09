function init(){

    var w = 500; //width of the svg
    var h = 190; //height of the svg
    var padding = 30;
    var dataset = [ //hardcode dataset
            [5,20],
            [480,90],
            [250,50],
            [100,33],
            [330,95],
            [410,12],
            [475,44],
            [25,67],
            [85,21],
            [220,88],
    ];
    var xScale = d3.scaleLinear().domain([0, d3.max(dataset, function(d){ // scale from 0 to the maximum of the dataset
        return d[0];
    })])
    .range([padding,w - padding]);

    var yScale = d3.scaleLinear().domain([0, d3.max(dataset, function(d){ // scale from 0 to the maximum of the dataset
        return d[1];
    })])
    .range([h - padding,padding]);
   
    var xAxis = d3.axisBottom().ticks(5).scale(xScale); //tick is to add number of notation on the axis
    //axisBottom is to appear on the bottom

    var yAxis = d3.axisLeft().ticks(5).scale(yScale);

    var svg = d3.select("#chart") //create and append svg element into #chart
                .append("svg")
                .attr("width", w)
                .attr("height", h);


    svg.selectAll("circle") //draw circles of the data
                .data(dataset)
                .enter()
                .append("circle")
                .attr("cx", function(d,i){
                    return xScale(d[0]);
                })
                .attr("cy", function(d,i){
                    return yScale(d[1]);
                })
                .attr("r",4)
                .attr("fill",function(d){
                    //console.log
                    if(d[0] == d3.max(dataset, function(d){ return d[0];}))
                    {
                        
                        return "red";
                    }
                    return "slategrey";
                });

    svg.selectAll("text") //add text for each circle
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d){
            return d[0]+","+d[1];
        })
        .attr("x",function(d){
            return xScale(d[0])+5;
        })
        .attr("y",function(d){
            return yScale(d[1])+3;
        })
        .attr("font-family","sans-serif")
        .attr("font-size",10)
        .attr("fill","violet");

    svg.append("g") //add x-axis to the chart
       .attr("transform",`translate(0,${h - padding})`)
        .call(xAxis);

    svg.append("g") //add y-axis to the chart
        .attr("transform",`translate(${padding},0)`)
        .call(yAxis);

}
window.onload = init;

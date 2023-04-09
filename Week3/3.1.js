function init(){

    var w = 500; //width of the svg
    var h = 100; //height of the svg
    var padding = 10;
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
            [220,88]
    ];
    var xScale = d3.scaleLinear().domain([d3.min(dataset,function(d){ //set the domain from the minmum to the maximum of the dataset based on the x coord
        return d[0];
    }), d3.max(dataset, function(d){
        return d[0];
    })])
    .range([padding,w - padding]); //scale it to the range from padding to w-padding

    var yScale = d3.scaleLinear().domain([d3.min(dataset,function(d){ //set the domain from the minmum to the maximum of the dataset based on the y coord
        return d[1];
    }), d3.max(dataset, function(d){
        return d[1];
    })])
    .range([h - padding,padding]);
   
   var svg = d3.select("#chart") //create and append svg element into #chart
                .append("svg")
                .attr("width", w+30)
                .attr("height", h+30)
            
   

    svg.selectAll("circle") //draw dot
                .data(dataset)
                .enter()
                .append("circle")
                .attr("cx", function(d,i){
                    return xScale(d[0]); //xposition is calculated based ont the scale function
                })
                .attr("cy", function(d,i){
                    return yScale(d[1]); //xposition is calculated based ont the scale function
                })
                .attr("r",5)
                .attr("fill","slategrey"); //fill color

    svg.selectAll("text")
                .data(dataset)
                .enter()
                .append("text")
                .text(function(d){
                    return d[0]+","+d[1]; //add text which is the x and y value
                })
                .attr("x",function(d){
                    return xScale(d[0])+5; // transform the text to the right 5 so it wont collide with the circle
                })
                .attr("y",function(d){
                    return yScale(d[1])+3;
                })
                .attr("font-family","sans-serif")
                .attr("font-size",10)
                .attr("fill","violet");
}
window.onload = init;

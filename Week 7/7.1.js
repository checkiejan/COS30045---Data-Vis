function init(){
    var w = 600; // width of svg
    var h = 300; // height of svg
    var dataset;
    var padding = 60; //padding

    

    var lineChart = function(dataset){
        xScale = d3.scaleTime() 
                .domain([ //domain ranges from minmum to maximum value of the date of the dataset
                    d3.min(dataset,function(d) {return d.date;}), 
                    d3.max(dataset,function(d) {return d.date;})
                ])
                .range([0,w]);

        yScale = d3.scaleLinear()
                    .domain([0,d3.max(dataset,function(d) {return d.number; })]) //range from 0 to maximum value of the dataset
                    .range([h,0]);
        line = d3.line()
                    .x(function(d) {return xScale(d.date) + padding; }) // add padding to the x-coord to push it to the right
                    .y(function(d) {return yScale(d.number); });
        var svg =  d3.select("#chart")
                        .append("svg")
                        .attr("width", w + 100)
                        .attr("height", h +padding); // add padding to extend it

        area = d3.area()
            .x(function(d) {  return xScale(d.date) + padding; }) // add padding to the x-coord to push it to the right
            .y0( function() {return yScale.range()[0]; })
            .y1(function(d) {return yScale(d.number); });

       
        
        var xAxis = d3.axisBottom().ticks(8).scale(xScale); // number of ticks on the axis


        var yAxis = d3.axisLeft().ticks(8).scale(yScale); // number of ticks on the axis

        

        svg.append("g")
        // .attr("transform",`translate(0,${h-padding})`)
        .attr("transform",`translate(${padding},${h})`)
         .call(xAxis);
 
        svg.append("g")
            .attr("transform",`translate(${padding},0)`)
            .call(yAxis);

       

        svg.append("path")
            .datum(dataset)
            .attr("class", "line")
            .attr("d", line)
            .attr("fill","#C8B6A6");
        
        svg.append("line") // line element
            .attr("class","line halfMilMark")
            .attr("x1",padding)
            .attr("y1", yScale(500000))
            .attr("x2",w + padding) // push to the right
            .attr("y2", yScale(500000));

        svg.append("text")
            .attr("class", "halfMilMark")
            .attr("x", padding +10)
            .attr("y", yScale(500000) - 7)
            .text("Half a million unemployed")
            .attr("fill","red");
        
    }


    d3.csv("Unemployment_78-95.csv",function(d){ // load the dataset from csv file
        return { //re-format the data into just 2 columns 
            date: new Date(+d.year, +d.month -1), //js count month start from 0
            number: +d.number
        }
    }).then(function(data){
        dataset = data;
        console.log(dataset,["date","number"]);
      lineChart(dataset); //pass dataset to draw
    })

    
}
window.onload = init;
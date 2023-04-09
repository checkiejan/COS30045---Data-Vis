function init(){
    var w = 520;
    var h = 100;
    var padding = 1;
    
    var barchart = function(data, id){ //function to draw the bar chart
    
        var svg = d3.select(`#chart${id}`) // add svg to element with id of chart
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .style("margin-bottom","5px");
        svg.selectAll("rect") // add rectangle bar for the chart
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d,i){
                return (w/data.length)*i;
            })
            .attr("y", function(d){
                return h - d[`pets${id}`]*1.5 -25; // -25 to push the bar down a bit
            })
            .attr("width", w/data.length - padding)
            .attr("height", function(d){
                return d[`pets${id}`]*1.5;
            })
            .attr("fill", function(d){ //fill the color
                return "lightblue";
            });
            svg.selectAll("text") //add label for the bars
                .data(data)
                .enter()
                .append("text")
                .text(function(d){
                    return d['animal'];
                })
                .attr("x",function(d,i){
                    return (w/data.length)*i +15; // +15 to push the text to the right a bit
                })
                .attr("y",function(d){
                    return h -10; // -10 to push the text up
                })
                .attr("font-family","sans-serif")
                .attr("font-size",12)
                .attr("fill","violet")
            d3.select(`#chart${id}`) //add caption for the chart
                .append("figcation")
                .text(`Pet ownership in ${id}`);
    }
    
        d3.csv("pet_ownership.csv").then(function(data){  //load data from csv file
            console.log(data)
            barchart(data,2019);
            barchart(data,2021);
        })
}
window.onload = init;
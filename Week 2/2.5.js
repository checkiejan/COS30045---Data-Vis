function init(){
    var w = 520;
    var h = 100;
    var padding = 1;
    
    var barchart = function(data, id){
    
        var svg = d3.select(`#chart${id}`)
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .style("margin-bottom","5px");
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d,i){
                return (w/data.length)*i;
            })
            .attr("y", function(d){
                return h - d[`pets${id}`]*1.5 -25;
            })
            .attr("width", w/data.length - padding)
            .attr("height", function(d){
                return d[`pets${id}`]*1.5;
            })
            .attr("fill", function(d){
                return "lightblue";
            });
            svg.selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .text(function(d){
                    return d['animal'];
                })
                .attr("x",function(d,i){
                    return (w/data.length)*i;
                })
                .attr("y",function(d){
                    return h -10;
                })
                .attr("font-family","sans-serif")
                .attr("font-size",12)
                .attr("fill","violet")
            d3.select(`#chart${id}`)
                .append("figcation")
                .text(`Pet ownership in ${id}`);
    }
    
        d3.csv("pet_ownership.csv").then(function(data){  
            console.log(data)
            barchart(data,2019);
            barchart(data,2021);
        })
}
window.onload = init;
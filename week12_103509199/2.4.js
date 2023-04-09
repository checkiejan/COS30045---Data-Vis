function init(){
    var w = 520;
    var h = 120;
    var wombatSightings;
    var svg = d3.select("#chart") // add svg to element with id of chart
                .append("svg")
                .attr("width", w)
                .attr("height", h);
    var barchart = function(data){ //function to draw the bar chart
        var padding = 1;
        var sum=0;
        for(let i =0; i< data.length; i++){
            sum += parseInt(data[i].wombats); //get total sum value
            
        }
        var avg = sum/data.length; //get the average value of the dataset
        svg.selectAll("rect") // add rectangle bar for the chart
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d,i){
                return (w/data.length)*i;
            })
            .attr("y", function(d){
                return h - d.wombats*4;
            })
            .attr("width", w/data.length - padding)
            .attr("height", function(d){
                return d.wombats*4;
            })
            .attr("fill", function(d){ //fill color accordingly to the value of data
                   
                    if(avg < d.wombats){ 
                        return "lightblue"; //number smaller than the average value
                    }
                    else{
                        return "#97DEFF"; //number larger or equal to the average value
                    }
                    
            });
            svg.selectAll("text") //add text which is the value of data
            .data(data)
            .enter()
            .append("text")
            .text(function(d){ 
                return d.wombats;
            })
            .attr("x",function(d,i){
                if(d <10){ // if d is not 2-digit number give it less padding
                    return i*(w/data.length) + (w/data.length - padding)/2 -4; 
                }
                return i*(w/data.length) + (w/data.length - padding)/2 -8;
            })
            .attr("y",function(d){
                
                if(d.wombats  > 5){ //if data > 5 make the label on top of the bar
                    return h - d.wombats*4 +15;
                }
                return h - d.wombats*4 -3;
            })
    }
    
        d3.csv("wombats.csv").then(function(data){ //load data from csv
            wombatSightings = data;  
            
            barchart(wombatSightings);          
        })
}
window.onload = init;
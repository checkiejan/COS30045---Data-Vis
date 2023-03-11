function init(){
    var w = 520;
    var h = 120;
    var wombatSightings;
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
    var barchart = function(data){
        var padding = 1;
        var sum=0;
        for(let i =0; i< data.length; i++){
            sum += parseInt(data[i].wombats);
            
        }
        var avg = sum/data.length;
        svg.selectAll("rect")
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
            .attr("fill", function(d){
                   
                    if(avg < d.wombats){
                        return "lightblue";
                    }
                    else{
                        return "#97DEFF";
                    }
                    
            });
            svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text(function(d){
                return d.wombats;
            })
            .attr("x",function(d,i){
                if(d <10){
                    return i*(w/data.length) + (w/data.length - padding)/2 -4;
                }
                return i*(w/data.length) + (w/data.length - padding)/2 -8;
            })
            .attr("y",function(d){
                
                if(d.wombats  > 5){
                    return h - d.wombats*4 +15;
                }
                return h - d.wombats*4 -3;
            })
    }
    
        d3.csv("wombats.csv").then(function(data){
            wombatSightings = data;  
            
            barchart(wombatSightings);          
        })
}
window.onload = init;
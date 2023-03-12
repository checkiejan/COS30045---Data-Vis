function init(){
    var w = 500;
    var h = 100;
    var maxValue = 40;
    var dataset = [14,5,26,23,9,3,7,19,12,10,4,7,1,8];
    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length))
        .rangeRound([0,w])
        .paddingInner(0.05);
    var yScale = d3.scaleLinear()
            .domain([0,d3.max(dataset)])
            .range([0,h]);

    var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
    var padding =1;

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect");
    var createLabel = function(){
        svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text");
    }
    var drawLabel = function(){
        svg.selectAll("text")
            .data(dataset)
            .text(function(d){
                return d;
            })
            .attr("x",function(d,i){
                if(d <10){
                    //return i*(w/dataset.length) + (w/dataset.length - padding)/2 -4;
                    return xScale(i) + xScale.bandwidth()/2 -4;
                }
                return xScale(i) + xScale.bandwidth()/2 -9;
            })
            .attr("y",function(d){
                if(d  > 5){
                    return h - yScale(d) +15;
                }
                return h-yScale(d) -3;
            })
    }
   
    var updateChart = function(){
        svg.selectAll("rect")
            .data(dataset)
            .attr("x", function(d,i){
                return xScale(i);
            })
            .attr("y", function(d){
                return h - yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d){
                return yScale(d);
            })
            .attr("fill","#9E4784");
    }

    const drawChart = function(){    
        updateChart();
        drawLabel();
    }
    var ChangeData= function(){
        var numValues = dataset.length;
        
        dataset = [];
        for(var i=0; i< numValues;i++){
            
            var newNumber = Math.floor(Math.random()*maxValue);
            while(newNumber == 0)
            {
                newNumber = Math.floor(Math.random()*maxValue);
            }
            dataset.push(newNumber);
        }
        yScale.domain([0,maxValue]);
    }
    updateChart();
    createLabel();
    drawLabel();
    const btn = document.querySelector('.btn');
    btn.addEventListener("click",function(){
        ChangeData();
        drawChart();
    });
}
window.onload = init;
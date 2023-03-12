function init(){
    var w = 500;
    var h = 100;
    var maxValue = 40;
    var dataset = [maxValue,5,26,23,9,3,7,19,12,10,4,7,1,8];
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
    
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect");

    var addTooltip= function(data,d){
        d3.select(data)
            .attr("fill","#BE6DB7") 
            .transition()
            .delay(500)
            .duration(2000);
            var xPosition = parseFloat(d3.select(data).attr("x"))+10;
            var yPosition = parseFloat(d3.select(data).attr("y"));
            if(d>=10){
                yPosition = yPosition +15;
            }
            else{
                yPosition = yPosition - 3;
            }

        svg.append("text")
            .attr("id","tooltip")
            .attr("x",xPosition)
            .attr("y",yPosition)
            .text(d);
    }
    var updateBar = function(){
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
            .attr("fill","#9E4784")
            .on("mouseover", function(event,d){
                addTooltip(this,d);
                })
            .on("mouseout",function(){
                d3.select(this)
                    .attr("fill","#9E4784")  
                d3.select("#tooltip").remove();
            })
            .transition()
            .delay(10000)
            .duration(2000);
    }

   
    

    updateBar();        
                                
                
    var drawChart = function(){
        svg.selectAll("rect")
                    .data(dataset)
                    .enter()
                    .append("rect");
        updateBar();
    }
    
    var addData= function(){
       var newNumber = Math.floor(Math.random()*maxValue);
       while(newNumber == 0){
        newNumber = Math.floor(Math.random()*maxValue);
       }
       dataset.push(newNumber);
       xScale.domain(d3.range(dataset.length));
    }

    const btn = document.querySelector('.btn-add');
    btn.addEventListener("click",function(){
        addData();
        drawChart();
    });

    d3.selectAll(".btn-remove")
    .on("click",function(){
        dataset.shift();
        var bars = svg.selectAll("rect")
                    .data(dataset);
        bars.exit()
            .transition()
            .duration(500)
            .attr("x",w)
            .remove();

        xScale.domain(d3.range(dataset.length));
        drawChart();
    })
}
window.onload = init;
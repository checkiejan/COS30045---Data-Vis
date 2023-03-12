function init(){
    var w = 500;
    var h = 100;
    var maxValue = 40;
    var choice = -1;
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


    var createMouseEffect = function(){
        svg.selectAll("rect")
            .data(dataset)
            .on("mouseover", function(event,d){
                addTooltip(this,d);
                })
            .on("mouseout",function(){
                
                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr("fill","#9E4784")  
                d3.select("#tooltip").remove();
            });
    }

    createMouseEffect();

    var addTooltip= function(data,d){
        d3.select(data)
            .transition()
            .duration(350)
            .attr("fill","#BE6DB7");
        var xPosition = parseFloat(d3.select(data).attr("x"))+10;
        var yPosition = parseFloat(d3.select(data).attr("y"));
        if(d>10){
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
            .attr("fill","#9E4784");
        createMouseEffect();
        
    }

    updateBar();        
                
   var drawUpdate = function(){
        var bars = svg.selectAll("rect")
                    .data(dataset);
        bars.enter()
            .append("rect") 
            .on("mouseover", function(event,d){
                addTooltip(this,d);
                })
            .on("mouseout",function(){
                
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("fill","#9E4784")  
                d3.select("#tooltip").remove();
            })
            .attr("x",w)
            .attr("y",function(d){
                return h - yScale(d);
            })
            .merge(bars)
            .transition()
            .duration(500)
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
        //updateBar();
    }
    
    var addData= function(){
       var newNumber = Math.floor(Math.random()*maxValue);
       while(newNumber == 0){
        newNumber = Math.floor(Math.random()*maxValue);
       }
       dataset.push(newNumber);
       xScale.domain(d3.range(dataset.length));
    }

    var sortBars = function(){
        if(choice == 1)
        {
            svg.selectAll("rect")
                .sort(function(a,b){
                    return d3.ascending(a,b);
                })
                .transition()
                .delay(300)
                .duration(400)
                .attr("x",function(d,i){
                    return xScale(i);
                });
        }
        else{
            svg.selectAll("rect")
                .sort(function(a,b){
                    return d3.descending(a,b);
                })
                .transition()
                .duration(500)
                .ease(d3.easeCircleIn)
                .attr("x",function(d,i){
                    return xScale(i);
                });
        }
    }


    const btn = document.querySelector('.btn-add');
    btn.addEventListener("click",function(){
        addData();
        drawUpdate();
    });

    d3.select(".btn-remove")
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
            drawUpdate();
        })
    d3.select(".btn-sort")
        .on("click",function(){
            choice = choice * -1;
            sortBars();
        })
}
window.onload = init;
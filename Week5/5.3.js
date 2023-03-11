function init(){
    var w = 500;
    var h = 100;
    
    var dataset = [16,5,26,23,9,3,7,19,12,10,4,7,1,8];
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

    var bars = svg.selectAll("rect")
                    .data(dataset)
                    .enter()
                    .append("rect") 
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
        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
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
    var drawChart = function(){
        var bars = svg.selectAll("rect")
                    .data(dataset);
        bars.enter()
            .append("rect") 
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
                console.log(d);
                return h - yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d){
                return yScale(d);
            })
            .attr("fill","#9E4784");
        var text = svg.selectAll("text")
                        .data(dataset);

        text.enter()
            .append("text")
            .attr("x",w)
            .attr("y",function(d){
                return h - yScale(d);
            })
            .merge(text)
            .transition()
            .duration(500)
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
    
    var addData= function(){
    var maxValue = 40;
       var newNumber = Math.floor(Math.random()*maxValue);
       while(newNumber == 0){
        newNumber = Math.floor(Math.random()*maxValue);
       }
       dataset.push(newNumber);
       yScale.domain([0,d3.max(dataset)]);
       xScale.domain(d3.range(dataset.length));
    }

    const btn = document.querySelector('.btn-add');
    btn.addEventListener("click",function(){
        addData();
        var svg = document.querySelector('svg');
        drawChart();

    });
}
window.onload = init;
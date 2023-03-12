function init(){
    var w = 500;
    var h = 100;
    var dataset = [16,5,26,23,9,3,7,19,12,10,4,7,1,8];
    var choice = 0;
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


    
    const drawChart = function(opt){
       if(opt ==0){
        svg.selectAll("rect")
        .data(dataset)
        .transition()
        .delay(300)
        .duration(2000)
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
                    .transition()
                    .delay(300)
                    .duration(2000)
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
                            console.log(yScale(d));
                            return h - yScale(d)+15;
                        }
                        return h - yScale(d)-3;
                    })
       }
        else if(opt ==1){
            svg.selectAll("rect")
            .data(dataset)
            .transition()
            .duration(2000)
            .ease(d3.easeCircleIn)
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
                    .transition()
                    .duration(2000)
                    .ease(d3.easeCircleIn)
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
                            console.log(yScale(d));
                            return h - yScale(d)+15;
                        }
                        return h - yScale(d)-3;
                    })
            
        }
        else if(opt ==2)
        {
            svg.selectAll("rect")
            .data(dataset)
            .transition()
            .delay(function(d,i){
                return i/dataset.length *1000;
            })
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
                    .transition()
                    .delay(function(d,i){
                        return i/dataset.length *1000;
                    })
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
                            console.log(yScale(d));
                            return h - yScale(d)+15;
                        }
                        return h - yScale(d)-3;
                    })
        }
    }
   
    
   
    var ChangeData= function(){
        var numValues = dataset.length;
        var maxValue = 40;
        dataset = [];
        for(var i=0; i< numValues;i++){
            
            var newNumber = Math.floor(Math.random()*maxValue);
            while(newNumber == 0)
            {
                newNumber = Math.floor(Math.random()*maxValue);
            }
            dataset.push(newNumber);
        }
        yScale.domain([0,d3.max(dataset)]);
    }
    
    const btn = document.querySelector('.btn');
    btn.addEventListener("click",function(){
        ChangeData();
        drawChart(choice);

    });

    const btn1 = document.querySelector('.btn-1');
    btn1.addEventListener("click",function(){
        choice = 1;
        btn1.classList.add("clicked");
        btn2.classList.remove("clicked");
    })
    const btn2 = document.querySelector('.btn-2');
    btn2.addEventListener("click",function(){
        ChangeData();
        choice = 2;
        btn2.classList.add("clicked");
        btn1.classList.remove("clicked");
    })
}
window.onload = init;
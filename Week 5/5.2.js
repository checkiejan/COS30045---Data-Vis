function init(){
    var w = 500;//width of the svg
    var h = 100; //height of the svg
    var dataset = [16,5,26,23,9,3,7,19,12,10,4,7,1,8]; //hardcode dataset
    var choice = 0; //choice of transition style
    var xScale = d3.scaleBand() //xscale for the bar chart
        .domain(d3.range(dataset.length))//domain is the number of elements in thedataset
        .rangeRound([0,w])
        .paddingInner(0.05); //add padding
    var yScale = d3.scaleLinear() // yscale for the bar chart
                .domain([0,d3.max(dataset)]) //domain from 0 to the max value of the dataset
                .range([0,h]);

    var svg = d3.select("#chart") // add svg element to the #chart
        .append("svg")
        .attr("width", w)
        .attr("height", h);
    svg.selectAll("rect") //append bars to the svg
        .data(dataset)
        .enter()
        .append("rect") 
        .attr("x", function(d,i){
            return xScale(i);
        })
        .attr("y", function(d){
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth()) //with of each bar is calculated based on bandwith function
        .attr("height", function(d){
            return yScale(d);
        })
        .attr("fill","#9E4784"); //fill the colour

    svg.selectAll("text") //append label for the bar
                    .data(dataset)
                    .enter()
                    .append("text")
                    .text(function(d){
                        return d;
                    })
                    .attr("x",function(d,i){
                        if(d <10){ // if data is one-digit number 
                            return xScale(i) + xScale.bandwidth()/2 -4;
                        }
                        return xScale(i) + xScale.bandwidth()/2 -9; //two-digit number needs to be transformed a bit to the left
                    })
                    .attr("y",function(d){
                        if(d  > 5){ //if data is more than 5 then displayed in the bar
                            return h - yScale(d) +15;
                        }
                        return h-yScale(d) -3; //displayed on top of the bar
                    })


    
    const drawChart = function(opt){ //draw new chart based on chosen style of transition
       if(opt ==0){ //default transition
        svg.selectAll("rect")
        .data(dataset)
        .transition()
        .delay(100) //delay time for 300ms
        .duration(700) //duration of 2000ms
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
                    .delay(100)
                    .duration(700)
                    .text(function(d){
                        return d;
                    })
                    .attr("x",function(d,i){
                        if(d <10){ // if data is one-digit number 
                            return xScale(i) + xScale.bandwidth()/2 -4;
                        }
                        return xScale(i) + xScale.bandwidth()/2 -9; //two-digit number needs to be transformed a bit to the left
                    })
                    .attr("y",function(d){
                        if(d  > 5){ //if data is more than 5 then displayed in the bar
                            return h - yScale(d)+15;
                        }
                        return h - yScale(d)-3; //displayed on top of the bar
                    })
       }
        else if(opt ==1){ //first style transition
            svg.selectAll("rect")
            .data(dataset)
            .transition()
            .duration(2000) //duration of 2000ms
            .ease(d3.easeCircleIn) //style of ease
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
                            return xScale(i) + xScale.bandwidth()/2 -4;
                        }
                        return xScale(i) + xScale.bandwidth()/2 -9;
                    })
                    .attr("y",function(d){
                        if(d  > 5){
                            return h - yScale(d)+15;
                        }
                        return h - yScale(d)-3;
                    })
            
        }
        else if(opt ==2) //second style transition
        {
            svg.selectAll("rect")
            .data(dataset)
            .transition()
            .delay(function(d,i){
                return i/dataset.length *1000; //time of transition depends on each value
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
                            return h - yScale(d)+15;
                        }
                        return h - yScale(d)-3;
                    })
        }
    }
   
    
   
    var ChangeData= function(){ //function to make new dataset
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
        drawChart(choice); //update the chart with defined style

    });

    const btn1 = document.querySelector('.btn-1');
    btn1.addEventListener("click",function(){
        if(choice ==1) //if the first style is already chosen then turn the style back to default
        {
            choice = 0; //default choice
            btn1.classList.remove("clicked"); //remove the clicked class
        }
        else{ //if not then set to first style
            choice = 1;
            btn1.classList.add("clicked");
            btn2.classList.remove("clicked");
        }
        
    })
    const btn2 = document.querySelector('.btn-2');
    btn2.addEventListener("click",function(){
        if(choice ==2) //if the second style is already chosen then turn the style back to default
        {
            choice = 0; //default choice
            btn2.classList.remove("clicked"); //remove the clicked class
        }
        else{ //if not then set to first style
            choice = 2;
            btn2.classList.add("clicked");
            btn1.classList.remove("clicked");
        }
    })
}
window.onload = init;
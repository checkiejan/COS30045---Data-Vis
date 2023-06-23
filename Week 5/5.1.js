function init(){
    var w = 500; //width of the svg
    var h = 100; //height of the svg
    var maxValue = 25; //max vlue for the dataset
    var dataset = [14,5,26,23,9,3,7,19,12,10,4,7,1,8]; //hardcode dataset
    var xScale = d3.scaleBand() //xscale for the bar chart
        .domain(d3.range(dataset.length)) //domain is the number of elements in thedataset
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
        .append("rect");
    var createLabel = function(){ //function to append text
        svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text");
    }
    var drawLabel = function(){ //function to draw label for each bar
        svg.selectAll("text")
            .data(dataset)
            .text(function(d){
                return d;
            })
            .attr("x",function(d,i){
                if(d <10){ // if data is one-digit number 
                    return xScale(i) + xScale.bandwidth()/2 -4;
                }
                return xScale(i) + xScale.bandwidth()/2 -9; //two-digit number needs to be transformed a bit to the left
            })
            .attr("y",function(d){ //if data is more than 5 then displayed in the bar
                if(d  > 5){
                    return h - yScale(d) +15;
                }
                return h-yScale(d) -3; //displayed on top of the bar
            })
    }
   
    var updateChart = function(){ //function to update the bar chart after changing the dataset
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

    const drawChart = function(){    //function to draw the new chart after updating
        updateChart(); //draw the chart fist
        drawLabel(); //then draw the label
    }
    var ChangeData= function(){
        var numValues = dataset.length;
        
        dataset = [];
        for(var i=0; i< numValues;i++){
            
            var newNumber = Math.floor(Math.random()*maxValue);
            while(newNumber == 0) //make sure no new data is 0
            {
                newNumber = Math.floor(Math.random()*maxValue);
            }
            dataset.push(newNumber);
        }
        yScale.domain([0,maxValue]); //the domain needs to be fixed with the maxvalue
    }
    updateChart(); //draw the inital chart
    createLabel(); //create initial label
    drawLabel(); //draw initial label
    const btn = document.querySelector('.btn');
    btn.addEventListener("click",function(){ //when update button is clicked
        ChangeData(); //make new data
        drawChart(); //redraw the chart
    });
}
window.onload = init;
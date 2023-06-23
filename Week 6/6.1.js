function init(){
    var w = 500;//width of the svg
    var h = 100; //height of the svg
    var maxValue = 40;
    var dataset = [maxValue,5,26,23,9,3,7,19,12,10,4,7,1,8]; //hardcode dataset
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
    
    svg.selectAll("rect") //create bars for the chart but not draw yet
        .data(dataset)
        .enter()
        .append("rect");


    var createMouseEffect = function(){ //function to create mouse effect
        svg.selectAll("rect")
            .data(dataset)
            .on("mouseover", function(event,d){ //mouseover effect apply
                addTooltip(this,d); //add the tooltip
                })
            .on("mouseout",function(){ //mouseout effect apply
                
                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr("fill","#9E4784")  //change back to the old colour
                d3.select("#tooltip").remove(); //remove the tooltip
            });
    }


    var addTooltip= function(data,d){
        d3.select(data)
            .transition()
            .duration(350)
            .attr("fill","#BE6DB7"); //fill new colour for the bar
        
        var xPosition = parseFloat(d3.select(data).attr("x")) + parseFloat(d3.select(data).attr("width"))/2 - 6; //get the xcoord for the text
        var yPosition = parseFloat(d3.select(data).attr("y"));
        if(d>10){ //if data is more than 10 then displayed in the bar
            yPosition = yPosition +15;
        }
        else{
            yPosition = yPosition - 3; //displayed on top of the bar
        }

        svg.append("text") //append the text tooltip
            .attr("id","tooltip")
            .attr("x",xPosition)
            .attr("y",yPosition)
            .text(d);
    }
    var initialiseBar = function(){ //function to draw the bar chart 
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
        createMouseEffect(); //create mouse effect for each bar
        
    }

   

    initialiseBar();        //draw the bar chart
                                
                
    var drawUpdate = function(){ //function to redraw the bar whenever the data is updated
        var bars = svg.selectAll("rect")
                    .data(dataset);
        bars.enter()
            .append("rect") 
            .on("mouseover", function(event,d){ //create mouse effect for each bar
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
    }
    
    var addData= function(){ //function to add new data to the dataset
       var newNumber = Math.floor(Math.random()*maxValue);
       while(newNumber == 0){ //make srue the new value is not 0
        newNumber = Math.floor(Math.random()*maxValue);
       }
       dataset.push(newNumber);
       xScale.domain(d3.range(dataset.length)); //rescale the xscale
    }

    const btn = document.querySelector('.btn-add');
    btn.addEventListener("click",function(){ //when the add button is clicked
        addData();
        drawUpdate();
    });

    d3.selectAll(".btn-remove")
    .on("click",function(){ //when the remove button is clicked
        dataset.shift();
        var bars = svg.selectAll("rect")
                    .data(dataset);
        bars.exit() //remove the needed element
            .transition() //add transition to removing bars
            .duration(500)
            .attr("x",w)
            .remove();

        xScale.domain(d3.range(dataset.length));
        drawUpdate(); //redraw the chart
    })
}
window.onload = init;
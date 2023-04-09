function init(){
    var w = 500;//width of the svg
    var h = 100; //height of the svg
    
    var dataset = [16,5,26,23,9,3,7,19,12,10,4,7,1,8]; //hardcode dataset
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

    var bars = svg.selectAll("rect") //append bars to the svg
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
    var drawChart = function(){ //function to redraw the chart whenever there is any update
        var bars = svg.selectAll("rect")
                    .data(dataset);
        bars.enter() //update the bar
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

        text.enter() //update the text
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
    
    var addData= function(){ //function to add new data to the dataset
    var maxValue = 40;
       var newNumber = Math.floor(Math.random()*maxValue);
       while(newNumber == 0){ //make srue the new value is not 0
        newNumber = Math.floor(Math.random()*maxValue);
       }
       dataset.push(newNumber);
       yScale.domain([0,d3.max(dataset)]); //rescale the yscale
       xScale.domain(d3.range(dataset.length)); //rescale the xscale
    }

    const btn = document.querySelector('.btn-add');
    btn.addEventListener("click",function(){ //when the add button is clicked
        addData(); //add new random value
        var svg = document.querySelector('svg');
        drawChart(); //redraw the chart

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

        var text = svg.selectAll("text")
            .data(dataset);
        text.exit() //remove the needed element
            .transition()
            .duration(500)
            .attr("x",w)
            .remove();  
        xScale.domain(d3.range(dataset.length)); //rescale the xscale
        drawChart(); //redraw the chart
    })
}
window.onload = init;
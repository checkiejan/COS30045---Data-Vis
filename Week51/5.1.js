function init(){
    var w = 500;
    var h = 100;
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

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
    var padding =1;

    var updateChart = function(){
        svg.selectAll("rect")
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
       
        
    }
   
    updateChart();
    
   
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
    }
    
    const btn = document.querySelector('.btn');
    btn.addEventListener("click",function(){
        ChangeData();
        var svg = document.querySelector('svg');
        svg.remove();
        drawChart();
    });
}
window.onload = init;
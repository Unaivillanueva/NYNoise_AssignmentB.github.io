const w_graphs = 900,
      h_graphs = 600,
      margin_graphs = {top: 50, right: 20, bottom: 50, left: 180};

const w_graphs2 = 900,
      h_graphs2 = 500,
      margin_graphs2 = {top: 50, right: 20, bottom: 60, left: 50};

const w_graphs4 = 900,
      h_graphs4 = 500,
      margin_graphs4 = {top: 50, right: 20, bottom: 60, left: 50};

const svg_types = d3.select('#v_types_complaints').append('svg')
                    .attr("width", w_graphs )
                    .attr("height", h_graphs )
                    .style("margin", "15px")
                    .style("background-color","#F1F3F3")
const g_types = svg_types.append('g').attr("transform", `translate(${margin_graphs.left}, ${margin_graphs.top})`);

const svg_zones = d3.select('#v_zones_complaints').append('svg')
                    .attr("width", w_graphs )
                    .attr("height", h_graphs )
                    .style("margin", "15px")
                    .style("background-color","#F1F3F3")
const g_zones = svg_zones.append('g').attr("transform", `translate(${margin_graphs.left}, ${margin_graphs.top})`);

const svg_time = d3.select('#v_time_complaints').append('svg')
                    .attr("width", w_graphs2 )
                    .attr("height", h_graphs2 )
                    .style("margin", "15px")
                    .style("background-color","#F1F3F3")
const g_time = svg_time.append('g').attr("transform", `translate(${margin_graphs2.left}, ${margin_graphs2.top})`);

const svg_month = d3.select('#v_month_complaints').append('svg')
                    .attr("width", w_graphs2 )
                    .attr("height", h_graphs2 )
                    .style("margin", "15px")
                    .style("background-color","#F1F3F3")
const g_month = svg_month.append('g').attr("transform", `translate(${margin_graphs2.left}, ${margin_graphs2.top})`);

var tip_exp = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return (d.type) + "<br>" + (d.number) + " complaints";
  })
svg_types.call(tip_exp);
const displayGraph1 = (fileName, attributeAccessor, svgGroup, parentDiv, color, colorHover) => {
    d3.csv(fileName, data => {
        let tooltip = d3.select(parentDiv).append("div").attr("class","toolTip");
        let x_graphs = d3.scaleLinear().range([0,w_graphs - margin_graphs.right - margin_graphs.left, 0]);
        let y_graphs = d3.scaleBand().range([h_graphs - margin_graphs.top - margin_graphs.bottom, 0]);
        data = data.map(e => ({type: e[attributeAccessor], number: parseInt(e.number)}));
        data.sort((a, b) =>  a.number - b.number);
        x_graphs.domain([0, d3.max(data, d => d.number)]);
        y_graphs.domain(data.map(d => d.type)).padding(0.1);

        console.log(data);

        svgGroup.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${h_graphs - margin_graphs.top - margin_graphs.bottom})`)
            .call(d3.axisBottom(x_graphs).ticks(5).tickFormat(d => parseInt(d)).tickSizeInner([-(h_graphs)]))
            ;
        
        svgGroup.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y_graphs));

        svgGroup.selectAll('rect')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', 0)
            .attr('height', y_graphs.bandwidth())
            .attr('y', d => y_graphs(d.type))
            .attr('width', d => x_graphs(d.number))
            .on("mouseover", function(d){
                d3.select(this)
                    .transition()
                    .duration(100)
                    .style('fill', color)

                tooltip
                    .style("left", d3.event.pageX - 450 + "px")
                    .style("top", d3.event.pageY - 550 + "px")
                    .style("display", "inline-block")
                    .html((d.type) + "<br>" + (d.number) + " complaints");

                tip.show
            })
            .on("mouseout", function(d){
                d3.select(this)
                    .transition()
                    .duration(100)
                    .style('fill', colorHover)

                tooltip.style("display", "none");

                tip.hide
            })

            svgGroup.append("text")             
            .attr("transform",
                    "translate(" + (w_graphs)+" ," + 
                           (h_graphs + margin_graphs) + ")")
            .attr("x", 0)
            .attr("y", -28)
            .style("text-anchor", "right")
            .style("margin-bottom","30px")
            .style("font-family", "Arial")
            .text("Amount of Noise Complaints per Type of Noise");

             svgGroup.append("text")             
            .attr("transform",
                    "translate(" + (w_graphs)+" ," + 
                           (h_graphs + margin_graphs) + ")")
            .attr("x", 0)
            .attr("y", -5)
            .style("text-anchor", "right")
            .style("margin-bottom","30px")
            .style("font-family", "Arial")
            .style("font-size", 15 + "px")
            .text("Type of noise");

            svgGroup.append("text")             
            .attr("transform",
                    "translate(" + (w_graphs)+" ," + 
                           (h_graphs + margin_graphs) + ")")
            .attr("x", w_graphs/2 -100 )
            .attr("y", h_graphs - 70)
            .style("text-anchor", "middle")
            .style("font-family", "Arial")
            .style("font-size", 15 + "px")
            .text("Number of occurrences");
    })
}
const displayGraph2 = (fileName, attributeAccessor, svgGroup, parentDiv, color, colorHover) => {
    d3.csv(fileName, data => {
        let tooltip = d3.select(parentDiv).append("div").attr("class","toolTip");
        let x_graphs = d3.scaleLinear().range([0,w_graphs - margin_graphs.right - margin_graphs.left, 0]);
        let y_graphs = d3.scaleBand().range([h_graphs - margin_graphs.top - margin_graphs.bottom, 0]);
        data = data.map(e => ({type: e[attributeAccessor], number: parseInt(e.number)}));
        data.sort((a, b) =>  a.number - b.number);
        x_graphs.domain([0, d3.max(data, d => d.number)]);
        y_graphs.domain(data.map(d => d.type)).padding(0.1);

        console.log(data);

        svgGroup.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${h_graphs - margin_graphs.top - margin_graphs.bottom})`)
            .call(d3.axisBottom(x_graphs).ticks(5).tickFormat(d => parseInt(d)).tickSizeInner([-(h_graphs)]))
            ;
        
        svgGroup.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y_graphs));

        svgGroup.selectAll('rect')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', 0)
            .attr('height', y_graphs.bandwidth())
            .attr('y', d => y_graphs(d.type))
            .attr('width', d => x_graphs(d.number))
            .on("mouseover", function(d){
                d3.select(this)
                    .transition()
                    .duration(100)
                    .style('fill', color)

                tooltip
                    .style("left", d3.event.pageX - 450 + "px")
                    .style("top", d3.event.pageY - 550 + "px")
                    .style("display", "inline-block")
                    .html((d.type) + "<br>" + (d.number) + " complaints");

                tip.show
            })
            .on("mouseout", function(d){
                d3.select(this)
                    .transition()
                    .duration(100)
                    .style('fill', colorHover)

                tooltip.style("display", "none");

                tip.hide
            })

            svgGroup.append("text")             
            .attr("transform",
                    "translate(" + (w_graphs)+" ," + 
                           (h_graphs + margin_graphs) + ")")
            .attr("x", 0)
            .attr("y", -28)
            .style("text-anchor", "right")
            .style("font-family", "Arial")
            .style("margin-bottom","30px")
            .text("Amount of Noise Complaints per Neighborhood");

            svgGroup.append("text")             
            .attr("transform",
                    "translate(" + (w_graphs)+" ," + 
                           (h_graphs + margin_graphs) + ")")
            .attr("x", 0)
            .attr("y", -5)
            .style("text-anchor", "right")
            .style("margin-bottom","30px")
            .style("font-family", "Arial")
            .style("font-size", 15 + "px")
            .text("Neighborhood");


            svgGroup.append("text")             
            .attr("transform",
                    "translate(" + (w_graphs)+" ," + 
                           (h_graphs + margin_graphs) + ")")
            .attr("x", w_graphs/2 -100 )
            .attr("y", h_graphs - 70)
            .style("text-anchor", "middle")
            .style("font-family", "Arial")
            .style("font-size", 15 + "px")
            .text("Number of occurrences");
    })
}

const displayGraph3 = (fileName, attributeAccessor, svgGroup, parentDiv, color, colorHover) => {
    d3.csv(fileName, data => {
        let tooltip = d3.select(parentDiv).append("div").attr("class","toolTip");
        let y_graphs = d3.scaleLinear().range([h_graphs2 - margin_graphs2.top - margin_graphs2.bottom,0]);
        let x_graphs = d3.scaleBand().range([0, w_graphs2 - margin_graphs2.right - margin_graphs2.left]);
        data = data.map(e => ({type: e[attributeAccessor], number: parseInt(e.number)}));
        //data.sort((a, b) =>  a.number - b.number);
        y_graphs.domain([0, d3.max(data, d => d.number)]);
        x_graphs.domain(data.map(d => d.type)).padding(0.1);

       

        
       var time = [0, 1, 2, 3, 4 ,5 ,6 ,7 ,8 ,9, 10, 11, 12, 13 ,14 ,15, 16, 17, 18, 19,
        20, 21, 22, 23, 24]

        var x = d3.scaleBand().range([0, w_graphs2 - margin_graphs2.right-20]);
       
        var xAxis = d3.axisBottom()
            .scale(x);

         x.domain(time.map(function(d) { return d; }));

         svgGroup.append("g")
              .attr("class", "x axis")
              .attr("transform", `translate(0, ${h_graphs2 - margin_graphs2.bottom - 40})`)
              .call(xAxis)
            .selectAll("text")
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", "-.55em")
              .attr("transform", "rotate(0)" );

       
       /* svgGroup.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${h_graphs2 - margin_graphs2.top - margin_graphs2.bottom})`)
            .call(d3.axisBottom(x_graphs).ticks(1)); */
                      
        
        svgGroup.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y_graphs).ticks(5).tickFormat(d => parseInt(d)).tickSizeInner([-(h_graphs2)]));

        svgGroup.selectAll('rect')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('y', d => y_graphs(d.number))
            .attr('width', x_graphs.bandwidth())
            .attr('x', d => x_graphs(d.type))
            .attr('height', d => h_graphs2 - margin_graphs2.top - margin_graphs2.bottom - y_graphs(d.number))
            .style('fill', color)
            .on("mouseover", function(d){
                d3.select(this)
                    .transition()
                    .duration(100)
                    .style('fill', colorHover)

                tooltip
                    .style("left", d3.event.pageX - 450 + "px")
                    .style("top", d3.event.pageY - 550 + "px")
                    .style("display", "inline-block")
                    .html((d.type) + "<br>" + (d.number) + " complaints");
            })
            .on("mouseout", function(d){
                d3.select(this)
                    .transition()
                    .duration(100)
                    .style('fill', color)

                tooltip.style("display", "none");
            }); 

            svgGroup.append("text")             
            .attr("transform",
                    "translate(" + (w_graphs2)+" ," + 
                           (h_graphs2 + margin_graphs2) + ")")
            .attr("x", 0)
            .attr("y", -28)
            .style("text-anchor", "right")
            .style("font-family", "Arial")
            .text("Noise Complaints per Hour");

            svgGroup.append("text")             
            .attr("transform",
                    "translate(" + (w_graphs)+" ," + 
                           (h_graphs + margin_graphs) + ")")
            .attr("x", 0)
            .attr("y", 0)
            .style("text-anchor", "right")
            .style("margin-bottom","30px")
            .style("font-family", "Arial")
            .style("font-size", 15 + "px")
            .text("Number of complaints");


            svgGroup.append("text")             
            .attr("transform",
                    "translate(" + (w_graphs)+" ," + 
                           (h_graphs + margin_graphs) + ")")
            .attr("x", w_graphs2/2 -30)
            .attr("y", h_graphs2 - 70)
            .style("text-anchor", "middle")
            .style("font-family", "Arial")
            .style("font-size", 15 + "px")
            .text("Hours");
    })
}

const displayGraph4 = (fileName, attributeAccessor, svgGroup, parentDiv, color, colorHover) => {
    d3.csv(fileName, data => {
        let tooltip = d3.select(parentDiv).append("div").attr("class","toolTip");
        let y_graphs = d3.scaleLinear().range([h_graphs4 - margin_graphs4.top - margin_graphs4.bottom,0]);
        let x_graphs = d3.scaleBand().range([0, w_graphs4 - margin_graphs4.right - margin_graphs4.left]);
        data = data.map(e => ({type: e[attributeAccessor], number: parseInt(e.number)}));
        //data.sort((a, b) =>  a.number - b.number);
        y_graphs.domain([0, d3.max(data, d => d.number)]);
        x_graphs.domain(data.map(d => d.type)).padding(0.1);

        console.log(data);


        svgGroup.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${h_graphs2 - margin_graphs2.top - margin_graphs2.bottom})`)
            .call(d3.axisBottom(x_graphs).ticks(1))
            ;
        
        svgGroup.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y_graphs).ticks(5).tickFormat(d => parseInt(d)).tickSizeInner([-(h_graphs4)]));

        svgGroup.selectAll('rect')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('y', d => y_graphs(d.number))
            .attr('width', x_graphs.bandwidth())
            .attr('x', d => x_graphs(d.type))
            .attr('height', d => h_graphs4 - margin_graphs4.top - margin_graphs4.bottom - y_graphs(d.number))
             .style('fill', color)
            .on("mouseover", function(d){
                d3.select(this)
                    .transition()
                    .duration(100)
                    .style('fill', colorHover)

                tooltip
                    .style("left", d3.event.pageX - 450 + "px")
                    .style("top", d3.event.pageY - 550 + "px")
                    .style("display", "inline-block")
                    .html((d.number) + " complaints");
            })
            .on("mouseout", function(d){
                d3.select(this)
                    .transition()
                    .duration(100)
                    .style('fill', color)

                tooltip.style("display", "none");
            }); 


        svgGroup.append("text")             
            .attr("transform",
                    "translate(" + (w_graphs4)+" ," + 
                           (h_graphs4 + margin_graphs4) + ")")
            .attr("x", 0)
            .attr("y", -28)
            .style("text-anchor", "right")
            .style("font-family", "Arial")
            .text("Noise Complaints per Month");

            svgGroup.append("text")             
            .attr("transform",
                    "translate(" + (w_graphs4)+" ," + 
                           (h_graphs4 + margin_graphs4) + ")")
            .attr("x", 0)
            .attr("y", 0)
            .style("text-anchor", "right")
            .style("margin-bottom","30px")
            .style("font-family", "Arial")
            .style("font-size", 15 + "px")
            .text("Number of complaints");


            svgGroup.append("text")             
            .attr("transform",
                    "translate(" + (w_graphs4)+" ," + 
                           (h_graphs4 + margin_graphs4) + ")")
            .attr("x", w_graphs4/2 -30)
            .attr("y", h_graphs4 - 70)
            .style("text-anchor", "middle")
            .style("font-family", "Arial")
            .style("font-size", 15 + "px")
            .text("Month");
    })
}



displayGraph1('data/noise_types.csv', 'type', g_types, '#v_types_complaints', '#FF3D0D', '#ffa02b');
displayGraph2('data/noise_zones.csv', 'zone',  g_zones, '#v_zones_complaints', '#FF3D0D', '#ffa02b');
displayGraph3('data/noise_time.csv', 'time', g_time, '#v_time_complaints', '#99ccff', '#FF3D0D');
displayGraph4('data/noise_month.csv', 'month', g_month, '#v_month_complaints', '#99ccff', '#FF3D0D');
var k_means_param = 2;
/*const w = 1000;
const h = 800;*/
const svg_map = d3.select('#v_map3').append("svg")
                .attr("width", w)
                .attr("height", h);


d3.json('data/zip_codes.geojson', geodata => {
d3.json('data/kmeans.json', data => {
    let projection = d3.geoMercator()
                       .center([-73.955242, 40.730610])
                       .scale(80000)
                       .translate([w / 2, h / 2]);

    let path1 = d3.geoPath(projection);

    svg_map.selectAll("path")
       .data(geodata.features)
       .enter()
       .append("path")
       .attr("d", path1);

    const colors = ['thistle', 'violet', 'fuchsia', 'mediumorchid', 'rebeccapurple','slateblue'];
    const colors_centers = ['gray', 'gray', 'gray', 'gray', 'gray','gray'];

    svg_map.selectAll("circle")
       .data(data.data)
       .enter()
       .append("circle")
       .attr("cx", d => projection([d[1], d[0]])[0])
       .attr("cy", d => projection([d[1], d[0]])[1])
       .attr("r", 3)
       .style("fill", d => colors[d[k_means_param]])
       .style("opacity", 0.4);

    svg_map.selectAll("circle")
       .data(data.centers[k_means_param - 2], d => d)
       .enter()
       .append("circle")
       .attr("cx", d => projection([d[1], d[0]])[0])
       .attr("cy", d => projection([d[1], d[0]])[1])
       .attr("r", 20)
       .style("fill", (d,i) => colors_centers[i])
       .style("opacity", 0.75)
       .attr('class', 'centers');

     const toggle = k => {
        k_means_param = k;
        svg_map.selectAll("circle")
           .data(data.data)
           .style("fill", d => colors[d[k_means_param]]);

        Array.from(document.querySelectorAll('circle.centers')).forEach(center => {
            center.remove()

        });

        svg_map.selectAll("circle")
           .data(data.centers[k_means_param - 2], d => d)
           .enter()
           .append("circle")
           .attr("cx", d => projection([d[0], d[1]])[0])
           .attr("cy", d => projection([d[0], d[1]])[1])
           .attr("r", 20)
           .style("fill", (d,i) => colors_centers[i])
           .style("opacity", 0.75)
           .attr('class', 'centers');
    }

    Array.from(document.getElementsByTagName('button')).forEach(btn => {
        btn.onclick = () => toggle(btn.dataset.val);
    });
});
});
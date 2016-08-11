////////////////////////////////////////////////////////////
//////////////// Create color legend ///////////////////////
////////////////////////////////////////////////////////////

function createColorLegend(color) {
	
	var olympicRadius = 50;

	var margin = {top: olympicRadius*1.2, right: olympicRadius*2, bottom: olympicRadius*1.2, left: olympicRadius*2},
		width = olympicRadius*10*0.85 - margin.left - margin.right,
		height = olympicRadius*10*0.4 - margin.top - margin.bottom; 

	var svg = d3.select("#olympic-color-legend").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + (margin.top + height/2) + ")");

	////////////////////////////////////////////////////////////
	//////////////////// Create circles ////////////////////////
	////////////////////////////////////////////////////////////

	//Locations of each circle
	var circleOffset = 1/3;
	var circleLocations = [
		{id: 1, offset: 75, x: 0, y: -height*circleOffset},
		{id: 2, offset: 25, x: width/4, y: height*circleOffset},
		{id: 3, offset: 75, x: width*2/4, y: -height*circleOffset},
		{id: 4, offset: 25, x: width*3/4, y: height*circleOffset},
		{id: 5, offset: 75, x: width, y: -height*circleOffset}
	];

	//Wrapper for the rings
	var rings = svg.selectAll(".olympic-circle-wrapper")
		.data(circleLocations)
		.enter().append("g")
		.attr("class", "olympic-circle-wrapper")
		.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")"
		});

	//Rings themselves
	rings.append("circle")
		.attr("class", "olympic-circle")
		.attr("r", olympicRadius)
		.style("stroke", function(d,i) { return color.range()[i]; });

	// //text along rings
	// rings.append("path")
	// 	.attr("class", "olympic-circle-invisible-path")
	// 	.attr("id", function(d,i) { return "legend-ring-arc-" + d.id; })
	// 	.attr("d", function(d,i) {
	// 		var arcSetting = i === 1 || i === 3 ? " 0 1 0 " : " 0 1 1 "; 
	// 		var sign = i === 1 || i === 3 ? -1 : 1; 
	// 		return "M " + (sign * olympicRadius) + " " + 0 + " A " + olympicRadius + " " + olympicRadius + arcSetting + (sign * olympicRadius) + " " + -1;
	// 	});

	// rings.append("text")
	// 	.attr("class", "olympic-circle-text")
	// 	//Move the labels below the arcs for those slices with an end angle greater than 90 degrees
	// 	.attr("dy", function(d,i) { 
	// 		return i === 1 || i === 3 ? 22 : -5; 
	// 	})
	// 	.append("textPath")
	// 	.attr("startOffset", function(d,i) {
	// 		return d.offset + "%";
	// 	})
	// 	.attr("xlink:href", function(d,i) { return "#legend-ring-arc-" + d.id; })
	// 	.style("fill", function(d,i) { return color.range()[i]; })
	// 	.text(function(d,i){ return color.domain()[i]; });

	////////////////////////////////////////////////////////////
	/////////////// Create text along circles //////////////////
	////////////////////////////////////////////////////////////

	rings.append("text")
		.attr("class", "olympic-circle-text")
		.attr("dy", function(d,i) { 
			return i === 1 || i === 3 ? 10 : -2; 
		})
		.style("fill", function(d,i) { return color.range()[i]; })
		.text(function(d,i){ return color.domain()[i]; });


}//createColorLegend
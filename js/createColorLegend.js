////////////////////////////////////////////////////////////
//////////////// Create color legend ///////////////////////
////////////////////////////////////////////////////////////

function createColorLegend(color, outerRadius, chartScale) {
	
	var olympicRadius = 25;

	//Undo the scaling for this legend
	var outerRadius = outerRadius/chartScale;

	var margin = {top: olympicRadius*2 + 20, right: 10, bottom: olympicRadius*2, left: 10},
		width = outerRadius * 1.25,
		height = olympicRadius*6 - margin.top - margin.bottom; 

	var svg = d3.select("#olympic-color-legend").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + (margin.left + width/2) + "," + (margin.top + height/2) + ")");

	////////////////////////////////////////////////////////////
	//////////////////// Create circles ////////////////////////
	////////////////////////////////////////////////////////////

	//Locations of each circle
	var circleHeightOffset = olympicRadius * 7/13,
		circleWidthOffset = olympicRadius * 1.2;
	var circleLocations = [
		{id: 1, x: -2*circleWidthOffset, y: -circleHeightOffset},
		{id: 2, x: -1*circleWidthOffset, y: circleHeightOffset},
		{id: 3, x: 0, y: -circleHeightOffset},
		{id: 4, x: 1*circleWidthOffset, y: circleHeightOffset},
		{id: 5, x: 2*circleWidthOffset, y: -circleHeightOffset}
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
		.attr("y", function(d,i) { 
			return (i === 1 || i === 3 ? 1 : -1) * 37; 
		})
		.attr("dy", "0.5em")
		.style("fill", function(d,i) { return color.range()[i]; })
		.text(function(d,i){ return color.domain()[i]; });


}//createColorLegend
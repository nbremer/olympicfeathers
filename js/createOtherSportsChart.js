//Create a small chart that shows the 11 sports that are not in the circles
//because they had too few games in which to compete 
//(otherwise they just take up space in the circles)
function createOtherSportsChart(svg, color, chartScale, offsetX, offsetY) {

	////////////////////////////////////////////////////////////
	///////////////////// Read in data /////////////////////////
	////////////////////////////////////////////////////////////

	var chartScale = Math.max(chartScale, 0.75);

	d3.csv('data/olympic_sports_other.csv', function (error, data) {

		if (error) throw error;
		
		data.forEach(function(d) {
			d.value = +d.value;
			d.startValue = +d.startValue;
		});

		//Size
		var margin = {top: 50*chartScale, right: 0, left: 105*chartScale, bottom: 10*chartScale},
			width = 300*chartScale - margin.left - margin.right,
		    height = 275*chartScale - margin.top - margin.bottom;

		d3.select(".other-sports-wrapper")
			.attr("transform", "translate(" + offsetX + "," + 
				(offsetY - (height + margin.top + margin.bottom) ) + ")");

		////////////////////////////////////////////////////////////
		////////////////////////// Scales //////////////////////////
		////////////////////////////////////////////////////////////

	    var timeLocation = d3.scaleBand()
	    	.domain([1900, 1904, 1908, 1920])
	    	.range([0, width]);

	    var sportLocation = d3.scaleBand()
	    	.domain(data.map(function(d) { return d.discipline; }))
	    	.range([0, height])
	    	.padding(0.4);

	    var medalWidth = 6*chartScale;

		////////////////////////////////////////////////////////////
		/////////////////// Create the bar chart ///////////////////
		////////////////////////////////////////////////////////////

		//Create a group for each disciplone
		var disciplines = svg.selectAll(".discipline-other")
			.data(data)
			.enter().append("rect")
			.attr("class", "discipline-other")
			.attr("width", function(d) { return medalWidth * d.value; })
			.attr("height", sportLocation.bandwidth() )
			.attr("x", function(d) { return timeLocation(d.edition) + medalWidth * d.startValue; })
			.attr("y", function(d) { return sportLocation(d.discipline); })
			.style("fill", function(d) { return color(d.continent); })
			.on("mouseover", function(d) { showTooltip(d, color); })
    		.on("mouseout", hideTooltip);

		////////////////////////////////////////////////////////////
		////////////////////// Create the axes /////////////////////
		////////////////////////////////////////////////////////////

		//The discipline titles to the left
		svg.selectAll(".discipline-other-label")
			.data(sportLocation.domain())
			.enter().append("text")
			.attr("class", "discipline-other-label")
			.attr("x", -15*chartScale)
			.attr("y", function(d) { return sportLocation(d); })
			.attr("dy", "0.7em")
			.style("font-size", 11*chartScale + "px")
			.text(function(d) { return d; });

		//The edition titles on top
		svg.selectAll(".edition-other-label")
			.data(timeLocation.domain())
			.enter().append("text")
			.attr("class", "edition-other-label")
			.attr("x", function(d) { return timeLocation(d); })
			.attr("y", height + sportLocation.bandwidth() + 3 )
			.style("font-size", 12*chartScale + "px")
			.text(function(d) { return d; });

		////////////////////////////////////////////////////////////
		///////////////////////// Add title ///////////////////////
		////////////////////////////////////////////////////////////

		svg.append("text")
			.attr("class", "other-sports-title")
			.attr("x", -margin.left)
			.attr("y", -margin.top + 5*chartScale)
			.attr("dy", "0.5em")
			.text("Winners of the 11 sports that competed in less than 2 editions")
			.style("font-size", 18*chartScale + "px")
			.call(wrap, 300*chartScale, 1.3);

		////////////////////////////////////////////////////////////
		///////////////////// Add note at bottom ///////////////////
		////////////////////////////////////////////////////////////

		svg.append("text")
			.attr("class", "other-sports-note")
			.attr("x", -margin.left)
			.attr("y", height + 30*chartScale)
			.attr("dy", "0.5em")
			.style("font-size", 11*chartScale + "px")
			.text("*and aren't part of the current 41 disciplines");

	});//d3.csv

}//createOtherSportsChart

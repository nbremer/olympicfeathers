////////////////////////////////////////////////////////////
/////////////////// Create legend //////////////////////////
////////////////////////////////////////////////////////////

function createFeatherLegend(width, innerRadius, outerRadius, arcHeight, medalDegree, timeScale, startYear, endYear, color, arcColors, warYears, groupYears) {
	
	var margin = {top: 10, right: 30, bottom: 40, left: 30},
		legendWidth = outerRadius * 1.5,
		legendHeight = 300 - margin.top - margin.bottom; 

	var svgLegend = d3.select("#olympic-chart-legend").append("svg")
	    .attr("width", legendWidth + margin.left + margin.right)
	    .attr("height", legendHeight + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + (margin.top + legendHeight/2) + ")");

	var legendYears = d3.range(startYear, endYear + 4, 4);
	legendYears = legendYears.filter(function(d) { return warYears.indexOf(d) === -1; });

	var legendWidth = 5;

	////////////////////////////////////////////////////////////
	///////////////// Set-up arc functions /////////////////////
	////////////////////////////////////////////////////////////

	var legendArc = d3.arc()
    	.outerRadius(function(d) { return timeScale(this.parentNode.parentNode.__data__) + arcHeight; })
    	.innerRadius(function(d) { return timeScale(this.parentNode.parentNode.__data__); })
    	.startAngle(0)
    	.endAngle(function(d) { 
    		//Towards the left for women and right for men
    		var isMen = this.parentNode.__data__ === "Men"; 
    		var sign = isMen ? 1 : -1;
    		var numMedals = isMen ? 1 : Math.round( Math.random() * (legendWidth-2) );
    		return sign * numMedals * medalDegree * Math.PI/180;
    	});

    var genderLegendArc = d3.arc()
    	.outerRadius(outerRadius + arcHeight)
    	.innerRadius(innerRadius)
    	.startAngle(0)
    	.endAngle(function(d) { 
    		//Towards the left for women and right for men
    		var sign = d === "Men" ? 1 : -1;
    		return sign * (legendWidth * medalDegree) * Math.PI/180;
    	});

    var yearLegendArc = d3.arc()
		.outerRadius(function(d) { return timeScale(d) + 1; })
		.innerRadius(function(d) { return timeScale(d) - 1;} )
		.startAngle(function(d) { return -legendWidth * medalDegree * Math.PI/180; })
		.endAngle(function(d) { return legendWidth * medalDegree * Math.PI/180; }); 

	//Large arcs to siginify the 3 games not done due to war
    var warLegendArc = d3.arc()
		.outerRadius(function(d) { return timeScale(d) + arcHeight; })
		.innerRadius(function(d) { return timeScale(d);} )
		.startAngle(function(d) { return -legendWidth * medalDegree * Math.PI/180; })
		.endAngle(function(d) { return legendWidth * medalDegree * Math.PI/180; }); 

	////////////////////////////////////////////////////////////
	/////////////////// Create the feather /////////////////////
	////////////////////////////////////////////////////////////

	var featherLegend = svgLegend.append("g")
		.attr("class", function(d,i) { return "feather feather-legend"; })
		.attr("transform", "rotate(90)");

	//Create section behind each gender to fill with gradient
	featherLegend.selectAll(".gender-arc")
		.data(["Men","Women"])
		.enter().append("path")
		.attr("class", function(d) { return "gender-arc gender-" + d.toLowerCase(); })
		.style("fill", function(d) { return "url(#" + d.toLowerCase() + "-gradient)"; })
		.attr("d", genderLegendArc);

	////////////////////////////////////////////////////////////
	///////////////// Create inside of feather /////////////////
	////////////////////////////////////////////////////////////

	var editionsLegend = featherLegend.selectAll(".edition")
		.data(legendYears)
		.enter().append("g")
		.attr("class", function(d,i) { return "edition year_" + d; });

	var gendersLegend = editionsLegend.selectAll(".genders")
		.data(["Men", "Women"])
		.enter().append("g")
		.attr("class", function(d,i) { return "gender " + d; });

	//Finally append the paths/medals
	gendersLegend.append("path")
    	.attr("class", "continent")
    	.style("fill", function(d) { return arcColors[ Math.floor( Math.random() * arcColors.length) ]; })
    	.attr("d", legendArc);

	////////////////////////////////////////////////////////////
	/////////////// Create axes inside feather /////////////////
	////////////////////////////////////////////////////////////

	//Create a line to split the genders
	featherLegend.append("line")
		.attr("class", "time-line")
		.attr("y1", -timeScale(startYear))
		.attr("y2", -timeScale(endYear) - arcHeight);

	//Create small rings to siginify 20 years
	featherLegend.selectAll(".year-outline")
		.data(groupYears)
		.enter().append("path")
		.attr("class", "year-outline")
		.attr("d", yearLegendArc);

	//Create war years
	featherLegend.selectAll(".war-arc")
		.data(warYears)
		.enter().append("path")
		.attr("class", "war-arc")
		.attr("d", warLegendArc);

	//Add gender info to the end
	featherLegend.selectAll(".gender-sign")
		.data(["&#9794;","&#9792;"])
		.enter().append("text")
		.attr("class", "gender-sign")
		.attr("transform", function(d, i) { 
			var sign = i === 0 ? 1 : -1;
			var rotation = 90 + sign * legendWidth * medalDegree;
			return "rotate(" + rotation + ")translate(" + -timeScale(2028) + ")rotate(180)";
		})
		.html(function(d) { return d; });

	////////////////////////////////////////////////////////////
	/////////////// Annotations for the legend /////////////////
	////////////////////////////////////////////////////////////

	//Explain the widht of 1 medal
	var oneMedalOffset = 12;
	var oneMedalWidth = svgLegend.append("g")
		.attr("class", "one-medal-width-annotation")
		.attr("transform", "translate(" + 0 + "," + oneMedalOffset + ")");
	//The line
	oneMedalWidth.append("line")
		.attr("class", "legend-annotation-line")
		.attr("x1", timeScale(2024))
		.attr("x2", timeScale(2044));
	//The text
	oneMedalWidth.append("text")
		.attr("class", "legend-annotation-text")
		.attr("x", timeScale(2048))
		.attr("dy", "0.35em")
		.text("width of 1 medal");

	//Time
	var timeLineStartWrapper = svgLegend.append("g")
		.attr("class", "time-axis-annotation")
		.attr("transform", "translate(" + timeScale(1896) + "," + 10 + ")");
	//The line
	timeLineStartWrapper.append("line")
		.attr("class", "legend-annotation-line")
		.attr("y2", 100);
	//The text
	timeLineStartWrapper.append("text")
		.attr("class", "legend-annotation-year")
		.attr("y", 120)
		.text(startYear);

	var timeLineEndWrapper = svgLegend.append("g")
		.attr("class", "time-axis-annotation")
		.attr("transform", "translate(" + timeScale(2016) + "," + 10 + ")");
	//The line
	timeLineEndWrapper.append("line")
		.attr("class", "legend-annotation-line")
		.attr("y1", 75)
		.attr("y2", 100);
	//The text
	timeLineEndWrapper.append("text")
		.attr("class", "legend-annotation-year")
		.attr("y", 120)
		.text(endYear);

	//Show war years in legend?


}//createFeatherLegend
////////////////////////////////////////////////////////////
/////////////////// Create legend //////////////////////////
////////////////////////////////////////////////////////////

function createFeatherLegend(innerRadius, outerRadius, arcHeight, medalDegree, startYear, endYear, color, arcColors, warYears, groupYears, chartScale) {

	var legendWidth = 5;

	//Undo the scaling for this legend
	var innerRadius = innerRadius/chartScale,
		outerRadius = outerRadius/chartScale,
		arcHeight = arcHeight/chartScale;

	var timeScale = d3.scaleLinear()
    	.domain([startYear, endYear])
    	.range([innerRadius, outerRadius]);

	var margin = {top: 40, right: 10, bottom: 80, left: 10},
		legendW = outerRadius * 1.35,
		legendH = 2 * (timeScale(2028) * Math.sin(legendWidth * medalDegree * Math.PI/180)); 

	var svgLegend = d3.select("#olympic-chart-legend").append("svg")
	    .attr("width", legendW + margin.left + margin.right)
	    .attr("height", legendH + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + (margin.top + legendH/2) + ")");

	var legendYears = d3.range(startYear, endYear + 4, 4);
	legendYears = legendYears.filter(function(d) { return warYears.indexOf(d) === -1; });

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
    		var numMedals = isMen ? 1 : Math.ceil( Math.random() * (legendWidth-2) );
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
	////////////// Create an Olympic Record dot ////////////////
	////////////////////////////////////////////////////////////

	var olympicRecord = svgLegend.append("g").attr("class", "olympic-record-wrapper");
	var legendRecordYear = 1964;

	olympicRecord.append("circle")
		.attr("class", "record")
		.style("fill", function(d) { return "white"; })
    	.attr("cx", (timeScale(legendRecordYear) + arcHeight/2) * Math.cos( -medalDegree/2 * Math.PI/180 ) )
    	.attr("cy", (timeScale(legendRecordYear) + arcHeight/2) * Math.sin( -medalDegree/2 * Math.PI/180 ) )
    	.attr("r", arcHeight/2*0.7 );

    olympicRecord.append("line")
    	.attr("class", "record-legend-line")
    	.attr("x1", timeScale(legendRecordYear) + arcHeight/2)
    	.attr("y1", -12)
    	.attr("x2", timeScale(legendRecordYear) + arcHeight/2)
    	.attr("y2", -65);

    olympicRecord.append("text")
    	.attr("class", "record-legend-text")
    	.attr("y", -57)
    	.attr("x", timeScale(legendRecordYear) + arcHeight/2 - 3)
    	.text("Olympic / World record")


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

	//Title
	svgLegend.append("text")
		.attr("class", "legend-title")
		.attr("x", timeScale(1896) )
		.attr("y", -legendH/2 - (margin.top-10) )
		.attr("dy", "0.5em")
		.text("A feather = One discipline");

	//Label
	svgLegend.append("text")
		.attr("class", "discipline-label-legend")
		.attr("x", timeScale(2028) )
		.attr("y", 0 )
		.attr("dy", "0.5em")
		.text("Discipline");

	//Add gender info to the end
	svgLegend.selectAll(".gender-text")
		.data(["Women","Men"])
		.enter().append("text")
		.attr("class", "gender-text")
		.attr("x", function(d, i) { return timeScale(2028); })
		.attr("y", function(d) {
			var sign = d === "Men" ? 1 : -1;
			return timeScale(2028) * Math.sin(sign * legendWidth * 0.8 * medalDegree * Math.PI/180);
		})
		.attr("dy", "0.5em")
		.html(function(d) { return d; });

	////////////////////////////////////////////////////////////
	/////////////// Annotations for the legend /////////////////
	////////////////////////////////////////////////////////////

	//Time
	var timeLineWrapper = svgLegend.append("g")
		.attr("class", "time-axis-annotation")
		.attr("transform", "translate(" + 0 + "," + (legendH/2 + 10) + ")");
	//The line
	timeLineWrapper.append("line")
		.attr("class", "legend-annotation-line")
		.attr("x1", timeScale(startYear) )
		.attr("x2", timeScale(endYear) );
	timeLineWrapper.append("line")
		.attr("class", "legend-annotation-start-line")
		.attr("x1", timeScale(startYear) )
		.attr("x2", timeScale(startYear) )
		.attr("y1", -2 )
		.attr("y2", 2 );
	timeLineWrapper.append("line")
		.attr("class", "legend-annotation-start-line")
		.attr("x1", timeScale(endYear) )
		.attr("x2", timeScale(endYear) )
		.attr("y1", -2 )
		.attr("y2", 2 );
	//1896
	timeLineWrapper.append("text")
		.attr("class", "legend-annotation-year")
		.attr("x", timeScale(startYear) )
		.attr("dy", "1.5em")
		.style("text-anchor", "middle")
		.text(startYear);
	//2016
	timeLineWrapper.append("text")
		.attr("class", "legend-annotation-year")
		.attr("x", timeScale(endYear) )
		.attr("dy", "1.5em")
		.style("text-anchor", "middle")
		.text(endYear);

}//createFeatherLegend

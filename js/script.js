////////////////////////////////////////////////////////////
///////////////////// Read in data /////////////////////////
////////////////////////////////////////////////////////////

d3.json('data/olympic_feathers_min.json', function (error, data) {

	if (error) throw error;

	var chartScale = Math.max( Math.min( window.innerWidth/2100, 1), 0.6 );
	var chartScaleFont = Math.max(chartScale, 0.9);

	d3.select("#olympic-wrapper").style("width", 2000*chartScale + "px");
	d3.select("#olympic-chart-legend").style("width", 500*chartScale + "px");

	var outerRadius = 220 * chartScale,
		innerRadius = 40 * chartScale,
		featherPadding = 1.5,
		medalDegree = 320/(50.5*2),
		arcHeight = 5 * chartScale;

	var startYear = 1896,
		endYear = 2016;

	var warYears = [1916, 1940, 1944];
	
	//Size
	var margin = {top: 300*chartScaleFont, right: 100*chartScale, bottom: 350*chartScaleFont, left: 100*chartScale}
	var width = 8*outerRadius,
	    height = 4.5*outerRadius;

	////////////////////////////////////////////////////////////
	////////////////////// Create SVG //////////////////////////
	////////////////////////////////////////////////////////////
				
	var svg = d3.select("#olympic-chart").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	////////////////////////////////////////////////////////////
	//////////////////// Colors & Scales ///////////////////////
	////////////////////////////////////////////////////////////
					
	//Although not designed to represent continents (https://en.wikipedia.org/wiki/Olympic_symbols) 
	//I will use the general accepted coloring of:
	//Americas - Red
	//Europe - Blue
	//Africa - Black
	//Asia - Yellow
	//Oceania - Green
	//Mixed - all of them - gradient

	var continents = ["Europe","Asia","Africa","Oceania","Americas"];
	var arcColors = ["#1482C6","#FAB349","#242021","#17A554","#EA1F46"];
	//Colors for the medals
	var color = d3.scaleOrdinal()
    	.domain(continents)
    	.range(arcColors)
    	.unknown("#c6c6c6");

    var timeScale = d3.scaleLinear()
    	.domain([startYear, endYear])
    	.range([innerRadius, outerRadius]);

	////////////////////////////////////////////////////////////
	///////////////////////// Gradients ////////////////////////
	////////////////////////////////////////////////////////////

	var defs = svg.append("defs");

    //Create a radial gradient for the men part of the feather
	defs.append("radialGradient")
		.attr("id", "men-gradient")
		.attr("gradientUnits", "userSpaceOnUse")
		.attr("cx", 0)
		.attr("cy", 0)
		.attr("r", outerRadius)	//not really needed, since 50% is the default
		.selectAll("stop")
		.data([
				{offset: "20%", color: "white"},
				{offset: "100%", color: "#E1F2FF"} //"#E2F6FF"}
			])
		.enter().append("stop")
		.attr("offset", function(d) { return d.offset; })
		.attr("stop-color", function(d) { return d.color; });

	//Create a radial gradient for the women part of the feather
	defs.append("radialGradient")
		.attr("id", "women-gradient")
		.attr("gradientUnits", "userSpaceOnUse")
		.attr("cx", 0)
		.attr("cy", 0)
		.attr("r", outerRadius)
		.selectAll("stop")
		.data([
				{offset: "20%", color: "white"},
				{offset: "100%", color: "#FDEAEA"} //"#FFE6FB"
			])
		.enter().append("stop")
		.attr("offset", function(d) { return d.offset; })
		.attr("stop-color", function(d) { return d.color; });

	//Create gradient for the mixed team gold medal winners in 1896, 1900 & 1904
	var mixedGradients = defs.selectAll(".mixed-gradient")
		.data([1896, 1900, 1904])
		.enter().append("radialGradient")
		.attr("class", "mixed-gradient")
		.attr("id", function(d) { return "mixed-gradient-" + d; })
		.attr("gradientUnits", "userSpaceOnUse")
		.attr("cx", 0)
		.attr("cy", 0)
		.attr("r",  function(d) { return timeScale(d) + arcHeight; });
	//Create the stops per gradient year
	mixedGradients.selectAll("stop")
		.data(arcColors)
		.enter().append("stop")
		.attr("offset", function(d,i) { 
			var edition = this.parentNode.__data__;
			return  (timeScale(edition) + (i/(arcColors.length-1)) * arcHeight) / (timeScale(edition) + arcHeight); 
		})
		.attr("stop-color", function(d) { return d; });

	//Create gradient for the annotation lines
	var annotationGradients = defs.selectAll(".annotation-gradient")
		.data(arcColors)
		.enter().append("linearGradient")
		.attr("class", "annotation-gradient")
		.attr("id", function(d,i) { return "annotation-gradient-" + continents[i]; })
		.attr("x1", "0%")
		.attr("y1", "100%")
		.attr("x2", "0%")
		.attr("y2", "0%");
	annotationGradients.append("stop")
		.attr("offset", "0%")
		.attr("stop-color", "black");
	annotationGradients.append("stop")
		.attr("offset", "50%")
		.attr("stop-color", function(d) { return d; });

	////////////////////////////////////////////////////////////
	/////////////////////// Arc set-up /////////////////////////
	////////////////////////////////////////////////////////////

	var arc = d3.arc()
    	.outerRadius(function(d) { return timeScale(d.edition) + arcHeight; })
    	.innerRadius(function(d) { return timeScale(d.edition); })
    	.startAngle(function(d) { 
    		//Towards the left for women and right for men
    		var sign = d.gender === "Men" ? 1 : -1;
    		return sign * ( (d.startMedalCount * medalDegree) * Math.PI/180);// + 1/timeScale(d.edition) ); 
    	})
    	.endAngle(function(d) { 
    		//Towards the left for women and right for men
    		var sign = d.gender === "Men" ? 1 : -1;
    		return sign * ( ((d.startMedalCount + d.medalCount) * medalDegree) * Math.PI/180);// + 1/timeScale(d.edition) ); 
    	});

    //Arc function for the section behind the arcs to signify the gender difference
    var genderArc = d3.arc()
    	.outerRadius(outerRadius + arcHeight)
    	.innerRadius(innerRadius)
    	.startAngle(0)
    	.endAngle(function(d) { 
    		//Towards the left for women and right for men
    		var sign = d === "Men" ? 1 : -1;
    		return sign * (this.parentNode.__data__.maxMedals * medalDegree) * Math.PI/180;
    	});

    //Small arcs to make it easier to see the years
    var yearArc = d3.arc()
		.outerRadius(function(d) { return timeScale(d) + 1*chartScale; })
		.innerRadius(function(d) { return timeScale(d) - 1*chartScale;} )
		.startAngle(function(d) { return -this.parentNode.__data__.maxMedals * medalDegree * Math.PI/180; })
		.endAngle(function(d) { return this.parentNode.__data__.maxMedals * medalDegree * Math.PI/180; }); 

	//Large arcs to siginify the 3 games not done due to war
    var warArc = d3.arc()
		.outerRadius(function(d) { return timeScale(d) + arcHeight; })
		.innerRadius(function(d) { return timeScale(d);} )
		.startAngle(function(d) { return -this.parentNode.__data__.maxMedals * medalDegree * Math.PI/180; })
		.endAngle(function(d) { return this.parentNode.__data__.maxMedals * medalDegree * Math.PI/180; }); 

	////////////////////////////////////////////////////////////
	/////////////////// Create tails/circles ///////////////////
	////////////////////////////////////////////////////////////

	//Locations of each circle
	var circleLocations = [
		{id: 1, x: outerRadius * 1, y: outerRadius},
		{id: 2, x: outerRadius * 2.5, y: height - outerRadius},
		{id: 3, x: outerRadius * 4, y: outerRadius},
		{id: 4, x: outerRadius * 5.5, y: height - outerRadius},
		{id: 5, x: outerRadius * 7, y: outerRadius}
	];

	//Create a group for each circle
	var tails = svg.selectAll(".tail")
		.data(data)
		.enter().append("g")
		.attr("class", function(d,i) { return "tail " + removeSpace(d.group); })
		.attr("transform", function(d,i) { 
			d.circleRotation = 180 + (360 - 2 * d.maxMedals * medalDegree - (d.disciplines.length - 1) * featherPadding)/2;
			return "translate(" + circleLocations[i].x + "," + circleLocations[i].y + ")" +
					"rotate(" + d.circleRotation + ")"; 
		});

	////////////////////////////////////////////////////////////
	//////////////////// Create time axes //////////////////////
	////////////////////////////////////////////////////////////

	var groupYears = d3.range(startYear + 20, endYear, 20);
	var ticks = d3.range(startYear, endYear + 4, 4);
	ticks = ticks.filter(function(d) { return groupYears.indexOf(d) === -1; });

	var timeAxes = tails.append("g")
		.attr("class", "time-axis")
		.attr("transform", function(d,i) { return "rotate(" + -d.circleRotation + ")"; });

	timeAxes.append("text")
		.attr("class", "time-axis-outer-years")
		.attr("x", 0)
		.attr("y", 0)
		.attr("dy", "0.35em")
		.style("font-size", 13*chartScale + "px")
		.text("1896");

	timeAxes.append("text")
		.attr("class", "time-axis-outer-years")
		.attr("x", 0)
		.attr("y", timeScale(2040))
		.attr("dy", "0.35em")
		.style("font-size", 13*chartScale + "px")
		.text("2016");

	// //Create the small tick markers
	// timeAxes.selectAll(".time-axis-marker")
	// 	.data(ticks)
	// 	.enter().append("line")
	// 	.attr("class", function(d,i) { 
	// 		var markerType = (i === 0 || i === ticks.length-1 ? "big" : "small");
	// 		return "time-axis-marker " + markerType + "-marker";
	// 	})
	// 	.attr("x1", function(d,i) { return i === 0 || i === ticks.length-1 ? -5 : -2; })
	// 	.attr("y1", function(d) { return timeScale(d) + arcHeight/2; })
	// 	.attr("x2", function(d,i) { return i === 0 || i === ticks.length-1 ? 5 : 2; })
	// 	.attr("y2", function(d) { return timeScale(d) + arcHeight/2; });

	//Create the small years within the axis
	timeAxes.selectAll(".time-axis-small-year")
		.data(groupYears)
		.enter().append("text")
		.attr("class", "time-axis-small-year")
		.attr("x", 0)
		.attr("y", function(d) { return timeScale(d) + arcHeight/2; })
		.attr("dy", "0.35em")
		.style("font-size", 8*chartScale + "px")
		.text(function(d) { return d; });

	////////////////////////////////////////////////////////////
	///////////////////// Create feathers //////////////////////
	////////////////////////////////////////////////////////////

	var feathers = tails.selectAll(".feather")
		.data(function(d) { return d.disciplines; })
		.enter().append("g")
		.attr("class", function(d,i) { return "feather " + removeSpace(d.discipline); })
		.attr("transform", function(d,i) {
			d.angle = (2*d.featherOffset + d.maxMedals) * medalDegree + i * featherPadding; 
			return "rotate(" + d.angle + ")"; 
		});

	//Append the label names on the outside
	feathers.append("text")
	  	.attr("dy", ".35em")
	  	.attr("class", "discipline-title")
	  	.attr("text-anchor", function(d) { 
	  		return (d.angle + this.parentNode.parentNode.__data__.circleRotation) > 360 ? "start" : "end"; 
	  	})
	  	.attr("transform", function(d) {
			return "rotate(90)translate(" + -timeScale(2028) + ")"
			+ ((d.angle + this.parentNode.parentNode.__data__.circleRotation) > 360 ? "rotate(180)" : "");
	  	})
	  	.style("font-size", 12*chartScale + "px")
	  	.text(function(d,i) { return d.discipline; });

	//Create section behind each gender to fill with gradient
	feathers.selectAll(".gender-arc")
		.data(["Men","Women"])
		.enter().append("path")
		.attr("class", function(d) { return "gender-arc gender-" + d.toLowerCase(); })
		.style("fill", function(d) { return "url(#" + d.toLowerCase() + "-gradient)"; })
		.attr("d", genderArc);

	////////////////////////////////////////////////////////////
	//////////////// Create inside of feathers /////////////////
	////////////////////////////////////////////////////////////

	var editions = feathers.selectAll(".edition")
		.data(function(d) { return d.editions; })
		.enter().append("g")
		.attr("class", function(d,i) { return "edition year_" + d.edition; });

	var genders = editions.selectAll(".genders")
		.data(function(d) { return d.genders; })
		.enter().append("g")
		.attr("class", function(d,i) { return "gender " + d.gender; });

	//Finally append the paths
	genders.selectAll(".continent")
    	.data(function(d) { return d.continents; })
    	.enter().append("path")
    	.attr("class", function(d,i) { return "continent " + d.continent; })
    	.style("fill", function(d) { 
    		return d.continent === "Mixed" ? "url(#mixed-gradient-" + d.edition + ")" : color(d.continent); 
    	})
    	.attr("d", arc)
    	.on("mouseover", function(d) { showTooltip(d, color); })
    	.on("mouseout", hideTooltip);

	////////////////////////////////////////////////////////////
	//////////////////// Append Grid Lines /////////////////////
	////////////////////////////////////////////////////////////

	//Create a line to split the genders
	feathers.append("line")
		.attr("class", "time-line")
		.attr("y1", -timeScale(startYear))
		.attr("y2", -timeScale(endYear) - arcHeight)
		.style("stroke-width", 2*chartScale);

	//Create small rings to siginify 20 years
	feathers.selectAll(".year-outline")
		.data(groupYears)
		.enter().append("path")
		.attr("class", "year-outline")
		.attr("d", yearArc);

	//Create war years
	feathers.selectAll(".war-arc")
		.data(warYears)
		.enter().append("path")
		.attr("class", "war-arc")
		.attr("d", warArc);

	////////////////////////////////////////////////////////////
	////// Create other sports chart in lower right corner /////
	////////////////////////////////////////////////////////////

	var offsetX = width - 160*chartScale,
		offsetY = height + margin.bottom;
	var otherSports = svg.append("g")
		.attr("class", "other-sports-wrapper");

	createOtherSportsChart(otherSports, color, chartScale, offsetX, offsetY);

	////////////////////////////////////////////////////////////
	/////////////////// Create annotations /////////////////////
	////////////////////////////////////////////////////////////

	var annotationGroup = svg.append("g")
		.attr("class", "annotation-wrapper");

	createAnnotations(annotationGroup, timeScale, color, circleLocations, chartScale);

	////////////////////////////////////////////////////////////
	///////////////////// Create legend ////////////////////////
	////////////////////////////////////////////////////////////

	createFeatherLegend(innerRadius, outerRadius, arcHeight, medalDegree, startYear, endYear, color, arcColors, warYears, groupYears, chartScale);

	createColorLegend(color, outerRadius, chartScale, chartScale);

});//d3.csv

////////////////////////////////////////////////////////////
///////////////////// Extra functions //////////////////////
////////////////////////////////////////////////////////////

//Show the tooltip on hover
function showTooltip(d, color) {	
	//Find location of mouse on page
	var xpos =  d3.event.pageX - 15;
	var ypos =  d3.event.pageY - 15;

	//Rest font-style
	d3.select("#tooltip-country").style("font-size", null);

	//Set the title and discipline
	d3.select("#tooltip .tooltip-event").text(d.eventName);
	d3.select("#tooltip .tooltip-discipline").text(d.discipline);

	//Set athlete
	if(d.edition === 2016 & d.country === "" & d.athlete === "") {
		var athlete = "To be decided in the coming days";
	} else if (d.athlete === "") {
		var athlete = "";
		d3.select("#tooltip-country").style("font-size", "13px");
	} else {
		var athlete = d.athlete;
	}//else
	d3.select("#tooltip-athlete").text(athlete);

	//Set country
	if( d.country === "") {
		var country = "";
	} else if (d.country === "Mixed team") {
		var country = "Mixed team";
	} else {
		var country = d.country + " - " + d.continent;
	}//else
	d3.select("#tooltip-country")
		.style("color", color(d.continent))
		.text(country);

	//Set edition
	d3.select("#tooltip-edition").text(d.city + " - " + d.edition);

	//Set the tooltip in the right location and have it appear
	d3.select("#tooltip")
		.style("top", ypos + "px")
		.style("left", xpos + "px")
		.transition().duration(0)
		.style("opacity", 1);
}//showTooltip	

//Hide the tooltip
function hideTooltip() {	
	d3.select("#tooltip")
		.transition().duration(100)
		.style("opacity", 0);	
}//hideTooltip

//Replaces spaces, - and & for use in classes
function removeSpace(str) {
	str = str.replace(/\s+/g, '-');
	str = str.replace(/&/g, '');
	str = str.replace(/\./g,'').toLowerCase();
	return str;
}//removeSpace

//Wrap text in SVG
function wrap(text, width, heightLine) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = (typeof heightLine === "undefined" ? 1.6 : heightLine), // ems
        y = text.attr("y"),
        x = text.attr("x"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}//wrap

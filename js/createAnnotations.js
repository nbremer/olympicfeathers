////////////////////////////////////////////////////////////
/////////////////// Create annotations /////////////////////
////////////////////////////////////////////////////////////

function createAnnotations(annotationGroup, timeScale, color, circleLocations, chartScale) {

	var annotationRadius = 4*chartScale;

	var chartScaleFont = Math.max(chartScale, 0.8);
	var chartScaleDownLine = Math.max( Math.min( window.innerWidth/2100, 1), 0.7 ),
		chartScaleDownLineDucks = chartScaleDownLine < 1 ? chartScaleDownLine/1.2 : 1;

	var annotationTextOfsset = 10*chartScaleFont,
		annotationTitlePadding = 25*chartScaleFont;

	var extraPullUp = 0;
	if(chartScale <= 0.6) { extraPullUp = 10; }
	else if(chartScale <= 0.65) { extraPullUp = 5; }
	else if(chartScale <= 0.675) { extraPullUp = 0; }
	else if(chartScale <= 0.71) { extraPullUp = -3; }
	else if(chartScale <= 0.75) { extraPullUp = -6; }
	else if(chartScale <= 0.8) { extraPullUp = -11; }
	else if(chartScale <= 0.9) { extraPullUp = -14; }
	else if(chartScale <= 0.95) { extraPullUp = -6; }

	var fontsizeTitle = 16*chartScaleFont,
		fontsizeText = 12*chartScaleFont,
		lineHeight = 1.6*chartScaleFont,
		lineWidth = 1.5*chartScaleFont,
		circleStrokeWidth = 2*chartScaleFont;

	////////////////////////////////////////////////////////////
	//////////////////// Sovjet's boycott //////////////////////
	////////////////////////////////////////////////////////////

	var boycottLength = -480*chartScaleFont;
	var boycottAnn = annotationGroup.append("g")
		.attr("class", "annotation ann-boycott")
		.attr("transform", "translate(" + (circleLocations[0].x + timeScale(1986) * Math.cos(-170 * Math.PI/180)) + "," + 
										  (circleLocations[0].y + timeScale(1986) * Math.sin(-170 * Math.PI/180)) + ")");
	//rect
	boycottAnn.append("rect")
		.attr("class", "annotation-line")
		.style("fill", "url(#annotation-gradient-Asia)")
		.attr("width", lineWidth)
		.attr("x", -lineWidth/2)
		.attr("height", -boycottLength)
		.attr("y", boycottLength);
	//circle
	boycottAnn.append("circle")
		.attr("class", "annotation-circle")
		.attr("r", annotationRadius)
		.style("stroke-width", circleStrokeWidth);
	//title
	boycottAnn.append("text")
		.attr("class", "annotation-text-title")
		.attr("x", annotationTextOfsset)
		.attr("y", boycottLength)
		.attr("dy", "1em")
		.style("fill", color("Asia"))
		.style("font-size", fontsizeTitle + "px")
		.text("Asia takes over in 1984");
	//text
	boycottAnn.append("text")
		.attr("class", "annotation-text")
		.attr("x", annotationTextOfsset)
		.attr("y", boycottLength + annotationTitlePadding)
		.attr("dy", "1em")
		.style("font-size", fontsizeText + "px")
		.text("The boycott of the Soviet Union and 15 other nations in the Los Angeles 1984 games is most notable in Gymnastics, " + 
			  "which was dominated by the Soviet Union during those years. Japan and China took the place of Russia in winning most of the women's events. " +
			  "This was not the only boycott that happened during the Olympics' history.")
		.call(wrap, 200*chartScaleFont, lineHeight);


	////////////////////////////////////////////////////////////
	////////////////////// Abebe Bikila ////////////////////////
	////////////////////////////////////////////////////////////

	var abebeLength = -400*chartScaleFont;
	var arbebeAnn = annotationGroup.append("g")
		.attr("class", "annotation ann-abebe")
		.attr("transform", "translate(" + (circleLocations[0].x + timeScale(1962) * Math.cos(24 * Math.PI/180)) + "," + 
										  (circleLocations[0].y + timeScale(1962) * Math.sin(24 * Math.PI/180)) + ")");
	//rect
	arbebeAnn.append("rect")
		.attr("class", "annotation-line")
		.style("fill", "url(#annotation-gradient-Africa)")
		.attr("width", lineWidth)
		.attr("x", -lineWidth/2)
		.attr("height", -abebeLength)
		.attr("y", abebeLength);
	//circle
	arbebeAnn.append("circle")
		.attr("class", "annotation-circle")
		.attr("r", annotationRadius)
		.style("stroke-width", circleStrokeWidth);
	//title
	arbebeAnn.append("text")
		.attr("class", "annotation-text-title")
		.attr("x", annotationTextOfsset)
		.attr("y", abebeLength)
		.attr("dy", "1em")
		.style("fill", color("Africa"))
		.style("font-size", fontsizeTitle + "px")
		.text("Running barefoot");
	//text
	arbebeAnn.append("text")
		.attr("class", "annotation-text")
		.attr("x", annotationTextOfsset)
		.attr("y", abebeLength + annotationTitlePadding)
		.attr("dy", "1em")
		.style("font-size", fontsizeText + "px")
		.text("In 1960, Abebe Bikila became the first black African to win a gold medal. He accomplished this while running the marathon barefoot.")
		.call(wrap, 200*chartScaleFont, lineHeight);

	////////////////////////////////////////////////////////////
	/////////////////////// Busy 1920 //////////////////////////
	////////////////////////////////////////////////////////////

	var busy1920Length = -440*chartScaleFont;
	var busy1920Ann = annotationGroup.append("g")
		.attr("class", "annotation ann-busy-1920")
		.attr("transform", "translate(" + (circleLocations[2].x + timeScale(1922) * Math.cos(-65 * Math.PI/180)) + "," + 
										  (circleLocations[2].y + timeScale(1922) * Math.sin(-65 * Math.PI/180)) + ")");
	//rect
	busy1920Ann.append("rect")
		.attr("class", "annotation-line")
		.style("fill", "url(#annotation-gradient-Europe)")
		.attr("width", lineWidth)
		.attr("x", -lineWidth/2)
		.attr("height", -busy1920Length)
		.attr("y", busy1920Length);
	//circle
	busy1920Ann.append("circle")
		.attr("class", "annotation-circle")
		.attr("r", annotationRadius)
		.style("stroke-width", circleStrokeWidth);
	//title
	busy1920Ann.append("text")
		.attr("class", "annotation-text-title")
		.attr("x", -annotationTextOfsset)
		.attr("y", busy1920Length)
		.attr("dy", "1em")
		.style("text-anchor", "end")
		.style("fill", color("Europe"))
		.style("font-size", fontsizeTitle + "px")
		.text("Busy 1920's");
	//text
	busy1920Ann.append("text")
		.attr("class", "annotation-text")
		.attr("x", -annotationTextOfsset)
		.attr("y", busy1920Length + annotationTitlePadding)
		.attr("dy", "1em")
		.style("text-anchor", "end")
		.style("font-size", fontsizeText + "px")
		.text("The 1920 edition in Antwerp saw a large increase in the number of different events held. Never again could so many medals be won in archery, athletics, shooting, and sailing. " + 
			  "Shooting had 21 events for men. Thankfully no live birds have been used for more than 100 years.")
		.call(wrap, 225*chartScaleFont, lineHeight);

	////////////////////////////////////////////////////////////
	/////////////////// South Korea Archery ////////////////////
	////////////////////////////////////////////////////////////

	var archeryLength = -300*chartScaleFont;
	var archeryAnn = annotationGroup.append("g")
		.attr("class", "annotation ann-archery")
		.attr("transform", "translate(" + (circleLocations[2].x + timeScale(1996) * Math.cos(-22 * Math.PI/180)) + "," + 
										  (circleLocations[2].y + timeScale(1996) * Math.sin(-22 * Math.PI/180)) + ")");
	//rect
	archeryAnn.append("rect")
		.attr("class", "annotation-line")
		.style("fill", "url(#annotation-gradient-Asia)")
		.attr("width", lineWidth)
		.attr("x", -lineWidth/2)
		.attr("height", -archeryLength)
		.attr("y", archeryLength);
	//circle
	archeryAnn.append("circle")
		.attr("class", "annotation-circle")
		.attr("r", annotationRadius)
		.style("stroke-width", circleStrokeWidth);
	//title
	archeryAnn.append("text")
		.attr("class", "annotation-text-title")
		.attr("x", annotationTextOfsset)
		.attr("y", archeryLength)
		.attr("dy", "1em")
		.style("fill", color("Asia"))
		.style("font-size", fontsizeTitle + "px")
		.text("South-Korea's dominance");
	//text
	archeryAnn.append("text")
		.attr("class", "annotation-text")
		.attr("x", annotationTextOfsset)
		.attr("y", archeryLength + annotationTitlePadding)
		.attr("dy", "1em")
		.style("font-size", fontsizeText + "px")
		.text("During the last 9 Olympic Games the South Korean women have won 16 out of 17 gold medals. The South Korean men aren't doing too bad either, especially in 2016.")
		.call(wrap, 200*chartScaleFont, lineHeight);

	////////////////////////////////////////////////////////////
	//////////////////// Amateur wrestling /////////////////////
	////////////////////////////////////////////////////////////

	var wrestlingLength = -300*chartScaleFont;
	var wrestlingAnn = annotationGroup.append("g")
		.attr("class", "annotation ann-wrestling")
		.attr("transform", "translate(" + (circleLocations[4].x + timeScale(2018) * Math.cos(-112 * Math.PI/180)) + "," + 
										  (circleLocations[4].y + timeScale(2018) * Math.sin(-112 * Math.PI/180)) + ")");
	//rect
	wrestlingAnn.append("rect")
		.attr("class", "annotation-line")
		.style("fill", "url(#annotation-gradient-Europe)")
		.attr("width", lineWidth)
		.attr("x", -lineWidth/2)
		.attr("height", -wrestlingLength)
		.attr("y", wrestlingLength);
	//circle
	wrestlingAnn.append("circle")
		.attr("class", "annotation-circle")
		.attr("r", annotationRadius)
		.style("stroke-width", circleStrokeWidth);
	//title
	wrestlingAnn.append("text")
		.attr("class", "annotation-text-title")
		.attr("x", annotationTextOfsset)
		.attr("y", wrestlingLength)
		.attr("dy", "1em")
		.style("fill", color("Europe"))
		.style("font-size", fontsizeTitle + "px")
		.text("The last amateurs");
	//text
	wrestlingAnn.append("text")
		.attr("class", "annotation-text")
		.attr("x", annotationTextOfsset)
		.attr("y", wrestlingLength + annotationTitlePadding)
		.attr("dy", "1em")
		.style("font-size", fontsizeText + "px")
		.text("Wrestling is the last Olympic sport where the athletes still need to have an amateur " + 
			  "status for the safety of the participants. Boxing also required an amateur status until Rio 2016.")
		.call(wrap, 200*chartScaleFont, lineHeight);

	////////////////////////////////////////////////////////////
	//////////////////////// Cycling ///////////////////////////
	////////////////////////////////////////////////////////////

	var cyclingLength = 560*chartScaleDownLine;
	var cyclingAnn = annotationGroup.append("g")
		.attr("class", "annotation ann-cycling")
		.attr("transform", "translate(" + (circleLocations[1].x + timeScale(2006) * Math.cos(-165 * Math.PI/180)) + "," + 
										  (circleLocations[1].y + timeScale(2006) * Math.sin(-165 * Math.PI/180)) + ")");
	//rect
	cyclingAnn.append("rect")
		.attr("class", "annotation-line")
		.attr("transform", "rotate(180)")
		.style("fill", "url(#annotation-gradient-Oceania)")
		.attr("width", lineWidth)
		.attr("x", -lineWidth/2)
		.attr("height", cyclingLength)
		.attr("y", -cyclingLength);
	//circle
	cyclingAnn.append("circle")
		.attr("class", "annotation-circle")
		.attr("r", annotationRadius)
		.style("stroke-width", circleStrokeWidth);
	//title
	cyclingAnn.append("text")
		.attr("class", "annotation-text-title")
		.attr("x", -annotationTextOfsset)
		.attr("y", cyclingLength - 120*chartScale - extraPullUp)
		.style("text-anchor", "end")
		.style("fill", color("Oceania"))
		.style("font-size", fontsizeTitle + "px")
		.text("One edition's rule");
	//text
	cyclingAnn.append("text")
		.attr("class", "annotation-text")
		.attr("x", -annotationTextOfsset)
		.attr("y", cyclingLength -120*chartScale + 23*chartScaleFont - extraPullUp)
		.attr("dy", "0em")
		.style("text-anchor", "end")
		.style("font-size", fontsizeText + "px")
		.text("Although taking home half of the gold cycling track medals in 2004, Australia didn't get any gold 4 years later " +
			  " after Great Britain discovered its love for, and talents in, track cycling.")
		.call(wrap, 180*chartScaleFont, lineHeight);

	////////////////////////////////////////////////////////////
	//////////////////////// Diving ////////////////////////////
	////////////////////////////////////////////////////////////

	var divingLength = 500*chartScaleDownLine;
	var divingAnn = annotationGroup.append("g")
		.attr("class", "annotation ann-diving")
		.attr("transform", "translate(" + (circleLocations[1].x + timeScale(1906) * Math.cos(-130 * Math.PI/180)) + "," + 
										  (circleLocations[1].y + timeScale(1906) * Math.sin(-130 * Math.PI/180)) + ")");
	//rect
	divingAnn.append("rect")
		.attr("class", "annotation-line")
		.attr("transform", "rotate(180)")
		.style("fill", "url(#annotation-gradient-Americas)")
		.attr("width", lineWidth)
		.attr("x", -lineWidth/2)
		.attr("height", divingLength)
		.attr("y", -divingLength);
	//circle
	divingAnn.append("circle")
		.attr("class", "annotation-circle")
		.attr("r", annotationRadius)
		.style("stroke-width", circleStrokeWidth);
	//title
	divingAnn.append("text")
		.attr("class", "annotation-text-title")
		.attr("x", annotationTextOfsset)
		.attr("y", divingLength - 155*chartScale - extraPullUp)
		.attr("dy", "1em")
		.style("fill", color("Americas"))
		.style("font-size", fontsizeTitle + "px")
		.text("The farthest dive");
	//text
	divingAnn.append("text")
		.attr("class", "annotation-text")
		.attr("x", annotationTextOfsset)
		.attr("y", divingLength - 155*chartScale + annotationTitlePadding - extraPullUp)
		.attr("dy", "1em")
		.style("font-size", fontsizeText + "px")
		.text("Diving’s very first event was 'Plunge for distance' in 1904. The winner was the competitor who " +
			  "remained underwater for the longest distance after an initial dive. Regarded as uninteresting, it did not reappear in any subsequent Olympic Games.")
		.call(wrap, 200*chartScaleFont, lineHeight);

	////////////////////////////////////////////////////////////
	///////////////////////// Ducks ////////////////////////////
	////////////////////////////////////////////////////////////

	var ducksLength = 400*chartScaleDownLineDucks;
	var ducksAnn = annotationGroup.append("g")
		.attr("class", "annotation ann-phelps-1st")
		.attr("transform", "translate(" + (circleLocations[3].x + timeScale(1930) * Math.cos(155 * Math.PI/180)) + "," + 
										  (circleLocations[3].y + timeScale(1930) * Math.sin(155 * Math.PI/180)) + ")");
	//rect
	ducksAnn.append("rect")
		.attr("class", "annotation-line")
		.attr("transform", "rotate(180)")
		.style("fill", "url(#annotation-gradient-Oceania)")
		.attr("width", lineWidth)
		.attr("x", -lineWidth/2)
		.attr("height", ducksLength)
		.attr("y", -ducksLength);
	//circle
	ducksAnn.append("circle")
		.attr("class", "annotation-circle")
		.attr("r", annotationRadius)
		.style("stroke-width", circleStrokeWidth);
	//title
	ducksAnn.append("text")
		.attr("class", "annotation-text-title")
		.attr("x", -annotationTextOfsset)
		.attr("y", ducksLength - 135*chartScale - extraPullUp)
		.attr("dy", "1em")
		.style("text-anchor", "end")
		.style("fill", color("Oceania"))
		.style("font-size", fontsizeTitle + "px")
		.text("Stopping for ducks");
	//text
	ducksAnn.append("text")
		.attr("class", "annotation-text")
		.attr("x", -annotationTextOfsset)
		.attr("y", ducksLength -135*chartScale + annotationTitlePadding - extraPullUp)
		.attr("dy", "1em")
		.style("text-anchor", "end")
		.style("font-size", fontsizeText + "px")
		.text("Henry Pearce stopped halfway through his quarter-final race to give way to a family of ducks passing in " + 
			  "front of his boat in 1928. Nevertheless, Pearce managed to win gold in the end.")
		.call(wrap, 175*chartScaleFont, lineHeight);

	////////////////////////////////////////////////////////////
	///////////////////// Phelp's 1st Gold /////////////////////
	////////////////////////////////////////////////////////////

	var phelps1stLength = 660*chartScaleDownLine;
	var phelps1stAnn = annotationGroup.append("g")
		.attr("class", "annotation ann-phelps-1st")
		.attr("transform", "translate(" + (circleLocations[3].x + timeScale(2006) * Math.cos(-33 * Math.PI/180)) + "," + 
										  (circleLocations[3].y + timeScale(2006) * Math.sin(-33 * Math.PI/180)) + ")");
	//rect
	phelps1stAnn.append("rect")
		.attr("class", "annotation-line")
		.attr("transform", "rotate(180)")
		.style("fill", "url(#annotation-gradient-Americas)")
		.attr("width", lineWidth)
		.attr("x", -lineWidth/2)
		.attr("height", phelps1stLength)
		.attr("y", -phelps1stLength);
	//circle
	phelps1stAnn.append("circle")
		.attr("class", "annotation-circle")
		.attr("r", annotationRadius)
		.style("stroke-width", circleStrokeWidth);
	//title
	phelps1stAnn.append("text")
		.attr("class", "annotation-text-title")
		.attr("x", -annotationTextOfsset)
		.attr("y", phelps1stLength - 153*chartScale - extraPullUp)
		.attr("dy", "1em")
		.style("text-anchor", "end")
		.style("fill", color("Americas"))
		.style("font-size", fontsizeTitle + "px")
		.text("Phelps' 1st Gold");
	//text
	phelps1stAnn.append("text")
		.attr("class", "annotation-text")
		.attr("x", -annotationTextOfsset)
		.attr("y", phelps1stLength -153*chartScale + annotationTitlePadding - extraPullUp)
		.attr("dy", "1em")
		.style("text-anchor", "end")
		.style("font-size", fontsizeText + "px")
		.text("Michael Phelps' first gold medal was won in the 400-meter individual medley in Athens, 2004. " + 
			  "Out of the 16 men's swimming events during those games, Phelps took home 6 gold medals, with 4 from individual races.")
		.call(wrap, 185*chartScaleFont, lineHeight);

}//createAnnotations


////////////////////////////////////////////////////////////
/////////////////// Create annotations /////////////////////
////////////////////////////////////////////////////////////

function createAnnotations(annotationGroup, timeScale, color, circleLocations) {

	var annotationRadius = 4;
	var annotationTextOfsset = 10;

	////////////////////////////////////////////////////////////
	//////////////////// Sovjet's boycott //////////////////////
	////////////////////////////////////////////////////////////

	var boycottLength = -480;
	var boycottAnn = annotationGroup.append("g")
		.attr("class", "annotation ann-boycott")
		.attr("transform", "translate(" + (circleLocations[0].x + timeScale(1986) * Math.cos(-170 * Math.PI/180)) + "," + 
										  (circleLocations[0].y + timeScale(1986) * Math.sin(-170 * Math.PI/180)) + ")");
	//line
	boycottAnn.append("rect")
		.attr("class", "annotation-line")
		.style("fill", "url(#annotation-gradient-Asia)")
		.attr("width", 1.5)
		.attr("x", -0.75)
		.attr("height", -boycottLength)
		.attr("y", boycottLength);
	//circle
	boycottAnn.append("circle")
		.attr("class", "annotation-circle")
		.attr("r", annotationRadius);
	//title
	boycottAnn.append("text")
		.attr("class", "annotation-text-title")
		.attr("x", annotationTextOfsset)
		.attr("y", boycottLength)
		.attr("dy", "1em")
		.style("fill", color("Asia"))
		.text("Asia takes over in 1984");
	//text
	boycottAnn.append("text")
		.attr("class", "annotation-text")
		.attr("x", annotationTextOfsset)
		.attr("y", boycottLength + 25)
		.attr("dy", "1em")
		.text("The boycott of the Sovjet Union and 15 other nations in the Los Angleles 1984 games is most notable in Gymnastics, " + 
			  "which was dominated by the Sovjet Union during those years. Japan and China took the place of Russia in winning most of the women's events. " +
			  "This was not the only boycott that happened during the Olympics' history.")
		.call(wrap, 225);


	////////////////////////////////////////////////////////////
	////////////////////// Abebe Bikila ////////////////////////
	////////////////////////////////////////////////////////////

	var abebeLength = -430;
	var arbebeAnn = annotationGroup.append("g")
		.attr("class", "annotation ann-abebe")
		.attr("transform", "translate(" + (circleLocations[0].x + timeScale(1962) * Math.cos(24 * Math.PI/180)) + "," + 
										  (circleLocations[0].y + timeScale(1962) * Math.sin(24 * Math.PI/180)) + ")");
	//line
	arbebeAnn.append("rect")
		.attr("class", "annotation-line")
		.style("fill", "url(#annotation-gradient-Africa)")
		.attr("width", 1.5)
		.attr("x", -0.75)
		.attr("height", -abebeLength)
		.attr("y", abebeLength);
	//circle
	arbebeAnn.append("circle")
		.attr("class", "annotation-circle")
		.attr("r", annotationRadius);
	//title
	arbebeAnn.append("text")
		.attr("class", "annotation-text-title")
		.attr("x", annotationTextOfsset)
		.attr("y", abebeLength)
		.attr("dy", "1em")
		.style("fill", color("Africa"))
		.text("Running barefoot");
	//text
	arbebeAnn.append("text")
		.attr("class", "annotation-text")
		.attr("x", annotationTextOfsset)
		.attr("y", abebeLength + 25)
		.attr("dy", "1em")
		.text("In 1960, Abebe Bikila became the first black African to win a gold medal. He accomplished this while running the marathon barefoot.")
		.call(wrap, 200);

	////////////////////////////////////////////////////////////
	/////////////////////// Busy 1920 //////////////////////////
	////////////////////////////////////////////////////////////

	var busy1920Length = -440;
	var busy1920Ann = annotationGroup.append("g")
		.attr("class", "annotation ann-busy-1920")
		.attr("transform", "translate(" + (circleLocations[2].x + timeScale(1922) * Math.cos(-65 * Math.PI/180)) + "," + 
										  (circleLocations[2].y + timeScale(1922) * Math.sin(-65 * Math.PI/180)) + ")");
	//line
	busy1920Ann.append("rect")
		.attr("class", "annotation-line")
		.style("fill", "url(#annotation-gradient-Europe)")
		.attr("width", 1.5)
		.attr("x", -0.75)
		.attr("height", -busy1920Length)
		.attr("y", busy1920Length);
	//circle
	busy1920Ann.append("circle")
		.attr("class", "annotation-circle")
		.attr("r", annotationRadius);
	//title
	busy1920Ann.append("text")
		.attr("class", "annotation-text-title")
		.attr("x", -annotationTextOfsset)
		.attr("y", busy1920Length)
		.attr("dy", "1em")
		.style("text-anchor", "end")
		.style("fill", color("Europe"))
		.text("Busy 1920's");
	//text
	busy1920Ann.append("text")
		.attr("class", "annotation-text")
		.attr("x", -annotationTextOfsset)
		.attr("y", busy1920Length + 25)
		.attr("dy", "1em")
		.style("text-anchor", "end")
		.text("The 1920 edition in Antwerp saw a large increase in the number of different events held. Never again could so many medals be won in archery, athletics, shooting, and sailing. " + 
			  "Shooting had 21 events for men. Thankfully no live birds have been used for more than 100 years.")
		.call(wrap, 225);

	////////////////////////////////////////////////////////////
	/////////////////// South Korea Archery ////////////////////
	////////////////////////////////////////////////////////////

	var archeryLength = -300;
	var archeryAnn = annotationGroup.append("g")
		.attr("class", "annotation ann-archery")
		.attr("transform", "translate(" + (circleLocations[2].x + timeScale(1996) * Math.cos(-22 * Math.PI/180)) + "," + 
										  (circleLocations[2].y + timeScale(1996) * Math.sin(-22 * Math.PI/180)) + ")");
	//line
	archeryAnn.append("rect")
		.attr("class", "annotation-line")
		.style("fill", "url(#annotation-gradient-Asia)")
		.attr("width", 1.5)
		.attr("x", -0.75)
		.attr("height", -archeryLength)
		.attr("y", archeryLength);
	//circle
	archeryAnn.append("circle")
		.attr("class", "annotation-circle")
		.attr("r", annotationRadius);
	//title
	archeryAnn.append("text")
		.attr("class", "annotation-text-title")
		.attr("x", annotationTextOfsset)
		.attr("y", archeryLength)
		.attr("dy", "1em")
		.style("fill", color("Asia"))
		.text("South-Korea's dominance");
	//text
	archeryAnn.append("text")
		.attr("class", "annotation-text")
		.attr("x", annotationTextOfsset)
		.attr("y", archeryLength + 25)
		.attr("dy", "1em")
		.text("During the last 9 Olympic Games all medals in the women's events have been won by South Korea and the South Korean men aren't doing to bad either.")
		.call(wrap, 200);

	////////////////////////////////////////////////////////////
	/////////////////// Amatuer wrestling ////////////////////
	////////////////////////////////////////////////////////////

	var wrestlingLength = -300;
	var wrestlingAnn = annotationGroup.append("g")
		.attr("class", "annotation ann-wrestling")
		.attr("transform", "translate(" + (circleLocations[4].x + timeScale(2018) * Math.cos(-112 * Math.PI/180)) + "," + 
										  (circleLocations[4].y + timeScale(2018) * Math.sin(-112 * Math.PI/180)) + ")");
	//line
	wrestlingAnn.append("rect")
		.attr("class", "annotation-line")
		.style("fill", "url(#annotation-gradient-Europe)")
		.attr("width", 1.5)
		.attr("x", -0.75)
		.attr("height", -wrestlingLength)
		.attr("y", wrestlingLength);
	//circle
	wrestlingAnn.append("circle")
		.attr("class", "annotation-circle")
		.attr("r", annotationRadius);
	//title
	wrestlingAnn.append("text")
		.attr("class", "annotation-text-title")
		.attr("x", annotationTextOfsset)
		.attr("y", wrestlingLength)
		.attr("dy", "1em")
		.style("fill", color("Europe"))
		.text("The last amateurs");
	//text
	wrestlingAnn.append("text")
		.attr("class", "annotation-text")
		.attr("x", annotationTextOfsset)
		.attr("y", wrestlingLength + 25)
		.attr("dy", "1em")
		.text("Wrestling is the last Olympic sport where the athletes still need to have an amateur " + 
			  "status, for the safety of the participants. Boxing also required an amateur status until, Rio 2016.")
		.call(wrap, 200);

	////////////////////////////////////////////////////////////
	//////////////////////// Cycling ////////////////////////////
	////////////////////////////////////////////////////////////

	var cyclingLength = 640;
	var cyclingAnn = annotationGroup.append("g")
		.attr("class", "annotation ann-cycling")
		.attr("transform", "translate(" + (circleLocations[1].x + timeScale(2006) * Math.cos(-165 * Math.PI/180)) + "," + 
										  (circleLocations[1].y + timeScale(2006) * Math.sin(-165 * Math.PI/180)) + ")");
	//line
	cyclingAnn.append("rect")
		.attr("class", "annotation-line")
		.attr("transform", "rotate(180)")
		.style("fill", "url(#annotation-gradient-Oceania)")
		.attr("width", 1.5)
		.attr("x", -0.75)
		.attr("height", cyclingLength)
		.attr("y", -cyclingLength);
	//circle
	cyclingAnn.append("circle")
		.attr("class", "annotation-circle")
		.attr("r", annotationRadius);
	//title
	cyclingAnn.append("text")
		.attr("class", "annotation-text-title")
		.attr("x", -annotationTextOfsset)
		.attr("y", cyclingLength - 120)
		.style("text-anchor", "end")
		.style("fill", color("Oceania"))
		.text("One edition's rule");
	//text
	cyclingAnn.append("text")
		.attr("class", "annotation-text")
		.attr("x", -annotationTextOfsset)
		.attr("y", cyclingLength -120 + 23)
		.attr("dy", "0em")
		.style("text-anchor", "end")
		.text("Although taking home half of the gold cycling track medals in 2004, Australia didn't get any gold 4 years later " +
			  " after Great Britain discovered its love for, and talents in track cycling.")
		.call(wrap, 180);

	////////////////////////////////////////////////////////////
	//////////////////////// Diving ////////////////////////////
	////////////////////////////////////////////////////////////

	var divingLength = 510;
	var divingAnn = annotationGroup.append("g")
		.attr("class", "annotation ann-diving")
		.attr("transform", "translate(" + (circleLocations[1].x + timeScale(1906) * Math.cos(-130 * Math.PI/180)) + "," + 
										  (circleLocations[1].y + timeScale(1906) * Math.sin(-130 * Math.PI/180)) + ")");
	//line
	divingAnn.append("rect")
		.attr("class", "annotation-line")
		.attr("transform", "rotate(180)")
		.style("fill", "url(#annotation-gradient-Americas)")
		.attr("width", 1.5)
		.attr("x", -0.75)
		.attr("height", divingLength)
		.attr("y", -divingLength);
	//circle
	divingAnn.append("circle")
		.attr("class", "annotation-circle")
		.attr("r", annotationRadius);
	//title
	divingAnn.append("text")
		.attr("class", "annotation-text-title")
		.attr("x", annotationTextOfsset)
		.attr("y", divingLength - 155)
		.attr("dy", "1em")
		.style("fill", color("Americas"))
		.text("The farthest dive");
	//text
	divingAnn.append("text")
		.attr("class", "annotation-text")
		.attr("x", annotationTextOfsset)
		.attr("y", divingLength -155 + 25)
		.attr("dy", "1em")
		.text("Diving’s very first event was 'Plunge for distance' in 1904. The winner was the competitor who " +
			  "remained underwater for the longest distance after an initial dive. Regarded as uninteresting, it did not reappear in any subsequent Olympic Games.")
		.call(wrap, 200);

	////////////////////////////////////////////////////////////
	///////////////////////// Ducks ////////////////////////////
	////////////////////////////////////////////////////////////

	var ducksLength = 410;
	var ducksAnn = annotationGroup.append("g")
		.attr("class", "annotation ann-phelps-1st")
		.attr("transform", "translate(" + (circleLocations[3].x + timeScale(1930) * Math.cos(155 * Math.PI/180)) + "," + 
										  (circleLocations[3].y + timeScale(1930) * Math.sin(155 * Math.PI/180)) + ")");
	//line
	ducksAnn.append("rect")
		.attr("class", "annotation-line")
		.attr("transform", "rotate(180)")
		.style("fill", "url(#annotation-gradient-Oceania)")
		.attr("width", 1.5)
		.attr("x", -0.75)
		.attr("height", ducksLength)
		.attr("y", -ducksLength);
	//circle
	ducksAnn.append("circle")
		.attr("class", "annotation-circle")
		.attr("r", annotationRadius);
	//title
	ducksAnn.append("text")
		.attr("class", "annotation-text-title")
		.attr("x", -annotationTextOfsset)
		.attr("y", ducksLength - 135)
		.attr("dy", "1em")
		.style("text-anchor", "end")
		.style("fill", color("Oceania"))
		.text("Stopping for ducks");
	//text
	ducksAnn.append("text")
		.attr("class", "annotation-text")
		.attr("x", -annotationTextOfsset)
		.attr("y", ducksLength -135 + 25)
		.attr("dy", "1em")
		.style("text-anchor", "end")
		.text("Henry Pearce stopped halfway through his quarter-final race to give way to a family of ducks passing in " + 
			  "front of his boat in 1928. Nevertheless, Pearch magaged to win gold in the end.")
		.call(wrap, 175);

	////////////////////////////////////////////////////////////
	///////////////////// Phelp's 1st Gold /////////////////////
	////////////////////////////////////////////////////////////

	var phelps1stLength = 700;
	var phelps1stAnn = annotationGroup.append("g")
		.attr("class", "annotation ann-phelps-1st")
		.attr("transform", "translate(" + (circleLocations[3].x + timeScale(2006) * Math.cos(-33 * Math.PI/180)) + "," + 
										  (circleLocations[3].y + timeScale(2006) * Math.sin(-33 * Math.PI/180)) + ")");
	//line
	phelps1stAnn.append("rect")
		.attr("class", "annotation-line")
		.attr("transform", "rotate(180)")
		.style("fill", "url(#annotation-gradient-Americas)")
		.attr("width", 1.5)
		.attr("x", -0.75)
		.attr("height", phelps1stLength)
		.attr("y", -phelps1stLength);
	//circle
	phelps1stAnn.append("circle")
		.attr("class", "annotation-circle")
		.attr("r", annotationRadius);
	//title
	phelps1stAnn.append("text")
		.attr("class", "annotation-text-title")
		.attr("x", -annotationTextOfsset)
		.attr("y", phelps1stLength - 175)
		.attr("dy", "1em")
		.style("text-anchor", "end")
		.style("fill", color("Americas"))
		.text("Phelps' 1st Gold");
	//text
	phelps1stAnn.append("text")
		.attr("class", "annotation-text")
		.attr("x", -annotationTextOfsset)
		.attr("y", phelps1stLength -175 + 25)
		.attr("dy", "1em")
		.style("text-anchor", "end")
		.text("Michael Phelps' first gold medal was won in the 400-meter individual medley in Athens, 2004. " + 
			  "Out of the 16 men's swimming events during those games, Phelp's took home 6 gold medals, of which 4 from individual races.")
		.call(wrap, 175);

}//createAnnotations

    //Global variables
	var cellType = "";
    var scoreProtein = [];	
	var scoreColorArray = [];
	var localizationColorArray = [];
	
	var roundedRightArray =[];
	
	var isNotOneProtein = false;
	
	var selectedcolorLoc="green";
	var selectedcolorScore="red";

	var cellPos = 0;

	var cellTypeArray = [
    "eukaryota",
    "bacteria",
    "archaea"    
    ]

	var eukaPos = 0;
	var bactPos = 0;
	var archPos = 0;
	
	var secondlineScore  = "";


	//18 cell compartments for Eukaryota
	var eukaryotaArray = [
      "chloroplast",
      "chloroplast membrane",
      "cytoplasm",
      "endoplasmic reticulum",
      "endoplasmic reticulum membrane",
      "secreted",
      "golgi apparatus",
      "golgi apparatus membrane",
      "mitochondrion",
      "mitochondrion membrane",
      "nucleus",
      "nucleus membrane",
      "peroxisome",
      "peroxisome membrane",
      "plastid",
      "plasma membrane",
      "vacuole",
      "vacuole membrane"
      ];

	//3 cell compartments for Archea
	var archeaArray = [
      "cytoplasm",
      "secreted",
      "plasma membrane"];

	//6 cell compartments for Bacteria
	var bacteriaArray = [
        "cytoplasm",
        "secreted",
        "fimbrium",
        "outer membrane",
        "periplasm",
        "inner membrane"
        ];
        	   
	    
    //Clear popup when moveout
    function ClearPopup() {
	    var popup = getPopupObject('linkPopup');
        popup.style.visibility = 'hidden';	
    }

    //To get id from element
    function getPopupObject(myId) {
        if (document.getElementById(myId)) {
            return document.getElementById(myId);
        }
        else {
            return window.document[myId];
        }
    }

    //Shown popup
    function mouseEventHandler(mEvent,cID,pID) {
	   
        // Internet Explorer	
        if (mEvent.srcElement) {
            showPopup(mEvent, 'linkPopup', mEvent.srcElement, cID,pID);
        }
        // Netscape and Firefox
        else if (mEvent.target) {
            showPopup(mEvent, 'linkPopup', mEvent.target, cID,pID);
        }
    } 
	
	//Showing score with little popup
	function showHighlightScore(proteinID)
	{	 	
			
		ClearPopup();	 
		selectCellPicture();		

        scoreColorArray=definedColorScore(secondlineScore);	
		
		 for (var i = 0; i < scoreColorArray.length; i++) {
		          
		          var highlightColor = scoreColorArray[i];
		 	 	  if(proteinID == highlightColor.proteinID)
			 	  {		
				  	 	                       	  		
				  	  highlightCompartments(highlightColor.proteinID, highlightColor.proteinLocalization,highlightColor.scoreColor);		
				  }		  
			 }	
			 
		//Header
       	writeHeader('headerPP',proteinID);			
		isNotOneProtein = false;	
		
	} 
	
	//Select a color for localization		
	function getDropdownListSelectedColorLoc() {	
	var e = document.getElementById("ddlColorLoc");
	selectedcolorLoc = e.options[e.selectedIndex].value;	
   }
      
   //Select a color for score	
	function getDropdownListSelectedColorScore() {	
	var e = document.getElementById("ddlColorScore");
	selectedcolorScore = e.options[e.selectedIndex].value;	
   }
	
	
	function writeHeader(objectName,proteinID)
	{
	 	var divHeader = getPopupObject(objectName);
		while (divHeader.hasChildNodes()) {
			  divHeader.removeChild(divHeader.firstChild);
        }		
              var addHeader = document.createElement("h2");
			     if(proteinID == "")
				 {
				     addHeader.innerHTML = "Cell Type : "+ cellType;
				 }
				 else
				 {
                  	 addHeader.innerHTML = "Cell Type : "+ cellType + " , Protein ID : " + proteinID;
				 } 
                  divHeader.appendChild(addHeader);
	}
	//cID = protein localization,pID = proteinID
    function showPopup(myEvent, id, myElement,cID,pID) {
        var popup = getPopupObject(id);
        if (popup) {

            popup.style.visibility = 'hidden';
            var x = myEvent.clientX;
            var y = myEvent.clientY;
			
            x = parseInt(myEvent.clientX + document.body.scrollLeft);
            y = parseInt(myEvent.clientY + document.body.scrollTop);			
            
			var headerPopup = getPopupObject('popHeader');
			var detailPopup = getPopupObject('popDetail');

            //Remove all children before append
            while (detailPopup.hasChildNodes()) {
                
                  detailPopup.removeChild(detailPopup.firstChild);
            }	
			
			//Remove all children before append
                 while (headerPopup.hasChildNodes()) {                
                  	  headerPopup.removeChild(headerPopup.firstChild);
               }				 	
					var isHeader = true;								
					for (var i = 0; i < scoreProtein.length; i++) {                  					 
							var scorePT =  scoreProtein[i];							    
						 	         //Showing protein popup
								 	 if(isNotOneProtein)
									 {		
									 		if (cID == scorePT.proteinLocalization)
									 			{		
														
													if(isHeader)
													{																
																										      
        												   //Header
                                                			var rowHeaderProtein = document.createElement("tr");
                                                            rowHeaderProtein.setAttribute("id", "rowHeaderProtein" + i);
                                                            var columnHeaderProtein = document.createElement("td");
                                                            columnHeaderProtein.setAttribute("id", "columnHeaderProtein" + i);					
                                                            //var innerHeaderTag = document.createElement("p");
                                                            //innerHeaderTag.setAttribute("id", "innerHeaderTag" + i);                              				    					
                                                            columnHeaderProtein.innerHTML = "<b>Localization = " + scorePT.proteinLocalization + "<br/>Protein ID : Score<br/> </b>";
                                                                                					
                                                            //columnHeaderProtein.appendChild(innerHeaderTag);                  
                                                            rowHeaderProtein.appendChild(columnHeaderProtein);
                                                            headerPopup.appendChild(rowHeaderProtein);	
															isHeader = false;
													}	
												
												
													
													//Detail												                                                
                                                    var rowProtein = document.createElement("tr");
                                                    rowProtein.setAttribute("id", "rowProtein" + i);
                                                    var columnProtein = document.createElement("td");
                                                    columnProtein.setAttribute("id", "columnProtein" + i);					
                                					var innerTag = document.createElement("span");
                                					innerTag.setAttribute("id", "innnerText" + i);				
    																					
                                				    innerTag.setAttribute("onClick", "javaScript:showHighlightScore('"+scorePT.proteinID+"');");						
                                					innerTag.innerHTML = "<a href='#'>" + scorePT.proteinID + ":<b>" + scorePT.proteinScore+"</b></a>";
													                                					
                                					columnProtein.appendChild(innerTag);                  
                                					rowProtein.appendChild(columnProtein);
                                                    detailPopup.appendChild(rowProtein);		   
										   
                                  				 }
									 }
									else {
                                     //Showing score popup
									  	if ((pID == scorePT.proteinID) && (cID == scorePT.proteinLocalization))	    						
    									    {												     					 
									 		 	 drawPopupScore(scorePT.proteinScore,detailPopup);						  
                						    	 break;		
											}							 	
									  }				 
                  					 
                	}               				 			
        						
					
            popup.style.left = x;
            popup.style.top = y;			
            popup.style.visibility = 'visible';
			
        }
    }
	
	
	function drawPopupScore(proteinScore,detailPopup)
	{
	 		 var rowProtein = document.createElement("tr");
                 rowProtein.setAttribute("id", "rowProtein0");
             var columnProtein = document.createElement("td");
                 columnProtein.setAttribute("id", "columnProtein0");				
                 columnProtein.innerHTML = "<p class='oneProtein' onmouseout='javaScript:ClearPopup();' >" + proteinScore + "</p>";
                 rowProtein.appendChild(columnProtein);
                 detailPopup.appendChild(rowProtein);
	
	}
	
	function drawTableDescription(proteinID)
	{			 
			//To clear all children
			var divTableLoc = getPopupObject('tdTblDescriptionLoc');
        		  	  while (divTableLoc.hasChildNodes()) {
			  		  		divTableLoc.removeChild(divTableLoc.firstChild);
					  }
			 divTableLoc.style.visibility = 'hidden';
			 var divTableScore = getPopupObject('tdTblDescriptionScore');
        		  	  while (divTableScore.hasChildNodes()) {
			  		  		divTableScore.removeChild(divTableScore.firstChild);
					  }
			 divTableScore.style.visibility = 'hidden';
			  var divbtnBack = getPopupObject('btnBack');
				 while (divbtnBack.hasChildNodes()) {
			  	 	  		divbtnBack.removeChild(divbtnBack.firstChild);
				 	  }
			 
			  if(proteinID != "")
			  {
			     //To create go back botton
			    
				divbtnBack.innerHTML = "<label style='float:left;'>Go back to localization visualization </label><input style='float:left;' type='submit' value='Go Back' onclick = \"main();\">";
			    
			     var strScoreTable = "";
			     strScoreTable += "<table><tr><td>Localization</td><td>Score</td><td>%</td></tr>";
					 					 
					 for (var i = 0; i < scoreColorArray.length; i++) {
		          	 	  var scoreColor = scoreColorArray[i];
						  
						  if(proteinID==scoreColor.proteinID)
						  {						   									 
						      strScoreTable += "<tr><td>" + scoreColor.proteinLocalization + "</td><td class='adjustRight'>" + scoreColor.proteinScore + "</td><td class='adjustRight'>" + scoreColor.percentScore + "</td></tr>";
						  }						  
						  
				     }
					 
					 strScoreTable += "</table>"; 
			     divTableScore.innerHTML = strScoreTable;
				 divTableScore.style.visibility = 'visible';						 
			  }
			  else
			  {
			     var strLocTable = "";
			     strLocTable += "<table><tr><td>Localization</td><td>#proteins</td><td>%</td></tr>";
					 					 
					 for (var i = 0; i < localizationColorArray.length; i++) {
		          	 	  var LocColor = localizationColorArray[i];
						  var locNbr = LocColor.numberProtein;
						  
						  if(LocColor.numberProtein != 0)
						  {
						   strLocTable += "<tr><td>" + LocColor.proteinLocalization + "</td><td class='adjustRight'>" + locNbr + "</td><td class='adjustRight'>" + locPercent + "</td></tr>";
						  }
				     }
				 strLocTable += "</table>"; 
			     divTableLoc.innerHTML = strLocTable;
				 divTableLoc.style.visibility = 'visible';
			  }
			  
	}
	
	
	function drawCaptionColor(proteinID)
	{
			//To clear all captions
			var divCaptionLoc = getPopupObject('localization');
        		  	  while (divCaptionLoc.hasChildNodes()) {
			  		  		divCaptionLoc.removeChild(divCaptionLoc.firstChild);
					  }
			 var divCaptionScore = getPopupObject('score');
        		  	  while (divCaptionScore.hasChildNodes()) {
			  		  		divCaptionScore.removeChild(divCaptionScore.firstChild);
					  }				  
			  
			//Color arrays
			  
			//Blue - 0
			var blue_colorArray=["#EBEBE0","#D6E0EB","#C2D1E0","#ADC2D6","#99B2CC","#85A3C2","#5C85AD","#336699","#29527A","#1F3D5C"];

			//Green - 1
		    var green_colorArray=["#E8F4E9","#D7FCDC","#B9FAC3","#96F6A5","#76E687","#4DCB60","#379745","#167023","#045310","#003F0A"];
	
			//Lila - 2
			var lila_colorArray=["#FAE6FA","#F5CCF5","#F0B2F0","#EB99EB","#E680E6","#E066E0","#D633D6","#B800B8","#8F008F","#660066"];
		
			//Red - 3
			var red_colorArray=["#FAE6E6","#F5CCCC","#F0B2B2","#EB9999","#E68080","#E06666","#D63333","#CC0000","#A30000","#7A0000"];
		
		
			  //Showing Score caption
			  if(proteinID != "")
			  {
							
					var colorScoreArray_caption = [];				
					

					if(selectedcolorScore  == "blue"){
						colorScoreArray_caption = blue_colorArray.slice(0);
					}
					else if (selectedcolorScore  == "green"){
						colorScoreArray_caption = green_colorArray.slice(0); 
					}
					else if (selectedcolorScore  == "lila"){
						colorScoreArray_caption = lila_colorArray.slice(0); 
					}
					else if (selectedcolorScore == "red"){
						colorScoreArray_caption = red_colorArray.slice(0); 						
					}
					else{
						//Red
						var red_colorArray=["#FAE6E6","#F5CCCC","#F0B2B2","#EB9999","#E68080","#E06666","#D63333","#CC0000","#A30000","#7A0000"];
					}
			  
			  
					var scoreColors="";
					for (var i = 0; i < colorScoreArray_caption.length; i++) {
						scoreColors = scoreColors + "<td bgcolor='"+colorScoreArray_caption[i]+"' height='5' width='20'></td>";
						
					}
			         
					   divCaptionScore.innerHTML = "<table><tr><td colspan='22' height='5' width='20'><span style='font-weight:bold;font-family:tahoma'><font size='2'>Score: </font></span></td></tr>"                     
					  
                      + "<tr><td bgcolor='#151717' height='5' width='20'><font size='2'>Min</font></td><td bgcolor='#ffffff' height='5' width='20'></td>" + scoreColors	+ "<td height='5' width='18'><font size='2'>Max</font></td></tr>"			  					   						
					  + "<tr>"					   
                        + "<td></td>"   
						+ "<td bgcolor='#151717' height='5' width='20'><font size='2'>0</font></td>"
                    	+ "<td bgcolor='#151717' height='5' width='20'><font size='2'>10</font></td>"
                    	+ "<td bgcolor='#151717' height='5' width='20'><font size='2'>20</font></td>"
                    	+ "<td bgcolor='#151717' height='5' width='20'><font size='2'>30</font></td>"
                    	+ "<td bgcolor='#151717' height='5' width='20'><font size='2'>40</font></td>"
                    	+ "<td bgcolor='#151717' height='5' width='20'><font size='2'>50</font></td>"
                    	+ "<td bgcolor='#151717' height='5' width='20'><font size='2'>60</font></td>"
                    	+ "<td bgcolor='#151717' height='5' width='20'><font size='2'>70</font></td>"
                    	+ "<td bgcolor='#151717' height='5' width='20'><font size='2'>80</font></td>"
                    	+ "<td bgcolor='#151717' height='5' width='20'><font size='2'>90</font></td>"
                    	+ "<td bgcolor='#151717' height='5' width='20'><font size='2'>100</font></td>"
                       
						+ "<td><font size='2'>%</font></td>"                    	
                      + "</tr>"
					  
					+ "</table>";
					  
        	  }
			  
			  else
			  {
			   	 //Showing Localization caption 
					
		            var colorLocalizationArray_caption=[];
					
					if(selectedcolorLoc == "blue"){
						colorLocalizationArray_caption = blue_colorArray.slice(0);
					}
					else if (selectedcolorLoc == "green"){
						colorLocalizationArray_caption = green_colorArray.slice(0); 
					}
					else if (selectedcolorLoc == "lila"){
						colorLocalizationArray_caption = lila_colorArray.slice(0); 
					}
					else if (selectedcolorLoc == "red"){
						colorLocalizationArray_caption = red_colorArray.slice(0); 
					}
					else{
					//Green 
						colorLocalizationArray_caption=["#E8F4E9","#D7FCDC","#B9FAC3","#96F6A5","#76E687","#4DCB60","#379745","#167023","#045310","#003F0A"];
					}
								 			 
					 
					var locColors="";
					for (var i = 0; i < colorLocalizationArray_caption.length; i++) {
						locColors = locColors + "<td bgcolor='"+colorLocalizationArray_caption[i]+"' height='5' width='20'></td>";
					}
					 
					 
					//Print size class in percentages					
					
					var locPercentages="";
					for (var i = 0; i < roundedRightArray.length; i++) {
						locPercentages = locPercentages + "<td bgcolor='#151717' height='5' width='20'><span style='font-family:tahoma;'><font size='2'>"+roundedRightArray[i]+"</font></span></td>";
					}			
					 divCaptionLoc.innerHTML = "<table><tr><td colspan='22' height='5' width='20'><span style='font-weight:bold;font-family:tahoma'><font size='2'>Localization: </font></span></td></tr>"                     
                      + "<tr><td height='5' width='20'><font size='2'>Min</font></td></td><td bgcolor='#ffffff' height='5' width='20'></td>" + locColors	+ "<td height='5' width='18'><font size='2'>Max</font></td></tr>"			  					   
					  + "<tr><td height='5' width='20'></td><td bgcolor='#151717' height='5' width='20'><font size='2'>0</font></td>" + locPercentages + "<td><font size='2'>%</font></td></tr>"                      
                      + "</table>"; 
			  }	        
	
	}
	
    function highlightCompartments(proteinID, proteinLocalization,colorCellCompartment) {	
	
	    drawCaptionColor(proteinID);
		drawTableDescription(proteinID);

	    if (cellType == cellTypeArray[cellPos]) {

	        if (proteinLocalization == eukaryotaArray[eukaPos]) {

	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "chloroplast_euka")
				  .attr("fill", colorCellCompartment)
				  .attr("d", "M 180.25,115.50 "
           + "C 180.08,114.21 207.61,114.28 207.50,115.00 "
             + "207.50,115.00 222.00,117.75 222.00,117.75 "
             + "223.08,117.30 231.42,122.85 229.25,123.75 "
             + "229.25,123.75 230.75,129.25 230.75,129.25 "
             + "230.75,129.25 223.25,135.00 223.25,135.00 "
             + "223.25,135.00 207.25,141.25 207.25,141.25 "
             + "207.25,141.25 186.00,143.75 186.00,143.75 "
             + "186.00,143.75 174.50,143.50 174.50,143.50 "
             + "174.50,143.50 165.75,141.00 165.75,141.00 "
             + "165.75,141.00 161.25,137.50 161.25,137.50 "
             + "161.25,137.50 159.00,134.25 159.00,134.25 "
             + "159.00,134.25 158.75,130.50 158.75,130.50 "
             + "158.75,130.50 160.50,126.25 160.50,126.25 "
             + "160.50,126.25 163.50,122.50 163.50,122.50 "
             + "163.50,122.50 166.75,119.25 166.75,119.25 "
             + "166.75,119.25 171.50,117.50 171.50,117.50 "
             + "171.50,117.50 176.25,115.75 176.25,115.75 Z")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");

	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 1]) {
	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "chlorMem_euka")
				  .attr("fill", "none")
				  .attr("stroke", colorCellCompartment)
				  .attr("stroke-width", "3")
				  .attr("d", "M 180.25,115.50 "
           + "C 180.08,114.21 207.61,114.28 207.50,115.00 "
             + "207.50,115.00 222.00,117.75 222.00,117.75 "
             + "223.08,117.30 231.42,122.85 229.25,123.75 "
             + "229.25,123.75 230.75,129.25 230.75,129.25 "
             + "230.75,129.25 223.25,135.00 223.25,135.00 "
             + "223.25,135.00 207.25,141.25 207.25,141.25 "
             + "207.25,141.25 186.00,143.75 186.00,143.75 "
             + "186.00,143.75 174.50,143.50 174.50,143.50 "
             + "174.50,143.50 165.75,141.00 165.75,141.00 "
             + "165.75,141.00 161.25,137.50 161.25,137.50 "
             + "161.25,137.50 159.00,134.25 159.00,134.25 "
             + "159.00,134.25 158.75,130.50 158.75,130.50 "
             + "158.75,130.50 160.50,126.25 160.50,126.25 "
             + "160.50,126.25 163.50,122.50 163.50,122.50 "
             + "163.50,122.50 166.75,119.25 166.75,119.25 "
             + "166.75,119.25 171.50,117.50 171.50,117.50 "
             + "171.50,117.50 176.25,115.75 176.25,115.75 Z")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");


	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 2]) {
	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "cytosol_euka")
				  .attr("fill", colorCellCompartment)
				  .attr("d", "M 237.00,103.21 "
           + "C 237.00,103.21 254.00,104.00 254.00,104.00 "
             + "292.05,104.06 320.17,102.63 358.00,112.13 "
             + "373.51,116.02 390.30,121.51 403.00,131.52 "
             + "424.69,148.60 439.19,185.64 423.53,211.00 "
             + "419.75,217.13 413.87,221.62 408.00,225.65 "
             + "386.74,240.25 365.96,244.95 341.00,249.08 "
             + "329.78,250.94 318.39,252.94 307.00,253.00 "
             + "307.00,253.00 291.00,254.00 291.00,254.00 "
             + "291.00,254.00 211.00,254.00 211.00,254.00 "
             + "211.00,254.00 180.00,251.17 180.00,251.17 "
             + "158.26,248.99 131.10,245.51 112.00,234.57 "
             + "101.09,228.33 88.57,219.33 82.63,208.00 "
             + "79.96,202.90 76.78,193.72 76.17,188.00 "
             + "75.40,180.75 77.24,172.00 79.15,165.00 "
             + "84.12,146.84 91.38,131.78 108.00,121.47 "
             + "126.87,109.76 150.29,106.43 172.00,104.91 "
             + "172.00,104.91 184.00,104.00 184.00,104.00 "
             + "189.21,103.99 192.75,104.17 198.00,103.21 "
             + "198.00,103.21 237.00,103.21 237.00,103.21 Z "
           + "M 162.13,121.47 "
           + "C 155.87,127.28 156.66,137.39 164.02,142.00 "
             + "168.33,144.70 175.90,145.30 181.00,145.68 "
             + "190.06,146.36 214.18,141.83 222.00,137.24 "
             + "226.52,134.59 232.43,131.15 231.19,125.00 "
             + "230.10,119.63 224.65,117.34 220.00,115.70 "
             + "212.73,113.13 192.17,113.52 184.00,114.28 "
             + "175.79,115.47 168.68,115.39 162.13,121.47 Z "
           + "M 315.00,123.64 "
           + "C 313.34,124.84 311.71,126.35 310.51,128.02 "
             + "300.26,142.23 325.59,152.88 326.98,164.00 "
             + "327.79,170.52 318.15,175.30 315.64,184.00 "
             + "314.20,188.98 314.10,195.85 321.00,195.35 "
             + "327.55,194.88 342.00,189.58 348.00,186.63 "
             + "348.00,186.63 360.00,180.17 360.00,180.17 "
             + "364.29,178.29 372.34,175.96 377.00,174.89 "
             + "377.00,174.89 394.72,172.40 394.72,172.40 "
             + "395.93,171.84 396.58,171.09 397.07,169.85 "
             + "400.32,161.73 390.58,151.04 385.00,146.46 "
             + "375.47,138.65 368.31,136.07 358.00,130.60 "
             + "344.98,123.69 347.84,122.45 331.83,121.09 "
             + "327.54,120.73 326.65,119.97 322.00,120.40 "
             + "319.21,121.22 317.41,121.90 315.00,123.64 Z "
           + "M 298.26,164.91 "
           + "C 302.30,158.90 298.00,148.53 292.96,144.39 "
             + "284.98,137.83 269.92,137.59 260.00,136.91 "
             + "260.00,136.91 248.00,136.01 248.00,136.01 "
             + "242.49,136.14 231.56,138.10 227.04,141.13 "
             + "220.92,145.24 217.87,154.45 222.15,160.91 "
             + "227.67,169.26 244.44,173.56 254.00,174.00 "
             + "244.83,184.57 237.06,170.07 229.02,170.28 "
             + "223.35,170.42 222.34,177.54 230.02,180.87 "
             + "234.74,182.92 235.87,181.93 240.00,186.00 "
             + "240.00,186.00 224.00,181.00 224.00,181.00 "
             + "224.26,183.27 224.31,184.84 225.74,186.79 "
             + "229.88,192.46 244.26,195.35 251.00,196.15 "
             + "253.99,196.51 261.87,198.43 263.34,194.70 "
             + "265.98,188.05 253.57,189.49 251.11,188.84 "
             + "249.37,188.39 249.27,188.00 248.00,187.00 "
             + "248.00,187.00 265.00,188.00 265.00,188.00 "
             + "267.95,187.96 275.29,187.34 271.96,182.31 "
             + "270.09,179.49 266.72,181.09 264.04,180.48 "
             + "260.76,179.74 260.03,177.84 259.00,175.00 "
             + "264.08,174.89 270.76,173.08 274.13,178.14 "
             + "276.67,181.95 274.11,185.98 277.33,187.64 "
             + "279.66,188.85 283.77,186.92 286.00,185.99 "
             + "295.28,182.08 299.90,179.41 300.00,169.00 "
             + "289.02,171.24 286.33,181.20 281.00,173.00 "
             + "287.18,172.70 294.62,170.33 298.26,164.91 Z "
           + "M 96.15,156.01 "
           + "C 87.32,162.23 101.20,171.81 104.20,177.04 "
             + "108.55,184.63 108.08,188.95 115.04,197.91 "
             + "117.58,201.18 119.86,202.53 123.00,205.09 "
             + "136.23,215.89 137.47,215.60 153.00,221.99 "
             + "158.24,224.15 167.51,227.42 173.00,228.32 "
             + "175.14,228.67 180.87,228.19 178.83,224.57 "
             + "177.92,222.94 173.75,222.32 172.00,221.85 "
             + "166.41,220.34 158.20,217.87 153.00,215.56 "
             + "132.62,206.53 123.13,199.90 114.15,179.00 "
             + "112.56,175.29 110.99,171.97 110.04,168.00 "
             + "108.30,160.75 110.38,153.56 100.00,154.41 "
             + "98.45,154.90 97.57,155.00 96.15,156.01 Z "
           + "M 121.73,157.43 "
           + "C 119.88,154.23 113.61,154.82 111.74,159.13 "
             + "109.51,164.28 114.70,178.93 117.03,184.00 "
             + "121.89,194.61 134.26,206.16 145.00,210.65 "
             + "145.00,210.65 154.00,213.44 154.00,213.44 "
             + "161.19,216.00 160.90,216.46 169.00,218.21 "
             + "178.08,220.18 182.79,222.83 192.00,219.00 "
             + "191.60,217.31 191.27,215.61 190.44,214.06 "
             + "186.03,205.77 180.05,214.22 170.00,211.83 "
             + "163.27,210.23 145.46,202.28 140.00,198.37 "
             + "136.60,195.93 130.21,189.31 127.44,186.00 "
             + "122.13,179.67 117.25,173.26 121.00,165.00 "
             + "121.01,167.69 120.89,170.39 121.63,173.00 "
             + "124.00,181.32 132.31,191.85 139.17,196.90 "
             + "148.10,203.47 166.76,210.61 178.00,209.96 "
             + "180.84,209.79 186.18,208.32 182.58,204.63 "
             + "178.98,200.95 171.70,202.47 167.00,201.68 "
             + "161.35,200.73 152.71,195.74 148.00,192.43 "
             + "143.79,189.48 132.39,178.50 130.86,174.00 "
             + "129.17,169.62 133.24,165.95 130.86,162.43 "
             + "128.02,157.89 123.53,161.42 121.00,164.00 "
             + "121.80,161.96 122.98,159.58 121.73,157.43 Z "
           + "M 152.10,176.67 "
           + "C 158.84,182.84 169.31,184.07 178.00,182.38 "
             + "187.71,180.50 192.97,170.80 184.81,163.76 "
             + "177.35,157.32 165.59,155.09 156.00,156.39 "
            + "145.47,159.80 144.27,169.51 152.10,176.67 Z "
           + "M 254.98,205.88 "
           + "C 258.09,205.60 261.87,202.83 258.40,200.01 "
             + "256.73,198.66 248.57,198.03 246.00,197.54 "
             + "239.42,196.28 231.56,192.89 226.09,189.04 "
             + "223.05,186.90 219.16,182.14 217.13,179.00 "
             + "215.86,177.05 214.22,173.02 211.87,172.34 "
             + "208.57,171.37 206.48,175.33 206.16,178.00 "
             + "204.70,190.48 221.35,192.00 226.00,200.00 "
             + "219.61,198.13 219.34,196.59 216.00,195.33 "
             + "210.92,193.41 209.16,197.78 212.43,201.82 "
             + "216.16,206.41 233.86,215.84 239.58,211.98 "
             + "241.21,210.88 241.38,209.67 242.00,208.00 "
             + "242.00,208.00 237.00,203.00 237.00,203.00 "
             + "237.00,203.00 254.98,205.88 254.98,205.88 Z "
           + "M 91.73,183.34 "
           + "C 94.58,182.31 97.09,175.65 90.09,174.66 "
             + "83.04,177.33 87.12,185.02 91.73,183.34 Z "
           + "M 106.26,185.00 "
           + "C 103.72,179.79 104.12,176.07 98.00,175.00 "
             + "98.16,181.92 103.67,197.57 110.17,200.89 "
             + "112.16,201.76 113.04,201.33 115.00,200.89 "
             + "115.00,200.89 106.26,185.00 106.26,185.00 Z "
           + "M 302.98,194.56 "
           + "C 306.23,192.38 308.72,190.23 308.84,186.02 "
             + "308.88,184.22 308.31,181.62 306.04,181.61 "
             + "302.81,181.59 302.02,186.50 294.99,191.56 "
             + "289.21,195.72 282.94,197.70 276.00,198.92 "
             + "273.65,199.33 265.74,200.07 264.31,201.02 "
             + "261.91,202.63 262.09,205.46 262.00,208.00 "
             + "262.00,208.00 285.00,205.00 285.00,205.00 "
             + "285.00,205.00 285.00,207.00 285.00,207.00 "
             + "281.79,208.07 274.77,209.97 273.40,213.31 "
             + "271.25,218.56 279.34,217.89 282.00,217.33 "
             + "289.95,215.65 306.45,207.96 309.12,200.00 "
             + "310.09,197.61 309.59,196.29 309.12,194.00 "
             + "309.12,194.00 293.00,204.00 293.00,204.00 "
             + "293.00,204.00 292.00,203.00 292.00,203.00 "
             + "296.39,198.10 297.88,197.99 302.98,194.56 Z "
           + "M 282.00,189.56 "
           + "C 275.06,191.68 271.62,190.52 269.15,191.60 "
             + "266.50,192.75 266.42,194.51 266.00,196.81 "
             + "269.11,197.00 276.34,197.19 279.00,196.81 "
             + "284.78,195.36 296.01,188.50 301.00,185.00 "
             + "301.00,185.00 301.00,183.00 301.00,183.00 "
             + "293.38,181.55 289.27,187.33 282.00,189.56 Z "
           + "M 358.00,203.69 "
           + "C 351.80,207.10 344.17,209.51 339.10,214.30 "
             + "329.10,223.75 337.85,232.74 349.00,232.82 "
             + "355.12,232.86 362.63,229.44 368.00,226.75 "
             + "380.13,220.69 386.85,217.43 396.94,207.72 "
             + "399.66,205.10 400.53,203.71 401.22,200.00 "
             + "402.84,191.31 396.36,188.89 389.00,188.46 "
             + "378.17,189.47 367.44,198.50 358.00,203.69 Z "
           + "M 110.09,203.00 "
           + "C 105.65,198.21 104.40,193.44 98.00,192.00 "
             + "98.43,194.32 98.97,197.93 99.92,200.00 "
             + "103.06,206.88 114.59,216.48 121.00,220.66 "
             + "125.84,223.81 130.08,227.26 136.00,226.00 "
             + "136.00,226.00 131.00,220.00 131.00,220.00 "
             + "138.59,225.36 145.10,228.14 154.00,230.82 "
             + "156.10,231.45 162.62,232.75 161.26,228.22 "
             + "160.40,225.36 151.79,223.27 149.00,222.19 "
             + "141.98,219.47 135.05,215.73 129.00,211.24 "
             + "123.24,206.96 122.35,204.17 115.00,202.00 "
             + "117.25,211.45 122.95,213.88 130.00,220.00 "
             + "121.45,213.17 118.07,211.61 110.09,203.00 Z "
           + "M 248.06,216.26 "
           + "C 251.69,217.80 261.06,218.09 264.96,216.94 "
             + "267.34,216.24 271.20,213.59 268.22,210.99 "
             + "266.89,209.83 263.69,210.01 262.00,210.00 "
             + "262.00,210.00 247.15,208.90 247.15,208.90 "
             + "243.19,211.17 244.09,214.58 248.06,216.26 Z "
           + "M 183.17,226.57 "
           + "C 180.79,230.83 190.44,232.86 194.98,231.69 "
             + "200.28,230.31 202.96,221.91 194.00,222.40 "
             + "191.99,222.91 184.06,224.96 183.17,226.57 Z "
           + "M 264.43,226.84 "
           + "C 259.72,230.86 262.01,241.62 275.00,241.98 "
             + "278.11,242.07 282.19,242.22 284.77,240.26 "
             + "290.04,236.28 287.84,228.95 282.96,225.74 "
             + "279.52,223.47 274.89,223.90 271.00,224.32 "
             + "268.77,224.83 266.23,225.31 264.43,226.84 Z "
           + "M 161.00,236.76 "
           + "C 165.29,243.24 170.06,233.43 162.94,233.46 "
             + "162.94,233.46 160.00,234.00 160.00,234.00 "
             + "160.31,234.99 160.27,235.66 161.00,236.76 Z")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");

	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 3]) {

	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "endoplas_euka")
				  .attr("fill", colorCellCompartment)
				  .attr("d", "M 266.00,201.00 "
           + "C 266.00,201.00 270.50,199.75 270.50,199.75 "
             + "270.50,199.75 275.25,199.75 275.25,199.75 "
             + "275.25,199.75 280.00,198.50 280.00,198.50 "
             + "280.00,198.50 284.75,198.25 284.75,198.25 "
             + "284.75,198.25 289.00,195.50 289.00,195.50 "
             + "289.00,195.50 294.25,193.00 294.25,193.00 "
             + "294.25,193.00 297.50,190.75 297.50,190.75 "
             + "297.50,190.75 301.00,187.75 301.00,187.75 "
             + "301.00,187.75 303.00,185.25 303.00,185.25 "
             + "303.00,185.25 304.50,181.25 304.50,181.25 "
             + "304.50,181.25 307.50,181.50 307.50,181.50 "
             + "307.50,181.50 308.75,183.00 308.75,183.00 "
             + "308.75,183.00 308.75,185.50 308.75,185.50 "
             + "308.75,185.50 308.75,187.75 308.75,187.75 "
             + "308.75,187.75 307.50,190.00 307.50,190.00 "
             + "307.50,190.00 305.00,191.50 305.00,191.50 "
             + "305.00,191.50 302.50,193.75 302.50,193.75 "
             + "302.50,193.75 300.00,195.50 300.00,195.50 "
             + "300.00,195.50 296.75,197.50 296.75,197.50 "
             + "296.75,197.50 294.25,199.75 294.25,199.75 "
             + "294.25,199.75 291.75,201.50 291.75,201.50 "
             + "291.75,201.50 292.25,204.00 292.25,204.00 "
             + "292.25,204.00 295.25,204.50 295.25,204.50 "
             + "295.25,204.50 297.75,202.50 297.75,202.50 "
             + "297.75,202.50 301.50,199.50 301.50,199.50 "
             + "301.50,199.50 304.75,196.00 304.75,196.00 "
             + "304.75,196.00 307.00,194.25 307.00,194.25 "
             + "307.00,194.25 309.50,194.75 309.50,194.75 "
             + "309.50,194.75 310.75,197.25 310.75,197.25 "
             + "310.75,197.25 309.50,199.25 309.50,199.25 "
             + "309.50,199.25 307.25,203.00 307.25,203.00 "
             + "307.25,203.00 303.00,207.00 303.00,207.00 "
             + "303.00,207.00 298.50,209.75 298.50,209.75 "
             + "298.50,209.75 293.50,212.25 293.50,212.25 "
             + "293.50,212.25 286.75,215.75 286.75,215.75 "
             + "286.75,215.75 282.50,217.50 282.50,217.50 "
             + "282.50,217.50 279.25,218.50 279.25,218.50 "
             + "279.25,218.50 276.25,217.50 276.25,217.50 "
             + "276.25,217.50 273.75,216.25 273.75,216.25 "
             + "273.75,216.25 273.75,213.75 273.75,213.75 "
             + "273.75,213.75 275.75,212.00 275.75,212.00 "
             + "275.75,212.00 278.50,210.50 278.50,210.50 "
             + "278.50,210.50 282.00,208.75 282.00,208.75 "
             + "282.00,208.75 285.25,207.50 285.25,207.50 "
             + "285.25,207.50 285.25,205.50 285.25,205.50 "
             + "285.25,205.50 284.25,204.00 284.25,204.00 "
             + "284.25,204.00 281.75,203.50 281.75,203.50 "
             + "281.75,203.50 278.50,204.00 278.50,204.00 "
             + "278.50,204.00 275.00,205.50 275.00,205.50 "
             + "275.00,205.50 270.75,207.00 270.75,207.00 "
             + "270.75,207.00 266.50,207.50 266.50,207.50 "
             + "266.50,207.50 263.50,207.25 263.50,207.25 "
             + "263.50,207.25 262.25,204.25 262.25,204.25 "
             + "262.25,204.25 263.50,202.00 263.50,202.00Z M 270.75,191.50 "
           + "C 270.75,191.50 275.00,191.25 275.00,191.25 "
             + "275.00,191.25 279.25,190.75 279.25,190.75 "
             + "279.25,190.75 282.50,189.50 282.50,189.50 "
             + "282.50,189.50 287.50,187.50 287.50,187.50 "
             + "287.50,187.50 291.25,185.25 291.25,185.25 "
             + "291.25,185.25 295.00,182.75 295.00,182.75 "
             + "295.00,182.75 298.25,182.75 298.25,182.75 "
             + "298.25,182.75 300.25,183.50 300.25,183.50 "
             + "300.25,183.50 298.50,185.75 298.50,185.75 "
             + "298.50,185.75 295.50,188.50 295.50,188.50 "
             + "295.50,188.50 292.25,190.50 292.25,190.50 "
             + "292.25,190.50 286.50,193.75 286.50,193.75 "
             + "286.50,193.75 280.50,196.25 280.50,196.25 "
             + "280.50,196.25 276.50,197.00 276.50,197.00 "
             + "276.50,197.00 271.25,197.00 271.25,197.00 "
             + "271.25,197.00 267.50,196.50 267.50,196.50 "
             + "267.50,196.50 266.00,194.50 266.00,194.50 "
             + "266.00,194.50 267.00,191.50 267.00,191.50Z M 249.50,209.50 "
           + "C 249.50,209.50 253.75,209.50 253.75,209.50 "
             + "253.75,209.50 257.00,210.00 257.00,210.00 "
             + "257.00,210.00 260.50,210.00 260.50,210.00 "
             + "260.50,210.00 264.50,210.25 264.50,210.25 "
             + "264.50,210.25 268.00,210.50 268.00,210.50 "
             + "268.00,210.50 269.25,211.75 269.25,211.75 "
             + "269.25,211.75 269.75,213.50 269.75,213.50 "
             + "269.75,213.50 269.25,215.00 269.25,215.00 "
             + "269.25,215.00 266.50,216.50 266.50,216.50 "
             + "266.50,216.50 259.25,217.00 259.25,217.00 "
             + "259.25,217.00 251.50,217.00 251.50,217.00 "
             + "251.50,217.00 248.25,216.25 248.25,216.25 "
             + "248.25,216.25 245.50,215.00 245.50,215.00 "
             + "245.50,215.00 244.75,213.00 244.75,213.00 "
             + "244.75,213.00 244.75,211.25 244.75,211.25 "
             + "244.75,211.25 246.50,208.75 246.50,208.75Z M 223.50,208.00 "
           + "C 223.50,208.00 219.50,205.25 219.50,205.25 "
             + "219.50,205.25 214.50,202.25 214.50,202.25 "
             + "214.50,202.25 210.75,198.75 210.75,198.75 "
             + "210.75,198.75 210.75,196.00 210.75,196.00 "
             + "210.75,196.00 213.75,195.00 213.75,195.00 "
             + "213.75,195.00 216.50,196.00 216.50,196.00 "
             + "216.50,196.00 218.75,198.00 218.75,198.00 "
             + "218.75,198.00 221.00,199.75 221.00,199.75 "
             + "221.00,199.75 223.75,201.25 223.75,201.25 "
             + "223.75,201.25 226.50,201.00 226.50,201.00 "
             + "226.50,201.00 227.00,198.75 227.00,198.75 "
             + "227.00,198.75 225.00,196.25 225.00,196.25 "
             + "225.00,196.25 221.50,194.25 221.50,194.25 "
             + "221.50,194.25 218.75,192.25 218.75,192.25 "
             + "218.75,192.25 214.50,189.75 214.50,189.75 "
             + "214.50,189.75 210.25,186.50 210.25,186.50 "
             + "210.25,186.50 207.75,183.00 207.75,183.00 "
             + "207.75,183.00 206.25,178.75 206.25,178.75 "
             + "206.25,178.75 206.25,175.25 206.25,175.25 "
             + "206.25,175.25 208.50,173.00 208.50,173.00 "
             + "208.50,173.00 211.75,172.00 211.75,172.00 "
             + "211.75,172.00 213.75,173.50 213.75,173.50 "
             + "213.75,173.50 215.25,176.00 215.25,176.00 "
             + "215.25,176.00 215.75,178.25 215.75,178.25 "
             + "215.75,178.25 217.75,181.50 217.75,181.50 "
             + "217.75,181.50 220.50,184.75 220.50,184.75 "
             + "220.50,184.75 224.50,188.25 224.50,188.25 "
             + "224.50,188.25 228.25,191.25 228.25,191.25 "
             + "228.25,191.25 232.50,193.50 232.50,193.50 "
             + "232.50,193.50 236.75,195.50 236.75,195.50 "
             + "236.75,195.50 243.00,197.25 243.00,197.25 "
             + "243.00,197.25 247.75,198.00 247.75,198.00 "
             + "247.75,198.00 252.25,198.00 252.25,198.00 "
             + "252.25,198.00 256.00,199.00 256.00,199.00 "
             + "256.00,199.00 259.25,200.75 259.25,200.75 "
             + "259.25,200.75 260.00,203.75 260.00,203.75 "
             + "260.00,203.75 258.00,205.50 258.00,205.50 "
             + "258.00,205.50 254.50,205.75 254.50,205.75 "
             + "254.50,205.75 250.50,205.00 250.50,205.00 "
             + "250.50,205.00 245.75,203.50 245.75,203.50 "
             + "245.75,203.50 242.75,202.25 242.75,202.25 "
             + "242.75,202.25 238.50,202.50 238.50,202.50 "
             + "238.50,202.50 236.25,203.00 236.25,203.00 "
             + "236.25,203.00 235.75,205.50 235.75,205.50 "
             + "235.75,205.50 237.75,206.25 237.75,206.25 "
             + "237.75,206.25 240.50,207.25 240.50,207.25 "
             + "240.50,207.25 242.00,209.75 242.00,209.75 "
             + "242.00,209.75 239.75,212.25 239.75,212.25 "
             + "239.75,212.25 236.25,212.50 236.25,212.50 "
             + "236.25,212.50 232.75,212.25 232.75,212.25 "
             + "232.75,212.25 227.25,210.00 227.25,210.00Z M 275.25,173.50 "
           + "C 275.25,173.50 279.00,172.75 279.00,172.75 "
             + "279.00,172.75 280.75,175.00 280.75,175.00 "
             + "280.75,175.00 282.00,177.00 282.00,177.00 "
             + "282.00,177.00 284.25,178.50 284.25,178.50 "
             + "284.25,178.50 287.25,177.25 287.25,177.25 "
             + "287.25,177.25 290.00,174.75 290.00,174.75 "
             + "290.00,174.75 293.75,172.50 293.75,172.50 "
             + "293.75,172.50 297.25,170.25 297.25,170.25 "
             + "297.25,170.25 300.25,171.25 300.25,171.25 "
             + "300.25,171.25 300.25,173.50 300.25,173.50 "
             + "300.25,173.50 299.00,175.50 299.00,175.50 "
             + "299.00,175.50 297.75,177.50 297.75,177.50 "
             + "297.75,177.50 295.50,179.50 295.50,179.50 "
             + "295.50,179.50 292.75,181.50 292.75,181.50 "
             + "292.75,181.50 290.00,183.00 290.00,183.00 "
             + "290.00,183.00 287.75,184.25 287.75,184.25 "
             + "287.75,184.25 285.00,185.75 285.00,185.75 "
             + "285.00,185.75 282.25,186.75 282.25,186.75 "
             + "282.25,186.75 279.00,187.25 279.00,187.25 "
             + "279.00,187.25 275.75,187.25 275.75,187.25 "
             + "275.75,187.25 275.75,184.75 275.75,184.75 "
             + "275.75,184.75 277.25,182.50 277.25,182.50 "
             + "277.25,182.50 276.50,179.75 276.50,179.75 "
             + "276.50,179.75 275.00,177.25 275.00,177.25 "
             + "275.00,177.25 273.25,174.25 273.25,174.25 "
             + "273.25,174.25 271.00,173.00 271.00,173.00 "
             + "271.00,173.00 268.00,173.25 268.00,173.25 "
             + "268.00,173.25 265.00,173.25 265.00,173.25 "
             + "265.00,173.25 261.75,173.25 261.75,173.25 "
             + "261.75,173.25 259.25,173.25 259.25,173.25 "
             + "259.25,173.25 258.50,175.50 258.50,175.50 "
             + "258.50,175.50 258.75,177.50 258.75,177.50 "
             + "258.75,177.50 259.00,179.50 259.00,179.50 "
             + "259.00,179.50 260.75,181.00 260.75,181.00 "
             + "260.75,181.00 262.75,181.00 262.75,181.00 "
             + "262.75,181.00 265.00,181.25 265.00,181.25 "
             + "265.00,181.25 266.75,180.75 266.75,180.75 "
             + "266.75,180.75 269.50,181.00 269.50,181.00 "
             + "269.50,181.00 271.50,181.50 271.50,181.50 "
             + "271.50,181.50 272.25,184.00 272.25,184.00 "
             + "272.25,184.00 272.00,185.75 272.00,185.75 "
             + "272.00,185.75 270.25,187.00 270.25,187.00 "
             + "270.25,187.00 267.00,187.25 267.00,187.25 "
             + "267.00,187.25 264.00,187.50 264.00,187.50 "
             + "264.00,187.50 260.50,187.50 260.50,187.50 "
             + "260.50,187.50 257.00,187.00 257.00,187.00 "
             + "257.00,187.00 253.50,187.25 253.50,187.25 "
             + "253.50,187.25 250.00,186.75 250.00,186.75 "
             + "250.00,186.75 247.50,187.50 247.50,187.50 "
             + "247.50,187.50 247.75,189.25 247.75,189.25 "
             + "247.75,189.25 250.00,189.75 250.00,189.75 "
             + "250.00,189.75 252.75,190.00 252.75,190.00 "
             + "252.75,190.00 255.50,190.00 255.50,190.00 "
             + "255.50,190.00 258.50,190.00 258.50,190.00 "
             + "258.50,190.00 260.75,190.50 260.75,190.50 "
             + "260.75,190.50 263.25,191.75 263.25,191.75 "
             + "263.25,191.75 264.00,193.25 264.00,193.25 "
             + "264.00,193.25 264.00,195.00 264.00,195.00 "
             + "264.00,195.00 262.25,196.00 262.25,196.00 "
             + "262.25,196.00 258.75,196.50 258.75,196.50 "
             + "258.75,196.50 254.75,196.50 254.75,196.50 "
             + "254.75,196.50 251.25,195.00 251.25,195.00 "
             + "251.25,195.00 247.00,195.00 247.00,195.00 "
             + "247.00,195.00 243.25,194.00 243.25,194.00 "
             + "243.25,194.00 239.00,192.25 239.00,192.25 "
             + "239.00,192.25 234.50,191.25 234.50,191.25 "
             + "234.50,191.25 230.25,189.50 230.25,189.50 "
             + "230.25,189.50 226.75,187.25 226.75,187.25 "
             + "226.75,187.25 225.50,184.75 225.50,184.75 "
             + "225.50,184.75 227.75,182.50 227.75,182.50 "
             + "227.75,182.50 231.00,183.50 231.00,183.50 "
             + "231.00,183.50 233.50,184.00 233.50,184.00 "
             + "233.50,184.00 236.75,185.75 236.75,185.75 "
             + "236.75,185.75 239.75,185.75 239.75,185.75 "
             + "239.75,185.75 240.50,183.25 240.50,183.25 "
             + "240.50,183.25 237.50,182.25 237.50,182.25 "
             + "237.50,182.25 234.25,181.00 234.25,181.00 "
             + "234.25,181.00 231.00,180.50 231.00,180.50 "
             + "231.00,180.50 228.50,179.00 228.50,179.00 "
             + "228.50,179.00 226.25,177.50 226.25,177.50 "
             + "226.25,177.50 225.00,174.75 225.00,174.75 "
             + "225.00,174.75 224.75,171.75 224.75,171.75 "
             + "224.75,171.75 226.75,170.00 226.75,170.00 "
             + "226.75,170.00 229.75,171.00 229.75,171.00 "
             + "229.75,171.00 232.50,172.00 232.50,172.00 "
             + "232.50,172.00 234.75,173.50 234.75,173.50 "
             + "234.75,173.50 237.25,175.00 237.25,175.00 "
             + "237.25,175.00 239.50,176.00 239.50,176.00 "
             + "239.50,176.00 242.00,178.00 242.00,178.00 "
             + "242.00,178.00 244.00,179.00 244.00,179.00 "
             + "244.00,179.00 247.00,179.25 247.00,179.25 "
             + "247.00,179.25 250.00,179.50 250.00,179.50 "
             + "250.00,179.50 252.50,179.25 252.50,179.25 "
             + "252.50,179.25 253.75,176.50 253.75,176.50 "
             + "253.75,176.50 253.75,173.50 253.75,173.50 "
             + "253.75,173.50 256.50,173.50 256.50,173.50Z M 367.25,172.75Z ")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");
	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 4]) {

	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "endoplasmicMem_euka")
				  .attr("fill", "none")
				  .attr("stroke", colorCellCompartment)
				  .attr("stroke-width", "3")
				  .attr("d", "M 266.00,201.00 "
           + "C 266.00,201.00 270.50,199.75 270.50,199.75 "
             + "270.50,199.75 275.25,199.75 275.25,199.75 "
             + "275.25,199.75 280.00,198.50 280.00,198.50 "
             + "280.00,198.50 284.75,198.25 284.75,198.25 "
             + "284.75,198.25 289.00,195.50 289.00,195.50 "
             + "289.00,195.50 294.25,193.00 294.25,193.00 "
             + "294.25,193.00 297.50,190.75 297.50,190.75 "
             + "297.50,190.75 301.00,187.75 301.00,187.75 "
             + "301.00,187.75 303.00,185.25 303.00,185.25 "
             + "303.00,185.25 304.50,181.25 304.50,181.25 "
             + "304.50,181.25 307.50,181.50 307.50,181.50 "
             + "307.50,181.50 308.75,183.00 308.75,183.00 "
             + "308.75,183.00 308.75,185.50 308.75,185.50 "
             + "308.75,185.50 308.75,187.75 308.75,187.75 "
             + "308.75,187.75 307.50,190.00 307.50,190.00 "
             + "307.50,190.00 305.00,191.50 305.00,191.50 "
             + "305.00,191.50 302.50,193.75 302.50,193.75 "
             + "302.50,193.75 300.00,195.50 300.00,195.50 "
             + "300.00,195.50 296.75,197.50 296.75,197.50 "
             + "296.75,197.50 294.25,199.75 294.25,199.75 "
             + "294.25,199.75 291.75,201.50 291.75,201.50 "
             + "291.75,201.50 292.25,204.00 292.25,204.00 "
             + "292.25,204.00 295.25,204.50 295.25,204.50 "
             + "295.25,204.50 297.75,202.50 297.75,202.50 "
             + "297.75,202.50 301.50,199.50 301.50,199.50 "
             + "301.50,199.50 304.75,196.00 304.75,196.00 "
             + "304.75,196.00 307.00,194.25 307.00,194.25 "
             + "307.00,194.25 309.50,194.75 309.50,194.75 "
             + "309.50,194.75 310.75,197.25 310.75,197.25 "
             + "310.75,197.25 309.50,199.25 309.50,199.25 "
             + "309.50,199.25 307.25,203.00 307.25,203.00 "
             + "307.25,203.00 303.00,207.00 303.00,207.00 "
             + "303.00,207.00 298.50,209.75 298.50,209.75 "
             + "298.50,209.75 293.50,212.25 293.50,212.25 "
             + "293.50,212.25 286.75,215.75 286.75,215.75 "
             + "286.75,215.75 282.50,217.50 282.50,217.50 "
             + "282.50,217.50 279.25,218.50 279.25,218.50 "
             + "279.25,218.50 276.25,217.50 276.25,217.50 "
             + "276.25,217.50 273.75,216.25 273.75,216.25 "
             + "273.75,216.25 273.75,213.75 273.75,213.75 "
             + "273.75,213.75 275.75,212.00 275.75,212.00 "
             + "275.75,212.00 278.50,210.50 278.50,210.50 "
             + "278.50,210.50 282.00,208.75 282.00,208.75 "
             + "282.00,208.75 285.25,207.50 285.25,207.50 "
             + "285.25,207.50 285.25,205.50 285.25,205.50 "
             + "285.25,205.50 284.25,204.00 284.25,204.00 "
             + "284.25,204.00 281.75,203.50 281.75,203.50 "
             + "281.75,203.50 278.50,204.00 278.50,204.00 "
             + "278.50,204.00 275.00,205.50 275.00,205.50 "
             + "275.00,205.50 270.75,207.00 270.75,207.00 "
             + "270.75,207.00 266.50,207.50 266.50,207.50 "
             + "266.50,207.50 263.50,207.25 263.50,207.25 "
             + "263.50,207.25 262.25,204.25 262.25,204.25 "
             + "262.25,204.25 263.50,202.00 263.50,202.00Z M 270.75,191.50 "
           + "C 270.75,191.50 275.00,191.25 275.00,191.25 "
             + "275.00,191.25 279.25,190.75 279.25,190.75 "
             + "279.25,190.75 282.50,189.50 282.50,189.50 "
             + "282.50,189.50 287.50,187.50 287.50,187.50 "
             + "287.50,187.50 291.25,185.25 291.25,185.25 "
             + "291.25,185.25 295.00,182.75 295.00,182.75 "
             + "295.00,182.75 298.25,182.75 298.25,182.75 "
             + "298.25,182.75 300.25,183.50 300.25,183.50 "
             + "300.25,183.50 298.50,185.75 298.50,185.75 "
             + "298.50,185.75 295.50,188.50 295.50,188.50 "
             + "295.50,188.50 292.25,190.50 292.25,190.50 "
             + "292.25,190.50 286.50,193.75 286.50,193.75 "
             + "286.50,193.75 280.50,196.25 280.50,196.25 "
             + "280.50,196.25 276.50,197.00 276.50,197.00 "
             + "276.50,197.00 271.25,197.00 271.25,197.00 "
             + "271.25,197.00 267.50,196.50 267.50,196.50 "
             + "267.50,196.50 266.00,194.50 266.00,194.50 "
             + "266.00,194.50 267.00,191.50 267.00,191.50Z M 249.50,209.50 "
           + "C 249.50,209.50 253.75,209.50 253.75,209.50 "
             + "253.75,209.50 257.00,210.00 257.00,210.00 "
             + "257.00,210.00 260.50,210.00 260.50,210.00 "
             + "260.50,210.00 264.50,210.25 264.50,210.25 "
             + "264.50,210.25 268.00,210.50 268.00,210.50 "
             + "268.00,210.50 269.25,211.75 269.25,211.75 "
             + "269.25,211.75 269.75,213.50 269.75,213.50 "
             + "269.75,213.50 269.25,215.00 269.25,215.00 "
             + "269.25,215.00 266.50,216.50 266.50,216.50 "
             + "266.50,216.50 259.25,217.00 259.25,217.00 "
             + "259.25,217.00 251.50,217.00 251.50,217.00 "
             + "251.50,217.00 248.25,216.25 248.25,216.25 "
             + "248.25,216.25 245.50,215.00 245.50,215.00 "
             + "245.50,215.00 244.75,213.00 244.75,213.00 "
             + "244.75,213.00 244.75,211.25 244.75,211.25 "
             + "244.75,211.25 246.50,208.75 246.50,208.75Z M 223.50,208.00 "
           + "C 223.50,208.00 219.50,205.25 219.50,205.25 "
             + "219.50,205.25 214.50,202.25 214.50,202.25 "
             + "214.50,202.25 210.75,198.75 210.75,198.75 "
             + "210.75,198.75 210.75,196.00 210.75,196.00 "
             + "210.75,196.00 213.75,195.00 213.75,195.00 "
             + "213.75,195.00 216.50,196.00 216.50,196.00 "
             + "216.50,196.00 218.75,198.00 218.75,198.00 "
             + "218.75,198.00 221.00,199.75 221.00,199.75 "
             + "221.00,199.75 223.75,201.25 223.75,201.25 "
             + "223.75,201.25 226.50,201.00 226.50,201.00 "
             + "226.50,201.00 227.00,198.75 227.00,198.75 "
             + "227.00,198.75 225.00,196.25 225.00,196.25 "
             + "225.00,196.25 221.50,194.25 221.50,194.25 "
             + "221.50,194.25 218.75,192.25 218.75,192.25 "
             + "218.75,192.25 214.50,189.75 214.50,189.75 "
             + "214.50,189.75 210.25,186.50 210.25,186.50 "
             + "210.25,186.50 207.75,183.00 207.75,183.00 "
             + "207.75,183.00 206.25,178.75 206.25,178.75 "
             + "206.25,178.75 206.25,175.25 206.25,175.25 "
             + "206.25,175.25 208.50,173.00 208.50,173.00 "
             + "208.50,173.00 211.75,172.00 211.75,172.00 "
             + "211.75,172.00 213.75,173.50 213.75,173.50 "
             + "213.75,173.50 215.25,176.00 215.25,176.00 "
             + "215.25,176.00 215.75,178.25 215.75,178.25 "
             + "215.75,178.25 217.75,181.50 217.75,181.50 "
             + "217.75,181.50 220.50,184.75 220.50,184.75 "
             + "220.50,184.75 224.50,188.25 224.50,188.25 "
             + "224.50,188.25 228.25,191.25 228.25,191.25 "
             + "228.25,191.25 232.50,193.50 232.50,193.50 "
             + "232.50,193.50 236.75,195.50 236.75,195.50 "
             + "236.75,195.50 243.00,197.25 243.00,197.25 "
             + "243.00,197.25 247.75,198.00 247.75,198.00 "
             + "247.75,198.00 252.25,198.00 252.25,198.00 "
             + "252.25,198.00 256.00,199.00 256.00,199.00 "
             + "256.00,199.00 259.25,200.75 259.25,200.75 "
             + "259.25,200.75 260.00,203.75 260.00,203.75 "
             + "260.00,203.75 258.00,205.50 258.00,205.50 "
             + "258.00,205.50 254.50,205.75 254.50,205.75 "
             + "254.50,205.75 250.50,205.00 250.50,205.00 "
             + "250.50,205.00 245.75,203.50 245.75,203.50 "
             + "245.75,203.50 242.75,202.25 242.75,202.25 "
             + "242.75,202.25 238.50,202.50 238.50,202.50 "
             + "238.50,202.50 236.25,203.00 236.25,203.00 "
             + "236.25,203.00 235.75,205.50 235.75,205.50 "
             + "235.75,205.50 237.75,206.25 237.75,206.25 "
             + "237.75,206.25 240.50,207.25 240.50,207.25 "
             + "240.50,207.25 242.00,209.75 242.00,209.75 "
             + "242.00,209.75 239.75,212.25 239.75,212.25 "
             + "239.75,212.25 236.25,212.50 236.25,212.50 "
             + "236.25,212.50 232.75,212.25 232.75,212.25 "
             + "232.75,212.25 227.25,210.00 227.25,210.00Z M 275.25,173.50 "
           + "C 275.25,173.50 279.00,172.75 279.00,172.75 "
             + "279.00,172.75 280.75,175.00 280.75,175.00 "
             + "280.75,175.00 282.00,177.00 282.00,177.00 "
             + "282.00,177.00 284.25,178.50 284.25,178.50 "
             + "284.25,178.50 287.25,177.25 287.25,177.25 "
             + "287.25,177.25 290.00,174.75 290.00,174.75 "
             + "290.00,174.75 293.75,172.50 293.75,172.50 "
             + "293.75,172.50 297.25,170.25 297.25,170.25 "
             + "297.25,170.25 300.25,171.25 300.25,171.25 "
             + "300.25,171.25 300.25,173.50 300.25,173.50 "
             + "300.25,173.50 299.00,175.50 299.00,175.50 "
             + "299.00,175.50 297.75,177.50 297.75,177.50 "
             + "297.75,177.50 295.50,179.50 295.50,179.50 "
             + "295.50,179.50 292.75,181.50 292.75,181.50 "
             + "292.75,181.50 290.00,183.00 290.00,183.00 "
             + "290.00,183.00 287.75,184.25 287.75,184.25 "
             + "287.75,184.25 285.00,185.75 285.00,185.75 "
             + "285.00,185.75 282.25,186.75 282.25,186.75 "
             + "282.25,186.75 279.00,187.25 279.00,187.25 "
             + "279.00,187.25 275.75,187.25 275.75,187.25 "
             + "275.75,187.25 275.75,184.75 275.75,184.75 "
             + "275.75,184.75 277.25,182.50 277.25,182.50 "
             + "277.25,182.50 276.50,179.75 276.50,179.75 "
             + "276.50,179.75 275.00,177.25 275.00,177.25 "
             + "275.00,177.25 273.25,174.25 273.25,174.25 "
             + "273.25,174.25 271.00,173.00 271.00,173.00 "
             + "271.00,173.00 268.00,173.25 268.00,173.25 "
             + "268.00,173.25 265.00,173.25 265.00,173.25 "
             + "265.00,173.25 261.75,173.25 261.75,173.25 "
             + "261.75,173.25 259.25,173.25 259.25,173.25 "
             + "259.25,173.25 258.50,175.50 258.50,175.50 "
             + "258.50,175.50 258.75,177.50 258.75,177.50 "
             + "258.75,177.50 259.00,179.50 259.00,179.50 "
             + "259.00,179.50 260.75,181.00 260.75,181.00 "
             + "260.75,181.00 262.75,181.00 262.75,181.00 "
             + "262.75,181.00 265.00,181.25 265.00,181.25 "
             + "265.00,181.25 266.75,180.75 266.75,180.75 "
             + "266.75,180.75 269.50,181.00 269.50,181.00 "
             + "269.50,181.00 271.50,181.50 271.50,181.50 "
             + "271.50,181.50 272.25,184.00 272.25,184.00 "
             + "272.25,184.00 272.00,185.75 272.00,185.75 "
             + "272.00,185.75 270.25,187.00 270.25,187.00 "
             + "270.25,187.00 267.00,187.25 267.00,187.25 "
             + "267.00,187.25 264.00,187.50 264.00,187.50 "
             + "264.00,187.50 260.50,187.50 260.50,187.50 "
             + "260.50,187.50 257.00,187.00 257.00,187.00 "
             + "257.00,187.00 253.50,187.25 253.50,187.25 "
             + "253.50,187.25 250.00,186.75 250.00,186.75 "
             + "250.00,186.75 247.50,187.50 247.50,187.50 "
             + "247.50,187.50 247.75,189.25 247.75,189.25 "
             + "247.75,189.25 250.00,189.75 250.00,189.75 "
             + "250.00,189.75 252.75,190.00 252.75,190.00 "
             + "252.75,190.00 255.50,190.00 255.50,190.00 "
             + "255.50,190.00 258.50,190.00 258.50,190.00 "
             + "258.50,190.00 260.75,190.50 260.75,190.50 "
             + "260.75,190.50 263.25,191.75 263.25,191.75 "
             + "263.25,191.75 264.00,193.25 264.00,193.25 "
             + "264.00,193.25 264.00,195.00 264.00,195.00 "
             + "264.00,195.00 262.25,196.00 262.25,196.00 "
             + "262.25,196.00 258.75,196.50 258.75,196.50 "
             + "258.75,196.50 254.75,196.50 254.75,196.50 "
             + "254.75,196.50 251.25,195.00 251.25,195.00 "
             + "251.25,195.00 247.00,195.00 247.00,195.00 "
             + "247.00,195.00 243.25,194.00 243.25,194.00 "
             + "243.25,194.00 239.00,192.25 239.00,192.25 "
             + "239.00,192.25 234.50,191.25 234.50,191.25 "
             + "234.50,191.25 230.25,189.50 230.25,189.50 "
             + "230.25,189.50 226.75,187.25 226.75,187.25 "
             + "226.75,187.25 225.50,184.75 225.50,184.75 "
             + "225.50,184.75 227.75,182.50 227.75,182.50 "
             + "227.75,182.50 231.00,183.50 231.00,183.50 "
             + "231.00,183.50 233.50,184.00 233.50,184.00 "
             + "233.50,184.00 236.75,185.75 236.75,185.75 "
             + "236.75,185.75 239.75,185.75 239.75,185.75 "
             + "239.75,185.75 240.50,183.25 240.50,183.25 "
             + "240.50,183.25 237.50,182.25 237.50,182.25 "
             + "237.50,182.25 234.25,181.00 234.25,181.00 "
             + "234.25,181.00 231.00,180.50 231.00,180.50 "
             + "231.00,180.50 228.50,179.00 228.50,179.00 "
             + "228.50,179.00 226.25,177.50 226.25,177.50 "
             + "226.25,177.50 225.00,174.75 225.00,174.75 "
             + "225.00,174.75 224.75,171.75 224.75,171.75 "
             + "224.75,171.75 226.75,170.00 226.75,170.00 "
             + "226.75,170.00 229.75,171.00 229.75,171.00 "
             + "229.75,171.00 232.50,172.00 232.50,172.00 "
             + "232.50,172.00 234.75,173.50 234.75,173.50 "
             + "234.75,173.50 237.25,175.00 237.25,175.00 "
             + "237.25,175.00 239.50,176.00 239.50,176.00 "
             + "239.50,176.00 242.00,178.00 242.00,178.00 "
             + "242.00,178.00 244.00,179.00 244.00,179.00 "
             + "244.00,179.00 247.00,179.25 247.00,179.25 "
             + "247.00,179.25 250.00,179.50 250.00,179.50 "
             + "250.00,179.50 252.50,179.25 252.50,179.25 "
             + "252.50,179.25 253.75,176.50 253.75,176.50 "
             + "253.75,176.50 253.75,173.50 253.75,173.50 "
             + "253.75,173.50 256.50,173.50 256.50,173.50Z M 367.25,172.75Z ")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");
	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 5]) {
	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "extraCell_euka")
				  .attr("fill", colorCellCompartment)
				  .attr("d", "M 136.90,2.00 "
           + "C 182.42,2.00 234.44,2.00 284.60,2.00 "
             + "307.94,2.00 330.87,2.00 352.56,2.00 "
             + "435.31,2.00 500.00,2.00 500.00,2.00 "
             + "500.00,2.00 500.00,37.28 500.00,86.83 "
             + "500.00,115.44 500.00,148.81 500.00,182.89 "
             + "500.00,227.73 500.00,273.81 500.00,311.92 "
             + "500.00,363.17 500.00,400.00 500.00,400.00 "
             + "500.00,400.00 262.00,400.00 262.00,400.00 "
             + "262.00,400.00 143.00,400.00 143.00,400.00 "
             + "143.00,400.00 128.00,399.00 128.00,399.00 "
             + "128.00,399.00 1.00,399.00 1.00,399.00 "
             + "1.00,399.00 1.00,301.00 1.00,301.00 "
             + "1.00,301.00 2.00,286.00 2.00,286.00 "
             + "2.00,286.00 2.00,222.87 2.00,156.14 "
             + "2.00,81.33 2.00,2.00 2.00,2.00 "
             + "2.00,2.00 60.25,2.00 136.90,2.00 Z "
           + "M 164.00,95.17 "
           + "C 164.00,95.17 142.00,98.53 142.00,98.53 "
             + "142.00,98.53 130.00,102.48 130.00,102.48 "
             + "123.06,103.97 120.99,101.08 106.00,109.31 "
             + "79.61,123.80 65.35,151.37 65.00,181.00 "
             + "64.77,201.21 76.18,220.66 92.00,232.76 "
             + "107.24,244.42 116.57,246.88 134.00,252.67 "
             + "142.73,255.57 158.15,260.16 167.00,261.56 "
             + "167.00,261.56 187.00,263.17 187.00,263.17 "
             + "187.00,263.17 215.00,265.09 215.00,265.09 "
             + "215.00,265.09 227.00,266.00 227.00,266.00 "
             + "227.00,266.00 259.00,266.00 259.00,266.00 "
             + "259.00,266.00 274.00,265.00 274.00,265.00 "
             + "274.00,265.00 294.00,265.00 294.00,265.00 "
             + "294.00,265.00 311.00,264.00 311.00,264.00 "
             + "311.00,264.00 322.00,264.00 322.00,264.00 "
             + "332.19,263.98 342.09,261.35 352.00,259.21 "
             + "372.94,254.69 390.21,250.75 409.00,239.55 "
             + "418.44,233.92 429.67,222.85 434.62,213.00 "
             + "448.68,185.07 435.30,147.72 413.00,128.29 "
             + "388.20,106.68 353.99,99.48 322.00,96.92 "
             + "322.00,96.92 299.00,95.00 299.00,95.00 "
             + "299.00,95.00 277.00,95.00 277.00,95.00 "
             + "277.00,95.00 262.00,94.00 262.00,94.00 "
             + "262.00,94.00 229.00,94.00 229.00,94.00 "
             + "229.00,94.00 199.00,93.28 199.00,93.28 "
             + "199.00,93.28 164.00,95.17 164.00,95.17 Z")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");
	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 6]) {
	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "golgi_euka")
				  .attr("fill", colorCellCompartment)
				  .attr("d", "M 162.50,233.75 "
           + "C 162.50,233.75 165.50,232.75 165.50,232.75 "
             + "165.50,232.75 167.25,234.75 167.25,234.75 "
             + "167.25,234.75 167.50,237.25 167.50,237.25 "
             + "167.50,237.25 166.75,238.75 166.75,238.75 "
             + "166.75,238.75 164.00,239.00 164.00,239.00 "
             + "164.00,239.00 162.00,238.75 162.00,238.75 "
             + "162.00,238.75 160.50,236.50 160.50,236.50Z M 184.25,224.75 "
           + "C 184.25,224.75 187.50,224.00 187.50,224.00 "
             + "187.50,224.00 191.00,223.25 191.00,223.25 "
             + "191.00,223.25 193.75,222.25 193.75,222.25 "
             + "193.75,222.25 196.75,221.25 196.75,221.25 "
             + "196.75,221.25 199.50,222.00 199.50,222.00 "
             + "199.50,222.00 201.25,223.25 201.25,223.25 "
             + "201.25,223.25 201.75,225.75 201.75,225.75 "
             + "201.75,225.75 200.75,228.25 200.75,228.25 "
             + "200.75,228.25 197.50,231.50 197.50,231.50 "
             + "197.50,231.50 192.25,232.25 192.25,232.25 "
             + "192.25,232.25 187.50,232.25 187.50,232.25 "
             + "187.50,232.25 183.50,230.50 183.50,230.50 "
             + "183.50,230.50 182.00,228.75 182.00,228.75 "
             + "182.00,228.75 182.00,226.50 182.00,226.50Z M 89.75,174.50 "
           + "C 89.75,174.50 92.75,174.00 92.75,174.00 "
             + "92.75,174.00 94.25,177.25 94.25,177.25 "
             + "94.25,177.25 94.25,180.50 94.25,180.50 "
             + "94.25,180.50 93.50,183.00 93.50,183.00 "
             + "93.50,183.00 91.00,184.75 91.00,184.75 "
             + "91.00,184.75 87.75,183.75 87.75,183.75 "
             + "87.75,183.75 85.75,182.25 85.75,182.25 "
             + "85.75,182.25 85.50,178.00 85.50,178.00 "
             + "85.50,178.00 86.50,175.75 86.50,175.75Z M 100.25,192.00 "
           + "C 100.25,192.00 103.50,194.25 103.50,194.25 "
             + "103.50,194.25 105.25,197.25 105.25,197.25 "
             + "105.25,197.25 108.00,202.00 108.00,202.00 "
             + "108.00,202.00 113.75,207.25 113.75,207.25 "
             + "113.75,207.25 118.50,212.00 118.50,212.00 "
             + "118.50,212.00 123.50,215.50 123.50,215.50 "
             + "123.50,215.50 128.50,219.00 128.50,219.00 "
             + "128.50,219.00 132.25,221.75 132.25,221.75 "
             + "132.25,221.75 135.00,224.00 135.00,224.00 "
             + "135.00,224.00 135.75,226.25 135.75,226.25 "
             + "135.75,226.25 133.50,227.00 133.50,227.00 "
             + "133.50,227.00 130.00,226.50 130.00,226.50 "
             + "130.00,226.50 124.00,222.25 124.00,222.25 "
             + "124.00,222.25 119.00,218.75 119.00,218.75 "
             + "119.00,218.75 113.75,214.50 113.75,214.50 "
             + "113.75,214.50 108.75,209.00 108.75,209.00 "
             + "108.75,209.00 104.25,204.50 104.25,204.50 "
             + "104.25,204.50 100.00,199.75 100.00,199.75 "
             + "100.00,199.75 98.75,195.75 98.75,195.75Z M 117.00,202.00 "
           + "C 117.00,202.00 121.25,204.25 121.25,204.25 "
             + "121.25,204.25 124.50,206.75 124.50,206.75 "
             + "124.50,206.75 128.00,210.50 128.00,210.50 "
             + "128.00,210.50 132.00,214.25 132.00,214.25 "
             + "132.00,214.25 137.00,217.50 137.00,217.50 "
             + "137.00,217.50 142.25,219.50 142.25,219.50 "
             + "142.25,219.50 147.50,222.00 147.50,222.00 "
             + "147.50,222.00 154.25,225.00 154.25,225.00 "
             + "154.25,225.00 161.00,226.75 161.00,226.75 "
             + "161.00,226.75 161.75,230.25 161.75,230.25 "
             + "161.75,230.25 160.75,231.75 160.75,231.75 "
             + "160.75,231.75 158.50,232.25 158.50,232.25 "
             + "158.50,232.25 156.00,232.00 156.00,232.00 "
             + "156.00,232.00 152.50,230.00 152.50,230.00 "
             + "152.50,230.00 149.00,228.50 149.00,228.50 "
             + "149.00,228.50 145.50,227.00 145.50,227.00 "
             + "145.50,227.00 140.75,225.75 140.75,225.75 "
             + "140.75,225.75 137.00,223.25 137.00,223.25 "
             + "137.00,223.25 133.25,221.00 133.25,221.00 "
             + "133.25,221.00 129.75,218.25 129.75,218.25 "
             + "129.75,218.25 126.25,216.00 126.25,216.00 "
             + "126.25,216.00 121.75,212.00 121.75,212.00 "
             + "121.75,212.00 117.75,208.25 117.75,208.25 "
             + "117.75,208.25 116.25,205.50 116.25,205.50Z M 102.50,176.50 "
           + "C 102.50,176.50 104.00,180.00 104.00,180.00 "
             + "104.00,180.00 105.00,183.75 105.00,183.75 "
             + "105.00,183.75 107.00,188.00 107.00,188.00 "
             + "107.00,188.00 109.25,191.25 109.25,191.25 "
             + "109.25,191.25 111.50,194.50 111.50,194.50 "
             + "111.50,194.50 114.00,197.50 114.00,197.50 "
             + "114.00,197.50 115.00,200.25 115.00,200.25 "
             + "115.00,200.25 114.00,201.75 114.00,201.75 "
             + "114.00,201.75 110.50,201.00 110.50,201.00 "
             + "110.50,201.00 107.50,197.75 107.50,197.75 "
             + "107.50,197.75 105.25,194.75 105.25,194.75 "
             + "105.25,194.75 102.50,190.00 102.50,190.00 "
             + "102.50,190.00 100.50,186.50 100.50,186.50 "
             + "100.50,186.50 98.25,182.00 98.25,182.00 "
             + "98.25,182.00 98.25,177.25 98.25,177.25 "
             + "98.25,177.25 98.50,175.50 98.50,175.50 "
             + "98.50,175.50 100.50,175.25 100.50,175.25Z M 109.50,168.50 "
           + "C 109.50,168.50 109.25,165.25 109.25,165.25 "
             + "109.25,165.25 109.25,161.50 109.25,161.50 "
             + "109.25,161.50 109.25,158.25 109.25,158.25 "
             + "109.25,158.25 106.50,155.25 106.50,155.25 "
             + "106.50,155.25 103.00,154.25 103.00,154.25 "
             + "103.00,154.25 98.50,154.50 98.50,154.50 "
             + "98.50,154.50 95.25,158.00 95.25,158.00 "
             + "95.25,158.00 93.75,161.00 93.75,161.00 "
             + "93.75,161.00 93.75,164.25 93.75,164.25 "
             + "93.75,164.25 95.50,167.50 95.50,167.50 "
             + "95.50,167.50 98.50,169.50 98.50,169.50 "
             + "98.50,169.50 101.75,171.75 101.75,171.75 "
             + "101.75,171.75 104.25,174.75 104.25,174.75 "
             + "104.25,174.75 106.25,179.50 106.25,179.50 "
             + "106.25,179.50 107.50,183.75 107.50,183.75 "
             + "107.50,183.75 110.00,188.50 110.00,188.50 "
             + "110.00,188.50 112.25,192.50 112.25,192.50 "
             + "112.25,192.50 114.50,196.25 114.50,196.25 "
             + "114.50,196.25 117.75,200.75 117.75,200.75 "
             + "117.75,200.75 122.75,203.50 122.75,203.50 "
             + "122.75,203.50 126.25,207.00 126.25,207.00 "
             + "126.25,207.00 130.00,210.25 130.00,210.25 "
             + "130.00,210.25 135.00,213.50 135.00,213.50 "
             + "135.00,213.50 141.25,216.75 141.25,216.75 "
             + "141.25,216.75 147.75,220.00 147.75,220.00 "
             + "147.75,220.00 154.25,222.75 154.25,222.75 "
             + "154.25,222.75 160.75,225.00 160.75,225.00 "
             + "160.75,225.00 165.75,226.00 165.75,226.00 "
             + "165.75,226.00 170.75,227.75 170.75,227.75 "
             + "170.75,227.75 176.25,229.00 176.25,229.00 "
             + "176.25,229.00 179.25,228.25 179.25,228.25 "
             + "179.25,228.25 179.75,225.75 179.75,225.75 "
             + "179.75,225.75 178.00,223.50 178.00,223.50 "
             + "178.00,223.50 173.75,222.00 173.75,222.00 "
             + "173.75,222.00 167.50,220.75 167.50,220.75 "
             + "167.50,220.75 160.50,218.50 160.50,218.50 "
             + "160.50,218.50 152.00,215.25 152.00,215.25 "
             + "152.00,215.25 143.50,212.00 143.50,212.00 "
             + "143.50,212.00 133.50,205.25 133.50,205.25 "
             + "133.50,205.25 127.00,200.25 127.00,200.25 "
             + "127.00,200.25 122.00,194.00 122.00,194.00 "
             + "122.00,194.00 117.75,188.00 117.75,188.00 "
             + "117.75,188.00 114.50,181.50 114.50,181.50 "
             + "114.50,181.50 111.75,175.50 111.75,175.50 "
             + "111.75,175.50 110.75,172.25 110.75,172.25Z M 119.25,167.25 "
           + "C 119.25,167.25 120.75,164.50 120.75,164.50 "
             + "120.75,164.50 122.25,162.25 122.25,162.25 "
             + "122.25,162.25 123.25,159.50 123.25,159.50 "
             + "123.25,159.50 121.50,156.25 121.50,156.25 "
             + "121.50,156.25 118.00,155.00 118.00,155.00 "
             + "118.00,155.00 115.50,155.50 115.50,155.50 "
             + "115.50,155.50 112.25,157.00 112.25,157.00 "
             + "112.25,157.00 111.50,160.50 111.50,160.50 "
             + "111.50,160.50 111.50,163.25 111.50,163.25 "
             + "111.50,163.25 112.75,166.75 112.75,166.75 "
             + "112.75,166.75 113.25,171.75 113.25,171.75 "
             + "113.25,171.75 114.75,176.50 114.75,176.50 "
             + "114.75,176.50 117.00,180.75 117.00,180.75 "
             + "117.00,180.75 118.50,184.25 118.50,184.25 "
             + "118.50,184.25 120.00,188.00 120.00,188.00 "
             + "120.00,188.00 122.75,191.00 122.75,191.00 "
             + "122.75,191.00 125.25,195.25 125.25,195.25 "
             + "125.25,195.25 129.25,198.50 129.25,198.50 "
             + "129.25,198.50 133.25,202.50 133.25,202.50 "
             + "133.25,202.50 138.00,206.00 138.00,206.00 "
             + "138.00,206.00 144.75,209.50 144.75,209.50 "
             + "144.75,209.50 151.00,212.00 151.00,212.00 "
             + "151.00,212.00 156.75,213.75 156.75,213.75 "
             + "156.75,213.75 162.75,216.00 162.75,216.00 "
             + "162.75,216.00 169.00,218.00 169.00,218.00 "
             + "169.00,218.00 175.25,219.50 175.25,219.50 "
             + "175.25,219.50 181.25,220.50 181.25,220.50 "
             + "181.25,220.50 186.75,221.25 186.75,221.25 "
             + "186.75,221.25 189.50,220.25 189.50,220.25 "
             + "189.50,220.25 191.50,217.25 191.50,217.25 "
             + "191.50,217.25 190.25,214.00 190.25,214.00 "
             + "190.25,214.00 188.50,211.50 188.50,211.50 "
             + "188.50,211.50 185.75,210.75 185.75,210.75 "
             + "185.75,210.75 183.00,210.75 183.00,210.75 "
             + "183.00,210.75 180.50,211.50 180.50,211.50 "
             + "180.50,211.50 178.50,212.75 178.50,212.75 "
             + "178.50,212.75 175.75,213.00 175.75,213.00 "
             + "175.75,213.00 171.00,212.25 171.00,212.25 "
             + "171.00,212.25 166.25,210.00 166.25,210.00 "
             + "166.25,210.00 160.00,208.00 160.00,208.00 "
             + "160.00,208.00 154.00,205.75 154.00,205.75 "
             + "154.00,205.75 146.75,202.25 146.75,202.25 "
             + "146.75,202.25 139.50,198.50 139.50,198.50 "
             + "139.50,198.50 134.00,194.50 134.00,194.50 "
             + "134.00,194.50 129.50,189.25 129.50,189.25 "
             + "129.50,189.25 125.50,184.50 125.50,184.50 "
             + "125.50,184.50 121.75,179.25 121.75,179.25 "
             + "121.75,179.25 119.50,175.25 119.50,175.25 "
             + "119.50,175.25 118.50,171.75 118.50,171.75 "
             + "118.50,171.75 118.50,169.75 118.50,169.75Z M 132.25,163.25 "
           + "C 132.25,163.25 132.00,166.00 132.00,166.00 "
             + "132.00,166.00 131.00,168.50 131.00,168.50 "
             + "131.00,168.50 130.50,170.50 130.50,170.50 "
             + "130.50,170.50 130.00,172.75 130.00,172.75 "
             + "130.00,172.75 130.25,175.00 130.25,175.00 "
             + "130.25,175.00 133.25,178.50 133.25,178.50 "
             + "133.25,178.50 135.75,182.00 135.75,182.00 "
             + "135.75,182.00 139.00,186.25 139.00,186.25 "
             + "139.00,186.25 142.25,189.00 142.25,189.00 "
             + "142.25,189.00 147.25,192.50 147.25,192.50 "
             + "147.25,192.50 152.00,195.50 152.00,195.50 "
             + "152.00,195.50 157.00,198.25 157.00,198.25 "
             + "157.00,198.25 163.00,201.00 163.00,201.00 "
             + "163.00,201.00 165.50,202.00 165.50,202.00 "
             + "165.50,202.00 169.50,202.50 169.50,202.50 "
             + "169.50,202.50 174.00,202.50 174.00,202.50 "
             + "174.00,202.50 178.00,202.75 178.00,202.75 "
             + "178.00,202.75 181.50,204.00 181.50,204.00 "
             + "181.50,204.00 183.75,206.50 183.75,206.50 "
             + "183.75,206.50 183.25,208.75 183.25,208.75 "
             + "183.25,208.75 180.00,210.00 180.00,210.00 "
             + "180.00,210.00 176.50,210.00 176.50,210.00 "
             + "176.50,210.00 172.75,209.50 172.75,209.50 "
             + "172.75,209.50 169.50,208.25 169.50,208.25 "
             + "169.50,208.25 165.00,208.25 165.00,208.25 "
             + "165.00,208.25 161.00,206.75 161.00,206.75 "
             + "161.00,206.75 155.50,204.75 155.50,204.75 "
             + "155.50,204.75 150.00,202.25 150.00,202.25 "
             + "150.00,202.25 144.25,199.00 144.25,199.00 "
             + "144.25,199.00 138.00,195.75 138.00,195.75 "
             + "138.00,195.75 133.75,191.25 133.75,191.25 "
             + "133.75,191.25 130.50,187.50 130.50,187.50 "
             + "130.50,187.50 127.75,184.00 127.75,184.00 "
             + "127.75,184.00 124.75,178.75 124.75,178.75 "
             + "124.75,178.75 121.75,173.25 121.75,173.25 "
             + "121.75,173.25 121.50,169.00 121.50,169.00 "
             + "121.50,169.00 122.25,164.75 122.25,164.75 "
             + "122.25,164.75 124.25,161.75 124.25,161.75 "
             + "124.25,161.75 126.25,160.00 126.25,160.00 "
             + "126.25,160.00 128.25,159.75 128.25,159.75 "
             + "128.25,159.75 130.50,160.50 130.50,160.50Z ")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");

	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 7]) {
	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "golgiMem_euka")
				  .attr("fill", "none")
				  .attr("stroke", colorCellCompartment)
				  .attr("stroke-width", "3")
				  .attr("d", "M 162.50,233.75 "
           + "C 162.50,233.75 165.50,232.75 165.50,232.75 "
             + "165.50,232.75 167.25,234.75 167.25,234.75 "
             + "167.25,234.75 167.50,237.25 167.50,237.25 "
             + "167.50,237.25 166.75,238.75 166.75,238.75 "
             + "166.75,238.75 164.00,239.00 164.00,239.00 "
             + "164.00,239.00 162.00,238.75 162.00,238.75 "
             + "162.00,238.75 160.50,236.50 160.50,236.50Z M 184.25,224.75 "
           + "C 184.25,224.75 187.50,224.00 187.50,224.00 "
             + "187.50,224.00 191.00,223.25 191.00,223.25 "
             + "191.00,223.25 193.75,222.25 193.75,222.25 "
             + "193.75,222.25 196.75,221.25 196.75,221.25 "
             + "196.75,221.25 199.50,222.00 199.50,222.00 "
             + "199.50,222.00 201.25,223.25 201.25,223.25 "
             + "201.25,223.25 201.75,225.75 201.75,225.75 "
             + "201.75,225.75 200.75,228.25 200.75,228.25 "
             + "200.75,228.25 197.50,231.50 197.50,231.50 "
             + "197.50,231.50 192.25,232.25 192.25,232.25 "
             + "192.25,232.25 187.50,232.25 187.50,232.25 "
             + "187.50,232.25 183.50,230.50 183.50,230.50 "
             + "183.50,230.50 182.00,228.75 182.00,228.75 "
             + "182.00,228.75 182.00,226.50 182.00,226.50Z M 89.75,174.50 "
           + "C 89.75,174.50 92.75,174.00 92.75,174.00 "
             + "92.75,174.00 94.25,177.25 94.25,177.25 "
             + "94.25,177.25 94.25,180.50 94.25,180.50 "
             + "94.25,180.50 93.50,183.00 93.50,183.00 "
             + "93.50,183.00 91.00,184.75 91.00,184.75 "
             + "91.00,184.75 87.75,183.75 87.75,183.75 "
             + "87.75,183.75 85.75,182.25 85.75,182.25 "
             + "85.75,182.25 85.50,178.00 85.50,178.00 "
             + "85.50,178.00 86.50,175.75 86.50,175.75Z M 100.25,192.00 "
           + "C 100.25,192.00 103.50,194.25 103.50,194.25 "
             + "103.50,194.25 105.25,197.25 105.25,197.25 "
             + "105.25,197.25 108.00,202.00 108.00,202.00 "
             + "108.00,202.00 113.75,207.25 113.75,207.25 "
             + "113.75,207.25 118.50,212.00 118.50,212.00 "
             + "118.50,212.00 123.50,215.50 123.50,215.50 "
             + "123.50,215.50 128.50,219.00 128.50,219.00 "
             + "128.50,219.00 132.25,221.75 132.25,221.75 "
             + "132.25,221.75 135.00,224.00 135.00,224.00 "
             + "135.00,224.00 135.75,226.25 135.75,226.25 "
             + "135.75,226.25 133.50,227.00 133.50,227.00 "
             + "133.50,227.00 130.00,226.50 130.00,226.50 "
             + "130.00,226.50 124.00,222.25 124.00,222.25 "
             + "124.00,222.25 119.00,218.75 119.00,218.75 "
             + "119.00,218.75 113.75,214.50 113.75,214.50 "
             + "113.75,214.50 108.75,209.00 108.75,209.00 "
             + "108.75,209.00 104.25,204.50 104.25,204.50 "
             + "104.25,204.50 100.00,199.75 100.00,199.75 "
             + "100.00,199.75 98.75,195.75 98.75,195.75Z M 117.00,202.00 "
           + "C 117.00,202.00 121.25,204.25 121.25,204.25 "
             + "121.25,204.25 124.50,206.75 124.50,206.75 "
             + "124.50,206.75 128.00,210.50 128.00,210.50 "
             + "128.00,210.50 132.00,214.25 132.00,214.25 "
             + "132.00,214.25 137.00,217.50 137.00,217.50 "
             + "137.00,217.50 142.25,219.50 142.25,219.50 "
             + "142.25,219.50 147.50,222.00 147.50,222.00 "
             + "147.50,222.00 154.25,225.00 154.25,225.00 "
             + "154.25,225.00 161.00,226.75 161.00,226.75 "
             + "161.00,226.75 161.75,230.25 161.75,230.25 "
             + "161.75,230.25 160.75,231.75 160.75,231.75 "
             + "160.75,231.75 158.50,232.25 158.50,232.25 "
             + "158.50,232.25 156.00,232.00 156.00,232.00 "
             + "156.00,232.00 152.50,230.00 152.50,230.00 "
             + "152.50,230.00 149.00,228.50 149.00,228.50 "
             + "149.00,228.50 145.50,227.00 145.50,227.00 "
             + "145.50,227.00 140.75,225.75 140.75,225.75 "
             + "140.75,225.75 137.00,223.25 137.00,223.25 "
             + "137.00,223.25 133.25,221.00 133.25,221.00 "
             + "133.25,221.00 129.75,218.25 129.75,218.25 "
             + "129.75,218.25 126.25,216.00 126.25,216.00 "
             + "126.25,216.00 121.75,212.00 121.75,212.00 "
             + "121.75,212.00 117.75,208.25 117.75,208.25 "
             + "117.75,208.25 116.25,205.50 116.25,205.50Z M 102.50,176.50 "
           + "C 102.50,176.50 104.00,180.00 104.00,180.00 "
             + "104.00,180.00 105.00,183.75 105.00,183.75 "
             + "105.00,183.75 107.00,188.00 107.00,188.00 "
             + "107.00,188.00 109.25,191.25 109.25,191.25 "
             + "109.25,191.25 111.50,194.50 111.50,194.50 "
             + "111.50,194.50 114.00,197.50 114.00,197.50 "
             + "114.00,197.50 115.00,200.25 115.00,200.25 "
             + "115.00,200.25 114.00,201.75 114.00,201.75 "
             + "114.00,201.75 110.50,201.00 110.50,201.00 "
             + "110.50,201.00 107.50,197.75 107.50,197.75 "
             + "107.50,197.75 105.25,194.75 105.25,194.75 "
             + "105.25,194.75 102.50,190.00 102.50,190.00 "
             + "102.50,190.00 100.50,186.50 100.50,186.50 "
             + "100.50,186.50 98.25,182.00 98.25,182.00 "
             + "98.25,182.00 98.25,177.25 98.25,177.25 "
             + "98.25,177.25 98.50,175.50 98.50,175.50 "
             + "98.50,175.50 100.50,175.25 100.50,175.25Z M 109.50,168.50 "
           + "C 109.50,168.50 109.25,165.25 109.25,165.25 "
             + "109.25,165.25 109.25,161.50 109.25,161.50 "
             + "109.25,161.50 109.25,158.25 109.25,158.25 "
             + "109.25,158.25 106.50,155.25 106.50,155.25 "
             + "106.50,155.25 103.00,154.25 103.00,154.25 "
             + "103.00,154.25 98.50,154.50 98.50,154.50 "
             + "98.50,154.50 95.25,158.00 95.25,158.00 "
             + "95.25,158.00 93.75,161.00 93.75,161.00 "
             + "93.75,161.00 93.75,164.25 93.75,164.25 "
             + "93.75,164.25 95.50,167.50 95.50,167.50 "
             + "95.50,167.50 98.50,169.50 98.50,169.50 "
             + "98.50,169.50 101.75,171.75 101.75,171.75 "
             + "101.75,171.75 104.25,174.75 104.25,174.75 "
             + "104.25,174.75 106.25,179.50 106.25,179.50 "
             + "106.25,179.50 107.50,183.75 107.50,183.75 "
             + "107.50,183.75 110.00,188.50 110.00,188.50 "
             + "110.00,188.50 112.25,192.50 112.25,192.50 "
             + "112.25,192.50 114.50,196.25 114.50,196.25 "
             + "114.50,196.25 117.75,200.75 117.75,200.75 "
             + "117.75,200.75 122.75,203.50 122.75,203.50 "
             + "122.75,203.50 126.25,207.00 126.25,207.00 "
             + "126.25,207.00 130.00,210.25 130.00,210.25 "
             + "130.00,210.25 135.00,213.50 135.00,213.50 "
             + "135.00,213.50 141.25,216.75 141.25,216.75 "
             + "141.25,216.75 147.75,220.00 147.75,220.00 "
             + "147.75,220.00 154.25,222.75 154.25,222.75 "
             + "154.25,222.75 160.75,225.00 160.75,225.00 "
             + "160.75,225.00 165.75,226.00 165.75,226.00 "
             + "165.75,226.00 170.75,227.75 170.75,227.75 "
             + "170.75,227.75 176.25,229.00 176.25,229.00 "
             + "176.25,229.00 179.25,228.25 179.25,228.25 "
             + "179.25,228.25 179.75,225.75 179.75,225.75 "
             + "179.75,225.75 178.00,223.50 178.00,223.50 "
             + "178.00,223.50 173.75,222.00 173.75,222.00 "
             + "173.75,222.00 167.50,220.75 167.50,220.75 "
             + "167.50,220.75 160.50,218.50 160.50,218.50 "
             + "160.50,218.50 152.00,215.25 152.00,215.25 "
             + "152.00,215.25 143.50,212.00 143.50,212.00 "
             + "143.50,212.00 133.50,205.25 133.50,205.25 "
             + "133.50,205.25 127.00,200.25 127.00,200.25 "
             + "127.00,200.25 122.00,194.00 122.00,194.00 "
             + "122.00,194.00 117.75,188.00 117.75,188.00 "
             + "117.75,188.00 114.50,181.50 114.50,181.50 "
             + "114.50,181.50 111.75,175.50 111.75,175.50 "
             + "111.75,175.50 110.75,172.25 110.75,172.25Z M 119.25,167.25 "
           + "C 119.25,167.25 120.75,164.50 120.75,164.50 "
             + "120.75,164.50 122.25,162.25 122.25,162.25 "
             + "122.25,162.25 123.25,159.50 123.25,159.50 "
             + "123.25,159.50 121.50,156.25 121.50,156.25 "
             + "121.50,156.25 118.00,155.00 118.00,155.00 "
             + "118.00,155.00 115.50,155.50 115.50,155.50 "
             + "115.50,155.50 112.25,157.00 112.25,157.00 "
             + "112.25,157.00 111.50,160.50 111.50,160.50 "
             + "111.50,160.50 111.50,163.25 111.50,163.25 "
             + "111.50,163.25 112.75,166.75 112.75,166.75 "
             + "112.75,166.75 113.25,171.75 113.25,171.75 "
             + "113.25,171.75 114.75,176.50 114.75,176.50 "
             + "114.75,176.50 117.00,180.75 117.00,180.75 "
             + "117.00,180.75 118.50,184.25 118.50,184.25 "
             + "118.50,184.25 120.00,188.00 120.00,188.00 "
             + "120.00,188.00 122.75,191.00 122.75,191.00 "
             + "122.75,191.00 125.25,195.25 125.25,195.25 "
             + "125.25,195.25 129.25,198.50 129.25,198.50 "
             + "129.25,198.50 133.25,202.50 133.25,202.50 "
             + "133.25,202.50 138.00,206.00 138.00,206.00 "
             + "138.00,206.00 144.75,209.50 144.75,209.50 "
             + "144.75,209.50 151.00,212.00 151.00,212.00 "
             + "151.00,212.00 156.75,213.75 156.75,213.75 "
             + "156.75,213.75 162.75,216.00 162.75,216.00 "
             + "162.75,216.00 169.00,218.00 169.00,218.00 "
             + "169.00,218.00 175.25,219.50 175.25,219.50 "
             + "175.25,219.50 181.25,220.50 181.25,220.50 "
             + "181.25,220.50 186.75,221.25 186.75,221.25 "
             + "186.75,221.25 189.50,220.25 189.50,220.25 "
             + "189.50,220.25 191.50,217.25 191.50,217.25 "
             + "191.50,217.25 190.25,214.00 190.25,214.00 "
             + "190.25,214.00 188.50,211.50 188.50,211.50 "
             + "188.50,211.50 185.75,210.75 185.75,210.75 "
             + "185.75,210.75 183.00,210.75 183.00,210.75 "
             + "183.00,210.75 180.50,211.50 180.50,211.50 "
             + "180.50,211.50 178.50,212.75 178.50,212.75 "
             + "178.50,212.75 175.75,213.00 175.75,213.00 "
             + "175.75,213.00 171.00,212.25 171.00,212.25 "
             + "171.00,212.25 166.25,210.00 166.25,210.00 "
             + "166.25,210.00 160.00,208.00 160.00,208.00 "
             + "160.00,208.00 154.00,205.75 154.00,205.75 "
             + "154.00,205.75 146.75,202.25 146.75,202.25 "
             + "146.75,202.25 139.50,198.50 139.50,198.50 "
             + "139.50,198.50 134.00,194.50 134.00,194.50 "
             + "134.00,194.50 129.50,189.25 129.50,189.25 "
             + "129.50,189.25 125.50,184.50 125.50,184.50 "
             + "125.50,184.50 121.75,179.25 121.75,179.25 "
             + "121.75,179.25 119.50,175.25 119.50,175.25 "
             + "119.50,175.25 118.50,171.75 118.50,171.75 "
             + "118.50,171.75 118.50,169.75 118.50,169.75Z M 132.25,163.25 "
           + "C 132.25,163.25 132.00,166.00 132.00,166.00 "
             + "132.00,166.00 131.00,168.50 131.00,168.50 "
             + "131.00,168.50 130.50,170.50 130.50,170.50 "
             + "130.50,170.50 130.00,172.75 130.00,172.75 "
             + "130.00,172.75 130.25,175.00 130.25,175.00 "
             + "130.25,175.00 133.25,178.50 133.25,178.50 "
             + "133.25,178.50 135.75,182.00 135.75,182.00 "
             + "135.75,182.00 139.00,186.25 139.00,186.25 "
             + "139.00,186.25 142.25,189.00 142.25,189.00 "
             + "142.25,189.00 147.25,192.50 147.25,192.50 "
             + "147.25,192.50 152.00,195.50 152.00,195.50 "
             + "152.00,195.50 157.00,198.25 157.00,198.25 "
             + "157.00,198.25 163.00,201.00 163.00,201.00 "
             + "163.00,201.00 165.50,202.00 165.50,202.00 "
             + "165.50,202.00 169.50,202.50 169.50,202.50 "
             + "169.50,202.50 174.00,202.50 174.00,202.50 "
             + "174.00,202.50 178.00,202.75 178.00,202.75 "
             + "178.00,202.75 181.50,204.00 181.50,204.00 "
             + "181.50,204.00 183.75,206.50 183.75,206.50 "
             + "183.75,206.50 183.25,208.75 183.25,208.75 "
             + "183.25,208.75 180.00,210.00 180.00,210.00 "
             + "180.00,210.00 176.50,210.00 176.50,210.00 "
             + "176.50,210.00 172.75,209.50 172.75,209.50 "
             + "172.75,209.50 169.50,208.25 169.50,208.25 "
             + "169.50,208.25 165.00,208.25 165.00,208.25 "
             + "165.00,208.25 161.00,206.75 161.00,206.75 "
             + "161.00,206.75 155.50,204.75 155.50,204.75 "
             + "155.50,204.75 150.00,202.25 150.00,202.25 "
             + "150.00,202.25 144.25,199.00 144.25,199.00 "
             + "144.25,199.00 138.00,195.75 138.00,195.75 "
             + "138.00,195.75 133.75,191.25 133.75,191.25 "
             + "133.75,191.25 130.50,187.50 130.50,187.50 "
             + "130.50,187.50 127.75,184.00 127.75,184.00 "
             + "127.75,184.00 124.75,178.75 124.75,178.75 "
             + "124.75,178.75 121.75,173.25 121.75,173.25 "
             + "121.75,173.25 121.50,169.00 121.50,169.00 "
             + "121.50,169.00 122.25,164.75 122.25,164.75 "
             + "122.25,164.75 124.25,161.75 124.25,161.75 "
             + "124.25,161.75 126.25,160.00 126.25,160.00 "
             + "126.25,160.00 128.25,159.75 128.25,159.75 "
             + "128.25,159.75 130.50,160.50 130.50,160.50Z ")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");

	        }

	        else if (proteinLocalization == eukaryotaArray[eukaPos + 8]) {
	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "mitochondria_euka")
				  .attr("fill", colorCellCompartment)
				  .attr("d", "M 354.75,205.50 "
           + "C 354.75,205.50 359.25,204.00 359.25,204.00 "
             + "359.25,204.00 363.00,202.00 363.00,202.00 "
             + "363.00,202.00 367.50,200.25 367.50,200.25 "
             + "367.50,200.25 371.50,198.00 371.50,198.00 "
             + "371.50,198.00 375.75,195.50 375.75,195.50 "
             + "375.75,195.50 380.25,192.75 380.25,192.75 "
             + "380.25,192.75 384.00,190.75 384.00,190.75 "
             + "384.00,190.75 389.00,190.25 389.00,190.25 "
             + "389.00,190.25 393.00,189.75 393.00,189.75 "
             + "393.00,189.75 397.00,190.25 397.00,190.25 "
             + "397.00,190.25 401.00,191.50 401.00,191.50 "
             + "401.00,191.50 402.25,194.00 402.25,194.00 "
             + "402.25,194.00 402.25,196.00 402.25,196.00 "
             + "402.25,196.00 402.00,199.50 402.00,199.50 "
             + "402.00,199.50 400.50,202.50 400.50,202.50 "
             + "400.50,202.50 399.00,205.75 399.00,205.75 "
             + "399.00,205.75 396.00,208.75 396.00,208.75 "
             + "396.00,208.75 392.00,212.00 392.00,212.00 "
             + "392.00,212.00 388.25,215.00 388.25,215.00 "
             + "388.25,215.00 383.25,219.00 383.25,219.00 "
             + "383.25,219.00 376.75,222.75 376.75,222.75 "
             + "376.75,222.75 369.50,226.00 369.50,226.00 "
             + "369.50,226.00 362.25,228.75 362.25,228.75 "
             + "362.25,228.75 356.25,230.75 356.25,230.75 "
             + "356.25,230.75 350.50,231.50 350.50,231.50 "
             + "350.50,231.50 343.50,231.50 343.50,231.50 "
             + "343.50,231.50 339.50,229.25 339.50,229.25 "
             + "339.50,229.25 337.00,227.50 337.00,227.50 "
             + "337.00,227.50 335.50,224.25 335.50,224.25 "
             + "335.50,224.25 335.50,219.75 335.50,219.75 "
             + "335.50,219.75 337.50,216.00 337.50,216.00 "
             + "337.50,216.00 340.75,212.50 340.75,212.50 "
             + "340.75,212.50 344.75,210.00 344.75,210.00 "
             + "344.75,210.00 349.25,207.50 349.25,207.50Z ")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");

	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 9]) {

	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "mitoconMem_euka")
				  .attr("fill", "none")
				  .attr("stroke", colorCellCompartment)
				  .attr("stroke-width", "3")
				  .attr("d", "M 354.75,205.50 "
           + "C 354.75,205.50 359.25,204.00 359.25,204.00 "
             + "359.25,204.00 363.00,202.00 363.00,202.00 "
             + "363.00,202.00 367.50,200.25 367.50,200.25 "
             + "367.50,200.25 371.50,198.00 371.50,198.00 "
             + "371.50,198.00 375.75,195.50 375.75,195.50 "
             + "375.75,195.50 380.25,192.75 380.25,192.75 "
             + "380.25,192.75 384.00,190.75 384.00,190.75 "
             + "384.00,190.75 389.00,190.25 389.00,190.25 "
             + "389.00,190.25 393.00,189.75 393.00,189.75 "
             + "393.00,189.75 397.00,190.25 397.00,190.25 "
             + "397.00,190.25 401.00,191.50 401.00,191.50 "
             + "401.00,191.50 402.25,194.00 402.25,194.00 "
             + "402.25,194.00 402.25,196.00 402.25,196.00 "
             + "402.25,196.00 402.00,199.50 402.00,199.50 "
             + "402.00,199.50 400.50,202.50 400.50,202.50 "
             + "400.50,202.50 399.00,205.75 399.00,205.75 "
             + "399.00,205.75 396.00,208.75 396.00,208.75 "
             + "396.00,208.75 392.00,212.00 392.00,212.00 "
             + "392.00,212.00 388.25,215.00 388.25,215.00 "
             + "388.25,215.00 383.25,219.00 383.25,219.00 "
             + "383.25,219.00 376.75,222.75 376.75,222.75 "
             + "376.75,222.75 369.50,226.00 369.50,226.00 "
             + "369.50,226.00 362.25,228.75 362.25,228.75 "
             + "362.25,228.75 356.25,230.75 356.25,230.75 "
             + "356.25,230.75 350.50,231.50 350.50,231.50 "
             + "350.50,231.50 343.50,231.50 343.50,231.50 "
             + "343.50,231.50 339.50,229.25 339.50,229.25 "
             + "339.50,229.25 337.00,227.50 337.00,227.50 "
             + "337.00,227.50 335.50,224.25 335.50,224.25 "
             + "335.50,224.25 335.50,219.75 335.50,219.75 "
             + "335.50,219.75 337.50,216.00 337.50,216.00 "
             + "337.50,216.00 340.75,212.50 340.75,212.50 "
             + "340.75,212.50 344.75,210.00 344.75,210.00 "
             + "344.75,210.00 349.25,207.50 349.25,207.50Z ")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");
	        }

	        else if (proteinLocalization == eukaryotaArray[eukaPos + 10]) {
	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "nucleus_euka")
				  .attr("fill", colorCellCompartment)
				  .attr("d", "M 234.75,138.25 "
           + "C 234.75,138.25 240.00,137.00 240.00,137.00 "
             + "240.00,137.00 245.25,136.50 245.25,136.50 "
             + "245.25,136.50 250.25,136.50 250.25,136.50 "
             + "250.25,136.50 255.00,136.50 255.00,136.50 "
             + "255.00,136.50 259.50,137.00 259.50,137.00 "
             + "259.50,137.00 263.50,137.00 263.50,137.00 "
             + "263.50,137.00 268.75,137.50 268.75,137.50 "
             + "268.75,137.50 273.00,137.75 273.00,137.75 "
             + "273.00,137.75 277.75,138.75 277.75,138.75 "
             + "277.75,138.75 283.00,139.75 283.00,139.75 "
             + "283.00,139.75 287.75,141.50 287.75,141.50 "
             + "287.75,141.50 292.50,144.25 292.50,144.25 "
             + "292.50,144.25 296.25,147.25 296.25,147.25 "
             + "296.25,147.25 298.25,152.00 298.25,152.00 "
             + "298.25,152.00 299.50,156.00 299.50,156.00 "
             + "299.50,156.00 300.00,160.75 300.00,160.75 "
             + "300.00,160.75 299.50,164.50 299.50,164.50 "
             + "299.50,164.50 296.50,167.75 296.50,167.75 "
             + "296.50,167.75 292.75,169.75 292.75,169.75 "
             + "292.75,169.75 288.50,172.25 288.50,172.25 "
             + "288.50,172.25 282.25,173.50 282.25,173.50 "
             + "282.25,173.50 278.75,174.25 278.75,174.25 "
             + "278.75,174.25 274.75,174.50 274.75,174.50 "
             + "274.75,174.50 270.25,175.00 270.25,175.00 "
             + "270.25,175.00 262.75,175.00 262.75,175.00 "
             + "262.75,175.00 257.00,174.50 257.00,174.50 "
             + "257.00,174.50 250.75,173.75 250.75,173.75 "
             + "250.75,173.75 244.00,172.50 244.00,172.50 "
             + "244.00,172.50 237.00,170.50 237.00,170.50 "
             + "237.00,170.50 232.50,168.50 232.50,168.50 "
             + "232.50,168.50 227.25,165.50 227.25,165.50 "
             + "227.25,165.50 223.25,162.50 223.25,162.50 "
             + "223.25,162.50 220.25,157.75 220.25,157.75 "
             + "220.25,157.75 220.00,153.50 220.00,153.50 "
             + "220.00,153.50 220.75,150.00 220.75,150.00 "
             + "220.75,150.00 222.00,146.50 222.00,146.50 "
             + "222.00,146.50 224.25,143.50 224.25,143.50 "
             + "224.25,143.50 227.00,141.00 227.00,141.00 "
             + "227.00,141.00 230.25,139.00 230.25,139.00Z ")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");

	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 11]) {
	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "nucleusMem_euka")
				  .attr("fill", "none")
				  .attr("stroke", colorCellCompartment)
				  .attr("stroke-width", "3")
				  .attr("d", "M 234.75,138.25 "
           + "C 234.75,138.25 240.00,137.00 240.00,137.00 "
             + "240.00,137.00 245.25,136.50 245.25,136.50 "
             + "245.25,136.50 250.25,136.50 250.25,136.50 "
             + "250.25,136.50 255.00,136.50 255.00,136.50 "
             + "255.00,136.50 259.50,137.00 259.50,137.00 "
             + "259.50,137.00 263.50,137.00 263.50,137.00 "
             + "263.50,137.00 268.75,137.50 268.75,137.50 "
             + "268.75,137.50 273.00,137.75 273.00,137.75 "
             + "273.00,137.75 277.75,138.75 277.75,138.75 "
             + "277.75,138.75 283.00,139.75 283.00,139.75 "
             + "283.00,139.75 287.75,141.50 287.75,141.50 "
             + "287.75,141.50 292.50,144.25 292.50,144.25 "
             + "292.50,144.25 296.25,147.25 296.25,147.25 "
             + "296.25,147.25 298.25,152.00 298.25,152.00 "
             + "298.25,152.00 299.50,156.00 299.50,156.00 "
             + "299.50,156.00 300.00,160.75 300.00,160.75 "
             + "300.00,160.75 299.50,164.50 299.50,164.50 "
             + "299.50,164.50 296.50,167.75 296.50,167.75 "
             + "296.50,167.75 292.75,169.75 292.75,169.75 "
             + "292.75,169.75 288.50,172.25 288.50,172.25 "
             + "288.50,172.25 282.25,173.50 282.25,173.50 "
             + "282.25,173.50 278.75,174.25 278.75,174.25 "
             + "278.75,174.25 274.75,174.50 274.75,174.50 "
             + "274.75,174.50 270.25,175.00 270.25,175.00 "
             + "270.25,175.00 262.75,175.00 262.75,175.00 "
             + "262.75,175.00 257.00,174.50 257.00,174.50 "
             + "257.00,174.50 250.75,173.75 250.75,173.75 "
             + "250.75,173.75 244.00,172.50 244.00,172.50 "
             + "244.00,172.50 237.00,170.50 237.00,170.50 "
             + "237.00,170.50 232.50,168.50 232.50,168.50 "
             + "232.50,168.50 227.25,165.50 227.25,165.50 "
             + "227.25,165.50 223.25,162.50 223.25,162.50 "
             + "223.25,162.50 220.25,157.75 220.25,157.75 "
             + "220.25,157.75 220.00,153.50 220.00,153.50 "
             + "220.00,153.50 220.75,150.00 220.75,150.00 "
             + "220.75,150.00 222.00,146.50 222.00,146.50 "
             + "222.00,146.50 224.25,143.50 224.25,143.50 "
             + "224.25,143.50 227.00,141.00 227.00,141.00 "
             + "227.00,141.00 230.25,139.00 230.25,139.00Z ")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");

	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 12]) {
	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "peroxisome_euka")
				  .attr("fill", colorCellCompartment)
				  .attr("d", "M 162.25,156.25 "
           + "C 162.25,156.25 169.25,157.50 169.25,157.50 "
             + "169.25,157.50 175.50,159.00 175.50,159.00 "
             + "175.50,159.00 181.25,161.00 181.25,161.00 "
             + "181.25,161.00 185.75,164.25 185.75,164.25 "
             + "185.75,164.25 188.00,169.00 188.00,169.00 "
             + "188.00,169.00 188.50,174.00 188.50,174.00 "
             + "188.50,174.00 187.00,178.00 187.00,178.00 "
             + "187.00,178.00 183.00,181.00 183.00,181.00 "
             + "183.00,181.00 177.50,182.25 177.50,182.25 "
             + "177.50,182.25 171.00,183.00 171.00,183.00 "
             + "171.00,183.00 165.00,182.00 165.00,182.00 "
             + "165.00,182.00 159.00,180.50 159.00,180.50 "
             + "159.00,180.50 155.25,178.50 155.25,178.50 "
             + "155.25,178.50 151.25,175.75 151.25,175.75 "
             + "151.25,175.75 147.75,170.00 147.75,170.00 "
             + "147.75,170.00 148.50,164.00 148.50,164.00 "
             + "148.50,164.00 152.00,158.75 152.00,158.75 "
             + "152.00,158.75 156.25,156.50 156.25,156.50Z ")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");

	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 13]) {

	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "peroxiMem_euka")
				  .attr("fill", "none")
				  .attr("stroke", colorCellCompartment)
				  .attr("stroke-width", "3")
				  .attr("d", "M 162.25,156.25 "
           + "C 162.25,156.25 169.25,157.50 169.25,157.50 "
             + "169.25,157.50 175.50,159.00 175.50,159.00 "
             + "175.50,159.00 181.25,161.00 181.25,161.00 "
             + "181.25,161.00 185.75,164.25 185.75,164.25 "
             + "185.75,164.25 188.00,169.00 188.00,169.00 "
             + "188.00,169.00 188.50,174.00 188.50,174.00 "
             + "188.50,174.00 187.00,178.00 187.00,178.00 "
             + "187.00,178.00 183.00,181.00 183.00,181.00 "
             + "183.00,181.00 177.50,182.25 177.50,182.25 "
             + "177.50,182.25 171.00,183.00 171.00,183.00 "
             + "171.00,183.00 165.00,182.00 165.00,182.00 "
             + "165.00,182.00 159.00,180.50 159.00,180.50 "
             + "159.00,180.50 155.25,178.50 155.25,178.50 "
             + "155.25,178.50 151.25,175.75 151.25,175.75 "
             + "151.25,175.75 147.75,170.00 147.75,170.00 "
             + "147.75,170.00 148.50,164.00 148.50,164.00 "
             + "148.50,164.00 152.00,158.75 152.00,158.75 "
             + "152.00,158.75 156.25,156.50 156.25,156.50Z ")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");

	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 14]) {
	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "plastid_euka")
				  .attr("fill", colorCellCompartment)
				  .attr("d", "M 270.25,224.00 "
           + "C 270.25,224.00 274.75,223.50 274.75,223.50 "
             + "274.75,223.50 279.25,224.75 279.25,224.75 "
             + "279.25,224.75 283.00,226.50 283.00,226.50 "
             + "283.00,226.50 285.50,228.25 285.50,228.25 "
             + "285.50,228.25 287.75,230.75 287.75,230.75 "
             + "287.75,230.75 287.75,234.00 287.75,234.00 "
             + "287.75,234.00 287.00,237.75 287.00,237.75 "
             + "287.00,237.75 284.25,240.50 284.25,240.50 "
             + "284.25,240.50 280.75,241.25 280.75,241.25 "
             + "280.75,241.25 276.50,241.25 276.50,241.25 "
             + "276.50,241.25 271.75,241.50 271.75,241.50 "
             + "271.75,241.50 268.25,239.50 268.25,239.50 "
             + "268.25,239.50 264.75,238.50 264.75,238.50 "
             + "264.75,238.50 262.75,235.50 262.75,235.50 "
             + "262.75,235.50 262.50,231.25 262.50,231.25 "
             + "262.50,231.25 264.25,227.75 264.25,227.75 "
             + "264.25,227.75 267.00,224.75 267.00,224.75Z ")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");

	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 15]) {
	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "plasmaMem_euka")
				  .attr("fill", colorCellCompartment)				 
				  .attr("d", "M 211.00,93.21 "
           + "C 211.00,93.21 225.00,94.00 225.00,94.00 "
             + "225.00,94.00 241.00,94.00 241.00,94.00 "
             + "277.59,94.00 307.41,92.90 344.00,98.58 "
             + "365.66,101.94 390.38,107.89 408.00,121.50 "
             + "426.12,135.50 440.89,160.70 441.00,184.00 "
             + "441.00,184.00 441.00,194.00 441.00,194.00 "
             + "440.92,200.26 439.33,206.33 436.68,212.00 "
             + "431.34,223.40 420.64,233.13 410.00,239.55 "
             + "395.11,248.53 378.73,253.34 362.00,257.47 "
             + "345.26,261.61 313.90,266.97 297.00,267.00 "
             + "297.00,267.00 281.00,267.00 281.00,267.00 "
             + "281.00,267.00 266.00,268.00 266.00,268.00 "
             + "266.00,268.00 248.00,268.00 248.00,268.00 "
             + "248.00,268.00 233.00,267.00 233.00,267.00 "
             + "233.00,267.00 214.00,266.09 214.00,266.09 "
             + "190.17,264.46 169.49,262.61 146.00,257.42 "
             + "126.61,253.14 103.19,245.66 88.01,232.56 "
             + "80.83,226.36 72.46,214.95 69.06,206.00 "
             + "57.59,175.77 69.29,135.37 95.00,115.90 "
             + "108.88,105.39 131.72,97.49 149.00,95.28 "
             + "149.00,95.28 169.00,93.21 169.00,93.21 "
             + "169.00,93.21 211.00,93.21 211.00,93.21 Z "
           + "M 183.00,104.00 "
           + "C 183.00,104.00 171.00,104.91 171.00,104.91 "
             + "149.59,106.41 125.36,109.95 107.00,121.86 "
             + "100.77,125.91 94.44,131.88 90.22,138.00 "
             + "82.73,148.88 75.13,173.77 76.09,187.00 "
             + "76.52,192.87 79.68,202.75 82.37,208.00 "
             + "87.64,218.29 100.10,227.87 110.00,233.57 "
             + "132.03,246.26 157.20,248.77 182.00,251.17 "
             + "182.00,251.17 213.00,254.00 213.00,254.00 "
             + "213.00,254.00 291.00,254.00 291.00,254.00 "
             + "291.00,254.00 307.00,253.00 307.00,253.00 "
             + "318.45,252.95 329.72,250.95 341.00,249.08 "
             + "366.34,244.88 388.58,239.68 410.00,224.56 "
             + "414.91,221.10 419.55,217.04 422.90,212.00 "
             + "440.23,185.91 424.11,146.67 401.00,129.76 "
             + "387.80,120.09 371.64,115.54 356.00,111.63 "
             + "317.50,102.00 288.60,104.45 250.00,104.00 "
             + "250.00,104.00 235.00,103.14 235.00,103.14 "
             + "235.00,103.14 198.00,103.14 198.00,103.14 "
             + "191.93,104.16 188.99,103.99 183.00,104.00 Z")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");

	        }

	        else if (proteinLocalization == eukaryotaArray[eukaPos + 16]) {
	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "vacuole_euka")
				  .attr("fill", colorCellCompartment)
				  .attr("d", "M 326.25,122.00 "
           + "C 326.25,122.00 330.25,121.50 330.25,121.50 "
             + "330.25,121.50 334.25,121.50 334.25,121.50 "
             + "334.25,121.50 338.00,121.50 338.00,121.50 "
             + "338.00,121.50 342.25,122.75 342.25,122.75 "
             + "342.25,122.75 345.75,124.00 345.75,124.00 "
             + "345.75,124.00 348.50,125.75 348.50,125.75 "
             + "348.50,125.75 351.75,127.25 351.75,127.25 "
             + "351.75,127.25 354.75,129.00 354.75,129.00 "
             + "354.75,129.00 358.25,131.25 358.25,131.25 "
             + "358.25,131.25 362.25,132.75 362.25,132.75 "
             + "362.25,132.75 365.25,134.50 365.25,134.50 "
             + "365.25,134.50 368.50,136.00 368.50,136.00 "
             + "368.50,136.00 372.00,137.75 372.00,137.75 "
             + "372.00,137.75 375.25,140.00 375.25,140.00 "
             + "375.25,140.00 378.50,142.25 378.50,142.25 "
             + "378.50,142.25 381.00,144.50 381.00,144.50 "
             + "381.00,144.50 384.50,147.25 384.50,147.25 "
             + "384.50,147.25 387.50,149.50 387.50,149.50 "
             + "387.50,149.50 389.75,151.25 389.75,151.25 "
             + "389.75,151.25 391.75,153.75 391.75,153.75 "
             + "391.75,153.75 393.25,156.00 393.25,156.00 "
             + "393.25,156.00 394.25,158.50 394.25,158.50 "
             + "394.25,158.50 395.75,160.25 395.75,160.25 "
             + "395.75,160.25 395.75,162.00 395.75,162.00 "
             + "395.75,162.00 397.00,165.00 397.00,165.00 "
             + "397.00,165.00 397.00,167.75 397.00,167.75 "
             + "397.00,167.75 396.25,170.00 396.25,170.00 "
             + "396.25,170.00 394.00,171.50 394.00,171.50 "
             + "394.00,171.50 390.25,172.25 390.25,172.25 "
             + "390.25,172.25 386.50,173.00 386.50,173.00 "
             + "386.50,173.00 383.00,173.25 383.00,173.25 "
             + "383.00,173.25 379.50,173.25 379.50,173.25 "
             + "379.50,173.25 376.00,174.00 376.00,174.00 "
             + "376.00,174.00 370.25,175.00 370.25,175.00 "
             + "370.25,175.00 365.25,176.50 365.25,176.50 "
             + "365.25,176.50 360.00,179.00 360.00,179.00 "
             + "360.00,179.00 354.50,181.75 354.50,181.75 "
             + "354.50,181.75 349.25,184.75 349.25,184.75 "
             + "349.25,184.75 344.50,187.25 344.50,187.25 "
             + "344.50,187.25 338.50,189.25 338.50,189.25 "
             + "338.50,189.25 332.25,192.75 332.25,192.75 "
             + "332.25,192.75 326.50,193.75 326.50,193.75 "
             + "326.50,193.75 322.25,195.00 322.25,195.00 "
             + "322.25,195.00 319.00,195.00 319.00,195.00 "
             + "319.00,195.00 317.00,193.50 317.00,193.50 "
             + "317.00,193.50 315.75,191.50 315.75,191.50 "
             + "315.75,191.50 315.25,188.75 315.25,188.75 "
             + "315.25,188.75 315.50,185.50 315.50,185.50 "
             + "315.50,185.50 316.50,182.75 316.50,182.75 "
             + "316.50,182.75 318.00,181.00 318.00,181.00 "
             + "318.00,181.00 319.75,179.00 319.75,179.00 "
             + "319.75,179.00 322.00,176.75 322.00,176.75 "
             + "322.00,176.75 323.50,174.75 323.50,174.75 "
             + "323.50,174.75 325.75,172.25 325.75,172.25 "
             + "325.75,172.25 327.00,170.00 327.00,170.00 "
             + "327.00,170.00 328.25,167.25 328.25,167.25 "
             + "328.25,167.25 328.00,164.50 328.00,164.50 "
             + "328.00,164.50 328.00,161.50 328.00,161.50 "
             + "328.00,161.50 326.50,158.50 326.50,158.50 "
             + "326.50,158.50 324.75,156.25 324.75,156.25 "
             + "324.75,156.25 322.00,153.25 322.00,153.25 "
             + "322.00,153.25 319.75,151.00 319.75,151.00 "
             + "319.75,151.00 316.50,148.00 316.50,148.00 "
             + "316.50,148.00 313.50,145.25 313.50,145.25 "
             + "313.50,145.25 311.25,141.50 311.25,141.50 "
             + "311.25,141.50 309.00,138.25 309.00,138.25 "
             + "309.00,138.25 308.75,134.50 308.75,134.50 "
             + "308.75,134.50 309.50,130.75 309.50,130.75 "
             + "309.50,130.75 310.75,128.75 310.75,128.75 "
             + "310.75,128.75 312.25,126.00 312.25,126.00 "
             + "312.25,126.00 314.75,124.25 314.75,124.25 "
             + "314.75,124.25 316.75,123.00 316.75,123.00 "
             + "316.75,123.00 319.75,121.75 319.75,121.75 "
             + "319.75,121.75 323.25,121.75 323.25,121.75Z ")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");

	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 17]) {
	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "vacuoleMem_euka")
				  .attr("fill", "none")
				  .attr("stroke", colorCellCompartment)
				  .attr("stroke-width", "3")
				  .attr("d", "M 326.25,122.00 "
           + "C 326.25,122.00 330.25,121.50 330.25,121.50 "
             + "330.25,121.50 334.25,121.50 334.25,121.50 "
             + "334.25,121.50 338.00,121.50 338.00,121.50 "
             + "338.00,121.50 342.25,122.75 342.25,122.75 "
             + "342.25,122.75 345.75,124.00 345.75,124.00 "
             + "345.75,124.00 348.50,125.75 348.50,125.75 "
             + "348.50,125.75 351.75,127.25 351.75,127.25 "
             + "351.75,127.25 354.75,129.00 354.75,129.00 "
             + "354.75,129.00 358.25,131.25 358.25,131.25 "
             + "358.25,131.25 362.25,132.75 362.25,132.75 "
             + "362.25,132.75 365.25,134.50 365.25,134.50 "
             + "365.25,134.50 368.50,136.00 368.50,136.00 "
             + "368.50,136.00 372.00,137.75 372.00,137.75 "
             + "372.00,137.75 375.25,140.00 375.25,140.00 "
             + "375.25,140.00 378.50,142.25 378.50,142.25 "
             + "378.50,142.25 381.00,144.50 381.00,144.50 "
             + "381.00,144.50 384.50,147.25 384.50,147.25 "
             + "384.50,147.25 387.50,149.50 387.50,149.50 "
             + "387.50,149.50 389.75,151.25 389.75,151.25 "
             + "389.75,151.25 391.75,153.75 391.75,153.75 "
             + "391.75,153.75 393.25,156.00 393.25,156.00 "
             + "393.25,156.00 394.25,158.50 394.25,158.50 "
             + "394.25,158.50 395.75,160.25 395.75,160.25 "
             + "395.75,160.25 395.75,162.00 395.75,162.00 "
             + "395.75,162.00 397.00,165.00 397.00,165.00 "
             + "397.00,165.00 397.00,167.75 397.00,167.75 "
             + "397.00,167.75 396.25,170.00 396.25,170.00 "
             + "396.25,170.00 394.00,171.50 394.00,171.50 "
             + "394.00,171.50 390.25,172.25 390.25,172.25 "
             + "390.25,172.25 386.50,173.00 386.50,173.00 "
             + "386.50,173.00 383.00,173.25 383.00,173.25 "
             + "383.00,173.25 379.50,173.25 379.50,173.25 "
             + "379.50,173.25 376.00,174.00 376.00,174.00 "
             + "376.00,174.00 370.25,175.00 370.25,175.00 "
             + "370.25,175.00 365.25,176.50 365.25,176.50 "
             + "365.25,176.50 360.00,179.00 360.00,179.00 "
             + "360.00,179.00 354.50,181.75 354.50,181.75 "
             + "354.50,181.75 349.25,184.75 349.25,184.75 "
             + "349.25,184.75 344.50,187.25 344.50,187.25 "
             + "344.50,187.25 338.50,189.25 338.50,189.25 "
             + "338.50,189.25 332.25,192.75 332.25,192.75 "
             + "332.25,192.75 326.50,193.75 326.50,193.75 "
             + "326.50,193.75 322.25,195.00 322.25,195.00 "
             + "322.25,195.00 319.00,195.00 319.00,195.00 "
             + "319.00,195.00 317.00,193.50 317.00,193.50 "
             + "317.00,193.50 315.75,191.50 315.75,191.50 "
             + "315.75,191.50 315.25,188.75 315.25,188.75 "
             + "315.25,188.75 315.50,185.50 315.50,185.50 "
             + "315.50,185.50 316.50,182.75 316.50,182.75 "
             + "316.50,182.75 318.00,181.00 318.00,181.00 "
             + "318.00,181.00 319.75,179.00 319.75,179.00 "
             + "319.75,179.00 322.00,176.75 322.00,176.75 "
             + "322.00,176.75 323.50,174.75 323.50,174.75 "
             + "323.50,174.75 325.75,172.25 325.75,172.25 "
             + "325.75,172.25 327.00,170.00 327.00,170.00 "
             + "327.00,170.00 328.25,167.25 328.25,167.25 "
             + "328.25,167.25 328.00,164.50 328.00,164.50 "
             + "328.00,164.50 328.00,161.50 328.00,161.50 "
             + "328.00,161.50 326.50,158.50 326.50,158.50 "
             + "326.50,158.50 324.75,156.25 324.75,156.25 "
             + "324.75,156.25 322.00,153.25 322.00,153.25 "
             + "322.00,153.25 319.75,151.00 319.75,151.00 "
             + "319.75,151.00 316.50,148.00 316.50,148.00 "
             + "316.50,148.00 313.50,145.25 313.50,145.25 "
             + "313.50,145.25 311.25,141.50 311.25,141.50 "
             + "311.25,141.50 309.00,138.25 309.00,138.25 "
             + "309.00,138.25 308.75,134.50 308.75,134.50 "
             + "308.75,134.50 309.50,130.75 309.50,130.75 "
             + "309.50,130.75 310.75,128.75 310.75,128.75 "
             + "310.75,128.75 312.25,126.00 312.25,126.00 "
             + "312.25,126.00 314.75,124.25 314.75,124.25 "
             + "314.75,124.25 316.75,123.00 316.75,123.00 "
             + "316.75,123.00 319.75,121.75 319.75,121.75 "
             + "319.75,121.75 323.25,121.75 323.25,121.75Z ")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");

	        }

	    }
	    else if (cellType == cellTypeArray[cellPos + 1]) {
	    
	    if (proteinLocalization == bacteriaArray[bactPos]) {

	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "cytosol_bact")
				  .attr("fill", colorCellCompartment)
				  .attr("d", "M 202.00,155.21 "
           + "C 202.00,155.21 218.00,156.00 218.00,156.00 "
             + "218.00,156.00 261.00,156.00 261.00,156.00 "
             + "261.00,156.00 276.00,157.00 276.00,157.00 "
             + "276.00,157.00 295.00,157.00 295.00,157.00 "
             + "295.00,157.00 312.00,156.00 312.00,156.00 "
             + "312.00,156.00 327.00,157.00 327.00,157.00 "
             + "341.35,157.02 358.85,158.80 372.00,164.79 "
             + "378.16,167.60 384.87,171.67 389.67,176.46 "
             + "398.26,185.03 404.25,202.16 396.49,213.00 "
             + "393.41,217.31 388.55,220.64 384.00,223.25 "
             + "377.95,226.72 368.76,229.07 362.00,231.00 "
             + "342.23,236.65 316.55,239.76 296.00,240.00 "
             + "296.00,240.00 281.00,241.00 281.00,241.00 "
             + "236.56,241.07 190.17,240.48 148.00,224.58 "
             + "135.04,219.69 115.13,210.30 109.36,197.00 "
             + "107.33,192.33 106.90,187.03 107.01,182.00 "
             + "107.15,176.27 108.39,170.38 113.10,166.63 "
             + "122.67,159.03 148.75,156.02 161.00,156.00 "
             + "165.73,155.99 168.22,156.10 173.00,155.21 "
             + "173.00,155.21 202.00,155.21 202.00,155.21 Z "
           + "M 234.59,183.30 "
           + "C 232.44,181.09 233.25,177.79 230.57,176.72 "
             + "228.37,175.64 225.14,177.28 220.00,176.72 "
             + "220.00,176.72 209.00,175.18 209.00,175.18 "
             + "203.92,175.26 198.38,178.55 198.07,184.00 "
             + "197.63,185.74 198.24,187.31 198.07,189.00 "
             + "198.07,189.00 198.07,198.00 198.07,198.00 "
             + "191.57,194.73 184.99,195.55 180.00,190.20 "
             + "182.82,190.24 191.28,192.76 192.87,190.20 "
             + "194.11,188.56 192.42,186.52 190.77,185.74 "
             + "188.90,184.85 186.33,185.22 184.21,183.98 "
             + "181.20,182.22 179.86,177.79 175.99,176.66 "
             + "169.34,174.71 168.36,183.64 168.00,188.00 "
             + "165.53,186.74 162.08,184.78 159.23,185.83 "
             + "154.95,187.39 155.56,196.59 156.89,199.98 "
             + "158.58,204.29 163.23,206.69 167.00,209.00 "
             + "175.79,201.71 175.39,209.07 180.00,203.00 "
             + "182.15,205.15 190.29,214.03 192.09,214.97 "
             + "196.00,217.02 199.43,214.46 201.58,214.42 "
             + "204.02,214.38 205.62,216.31 209.00,216.74 "
             + "212.29,217.15 215.54,215.66 218.00,215.89 "
             + "222.38,216.30 223.87,219.92 229.00,220.77 "
             + "235.30,221.82 238.98,217.99 243.00,217.29 "
             + "247.69,216.48 249.75,219.88 260.00,220.00 "
             + "263.25,220.03 269.09,220.25 271.98,219.11 "
             + "276.17,217.46 276.61,214.52 279.26,213.30 "
             + "279.26,213.30 288.00,211.96 288.00,211.96 "
             + "288.00,211.96 297.00,209.06 297.00,209.06 "
             + "302.46,208.64 305.01,215.14 313.00,214.73 "
             + "320.99,214.32 322.75,207.59 331.00,209.06 "
             + "338.97,210.49 337.62,217.61 343.90,216.46 "
             + "350.10,215.33 348.68,205.44 351.59,202.75 "
             + "353.82,200.70 358.20,201.78 361.00,202.00 "
             + "361.00,202.00 361.00,185.00 361.00,185.00 "
             + "352.42,185.59 355.60,185.20 349.00,181.00 "
             + "349.00,181.00 348.00,185.00 348.00,185.00 "
             + "346.72,183.82 345.50,182.52 344.00,181.61 "
             + "338.51,178.32 335.09,183.53 330.00,184.44 "
             + "330.00,184.44 321.00,184.44 321.00,184.44 "
             + "315.31,184.82 308.07,187.41 303.00,190.00 "
             + "303.00,190.00 304.00,181.00 304.00,181.00 "
             + "290.14,181.01 294.59,183.50 287.00,184.93 "
             + "287.00,184.93 280.00,184.93 280.00,184.93 "
             + "270.16,185.78 265.96,188.22 259.00,195.00 "
             + "255.80,186.17 248.86,189.76 242.00,192.00 "
             + "242.00,192.00 244.00,187.00 244.00,187.00 "
             + "241.38,186.24 236.44,185.19 234.59,183.30 Z "
           + "M 177.00,185.00 "
           + "C 177.00,185.00 173.00,186.00 173.00,186.00 "
             + "173.00,186.00 174.00,181.00 174.00,181.00 "
             + "174.00,181.00 177.00,185.00 177.00,185.00 Z "
           + "M 297.00,192.00 "
           + "C 294.77,188.27 295.67,187.41 298.00,184.00 "
             + "298.00,184.00 297.00,192.00 297.00,192.00 Z "
           + "M 342.00,185.00 "
           + "C 342.00,185.00 343.00,188.00 343.00,188.00 "
             + "343.00,188.00 337.00,189.00 337.00,189.00 "
             + "337.00,189.00 342.00,185.00 342.00,185.00 Z "
           + "M 207.00,187.00 "
           + "C 206.87,192.11 206.91,193.44 203.00,197.00 "
             + "203.00,197.00 205.00,187.00 205.00,187.00 "
             + "205.00,187.00 207.00,187.00 207.00,187.00 Z "
           + "M 289.00,188.00 "
           + "C 286.95,193.71 286.28,194.83 281.00,198.00 "
             + "281.00,198.00 277.00,189.00 277.00,189.00 "
             + "277.00,189.00 289.00,188.00 289.00,188.00 Z "
           + "M 166.00,201.00 "
           + "C 159.88,198.64 161.00,194.74 161.00,189.00 "
             + "166.02,193.06 165.94,194.86 166.00,201.00 Z "
           + "M 229.00,189.00 "
           + "C 222.81,197.24 211.00,203.72 201.00,206.00 "
             + "201.00,206.00 201.00,202.00 201.00,202.00 "
             + "201.00,202.00 208.00,203.00 208.00,203.00 "
             + "208.00,203.00 208.00,199.00 208.00,199.00 "
             + "218.80,196.70 214.47,189.71 229.00,189.00 Z "
           + "M 321.56,190.88 "
           + "C 324.15,192.86 323.86,198.14 320.70,199.23 "
             + "316.95,200.53 304.56,196.56 314.06,190.88 "
             + "316.39,190.17 319.39,189.48 321.56,190.88 Z "
           + "M 358.00,196.00 "
           + "C 358.00,196.00 352.00,196.00 352.00,196.00 "
             + "352.00,196.00 356.00,190.00 356.00,190.00 "
             + "356.00,190.00 358.00,196.00 358.00,196.00 Z "
           + "M 274.00,192.00 "
           + "C 274.00,192.00 277.00,200.00 277.00,200.00 "
             + "277.00,200.00 272.00,200.00 272.00,200.00 "
             + "272.00,200.00 272.00,192.00 272.00,192.00 "
             + "272.00,192.00 274.00,192.00 274.00,192.00 Z "
           + "M 254.00,193.00 "
           + "C 254.00,193.00 253.00,197.00 253.00,197.00 "
             + "253.00,197.00 249.00,193.00 249.00,193.00 "
             + "249.00,193.00 254.00,193.00 254.00,193.00 Z "
           + "M 267.00,194.00 "
           + "C 267.00,194.00 267.00,201.00 267.00,201.00 "
             + "267.00,201.00 277.00,204.00 277.00,204.00 "
             + "269.94,205.24 267.65,204.83 261.00,202.00 "
             + "261.00,202.00 265.00,194.00 265.00,194.00 "
             + "265.00,194.00 267.00,194.00 267.00,194.00 Z "
           + "M 234.00,195.00 "
           + "C 234.00,195.00 235.00,199.00 235.00,199.00 "
             + "235.00,199.00 230.00,197.00 230.00,197.00 "
             + "230.00,197.00 234.00,195.00 234.00,195.00 Z "
           + "M 248.00,199.00 "
           + "C 248.00,199.00 244.00,203.00 244.00,203.00 "
             + "244.00,203.00 243.00,198.00 243.00,198.00 "
             + "243.00,198.00 248.00,199.00 248.00,199.00 Z "
           + "M 176.00,200.00 "
           + "C 176.00,200.00 173.00,203.00 173.00,203.00 "
             + "173.00,203.00 173.00,199.00 173.00,199.00 "
             + "173.00,199.00 176.00,200.00 176.00,200.00 Z "
           + "M 197.00,212.00 "
           + "C 197.00,212.00 184.00,199.00 184.00,199.00 "
             + "193.24,199.03 199.39,201.13 197.00,212.00 Z "
           + "M 206.00,211.00 "
           + "C 210.25,205.61 213.05,204.82 219.00,202.00 "
             + "222.50,211.69 212.03,211.00 206.00,211.00 Z "
           + "M 232.89,205.65 "
           + "C 233.76,206.33 234.63,207.15 235.22,208.05 "
             + "240.61,216.82 223.00,219.28 225.69,208.05 "
             + "226.12,206.21 227.13,204.60 228.00,203.00 "
             + "229.69,203.77 231.42,204.48 232.89,205.65 Z "
           + "M 319.00,204.00 "
           + "C 315.88,208.72 313.12,210.29 308.00,207.00 "
             + "308.00,207.00 319.00,204.00 319.00,204.00 Z "
           + "M 274.00,210.00 "
           + "C 272.98,211.76 272.57,212.84 270.78,214.25 "
             + "266.74,216.82 255.33,216.55 251.02,214.25 "
             + "248.43,213.16 247.73,212.14 246.00,210.00 "
             + "256.24,205.03 263.62,206.99 274.00,210.00 Z")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");

	        }
	        else if (proteinLocalization == bacteriaArray[bactPos + 1]) {

	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "extraCell_bact")
				  .attr("fill", colorCellCompartment)
				  .attr("d", "M 498.00,2.00 "
           + "C 498.00,2.00 499.00,20.00 499.00,20.00 "
             + "499.00,20.00 499.00,262.00 499.00,262.00 "
             + "499.00,262.00 500.00,277.00 500.00,277.00 "
             + "500.00,277.00 500.00,399.00 500.00,399.00 "
             + "500.00,399.00 1.96,399.00 1.96,399.00 "
             + "1.96,399.00 1.96,387.00 1.96,387.00 "
             + "1.96,387.00 1.00,375.00 1.00,375.00 "
             + "1.00,375.00 1.00,2.00 1.00,2.00 "
             + "1.00,2.00 498.00,2.00 498.00,2.00 Z "
           + "M 233.35,113.00 "
           + "C 234.33,120.19 229.88,125.42 228.00,132.00 "
             + "234.19,130.94 235.47,125.72 235.91,120.00 "
             + "236.63,110.40 230.85,98.72 227.00,90.00 "
             + "225.01,96.22 232.39,106.00 233.35,113.00 Z "
           + "M 163.00,99.00 "
           + "C 155.41,112.92 160.64,120.73 168.00,133.00 "
             + "168.00,133.00 148.00,134.00 148.00,134.00 "
             + "151.33,129.94 143.14,125.35 140.00,124.00 "
             + "140.00,124.00 146.00,135.00 146.00,135.00 "
             + "131.65,135.66 111.32,141.16 99.00,148.45 "
             + "94.68,151.01 92.00,152.99 88.92,157.01 "
             + "87.05,159.46 85.35,163.23 81.96,163.64 "
             + "80.17,163.86 75.98,162.38 74.00,161.90 "
             + "68.21,160.49 66.07,160.80 60.00,158.12 "
             + "60.00,158.12 49.00,152.00 49.00,152.00 "
             + "56.51,162.39 61.40,161.19 72.00,165.09 "
             + "72.00,165.09 83.00,170.00 83.00,170.00 "
             + "83.00,170.00 85.00,166.00 85.00,166.00 "
             + "85.00,166.00 82.33,172.00 82.33,172.00 "
             + "82.33,172.00 82.33,196.00 82.33,196.00 "
             + "82.33,196.00 84.00,206.00 84.00,206.00 "
             + "77.34,206.00 66.73,206.60 61.00,210.00 "
             + "61.00,210.00 79.00,209.26 79.00,209.26 "
             + "82.30,209.36 84.87,211.01 87.00,208.00 "
             + "89.89,215.14 92.87,216.45 97.71,222.00 "
             + "99.44,223.97 102.58,227.33 102.77,230.00 "
             + "102.97,232.78 98.41,240.08 97.00,243.00 "
             + "99.98,241.38 106.75,235.55 106.81,232.00 "
             + "106.84,230.25 105.82,229.32 105.00,228.00 "
             + "116.15,237.66 122.73,240.37 136.00,246.00 "
             + "134.02,248.78 131.69,252.30 128.91,254.30 "
             + "124.68,257.35 122.04,255.87 119.00,261.00 "
             + "119.00,261.00 132.99,255.44 132.99,255.44 "
             + "132.99,255.44 141.09,248.92 141.09,248.92 "
             + "141.09,248.92 149.00,250.58 149.00,250.58 "
             + "149.00,250.58 167.00,255.00 167.00,255.00 "
             + "167.00,255.00 158.12,272.00 158.12,272.00 "
             + "158.12,272.00 150.00,289.00 150.00,289.00 "
             + "155.12,285.72 156.49,278.89 159.68,274.00 "
             + "163.48,268.16 170.92,263.42 171.00,256.00 "
             + "176.40,257.97 182.33,258.96 188.00,259.92 "
             + "190.57,260.36 195.56,260.89 197.40,262.73 "
             + "199.44,264.76 199.01,269.28 199.00,272.00 "
             + "198.95,282.18 196.49,282.20 194.00,291.00 "
             + "201.34,284.70 200.11,279.32 201.30,271.00 "
             + "201.30,271.00 203.00,262.00 203.00,262.00 "
             + "203.00,262.00 219.00,264.83 219.00,264.83 "
             + "221.20,265.05 224.76,264.78 226.57,266.02 "
             + "229.56,268.08 228.58,272.31 229.63,276.00 "
             + "230.99,280.74 235.93,287.72 236.22,292.00 "
             + "237.34,299.47 231.95,305.99 236.22,313.00 "
             + "236.01,300.88 239.83,296.07 238.79,289.00 "
             + "238.18,284.85 235.49,280.90 233.88,277.00 "
             + "232.63,273.99 231.08,269.32 234.43,266.95 "
             + "236.89,265.34 241.22,266.57 244.00,266.95 "
             + "248.13,267.22 262.65,267.88 266.00,266.95 "
             + "266.00,274.49 263.53,284.28 271.00,289.00 "
             + "268.27,281.10 264.01,267.24 277.00,266.92 "
             + "277.00,266.92 289.00,266.92 289.00,266.92 "
             + "289.00,266.92 303.00,265.09 303.00,265.09 "
             + "314.39,264.31 326.35,264.48 337.00,260.00 "
             + "337.00,260.00 333.00,262.00 333.00,262.00 "
             + "335.80,270.40 336.92,275.01 335.82,284.00 "
             + "334.95,291.11 331.19,298.92 334.00,306.00 "
             + "334.46,295.96 337.21,291.55 338.56,283.00 "
             + "340.06,273.55 339.73,270.19 338.00,261.00 "
             + "338.00,261.00 362.96,255.97 362.96,255.97 "
             + "362.96,255.97 369.17,253.32 369.17,253.32 "
             + "369.17,253.32 378.00,250.95 378.00,250.95 "
             + "378.00,250.95 395.00,245.00 395.00,245.00 "
             + "396.15,250.71 396.75,259.86 402.00,263.00 "
             + "402.00,263.00 399.39,255.00 399.39,255.00 "
             + "399.39,255.00 398.00,243.00 398.00,243.00 "
             + "398.00,243.00 394.00,244.00 394.00,244.00 "
             + "398.21,240.18 399.02,242.98 405.00,238.47 "
             + "410.80,234.09 422.39,220.06 424.36,213.00 "
             + "425.27,209.76 424.65,206.33 425.00,203.00 "
             + "426.92,207.77 437.84,209.42 442.00,207.00 "
             + "442.00,207.00 434.00,205.10 434.00,205.10 "
             + "434.00,205.10 424.00,202.00 424.00,202.00 "
             + "423.99,186.46 419.81,181.41 414.00,168.00 "
             + "423.96,167.19 433.16,164.90 436.00,154.00 "
             + "436.00,154.00 429.83,159.20 429.83,159.20 "
             + "425.07,162.77 416.85,163.87 411.00,164.00 "
             + "411.00,164.00 411.00,165.00 411.00,165.00 "
             + "411.00,165.00 413.00,167.00 413.00,167.00 "
             + "405.61,158.46 403.75,154.27 393.00,149.00 "
             + "393.00,149.00 404.00,141.18 404.00,141.18 "
             + "404.00,141.18 418.00,135.00 418.00,135.00 "
             + "410.25,135.19 395.81,141.07 389.00,145.00 "
             + "389.00,145.00 389.00,147.00 389.00,147.00 "
             + "389.00,147.00 392.00,149.00 392.00,149.00 "
             + "381.15,141.87 378.48,143.06 367.00,139.88 "
             + "353.07,136.02 338.50,134.01 324.00,134.00 "
             + "327.17,117.12 342.43,114.48 349.00,110.00 "
             + "335.33,111.15 320.83,118.85 320.00,134.00 "
             + "320.00,134.00 323.00,135.00 323.00,135.00 "
             + "323.00,135.00 299.00,134.00 299.00,134.00 "
             + "301.16,123.31 306.59,111.87 293.00,106.00 "
             + "293.00,106.00 299.09,117.00 299.09,117.00 "
             + "299.09,117.00 294.00,134.00 294.00,134.00 "
             + "294.00,134.00 297.00,135.00 297.00,135.00 "
             + "283.76,132.63 269.43,134.63 256.00,134.13 "
             + "256.00,134.13 247.00,133.09 247.00,133.09 "
             + "247.00,133.09 234.00,132.41 234.00,132.41 "
             + "234.00,132.41 228.00,132.41 228.00,132.41 "
             + "228.00,132.41 215.00,131.12 215.00,131.12 "
             + "215.00,131.12 204.17,131.12 204.17,131.12 "
             + "198.64,129.56 196.74,122.65 195.00,118.00 "
             + "193.63,123.84 195.71,126.33 197.00,132.00 "
             + "197.00,132.00 173.00,133.00 173.00,133.00 "
             + "170.06,125.49 161.09,118.32 161.20,110.00 "
             + "161.24,106.45 163.58,102.29 165.00,99.00 "
             + "165.00,99.00 163.00,99.00 163.00,99.00 Z "
           + "M 94.00,121.95 "
           + "C 90.46,119.69 87.31,116.93 83.00,118.00 "
             + "92.92,124.60 104.61,131.28 107.00,144.00 "
             + "107.00,144.00 111.00,143.00 111.00,143.00 "
             + "109.43,133.42 101.84,126.95 94.00,121.95 Z "
           + "M 136.00,120.00 "
           + "C 136.00,120.00 137.00,121.00 137.00,121.00 "
             + "137.00,121.00 137.00,120.00 137.00,120.00 "
             + "137.00,120.00 136.00,120.00 136.00,120.00 Z "
           + "M 137.00,121.00 "
           + "C 137.00,121.00 138.00,122.00 138.00,122.00 "
             + "138.00,122.00 138.00,121.00 138.00,121.00 "
             + "138.00,121.00 137.00,121.00 137.00,121.00 Z "
           + "M 365.00,139.00 "
           + "C 365.00,139.00 369.00,140.00 369.00,140.00 "
             + "372.16,130.44 370.20,130.04 370.00,121.00 "
             + "370.00,121.00 365.00,139.00 365.00,139.00 Z "
           + "M 138.00,122.00 "
           + "C 138.00,122.00 139.00,123.00 139.00,123.00 "
             + "139.00,123.00 139.00,122.00 139.00,122.00 "
             + "139.00,122.00 138.00,122.00 138.00,122.00 Z "
           + "M 139.00,123.00 "
           + "C 139.00,123.00 140.00,124.00 140.00,124.00 "
             + "140.00,124.00 140.00,123.00 140.00,123.00 "
             + "140.00,123.00 139.00,123.00 139.00,123.00 Z "
           + "M 259.00,123.00 "
           + "C 256.11,127.86 256.07,128.43 256.00,134.00 "
             + "256.00,134.00 258.00,134.00 258.00,134.00 "
             + "258.00,134.00 261.00,123.00 261.00,123.00 "
             + "261.00,123.00 259.00,123.00 259.00,123.00 Z "
           + "M 86.00,206.00 "
           + "C 86.00,206.00 85.00,207.00 85.00,207.00 "
             + "85.00,207.00 85.00,206.00 85.00,206.00 "
             + "85.00,206.00 86.00,206.00 86.00,206.00 Z "
           + "M 429.00,225.40 "
           + "C 423.95,222.97 420.29,221.88 417.00,227.00 "
             + "422.60,227.26 428.39,228.08 432.99,231.56 "
             + "438.50,235.73 438.53,239.21 445.00,243.00 "
             + "441.81,236.47 435.63,228.59 429.00,225.40 Z "
           + "M 368.00,254.00 "
           + "C 368.00,254.00 371.36,264.00 371.36,264.00 "
             + "371.36,264.00 372.00,275.00 372.00,275.00 "
             + "373.63,266.87 375.72,261.03 372.00,253.00 "
             + "372.00,253.00 368.00,254.00 368.00,254.00 Z "
           + "M 299.00,266.00 "
           + "C 299.53,269.91 300.98,275.38 300.79,279.00 "
             + "300.48,285.13 297.82,294.50 300.00,300.00 "
             + "300.65,286.10 305.60,285.73 303.00,266.00 "
             + "303.00,266.00 299.00,266.00 299.00,266.00 Z")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");

	        }
	        else if (proteinLocalization == bacteriaArray[bactPos + 2]) {
	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "fimbrium")
				  .attr("fill", colorCellCompartment)
				  .attr("d", "M 255.20,134.60 "
           + "C 255.20,134.60 258.40,134.80 258.40,134.80 "
             + "258.40,134.80 258.40,127.80 258.40,127.80 "
             + "258.40,127.80 261.20,122.40 261.20,122.40 "
             + "261.20,122.40 258.40,124.20 258.40,124.20 "
             + "258.40,124.20 255.80,128.60 255.80,128.60 "
             + "255.80,128.60 255.40,134.80 255.40,134.80M 225.80,133.60 "
           + "C 225.80,133.60 231.40,133.20 231.40,133.20 "
             + "231.40,133.20 233.80,128.00 233.80,128.00 "
             + "233.80,128.00 235.60,122.60 235.60,122.60 "
             + "235.60,122.60 235.60,113.00 235.60,113.00 "
             + "235.60,113.00 234.60,109.80 234.60,109.80 "
             + "234.60,109.80 233.00,104.20 233.00,104.20 "
             + "233.00,104.20 230.00,98.00 230.00,98.00 "
             + "230.00,98.00 228.20,93.00 228.20,93.00 "
             + "228.20,93.00 226.80,88.40 226.80,88.40 "
             + "226.80,88.40 226.00,92.40 226.00,92.40 "
             + "226.00,92.40 227.80,96.80 227.80,96.80 "
             + "227.80,96.80 229.20,101.80 229.20,101.80 "
             + "229.20,101.80 232.00,106.20 232.00,106.20 "
             + "232.00,106.20 233.60,113.60 233.60,113.60 "
             + "233.60,113.60 233.60,118.20 233.60,118.20 "
             + "233.60,118.20 232.20,122.60 232.20,122.60 "
             + "232.20,122.60 226.40,134.00 226.40,134.00M 197.20,132.40 "
           + "C 197.20,132.40 202.80,132.00 202.80,132.00 "
             + "202.80,132.00 196.80,124.80 196.80,124.80 "
             + "196.80,124.80 195.20,120.60 195.20,120.60 "
             + "195.20,120.60 197.00,116.60 197.00,116.60 "
             + "197.00,116.60 194.20,118.80 194.20,118.80 "
             + "194.20,118.80 194.20,122.40 194.20,122.40 "
             + "194.20,122.40 195.80,127.40 195.80,127.40 "
             + "195.80,127.40 197.80,133.00 197.80,133.00M 167.60,133.20 "
           + "C 167.60,133.20 174.00,132.80 174.00,132.80 "
             + "174.00,132.80 166.20,122.80 166.20,122.80 "
             + "166.20,122.80 161.60,115.40 161.60,115.40 "
             + "161.60,115.40 160.80,107.60 160.80,107.60 "
             + "160.80,107.60 163.00,102.80 163.00,102.80 "
             + "163.00,102.80 165.40,98.40 165.40,98.40 "
             + "165.40,98.40 162.60,99.80 162.60,99.80 "
             + "162.60,99.80 160.20,104.20 160.20,104.20 "
             + "160.20,104.20 159.00,111.80 159.00,111.80 "
             + "159.00,111.80 160.40,119.00 160.40,119.00 "
             + "160.40,119.00 163.00,124.20 163.00,124.20 "
             + "163.00,124.20 168.60,133.40 168.60,133.40M 145.80,134.80 "
           + "C 145.80,134.80 151.00,134.60 151.00,134.60 "
             + "151.00,134.60 147.40,128.80 147.40,128.80 "
             + "147.40,128.80 139.60,123.00 139.60,123.00 "
             + "139.60,123.00 136.00,119.00 136.00,119.00 "
             + "136.00,119.00 134.80,118.60 134.80,118.60 "
             + "134.80,118.60 141.00,126.00 141.00,126.00 "
             + "141.00,126.00 144.20,129.60 144.20,129.60 "
             + "144.20,129.60 146.80,134.80 146.80,134.80M 106.60,145.80 "
           + "C 106.60,145.80 111.40,143.40 111.40,143.40 "
             + "111.40,143.40 109.80,137.80 109.80,137.80 "
             + "109.80,137.80 107.60,134.00 107.60,134.00 "
             + "107.60,134.00 102.80,129.20 102.80,129.20 "
             + "102.80,129.20 97.60,124.40 97.60,124.40 "
             + "97.60,124.40 92.80,121.60 92.80,121.60 "
             + "92.80,121.60 88.80,118.80 88.80,118.80 "
             + "88.80,118.80 85.20,117.40 85.20,117.40 "
             + "85.20,117.40 79.40,115.40 79.40,115.40 "
             + "79.40,115.40 87.20,120.60 87.20,120.60 "
             + "87.20,120.60 94.00,124.60 94.00,124.60 "
             + "94.00,124.60 99.40,129.40 99.40,129.40 "
             + "99.40,129.40 103.80,134.80 103.80,134.80 "
             + "103.80,134.80 106.60,139.60 106.60,139.60 "
             + "106.60,139.60 107.00,145.80 107.00,145.80M 83.20,171.40 "
           + "C 83.20,171.40 85.20,166.00 85.20,166.00 "
             + "85.20,166.00 78.80,163.40 78.80,163.40 "
             + "78.80,163.40 73.00,161.60 73.00,161.60 "
             + "73.00,161.60 68.80,161.00 68.80,161.00 "
             + "68.80,161.00 64.60,160.20 64.60,160.20 "
             + "64.60,160.20 61.60,159.00 61.60,159.00 "
             + "61.60,159.00 58.40,157.80 58.40,157.80 "
             + "58.40,157.80 55.40,156.40 55.40,156.40 "
             + "55.40,156.40 53.20,155.20 53.20,155.20 "
             + "53.20,155.20 50.40,152.20 50.40,152.20 "
             + "50.40,152.20 48.60,152.20 48.60,152.20 "
             + "48.60,152.20 55.00,158.60 55.00,158.60 "
             + "55.00,158.60 59.60,161.20 59.60,161.20 "
             + "59.60,161.20 66.20,163.40 66.20,163.40 "
             + "66.20,163.40 72.80,164.80 72.80,164.80 "
             + "72.80,164.80 84.00,171.20 84.00,171.20M 85.00,205.00 "
           + "C 85.00,205.00 88.40,210.60 88.40,210.60 "
             + "88.40,210.60 79.60,209.00 79.60,209.00 "
             + "79.60,209.00 73.20,209.60 73.20,209.60 "
             + "73.20,209.60 68.20,208.80 68.20,208.80 "
             + "68.20,208.80 63.80,210.00 63.80,210.00 "
             + "63.80,210.00 59.40,210.20 59.40,210.20 "
             + "59.40,210.20 65.20,208.20 65.20,208.20 "
             + "65.20,208.20 70.60,206.80 70.60,206.80 "
             + "70.60,206.80 85.60,205.60 85.60,205.60M 104.80,228.00 "
           + "C 104.80,228.00 109.20,230.60 109.20,230.60 "
             + "109.20,230.60 98.40,242.80 98.40,242.80 "
             + "98.40,242.80 97.00,243.20 97.00,243.20 "
             + "97.00,243.20 105.20,228.20 105.20,228.20M 136.00,245.40 "
           + "C 136.00,245.40 140.20,247.00 140.20,247.00 "
             + "140.20,247.00 135.00,253.80 135.00,253.80 "
             + "135.00,253.80 132.20,256.40 132.20,256.40 "
             + "132.20,256.40 125.20,258.40 125.20,258.40 "
             + "125.20,258.40 117.80,261.20 117.80,261.20 "
             + "117.80,261.20 121.20,257.60 121.20,257.60 "
             + "121.20,257.60 126.20,256.20 126.20,256.20 "
             + "126.20,256.20 130.40,254.20 130.40,254.20 "
             + "130.40,254.20 136.60,245.60 136.60,245.60M 167.60,255.00 "
           + "C 167.60,255.00 172.40,256.20 172.40,256.20 "
             + "172.40,256.20 170.00,261.20 170.00,261.20 "
             + "170.00,261.20 165.40,266.20 165.40,266.20 "
             + "165.40,266.20 162.00,271.00 162.00,271.00 "
             + "162.00,271.00 159.20,273.40 159.20,273.40 "
             + "159.20,273.40 157.40,278.20 157.40,278.20 "
             + "157.40,278.20 154.80,282.80 154.80,282.80 "
             + "154.80,282.80 153.00,286.00 153.00,286.00 "
             + "153.00,286.00 151.20,289.00 151.20,289.00 "
             + "151.20,289.00 149.80,289.40 149.80,289.40M 155.00,278.80 "
           + "C 155.00,278.80 157.40,273.60 157.40,273.60 "
             + "157.40,273.60 160.60,267.80 160.60,267.80 "
             + "160.60,267.80 168.40,255.20 168.40,255.20M 198.80,261.40 "
           + "C 198.80,261.40 203.20,262.20 203.20,262.20 "
             + "203.20,262.20 201.40,269.20 201.40,269.20 "
             + "201.40,269.20 201.20,274.80 201.20,274.80 "
             + "201.20,274.80 201.20,278.80 201.20,278.80 "
             + "201.20,278.80 199.40,281.80 199.40,281.80 "
             + "199.40,281.80 199.00,285.00 199.00,285.00 "
             + "199.00,285.00 196.00,289.40 196.00,289.40 "
             + "196.00,289.40 193.20,292.20 193.20,292.20 "
             + "193.20,292.20 195.80,286.20 195.80,286.20 "
             + "195.80,286.20 198.80,279.20 198.80,279.20 "
             + "198.80,279.20 198.60,273.40 198.60,273.40 "
             + "198.60,273.40 199.00,261.00 199.00,261.00M 228.40,265.40 "
           + "C 228.40,265.40 232.80,265.40 232.80,265.40 "
             + "232.80,265.40 231.80,272.60 231.80,272.60 "
             + "231.80,272.60 235.20,280.80 235.20,280.80 "
             + "235.20,280.80 238.60,287.40 238.60,287.40 "
             + "238.60,287.40 239.20,293.80 239.20,293.80 "
             + "239.20,293.80 238.00,297.60 238.00,297.60 "
             + "238.00,297.60 237.00,301.60 237.00,301.60 "
             + "237.00,301.60 236.00,305.20 236.00,305.20 "
             + "236.00,305.20 235.60,308.60 235.60,308.60 "
             + "235.60,308.60 235.80,313.60 235.80,313.60 "
             + "235.80,313.60 235.60,313.80 235.60,313.80 "
             + "235.60,313.80 234.00,308.40 234.00,308.40 "
             + "234.00,308.40 236.00,299.40 236.00,299.40 "
             + "236.00,299.40 237.00,291.40 237.00,291.40 "
             + "237.00,291.40 235.00,286.80 235.00,286.80 "
             + "235.00,286.80 232.00,281.20 232.00,281.20 "
             + "232.00,281.20 229.20,275.60 229.20,275.60 "
             + "229.20,275.60 228.40,265.40 228.40,265.40M 265.80,267.00 "
           + "C 265.80,267.00 270.00,267.00 270.00,267.00 "
             + "270.00,267.00 268.40,273.80 268.40,273.80 "
             + "268.40,273.80 268.00,278.60 268.00,278.60 "
             + "268.00,278.60 267.60,281.20 267.60,281.20 "
             + "267.60,281.20 268.40,283.20 268.40,283.20 "
             + "268.40,283.20 270.40,287.40 270.40,287.40 "
             + "270.40,287.40 270.80,288.40 270.80,288.40 "
             + "270.80,288.40 270.20,290.40 270.20,290.40 "
             + "270.20,290.40 268.20,286.40 268.20,286.40 "
             + "268.20,286.40 266.00,283.00 266.00,283.00 "
             + "266.00,283.00 265.40,279.80 265.40,279.80 "
             + "265.40,279.80 266.00,267.20 266.00,267.20M 298.40,264.60 "
           + "C 298.40,264.60 303.20,264.60 303.20,264.60 "
             + "303.20,264.60 303.60,272.20 303.60,272.20 "
             + "303.60,272.20 304.20,277.00 304.20,277.00 "
             + "304.20,277.00 303.00,280.00 303.00,280.00 "
             + "303.00,280.00 303.40,284.40 303.40,284.40 "
             + "303.40,284.40 302.20,287.80 302.20,287.80 "
             + "302.20,287.80 301.00,291.40 301.00,291.40 "
             + "301.00,291.40 300.20,296.20 300.20,296.20 "
             + "300.20,296.20 300.20,300.60 300.20,300.60 "
             + "300.20,300.60 298.80,298.80 298.80,298.80 "
             + "298.80,298.80 298.80,294.00 298.80,294.00 "
             + "298.80,294.00 300.00,288.40 300.00,288.40 "
             + "300.00,288.40 300.60,281.20 300.60,281.20 "
             + "300.60,281.20 300.60,274.40 300.60,274.40 "
             + "300.60,274.40 298.80,264.80 298.80,264.80M 333.20,261.00 "
           + "C 333.20,261.00 337.20,260.00 337.20,260.00 "
             + "337.20,260.00 339.20,265.60 339.20,265.60 "
             + "339.20,265.60 339.60,270.60 339.60,270.60 "
             + "339.60,270.60 339.40,275.40 339.40,275.40 "
             + "339.40,275.40 338.60,281.40 338.60,281.40 "
             + "338.60,281.40 338.20,286.20 338.20,286.20 "
             + "338.20,286.20 336.80,290.40 336.80,290.40 "
             + "336.80,290.40 335.80,293.60 335.80,293.60 "
             + "335.80,293.60 334.40,300.60 334.40,300.60 "
             + "334.40,300.60 333.80,306.80 333.80,306.80 "
             + "333.80,306.80 332.60,302.60 332.60,302.60 "
             + "332.60,302.60 333.40,296.80 333.40,296.80 "
             + "333.40,296.80 334.00,291.00 334.00,291.00 "
             + "334.00,291.00 335.60,286.60 335.60,286.60 "
             + "335.60,286.60 336.20,280.40 336.20,280.40 "
             + "336.20,280.40 336.60,276.40 336.60,276.40 "
             + "336.60,276.40 336.20,272.00 336.20,272.00 "
             + "336.20,272.00 335.20,268.20 335.20,268.20 "
             + "335.20,268.20 333.00,261.00 333.00,261.00M 367.00,253.40 "
           + "C 367.00,253.40 371.40,252.00 371.40,252.00 "
             + "371.40,252.00 373.60,256.60 373.60,256.60 "
             + "373.60,256.60 374.40,262.40 374.40,262.40 "
             + "374.40,262.40 373.80,266.00 373.80,266.00 "
             + "373.80,266.00 373.20,269.60 373.20,269.60 "
             + "373.20,269.60 372.40,272.40 372.40,272.40 "
             + "372.40,272.40 371.40,276.20 371.40,276.20 "
             + "371.40,276.20 370.60,273.20 370.60,273.20 "
             + "370.60,273.20 370.60,271.00 370.60,271.00 "
             + "370.60,271.00 371.80,265.40 371.80,265.40 "
             + "371.80,265.40 371.20,259.80 371.20,259.80 "
             + "371.20,259.80 367.20,253.80 367.20,253.80M 393.20,243.00 "
           + "C 393.20,243.00 398.00,240.80 398.00,240.80 "
             + "398.00,240.80 398.40,245.20 398.40,245.20 "
             + "398.40,245.20 399.20,250.00 399.20,250.00 "
             + "399.20,250.00 399.00,254.20 399.00,254.20 "
             + "399.00,254.20 399.60,257.80 399.60,257.80 "
             + "399.60,257.80 401.80,261.80 401.80,261.80 "
             + "401.80,261.80 402.40,263.00 402.40,263.00 "
             + "402.40,263.00 400.00,262.60 400.00,262.60 "
             + "400.00,262.60 398.20,259.20 398.20,259.20 "
             + "398.20,259.20 396.80,253.00 396.80,253.00 "
             + "396.80,253.00 395.80,247.40 395.80,247.40 "
             + "395.80,247.40 393.40,242.80 393.40,242.80M 415.40,226.80 "
           + "C 415.40,226.80 417.60,223.20 417.60,223.20 "
             + "417.60,223.20 424.80,223.60 424.80,223.60 "
             + "424.80,223.60 430.80,226.20 430.80,226.20 "
             + "430.80,226.20 434.80,229.40 434.80,229.40 "
             + "434.80,229.40 439.00,233.80 439.00,233.80 "
             + "439.00,233.80 441.80,239.00 441.80,239.00 "
             + "441.80,239.00 445.00,241.60 445.00,241.60 "
             + "445.00,241.60 446.20,244.00 446.20,244.00 "
             + "446.20,244.00 442.40,241.60 442.40,241.60 "
             + "442.40,241.60 435.60,233.20 435.60,233.20 "
             + "435.60,233.20 431.00,229.40 431.00,229.40 "
             + "431.00,229.40 424.60,227.60 424.60,227.60 "
             + "424.60,227.60 415.20,227.00 415.20,227.00M 423.60,200.40 "
           + "C 423.60,200.40 423.80,206.00 423.80,206.00 "
             + "423.80,206.00 428.40,206.40 428.40,206.40 "
             + "428.40,206.40 433.20,207.40 433.20,207.40 "
             + "433.20,207.40 438.80,208.60 438.80,208.60 "
             + "438.80,208.60 443.40,207.80 443.40,207.80 "
             + "443.40,207.80 439.00,206.20 439.00,206.20 "
             + "439.00,206.20 434.20,205.60 434.20,205.60 "
             + "434.20,205.60 423.60,201.00 423.60,201.00M 409.20,163.80 "
           + "C 409.20,163.80 413.20,168.00 413.20,168.00 "
             + "413.20,168.00 422.20,167.00 422.20,167.00 "
             + "422.20,167.00 427.20,165.20 427.20,165.20 "
             + "427.20,165.20 431.40,162.00 431.40,162.00 "
             + "431.40,162.00 434.60,158.60 434.60,158.60 "
             + "434.60,158.60 436.00,155.20 436.00,155.20 "
             + "436.00,155.20 436.80,152.80 436.80,152.80 "
             + "436.80,152.80 434.60,154.60 434.60,154.60 "
             + "434.60,154.60 431.20,159.00 431.20,159.00 "
             + "431.20,159.00 426.20,161.80 426.20,161.80 "
             + "426.20,161.80 419.20,163.40 419.20,163.40 "
             + "419.20,163.40 409.20,164.20 409.20,164.20M 387.20,146.80 "
           + "C 387.20,146.80 391.80,149.20 391.80,149.20 "
             + "391.80,149.20 402.40,141.40 402.40,141.40 "
             + "402.40,141.40 413.40,137.40 413.40,137.40 "
             + "413.40,137.40 416.60,136.20 416.60,136.20 "
             + "416.60,136.20 420.40,134.60 420.40,134.60 "
             + "420.40,134.60 413.40,135.20 413.40,135.20 "
             + "413.40,135.20 407.40,137.40 407.40,137.40 "
             + "407.40,137.40 401.60,139.60 401.60,139.60 "
             + "401.60,139.60 394.00,142.00 394.00,142.00 "
             + "394.00,142.00 387.20,147.00 387.20,147.00M 364.80,139.80 "
           + "C 364.80,139.80 368.60,141.40 368.60,141.40 "
             + "368.60,141.40 370.20,137.20 370.20,137.20 "
             + "370.20,137.20 370.80,131.40 370.80,131.40 "
             + "370.80,131.40 370.40,126.80 370.40,126.80 "
             + "370.40,126.80 370.40,122.60 370.40,122.60 "
             + "370.40,122.60 368.60,120.00 368.60,120.00 "
             + "368.60,120.00 368.60,122.60 368.60,122.60 "
             + "368.60,122.60 368.40,124.20 368.40,124.20 "
             + "368.40,124.20 368.00,127.20 368.00,127.20 "
             + "368.00,127.20 367.20,132.20 367.20,132.20 "
             + "367.20,132.20 365.00,140.00 365.00,140.00M 319.20,135.00 "
           + "C 319.20,135.00 323.20,135.20 323.20,135.20 "
             + "323.20,135.20 324.20,130.40 324.20,130.40 "
             + "324.20,130.40 325.80,127.00 325.80,127.00 "
             + "325.80,127.00 328.20,123.20 328.20,123.20 "
             + "328.20,123.20 330.80,120.00 330.80,120.00 "
             + "330.80,120.00 335.00,117.00 335.00,117.00 "
             + "335.00,117.00 339.20,114.60 339.20,114.60 "
             + "339.20,114.60 342.80,112.60 342.80,112.60 "
             + "342.80,112.60 345.60,112.00 345.60,112.00 "
             + "345.60,112.00 349.20,110.40 349.20,110.40 "
             + "349.20,110.40 351.20,109.40 351.20,109.40 "
             + "351.20,109.40 345.60,110.40 345.60,110.40 "
             + "345.60,110.40 342.00,111.20 342.00,111.20 "
             + "342.00,111.20 335.40,113.40 335.40,113.40 "
             + "335.40,113.40 330.60,116.40 330.60,116.40 "
             + "330.60,116.40 325.60,120.40 325.60,120.40 "
             + "325.60,120.40 322.40,124.40 322.40,124.40 "
             + "322.40,124.40 320.40,129.20 320.40,129.20 "
             + "320.40,129.20 319.60,135.00 319.60,135.00M 294.00,134.80 "
           + "C 294.00,134.80 295.20,129.80 295.20,129.80 "
             + "295.20,129.80 297.40,124.40 297.40,124.40 "
             + "297.40,124.40 299.80,120.80 299.80,120.80 "
             + "299.80,120.80 299.60,116.80 299.60,116.80 "
             + "299.60,116.80 298.00,113.40 298.00,113.40 "
             + "298.03,113.26 296.34,110.05 296.20,110.80 "
             + "296.20,110.80 294.40,108.60 294.40,108.60 "
             + "294.40,108.60 292.20,106.00 292.20,106.00 "
             + "292.20,106.00 296.00,106.80 296.00,106.80 "
             + "296.00,106.80 299.80,111.40 299.80,111.40 "
             + "299.80,111.40 301.60,114.40 301.60,114.40 "
             + "301.60,114.40 302.20,119.00 302.20,119.00 "
             + "302.20,119.00 302.20,122.60 302.20,122.60 "
             + "302.20,122.60 301.00,125.60 301.00,125.60 "
             + "301.00,125.60 300.20,128.40 300.20,128.40 "
             + "300.20,128.40 299.20,131.60 299.20,131.60 "
             + "299.20,131.60 298.60,134.60 298.60,134.60 "
             + "298.60,134.60 294.00,135.20 294.00,135.20")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");

	        }
	        if (proteinLocalization == bacteriaArray[bactPos + 3]) {

	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "outerMem_bact")
				  .attr("fill", colorCellCompartment)
				  .attr("d", "M 90.20,197.40 "
           + "C 90.20,197.40 94.60,206.80 94.60,206.80 "
             + "94.60,206.80 100.20,214.00 100.20,214.00 "
             + "100.20,214.00 107.60,221.40 107.60,221.40 "
             + "107.60,221.40 119.20,229.60 119.20,229.60 "
             + "119.20,229.60 130.60,236.00 130.60,236.00 "
             + "130.60,236.00 144.60,242.00 144.60,242.00 "
             + "144.60,242.00 158.60,246.20 158.60,246.20 "
             + "158.60,246.20 177.00,250.80 177.00,250.80 "
             + "177.00,250.80 199.20,254.40 199.20,254.40 "
             + "199.20,254.40 218.40,257.20 218.40,257.20 "
             + "218.40,257.20 239.60,259.00 239.60,259.00 "
             + "239.60,259.00 264.20,259.80 264.20,259.80 "
             + "264.20,259.80 290.40,259.20 290.40,259.20 "
             + "290.40,259.20 314.80,257.00 314.80,257.00 "
             + "314.80,257.00 338.80,253.00 338.80,253.00 "
             + "338.80,253.00 352.80,250.60 352.80,250.60 "
             + "352.80,250.60 371.80,245.40 371.80,245.40 "
             + "371.80,245.40 385.80,239.80 385.80,239.80 "
             + "385.80,239.80 398.00,233.20 398.00,233.20 "
             + "398.00,233.20 408.20,224.20 408.20,224.20 "
             + "408.20,224.20 415.60,211.60 415.60,211.60 "
             + "415.60,211.60 416.60,201.40 416.60,201.40 "
             + "416.60,201.40 415.40,194.40 415.40,194.40 "
             + "415.40,194.40 413.60,189.00 413.60,189.00 "
             + "413.60,189.00 411.20,182.20 411.20,182.20 "
             + "411.20,182.20 407.60,175.60 407.60,175.60 "
             + "407.60,175.60 402.60,168.40 402.60,168.40 "
             + "402.60,168.40 399.20,164.00 399.20,164.00 "
             + "399.20,164.00 393.40,158.60 393.40,158.60 "
             + "393.40,158.60 386.60,154.60 386.60,154.60 "
             + "386.60,154.60 378.00,150.20 378.00,150.20 "
             + "378.00,150.20 368.20,148.00 368.20,148.00 "
             + "368.20,148.00 359.80,145.20 359.80,145.20 "
             + "359.80,145.20 349.80,143.60 349.80,143.60 "
             + "349.80,143.60 340.60,142.20 340.60,142.20 "
             + "340.60,142.20 323.60,141.80 323.60,141.80 "
             + "323.60,141.80 293.80,141.20 293.80,141.20 "
             + "293.80,141.20 240.80,140.80 240.80,140.80 "
             + "240.80,140.80 202.00,138.80 202.00,138.80 "
             + "202.00,138.80 178.40,139.80 178.40,139.80 "
             + "178.40,139.80 161.00,140.40 161.00,140.40 "
             + "161.00,140.40 142.00,142.40 142.00,142.40 "
             + "142.00,142.40 127.80,145.00 127.80,145.00 "
             + "127.80,145.00 115.80,148.00 115.80,148.00 "
             + "115.80,148.00 106.80,151.40 106.80,151.40 "
             + "106.80,151.40 98.20,157.80 98.20,157.80 "
             + "98.20,157.80 92.40,164.40 92.40,164.40 "
             + "92.40,164.40 89.80,173.40 89.80,173.40 "
             + "89.80,173.40 88.80,182.20 88.80,182.20 "
             + "88.80,182.20 90.40,198.20 90.40,198.20M 104.40,228.60 "
           + "C 104.40,228.60 88.20,211.80 88.20,211.80 "
             + "88.20,211.80 84.60,205.80 84.60,205.80 "
             + "84.60,205.80 82.00,196.40 82.00,196.40 "
             + "82.00,196.40 81.80,174.40 81.80,174.40 "
             + "81.80,174.40 82.40,170.60 82.40,170.60 "
             + "82.40,170.60 84.00,165.20 84.00,165.20 "
             + "84.00,165.20 87.60,159.00 87.60,159.00 "
             + "87.60,159.00 92.80,152.60 92.80,152.60 "
             + "92.80,152.60 100.00,148.00 100.00,148.00 "
             + "100.00,148.00 105.80,144.80 105.80,144.80 "
             + "105.80,144.80 111.80,142.60 111.80,142.60 "
             + "111.80,142.60 117.80,140.60 117.80,140.60 "
             + "117.80,140.60 123.60,138.40 123.60,138.40 "
             + "123.60,138.40 132.60,136.80 132.60,136.80 "
             + "132.60,136.80 143.40,135.00 143.40,135.00 "
             + "143.40,135.00 151.20,133.60 151.20,133.60 "
             + "151.20,133.60 158.80,133.80 158.80,133.80 "
             + "158.80,133.80 165.60,132.80 165.60,132.80 "
             + "165.60,132.80 177.00,132.20 177.00,132.20 "
             + "177.00,132.20 186.20,132.00 186.20,132.00 "
             + "186.20,132.00 194.20,131.40 194.20,131.40 "
             + "194.20,131.40 201.40,131.80 201.40,131.80 "
             + "201.40,131.80 209.80,131.40 209.80,131.40 "
             + "209.80,131.40 217.60,131.20 217.60,131.20 "
             + "217.60,131.20 225.20,132.00 225.20,132.00 "
             + "225.20,132.00 234.40,132.40 234.40,132.40 "
             + "234.40,132.40 240.40,132.80 240.40,132.80 "
             + "240.40,132.80 247.80,133.40 247.80,133.40 "
             + "247.80,133.40 256.20,133.80 256.20,133.80 "
             + "256.20,133.80 264.00,134.00 264.00,134.00 "
             + "264.00,134.00 273.80,134.40 273.80,134.40 "
             + "273.80,134.40 285.20,134.40 285.20,134.40 "
             + "285.20,134.40 294.20,134.40 294.20,134.40 "
             + "294.20,134.40 304.20,134.40 304.20,134.40 "
             + "304.20,134.40 318.20,134.20 318.20,134.20 "
             + "318.20,134.20 324.20,134.40 324.20,134.40 "
             + "324.20,134.40 332.00,134.40 332.00,134.40 "
             + "332.00,134.40 339.00,135.00 339.00,135.00 "
             + "339.00,135.00 349.20,135.80 349.20,135.80 "
             + "349.20,135.80 357.60,137.40 357.60,137.40 "
             + "357.60,137.40 365.00,138.60 365.00,138.60 "
             + "365.00,138.60 372.80,141.00 372.80,141.00 "
             + "372.80,141.00 385.20,144.60 385.20,144.60 "
             + "385.20,144.60 389.80,147.40 389.80,147.40 "
             + "389.80,147.40 398.00,151.80 398.00,151.80 "
             + "398.00,151.80 404.20,156.80 404.20,156.80 "
             + "404.20,156.80 408.60,162.00 408.60,162.00 "
             + "408.60,162.00 413.00,167.00 413.00,167.00 "
             + "413.00,167.00 418.60,177.60 418.60,177.60 "
             + "418.60,177.60 421.60,186.00 421.60,186.00 "
             + "421.60,186.00 424.00,195.00 424.00,195.00 "
             + "424.00,195.00 424.40,200.60 424.40,200.60 "
             + "424.40,200.60 424.60,206.00 424.60,206.00 "
             + "424.60,206.00 424.60,212.60 424.60,212.60 "
             + "424.60,212.60 422.80,216.80 422.80,216.80 "
             + "422.80,216.80 420.20,221.00 420.20,221.00 "
             + "420.20,221.00 418.60,224.20 418.60,224.20 "
             + "418.60,224.20 415.40,228.40 415.40,228.40 "
             + "415.40,228.40 411.40,232.20 411.40,232.20 "
             + "411.40,232.20 405.80,237.80 405.80,237.80 "
             + "405.80,237.80 399.40,241.80 399.40,241.80 "
             + "399.40,241.80 396.00,243.60 396.00,243.60 "
             + "396.00,243.60 387.80,247.40 387.80,247.40 "
             + "387.80,247.40 374.40,252.00 374.40,252.00 "
             + "374.40,252.00 366.00,254.80 366.00,254.80 "
             + "366.00,254.80 357.00,257.60 357.00,257.60 "
             + "357.00,257.60 344.40,260.00 344.40,260.00 "
             + "344.40,260.00 332.00,262.40 332.00,262.40 "
             + "332.00,262.40 320.80,263.60 320.80,263.60 "
             + "320.80,263.60 306.80,265.20 306.80,265.20 "
             + "306.80,265.20 298.60,265.80 298.60,265.80 "
             + "298.60,265.80 285.80,267.00 285.80,267.00 "
             + "285.80,267.00 275.00,266.60 275.00,266.60 "
             + "275.00,266.60 264.00,267.60 264.00,267.60 "
             + "264.00,267.60 249.40,267.20 249.40,267.20 "
             + "249.40,267.20 232.40,265.60 232.40,265.60 "
             + "232.40,265.60 220.20,265.00 220.20,265.00 "
             + "220.20,265.00 206.60,262.80 206.60,262.80 "
             + "206.60,262.80 194.20,261.00 194.20,261.00 "
             + "194.20,261.00 172.40,256.80 172.40,256.80 "
             + "172.40,256.80 154.40,252.00 154.40,252.00 "
             + "154.40,252.00 141.40,248.00 141.40,248.00 "
             + "141.40,248.00 135.60,245.80 135.60,245.80 "
             + "135.60,245.80 128.20,242.40 128.20,242.40 "
             + "128.20,242.40 118.20,237.60 118.20,237.60 "
             + "118.20,237.60 104.40,228.60 104.40,228.60")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");

	        }
	        else if (proteinLocalization == bacteriaArray[bactPos + 4]) {

	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "periplasmic_bact")
				  .attr("fill", colorCellCompartment)
				  .attr("d", "M 97.80,180.20 "
           + "C 97.80,180.20 99.00,173.20 99.00,173.20 "
             + "99.00,173.20 101.60,166.60 101.60,166.60 "
             + "101.60,166.60 107.80,161.40 107.80,161.40 "
             + "107.80,161.40 117.40,155.60 117.40,155.60 "
             + "117.40,155.60 129.80,151.60 129.80,151.60 "
             + "129.80,151.60 145.60,149.40 145.60,149.40 "
             + "145.60,149.40 163.60,147.40 163.60,147.40 "
             + "163.60,147.40 179.60,147.40 179.60,147.40 "
             + "179.60,147.40 198.40,147.20 198.40,147.20 "
             + "198.40,147.20 221.00,147.80 221.00,147.80 "
             + "221.00,147.80 237.60,147.80 237.60,147.80 "
             + "237.60,147.80 266.60,148.60 266.60,148.60 "
             + "266.60,148.60 293.60,148.80 293.60,148.80 "
             + "293.60,148.80 321.40,148.40 321.40,148.40 "
             + "321.40,148.40 335.40,148.80 335.40,148.80 "
             + "335.40,148.80 349.00,149.80 349.00,149.80 "
             + "349.00,149.80 361.20,152.20 361.20,152.20 "
             + "361.20,152.20 373.40,156.00 373.40,156.00 "
             + "373.40,156.00 385.20,160.80 385.20,160.80 "
             + "385.20,160.80 393.00,167.00 393.00,167.00 "
             + "393.00,167.00 399.00,174.20 399.00,174.20 "
             + "399.00,174.20 404.60,183.40 404.60,183.40 "
             + "404.60,183.40 407.60,192.80 407.60,192.80 "
             + "407.60,192.80 408.80,201.00 408.80,201.00 "
             + "408.80,201.00 407.80,209.40 407.80,209.40 "
             + "407.80,209.40 404.20,217.40 404.20,217.40 "
             + "404.20,217.40 397.80,224.40 397.80,224.40 "
             + "397.80,224.40 388.80,230.40 388.80,230.40 "
             + "388.80,230.40 376.00,236.00 376.00,236.00 "
             + "376.00,236.00 363.80,240.00 363.80,240.00 "
             + "363.80,240.00 347.40,243.80 347.40,243.80 "
             + "347.40,243.80 331.80,245.80 331.80,245.80 "
             + "331.80,245.80 313.40,248.20 313.40,248.20 "
             + "313.40,248.20 295.00,248.80 295.00,248.80 "
             + "295.00,248.80 268.40,249.80 268.40,249.80 "
             + "268.40,249.80 238.20,249.00 238.20,249.00 "
             + "238.20,249.00 215.20,247.40 215.20,247.40 "
             + "215.20,247.40 199.60,245.40 199.60,245.40 "
             + "199.60,245.40 184.60,243.00 184.60,243.00 "
             + "184.60,243.00 169.40,239.40 169.40,239.40 "
             + "169.40,239.40 153.80,235.60 153.80,235.60 "
             + "153.80,235.60 139.40,230.60 139.40,230.60 "
             + "139.40,230.60 127.00,225.20 127.00,225.20 "
             + "127.00,225.20 116.60,218.40 116.60,218.40 "
             + "116.60,218.40 107.60,210.00 107.60,210.00 "
             + "107.60,210.00 101.40,201.00 101.40,201.00 "
             + "101.40,201.00 98.60,193.80 98.60,193.80 "
             + "98.60,193.80 97.60,180.20 97.60,180.20M 90.20,197.40 "
           + "C 90.20,197.40 94.60,206.80 94.60,206.80 "
             + "94.60,206.80 100.20,214.00 100.20,214.00 "
             + "100.20,214.00 107.60,221.40 107.60,221.40 "
             + "107.60,221.40 119.20,229.60 119.20,229.60 "
             + "119.20,229.60 130.60,236.00 130.60,236.00 "
             + "130.60,236.00 144.60,242.00 144.60,242.00 "
             + "144.60,242.00 158.60,246.20 158.60,246.20 "
             + "158.60,246.20 177.00,250.80 177.00,250.80 "
             + "177.00,250.80 199.20,254.40 199.20,254.40 "
             + "199.20,254.40 218.40,257.20 218.40,257.20 "
             + "218.40,257.20 239.60,259.00 239.60,259.00 "
             + "239.60,259.00 264.20,259.80 264.20,259.80 "
             + "264.20,259.80 290.40,259.20 290.40,259.20 "
             + "290.40,259.20 314.80,257.00 314.80,257.00 "
             + "314.80,257.00 338.80,253.00 338.80,253.00 "
             + "338.80,253.00 352.80,250.60 352.80,250.60 "
             + "352.80,250.60 371.80,245.40 371.80,245.40 "
             + "371.80,245.40 385.80,239.80 385.80,239.80 "
             + "385.80,239.80 398.00,233.20 398.00,233.20 "
             + "398.00,233.20 408.20,224.20 408.20,224.20 "
             + "408.20,224.20 415.60,211.60 415.60,211.60 "
             + "415.60,211.60 416.60,201.40 416.60,201.40 "
             + "416.60,201.40 415.40,194.40 415.40,194.40 "
             + "415.40,194.40 413.60,189.00 413.60,189.00 "
             + "413.60,189.00 411.20,182.20 411.20,182.20 "
             + "411.20,182.20 407.60,175.60 407.60,175.60 "
             + "407.60,175.60 402.60,168.40 402.60,168.40 "
             + "402.60,168.40 399.20,164.00 399.20,164.00 "
             + "399.20,164.00 393.40,158.60 393.40,158.60 "
             + "393.40,158.60 386.60,154.60 386.60,154.60 "
             + "386.60,154.60 378.00,150.20 378.00,150.20 "
             + "378.00,150.20 368.20,148.00 368.20,148.00 "
             + "368.20,148.00 359.80,145.20 359.80,145.20 "
             + "359.80,145.20 349.80,143.60 349.80,143.60 "
             + "349.80,143.60 340.60,142.20 340.60,142.20 "
             + "340.60,142.20 323.60,141.80 323.60,141.80 "
             + "323.60,141.80 293.80,141.20 293.80,141.20 "
             + "293.80,141.20 240.80,140.80 240.80,140.80 "
             + "240.80,140.80 202.00,138.80 202.00,138.80 "
             + "202.00,138.80 178.40,139.80 178.40,139.80 "
             + "178.40,139.80 161.00,140.40 161.00,140.40 "
             + "161.00,140.40 142.00,142.40 142.00,142.40 "
             + "142.00,142.40 127.80,145.00 127.80,145.00 "
             + "127.80,145.00 115.80,148.00 115.80,148.00 "
             + "115.80,148.00 106.80,151.40 106.80,151.40 "
             + "106.80,151.40 98.20,157.80 98.20,157.80 "
             + "98.20,157.80 92.40,164.40 92.40,164.40 "
             + "92.40,164.40 89.80,173.40 89.80,173.40 "
             + "89.80,173.40 88.80,182.20 88.80,182.20 "
             + "88.80,182.20 90.40,198.20 90.40,198.20")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");

	        }
	        else if (proteinLocalization == bacteriaArray[bactPos + 5]) {
	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "plasmaMem_bact")
				  .attr("fill", colorCellCompartment)
				  .attr("d", "M 202.00,147.21 "
           + "C 202.00,147.21 219.00,148.00 219.00,148.00 "
             + "219.00,148.00 254.00,148.00 254.00,148.00 "
             + "254.00,148.00 271.00,149.00 271.00,149.00 "
             + "271.00,149.00 306.00,149.00 306.00,149.00 "
             + "306.00,149.00 318.00,148.02 318.00,148.02 "
             + "318.00,148.02 334.00,149.00 334.00,149.00 "
             + "350.25,149.03 369.58,152.56 384.00,160.32 "
             + "406.56,172.46 421.09,210.25 393.00,227.94 "
             + "364.57,245.83 317.01,248.62 284.00,249.00 "
             + "284.00,249.00 274.00,249.95 274.00,249.95 "
             + "274.00,249.95 262.00,249.95 262.00,249.95 "
             + "262.00,249.95 247.00,249.00 247.00,249.00 "
             + "220.06,248.96 193.15,245.40 167.00,238.87 "
             + "153.95,235.62 141.12,232.26 129.00,226.19 "
             + "116.01,219.69 101.69,207.86 98.52,193.00 "
             + "97.85,189.86 97.97,185.29 98.00,182.00 "
             + "98.10,174.08 99.61,167.72 106.02,162.52 "
             + "121.82,149.70 142.92,150.15 162.00,147.21 "
             + "162.00,147.21 202.00,147.21 202.00,147.21 Z "
           + "M 161.00,156.00 "
           + "C 148.39,156.02 124.33,158.86 114.04,166.10 "
             + "107.53,170.69 106.85,177.63 107.01,185.00 "
             + "107.49,205.75 126.93,215.97 144.00,222.99 "
             + "172.82,234.84 204.26,237.99 235.00,240.09 "
             + "235.00,240.09 247.00,241.00 247.00,241.00 "
             + "247.00,241.00 281.00,241.00 281.00,241.00 "
             + "281.00,241.00 299.00,240.00 299.00,240.00 "
             + "299.00,240.00 310.00,239.09 310.00,239.09 "
             + "328.23,237.84 329.12,237.66 347.00,234.42 "
             + "356.33,232.74 374.95,228.16 383.00,223.82 "
             + "388.04,221.11 394.12,216.90 397.16,212.00 "
             + "403.81,201.29 398.22,185.88 390.47,177.30 "
             + "388.27,174.86 381.89,170.04 379.00,168.35 "
             + "363.76,159.42 344.36,157.03 327.00,157.00 "
             + "327.00,157.00 312.00,156.00 312.00,156.00 "
             + "312.00,156.00 295.00,157.00 295.00,157.00 "
             + "295.00,157.00 276.00,157.00 276.00,157.00 "
             + "276.00,157.00 261.00,156.00 261.00,156.00 "
             + "261.00,156.00 217.00,156.00 217.00,156.00 "
             + "217.00,156.00 202.00,155.14 202.00,155.14 "
             + "202.00,155.14 174.00,155.14 174.00,155.14 "
             + "168.18,156.12 166.73,155.99 161.00,156.00 Z")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");
	        }

	    }
	    else if (cellType == cellTypeArray[cellPos + 2]) {
            
            if (proteinLocalization == archeaArray[archPos]) {

	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "cytoplasm_arch")
				  .attr("fill", colorCellCompartment)
				  .attr("d", "M 216.00,143.21 "
           + "C 216.00,143.21 233.00,144.00 233.00,144.00 "
             + "233.00,144.00 258.00,144.00 258.00,144.00 "
            + "258.00,144.00 270.00,144.95 270.00,144.95 "
             + "270.00,144.95 288.00,144.95 288.00,144.95 "
             + "288.00,144.95 303.00,144.00 303.00,144.00 "
             + "329.79,143.96 361.74,142.74 386.00,155.63 "
             + "405.99,166.25 421.96,194.98 411.33,217.00 "
             + "407.30,225.36 403.43,228.43 396.00,233.56 "
             + "382.00,243.23 363.51,247.45 347.00,250.42 "
             + "329.76,253.53 312.52,255.80 295.00,256.00 "
             + "295.00,256.00 282.00,257.00 282.00,257.00 "
             + "282.00,257.00 258.00,257.00 258.00,257.00 "
             + "258.00,257.00 248.00,256.04 248.00,256.04 "
             + "248.00,256.04 232.00,256.04 232.00,256.04 "
             + "212.78,255.97 193.63,251.54 175.00,247.23 "
             + "175.00,247.23 164.00,245.10 164.00,245.10 "
             + "153.90,242.64 137.10,237.01 128.00,232.22 "
             + "118.65,227.30 106.81,219.62 100.63,211.00 "
             + "89.85,195.94 87.62,169.39 103.09,156.53 "
             + "116.13,145.68 140.63,145.76 157.00,143.21 "
             + "157.00,143.21 216.00,143.21 216.00,143.21 Z "
           + "M 183.00,181.27 "
           + "C 178.83,178.64 178.40,176.55 173.00,174.00 "
             + "167.73,182.30 170.09,179.42 168.00,188.00 "
             + "165.69,186.69 161.02,183.73 158.31,184.70 "
             + "154.87,185.94 155.70,197.23 156.85,199.98 "
             + "158.84,204.75 165.60,207.57 170.00,210.00 "
             + "170.00,210.00 172.00,206.00 172.00,206.00 "
             + "176.63,206.14 177.62,205.42 179.00,201.00 "
             + "182.31,204.31 185.39,207.34 188.34,211.00 "
             + "189.80,212.82 191.81,215.88 194.09,216.64 "
             + "197.26,217.69 200.66,214.75 203.00,213.00 "
             + "209.47,220.12 212.50,215.07 218.00,216.06 "
             + "222.88,216.93 223.93,221.99 233.00,220.87 "
             + "238.39,220.20 240.62,216.68 243.42,216.51 "
             + "246.65,216.31 249.61,220.59 258.00,220.96 "
             + "262.68,221.17 269.86,220.22 273.90,217.78 "
             + "277.05,215.87 277.64,213.68 280.21,212.60 "
             + "282.26,211.74 285.56,212.19 288.00,211.73 "
             + "288.00,211.73 295.00,209.30 295.00,209.30 "
             + "300.43,207.99 301.06,211.62 305.09,213.69 "
             + "306.97,214.65 308.92,214.87 311.00,214.96 "
             + "318.23,215.27 320.63,213.25 324.00,207.00 "
             + "326.40,207.80 333.05,209.76 334.79,210.93 "
             + "337.78,212.93 339.69,217.96 343.96,217.04 "
             + "350.60,215.60 347.98,206.37 350.02,203.31 "
             + "352.10,200.20 358.62,201.00 362.00,201.00 "
             + "362.00,201.00 361.43,187.43 361.43,187.43 "
             + "361.43,187.43 359.71,185.81 359.71,185.81 "
             + "359.71,185.81 349.91,182.96 349.91,182.96 "
             + "349.91,182.96 347.00,184.00 347.00,184.00 "
             + "346.23,183.02 345.77,182.18 344.78,181.32 "
             + "338.50,175.86 334.72,184.40 330.00,185.10 "
             + "330.00,185.10 323.00,184.09 323.00,184.09 "
             + "317.22,183.93 308.89,186.01 304.00,189.00 "
             + "304.32,187.68 304.72,186.38 304.76,185.00 "
             + "305.12,173.31 291.64,183.07 287.00,183.79 "
             + "280.15,184.86 274.10,183.39 267.00,187.84 "
             + "263.59,189.98 261.11,193.43 258.00,196.00 "
             + "258.00,196.00 258.00,189.00 258.00,189.00 "
             + "258.00,189.00 241.00,191.00 241.00,191.00 "
             + "241.00,191.00 244.00,187.00 244.00,187.00 "
             + "233.85,183.23 233.10,183.03 233.00,175.00 "
             + "233.00,175.00 224.00,176.61 224.00,176.61 "
             + "220.71,176.54 202.87,169.36 198.06,179.10 "
             + "196.49,182.31 198.71,184.63 198.83,187.42 "
             + "198.83,187.42 197.00,198.00 197.00,198.00 "
             + "184.77,192.16 185.74,194.85 182.08,193.26 "
             + "178.62,191.77 179.04,189.08 180.63,188.69 "
             + "182.26,188.29 185.43,190.63 187.00,191.16 "
             + "190.53,192.85 191.63,192.39 195.00,191.16 "
             + "192.15,181.45 189.14,185.13 183.00,181.27 Z "
           + "M 213.00,180.00 "
           + "C 208.13,180.62 205.54,182.72 201.00,181.00 "
             + "205.47,178.57 208.48,176.69 213.00,180.00 Z "
           + "M 176.00,181.00 "
           + "C 176.00,181.00 177.00,185.00 177.00,185.00 "
             + "177.00,185.00 173.00,186.00 173.00,186.00 "
             + "173.00,186.00 174.00,181.00 174.00,181.00 "
             + "174.00,181.00 176.00,181.00 176.00,181.00 Z "
           + "M 219.00,182.00 "
           + "C 219.00,182.00 220.00,183.00 220.00,183.00 "
             + "220.00,183.00 220.00,185.00 220.00,185.00 "
             + "220.00,185.00 216.00,187.00 216.00,187.00 "
             + "216.00,187.00 217.00,182.00 217.00,182.00 "
             + "217.00,182.00 219.00,182.00 219.00,182.00 Z "
           + "M 211.00,184.00 "
           + "C 211.00,184.00 213.00,191.00 213.00,191.00 "
             + "213.00,191.00 207.00,187.00 207.00,187.00 "
            + "207.00,187.00 205.00,199.00 205.00,199.00 "
             + "200.17,195.13 202.87,186.46 211.00,184.00 Z "
           + "M 300.00,184.00 "
           + "C 299.64,188.68 299.23,189.58 296.00,193.00 "
             + "294.83,187.94 294.58,185.73 300.00,184.00 Z "
           + "M 344.00,188.00 "
           + "C 344.00,188.00 336.00,188.00 336.00,188.00 "
             + "339.41,184.17 340.59,184.17 344.00,188.00 Z "
           + "M 217.02,192.41 "
           + "C 219.89,188.08 228.05,187.09 232.00,190.00 "
             + "221.47,190.37 227.73,193.77 216.00,198.00 "
             + "216.07,196.13 215.94,194.05 217.02,192.41 Z "
           + "M 288.00,189.00 "
           + "C 286.68,193.93 285.68,194.94 281.00,197.00 "
             + "281.00,197.00 277.00,189.00 277.00,189.00 "
             + "277.00,189.00 288.00,189.00 288.00,189.00 Z "
           + "M 322.97,191.47 "
           + "C 324.41,193.49 324.89,201.92 315.00,198.38 "
             + "315.00,198.38 309.00,196.00 309.00,196.00 "
             + "311.54,187.87 321.28,189.10 322.97,191.47 Z "
           + "M 166.00,201.00 "
           + "C 160.91,198.19 160.19,195.56 160.00,190.00 "
             + "166.50,191.98 165.98,195.02 166.00,201.00 Z "
           + "M 357.00,190.00 "
           + "C 357.00,190.00 358.00,196.00 358.00,196.00 "
             + "358.00,196.00 352.00,197.00 352.00,197.00 "
             + "352.38,192.43 352.61,191.63 357.00,190.00 Z "
           + "M 277.00,199.00 "
           + "C 277.00,199.00 272.00,199.00 272.00,199.00 "
             + "272.00,199.00 272.00,191.00 272.00,191.00 "
             + "272.00,191.00 277.00,199.00 277.00,199.00 Z "
           + "M 254.00,193.00 "
           + "C 254.00,193.00 253.00,198.00 253.00,198.00 "
             + "253.00,198.00 249.00,193.00 249.00,193.00 "
             + "249.00,193.00 254.00,193.00 254.00,193.00 Z "
           + "M 268.00,202.00 "
           + "C 268.00,202.00 278.00,204.00 278.00,204.00 "
             + "270.03,205.91 268.52,203.71 261.00,202.00 "
             + "261.00,202.00 266.00,194.00 266.00,194.00 "
             + "266.00,194.00 268.00,202.00 268.00,202.00 Z "
           + "M 234.00,196.00 "
           + "C 232.87,198.71 232.87,198.45 230.00,199.00 "
             + "230.00,199.00 234.00,196.00 234.00,196.00 Z "
           + "M 248.00,199.00 "
           + "C 248.00,199.00 248.00,201.00 248.00,201.00 "
             + "243.96,201.54 243.69,200.90 243.00,197.00 "
             + "243.00,197.00 248.00,199.00 248.00,199.00 Z "
           + "M 197.00,211.00 "
           + "C 191.30,208.30 187.54,203.09 184.00,198.00 "
             + "192.09,198.68 199.52,201.24 197.00,211.00 Z "
           + "M 173.00,203.00 "
           + "C 173.00,203.00 172.00,199.00 172.00,199.00 "
             + "174.13,200.59 174.15,200.57 173.00,203.00 Z "
           + "M 213.00,199.00 "
           + "C 210.51,203.43 204.82,209.56 201.00,203.00 "
             + "201.00,203.00 213.00,199.00 213.00,199.00 Z "
           + "M 311.00,202.00 "
           + "C 311.00,202.00 308.00,203.00 308.00,203.00 "
             + "308.00,203.00 307.00,200.00 307.00,200.00 "
             + "307.00,200.00 311.00,202.00 311.00,202.00 Z "
           + "M 220.00,201.00 "
           + "C 219.37,209.85 211.27,216.47 207.00,209.00 "
             + "207.00,209.00 220.00,201.00 220.00,201.00 Z "
           + "M 341.00,201.00 "
           + "C 341.00,201.00 338.00,204.00 338.00,204.00 "
             + "338.00,204.00 336.00,202.00 336.00,202.00 "
             + "336.00,202.00 336.00,201.00 336.00,201.00 "
             + "336.00,201.00 341.00,201.00 341.00,201.00 Z "
           + "M 235.00,205.00 "
           + "C 235.88,207.26 237.82,210.52 236.84,212.87 "
             + "234.92,217.45 226.60,217.67 224.84,211.95 "
             + "223.97,209.12 225.91,205.59 227.00,203.00 "
             + "227.00,203.00 235.00,205.00 235.00,205.00 Z "
           + "M 319.00,205.00 "
           + "C 314.64,210.60 310.92,211.76 306.00,206.00 "
             + "306.00,206.00 319.00,205.00 319.00,205.00 Z "
           + "M 273.00,209.00 "
           + "C 273.00,209.00 272.00,215.00 272.00,215.00 "
             + "272.00,215.00 258.00,215.78 258.00,215.78 "
             + "258.00,215.78 246.00,211.00 246.00,211.00 "
             + "255.11,203.14 262.62,207.60 273.00,209.00 Z")
		   .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");

	        }
	        else if (proteinLocalization == archeaArray[archPos+1]) {

	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "extraCellular_arch")
				  .attr("fill", colorCellCompartment)
				  .attr("d", "M 29.00,1.00 "
           + "C 29.00,1.00 46.00,0.00 46.00,0.00 "
             + "46.00,0.00 167.00,0.00 167.00,0.00 "
             + "167.00,0.00 182.00,1.00 182.00,1.00 "
             + "182.00,1.00 361.00,1.00 361.00,1.00 "
             + "361.00,1.00 442.00,1.00 442.00,1.00 "
             + "442.00,1.00 457.00,2.00 457.00,2.00 "
             + "457.00,2.00 500.00,2.00 500.00,2.00 "
             + "500.00,2.00 500.00,62.00 500.00,62.00 "
             + "500.00,62.00 499.00,79.00 499.00,79.00 "
             + "499.00,79.00 499.00,259.00 499.00,259.00 "
             + "499.00,259.00 500.00,274.00 500.00,274.00 "
             + "500.00,274.00 500.00,398.00 500.00,398.00 "
             + "500.00,398.00 283.00,398.00 283.00,398.00 "
             + "283.00,398.00 174.00,398.00 174.00,398.00 "
             + "174.00,398.00 159.00,399.00 159.00,399.00 "
             + "159.00,399.00 0.00,399.00 0.00,399.00 "
             + "0.00,399.00 0.00,291.00 0.00,291.00 "
             + "0.00,291.00 1.00,276.00 1.00,276.00 "
             + "1.00,276.00 1.00,1.00 1.00,1.00 "
             + "1.00,1.00 29.00,1.00 29.00,1.00 Z "
           + "M 94.00,148.39 "
           + "C 80.03,159.40 80.82,171.04 81.00,187.00 "
             + "81.25,208.16 94.87,224.21 112.00,235.30 "
             + "136.87,251.40 166.06,258.34 195.00,262.42 "
             + "195.00,262.42 246.00,268.00 246.00,268.00 "
             + "246.00,268.00 275.00,268.00 275.00,268.00 "
             + "275.00,268.00 292.00,267.00 292.00,267.00 "
             + "311.82,266.97 331.58,263.49 351.00,259.80 "
             + "359.98,258.10 383.26,252.57 391.00,249.10 "
             + "394.44,247.55 400.75,243.52 404.00,241.33 "
             + "410.15,237.18 420.65,227.73 423.64,221.00 "
             + "425.34,217.16 426.51,208.34 426.82,204.00 "
             + "427.08,200.28 426.12,196.62 425.40,193.00 "
             + "421.93,175.63 412.44,158.89 397.00,149.46 "
             + "381.42,139.95 362.82,136.92 345.00,134.72 "
             + "345.00,134.72 327.00,133.00 327.00,133.00 "
             + "327.00,133.00 307.00,133.00 307.00,133.00 "
             + "307.00,133.00 241.00,133.00 241.00,133.00 "
             + "241.00,133.00 219.00,132.00 219.00,132.00 "
             + "219.00,132.00 204.00,131.14 204.00,131.14 "
             + "204.00,131.14 159.00,131.14 159.00,131.14 "
             + "138.22,134.29 111.01,134.97 94.00,148.39 Z")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");


	        }
	        else if (proteinLocalization == archeaArray[archPos+2]) {

	            var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "plasmaMem_arch")
				  .attr("fill", colorCellCompartment)
				  .attr("d", "M 207.00,130.00 "
           + "C 207.00,130.00 220.00,130.00 220.00,130.00 "
             + "220.00,130.00 241.00,131.00 241.00,131.00 "
             + "241.00,131.00 258.00,132.00 258.00,132.00 "
             + "288.45,132.05 326.67,130.07 356.00,134.92 "
             + "370.17,137.26 388.19,141.37 400.00,149.79 "
             + "420.32,164.26 437.24,198.88 424.60,223.00 "
             + "420.80,230.25 413.82,236.59 407.00,240.95 "
             + "378.02,259.44 340.69,264.78 307.00,267.09 "
             + "307.00,267.09 295.00,268.00 295.00,268.00 "
             + "295.00,268.00 276.00,269.00 276.00,269.00 "
             + "276.00,269.00 248.00,269.00 248.00,269.00 "
             + "248.00,269.00 236.00,268.09 236.00,268.09 "
             + "208.12,266.18 180.77,262.34 154.00,254.02 "
             + "134.44,247.95 122.10,243.44 105.00,231.43 "
             + "97.95,226.48 91.03,220.40 86.47,213.00 "
             + "76.85,197.41 75.15,167.59 87.33,153.00 "
             + "95.53,143.17 111.77,138.12 124.00,135.42 "
             + "135.36,132.92 155.55,130.02 167.00,130.00 "
             + "173.01,129.99 179.03,130.27 185.00,129.42 "
             + "194.21,128.30 198.33,129.99 207.00,130.00 Z "
           + "M 104.04,155.79 "
           + "C 87.51,168.18 89.68,195.71 100.63,211.00 "
             + "106.57,219.29 117.16,226.21 126.00,231.14 "
             + "141.43,239.75 158.94,243.66 176.00,247.42 "
             + "203.68,253.53 214.14,255.96 243.00,256.00 "
             + "243.00,256.00 258.00,257.00 258.00,257.00 "
             + "258.00,257.00 280.00,257.00 280.00,257.00 "
             + "280.00,257.00 297.00,256.00 297.00,256.00 "
             + "313.14,255.97 331.08,253.29 347.00,250.42 "
             + "362.68,247.60 380.42,243.60 394.00,234.91 "
             + "402.14,229.70 407.03,225.91 411.33,217.00 "
             + "421.83,195.26 406.42,167.19 387.00,156.17 "
             + "363.54,142.86 330.28,143.96 304.00,144.00 "
             + "304.00,144.00 292.00,144.95 292.00,144.95 "
             + "292.00,144.95 273.00,144.95 273.00,144.95 "
             + "273.00,144.95 258.00,144.00 258.00,144.00 "
             + "258.00,144.00 189.00,143.14 189.00,143.14 "
             + "189.00,143.14 158.00,143.14 158.00,143.14 "
             + "141.39,145.67 117.68,145.56 104.04,155.79 Z")
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");

	        }

	    }


    }

    function selectCellPicture() {
	        
        //Clear old image for next uploading
        var divImg = getPopupObject('myCanvas');
        while (divImg.hasChildNodes()) {
			  divImg.removeChild(divImg.firstChild);
        }
        //Select eukaryota
	if (cellType == cellTypeArray[cellPos]) {
		//SVG		   
		   var divSVG = d3.select("#myCanvas") 
		  	        .append("svg")
			        .attr("width",500)
        	        .attr("height",400);
					
		   var svg = d3.select("svg")
		   	   	    .append("image")
					.attr("xlink:href", "./eukaryota-2D.jpg")
        	        .attr("x",0)
					.attr("y",0)
					.attr("width",500)
        	        .attr("height",400)
					.attr("onmousemove", "javaScript:ClearPopup();");	   				
            
        }
        //Select bacteria
	else if (cellType == cellTypeArray[cellPos + 1]) {
					
			//SVG		   
		   var divSVG = d3.select("#myCanvas") 
		  	        .append("svg")
			        .attr("width",500)
        	        .attr("height",400);
		   var svg = d3.select("svg")
		   	   	    .append("image")
					.attr("xlink:href", "./bacteria-2D.jpg")
        	        .attr("x",0)
					.attr("y",0)
					.attr("width",500)
        	        .attr("height",400)
					.attr("onmousemove", "javaScript:ClearPopup();");
        }
        //Select archaea
	else if (cellType == cellTypeArray[cellPos + 2]) {
			
			
		   //SVG		   
		   var divSVG = d3.select("#myCanvas") 
		  	        .append("svg")
			        .attr("width",500)
        	        .attr("height",400);
		   var svg = d3.select("svg")
		   	   	    .append("image")
					.attr("xlink:href", "./archaea-2D.jpg")
        	        .attr("x",0)
					.attr("y",0)
					.attr("width",500)
        	        .attr("height",400)
					.attr("onmousemove", "javaScript:ClearPopup();");	
		}


    }	
	
	function isOneProteinInFile()
	{
	 		 // Declaring variables for checking isOneProtein
						 var checkOneProtein = "";
        				 var compareProtein = "";        				 
        				 var oneProtein = scoreProtein[0];
                    	 checkOneProtein = oneProtein.proteinID;
				//Checking only one protein in file				
				for (var i = 0; i < scoreProtein.length; i++) {
						   	 	var localization = scoreProtein[i]
              					compareProtein = localization.proteinID;
          										 
          						if(compareProtein != checkOneProtein)
          						{
          							isNotOneProtein = true;
									break;
          						}
								
				}
				
				if(isNotOneProtein == false)
				{
				 	writeHeader('headerPP',oneProtein.proteinID);
				}				 
						 
	}
	function definedColorLocalization() {
  
        var colorLocalizationArray =[];
	    
		//Blue - 0
	    var blue_colorLocalizationArray=["#EBEBE0","#D6E0EB","#C2D1E0","#ADC2D6","#99B2CC","#85A3C2","#5C85AD","#336699","#29527A","#1F3D5C"];

		//Green - 1
		 var green_colorLocalizationArray=["#E8F4E9","#D7FCDC","#B9FAC3","#96F6A5","#76E687","#4DCB60","#379745","#167023","#045310","#003F0A"];
	
	    //Lila - 2
		var lila_colorLocalizationArray=["#FAE6FA","#F5CCF5","#F0B2F0","#EB99EB","#E680E6","#E066E0","#D633D6","#B800B8","#8F008F","#660066"];
			
		//Red - 3
		var red_colorLocalizationArray=["#FAE6E6","#F5CCCC","#F0B2B2","#EB9999","#E68080","#E06666","#D63333","#CC0000","#A30000","#7A0000"];
		
		
	     if(selectedcolorLoc == "blue"){
			colorLocalizationArray = blue_colorLocalizationArray.slice(0);
		 }
		 else if (selectedcolorLoc == "green"){
			  colorLocalizationArray = green_colorLocalizationArray.slice(0); 
		 }
		 else if (selectedcolorLoc == "lila"){
			  colorLocalizationArray = lila_colorLocalizationArray.slice(0); 
		 }
		 else if (selectedcolorLoc == "red"){
			  colorLocalizationArray = red_colorLocalizationArray.slice(0); 
		 }
		 else{
			//Green 
			  colorLocalizationArray=["#E8F4E9","#D7FCDC","#B9FAC3","#96F6A5","#76E687","#4DCB60","#379745","#167023","#045310","#003F0A"];
		 }
		 
		
	    //Array containing protein compartment, number of proteins per compartment and color
	    var proteinLocalizationColorArray = [];
	    var colorCellCompartment;

	    var e_chl = 0;
	    var e_chl_mem = 0;
	    var e_cyt = 0;
	    var e_end_ret = 0;
	    var e_end_ret_mem = 0;
	    var e_ext_cell = 0;
	    var e_gol_app = 0;
	    var e_gol_app_mem = 0;
	    var e_mit = 0;
	    var e_mit_mem = 0;
	    var e_nuc = 0;
	    var e_nuc_mem = 0;
	    var e_per = 0;
	    var e_per_mem = 0;
	    var e_pla = 0;
	    var e_pla_mem = 0;
	    var e_vac = 0;
	    var e_vac_mem = 0;
	    var e_cellcompartment = 0;

	    var a_cyt = 0;
	    var a_ext_cell = 0;
	    var a_pla_mem = 0;
	    var a_cellcompartment = 0;

	    var b_cyt = 0;
	    var b_ext_cell = 0;
	    var b_fim = 0;
	    var b_out_mem = 0;
	    var b_per_spa = 0;
	    var b_pla_mem = 0;
	    var b_cellcompartment = 0;


	    var cellcompartmentArray = [];

	    //Arrays with not identified cell compartments

	    var e_ni_cellcompatmentArray = [];
	    var a_ni_cellcompatmentArray = [];
	    var b_ni_cellcompatmentArray = [];

	    var ni_cellcompatmentArray = [];

	    var ni_numcellcompatmentArray = [];


	    //Read localization

	    for (var i = 0; i < scoreProtein.length; i++) {
	        var localization = scoreProtein[i];

	        if (cellType == cellTypeArray[cellPos]) {

	            if (localization.proteinLocalization == eukaryotaArray[eukaPos]) {
	                e_chl = e_chl + 1;
	            }
	            else if (localization.proteinLocalization == eukaryotaArray[eukaPos + 1]) {
	                e_chl_mem = e_chl_mem + 1;
	            }
	            else if (localization.proteinLocalization == eukaryotaArray[eukaPos + 2]) {
	                e_cyt = e_cyt + 1;
	            }
	            else if (localization.proteinLocalization == eukaryotaArray[eukaPos + 3]) {
	                e_end_ret = e_end_ret + 1;
	            }
	            else if (localization.proteinLocalization == eukaryotaArray[eukaPos + 4]) {
	                e_end_ret_mem = e_end_ret_mem + 1;
	            }
	            else if (localization.proteinLocalization == eukaryotaArray[eukaPos + 5]) {
	                e_ext_cell = e_ext_cell + 1;
	            }
	            else if (localization.proteinLocalization == eukaryotaArray[eukaPos + 6]) {
	                e_gol_app = e_gol_app + 1;
	            }
	            else if (localization.proteinLocalization == eukaryotaArray[eukaPos + 7]) {
	                e_gol_app_mem = e_gol_app_mem + 1;
	            }
	            else if (localization.proteinLocalization == eukaryotaArray[eukaPos + 8]) {
	                e_mit = e_mit + 1;
	            }
	            else if (localization.proteinLocalization == eukaryotaArray[eukaPos + 9]) {
	                e_mit_mem = e_mit_mem + 1;
	            }
	            else if (localization.proteinLocalization == eukaryotaArray[eukaPos + 10]) {
	                e_nuc = e_nuc + 1;
	            }
	            else if (localization.proteinLocalization == eukaryotaArray[eukaPos + 11]) {
	                e_nuc_mem = e_nuc_mem + 1;
	            }
	            else if (localization.proteinLocalization == eukaryotaArray[eukaPos + 12]) {
	                e_per = e_per + 1;
	            }
	            else if (localization.proteinLocalization == eukaryotaArray[eukaPos + 13]) {
	                e_per_mem = e_per_mem + 1;
	            }
	            else if (localization.proteinLocalization == eukaryotaArray[eukaPos + 14]) {
	                e_pla = e_pla + 1;
	            }
	            else if (localization.proteinLocalization == eukaryotaArray[eukaPos + 15]) {
	                e_pla_mem = e_pla_mem + 1;
	            }
	            else if (localization.proteinLocalization == eukaryotaArray[eukaPos + 16]) {
	                e_vac = e_vac + 1;
	            }
	            else if (localization.proteinLocalization == eukaryotaArray[eukaPos + 17]) {
	                e_vac_mem = e_vac_mem + 1;
	            }

	            else {
	                e_cellcompartment = e_cellcompartment + 1;
	                e_ni_cellcompatmentArray.push(localization.proteinLocalization);
	            }

	        }
	        else if (cellType == cellTypeArray[cellPos + 2]) {

	            if (localization.proteinLocalization == archeaArray[archPos]) {
	                a_cyt = a_cyt + 1;
	            }
	            else if (localization.proteinLocalization == archeaArray[archPos + 1]) {
	                a_ext_cell = a_ext_cell + 1;
	            }
	            else if (localization.proteinLocalization == archeaArray[archPos + 2]) {
	                a_pla_mem = a_pla_mem + 1;
	            }
	            else {
	                a_cellcompartment = a_cellcompartment + 1;
	                a_ni_cellcompatmentArray.push(localization.proteinLocalization);
	            }

	        }
	        else if (cellType == cellTypeArray[cellPos + 1]) {
	            if (localization.proteinLocalization == bacteriaArray[bactPos]) {
	                b_cyt = b_cyt + 1;
	            }
	            else if (localization.proteinLocalization == bacteriaArray[bactPos + 1]) {
	                b_ext_cell = b_ext_cell + 1;
	            }
	            else if (localization.proteinLocalization == bacteriaArray[bactPos + 2]) {
	                b_fim = b_fim + 1;
	            }
	            if (localization.proteinLocalization == bacteriaArray[bactPos + 3]) {
	                b_out_mem = b_out_mem + 1;
	            }
	            else if (localization.proteinLocalization == bacteriaArray[bactPos + 4]) {
	                b_per_spa = b_per_spa + 1;
	            }
	            else if (localization.proteinLocalization == bacteriaArray[bactPos + 5]) {
	                b_pla_mem = b_pla_mem + 1;
	            }
	            else {
	                b_cellcompartment = b_cellcompartment + 1;
	                b_ni_cellcompatmentArray.push(localization.proteinLocalization);
	            }
	        }

	    }

	    //Fill array with counters	
	    var numproteinsArray = [];

	    if (cellType == cellTypeArray[cellPos]) {
	        numproteinsArray.push(e_chl);
	        numproteinsArray.push(e_chl_mem);
	        numproteinsArray.push(e_cyt);
	        numproteinsArray.push(e_end_ret);
	        numproteinsArray.push(e_end_ret_mem);
	        numproteinsArray.push(e_ext_cell);
	        numproteinsArray.push(e_gol_app);
	        numproteinsArray.push(e_gol_app_mem);
	        numproteinsArray.push(e_mit);
	        numproteinsArray.push(e_mit_mem);
	        numproteinsArray.push(e_nuc);
	        numproteinsArray.push(e_nuc_mem);
	        numproteinsArray.push(e_per);
	        numproteinsArray.push(e_per_mem);
	        numproteinsArray.push(e_pla);
	        numproteinsArray.push(e_pla_mem);
	        numproteinsArray.push(e_vac);
	        numproteinsArray.push(e_vac_mem);
	        cellcompartmentArray = eukaryotaArray.slice(0);

	        ni_cellcompatmentArray = e_ni_cellcompatmentArray.slice(0);
	        ni_numcellcompatmentArray.push(e_cellcompartment);

	    }
	    else if (cellType == cellTypeArray[cellPos + 2]) {
	        numproteinsArray.push(a_cyt);
	        numproteinsArray.push(a_ext_cell);
	        numproteinsArray.push(a_pla_mem);
	        cellcompartmentArray = archeaArray.slice(0);

	        ni_cellcompatmentArray = a_ni_cellcompatmentArray.slice(0);
	        ni_numcellcompatmentArray.push(a_cellcompartment);
	    }
	    else if (cellType == cellTypeArray[cellPos + 1]) {
	        numproteinsArray.push(b_cyt);
	        numproteinsArray.push(b_ext_cell);
	        numproteinsArray.push(b_fim);
	        numproteinsArray.push(b_out_mem);
	        numproteinsArray.push(b_per_spa);
	        numproteinsArray.push(b_pla_mem);
	        cellcompartmentArray = bacteriaArray.slice(0);

	        ni_cellcompatmentArray = b_ni_cellcompatmentArray.slice(0);
	        ni_numcellcompatmentArray.push(b_cellcompartment);
	    }
		
		
		//Get total number of proteins		
		var countnumpro=0;
		for (var i = 0; i < numproteinsArray.length; i++) {		
		 countnumpro = countnumpro + numproteinsArray[i]
		}
		
				
		//Get loc percentages
		var localizationpercentageArray = [];		
		for (var i = 0; i < numproteinsArray.length; i++) {
			localizationpercentageArray.push(Math.round((parseInt(numproteinsArray[i])/parseInt(countnumpro))*100));
		}		
		
		
		//Get max and min percentages(localization)
		
		var sortlocalizationpercentageArray = localizationpercentageArray.slice(0);
	    var maxpercentage = sortlocalizationpercentageArray.sort(function (a, b) { return b - a })[0];
	    var minpercentage = sortlocalizationpercentageArray.sort(function (a, b) { return a - b })[0];
				
		
		//Applying formula to assign color for localization

	    //class size localization
	    var maxcolorloc = 10;
	    var csloc = (-1)*((minpercentage - maxpercentage) / maxcolorloc);
		
					
	    //Get max and min number of proteins

	    var sortproteinsArray = numproteinsArray.slice(0);

	    var maxnumpro = sortproteinsArray.sort(function (a, b) { return b - a })[0];
	    var minnumpro = sortproteinsArray.sort(function (a, b) { return a - b })[0];

		// Array of size classes for localization
	    var leftArrayloc = [];
	    var rightArrayloc = [];

	    leftArrayloc.push(minpercentage);
	    rightArrayloc.push(minpercentage + csloc);
		
		
	    for (i = 1; i < maxcolorloc; i++) {

	        leftloc = rightArrayloc[i - 1];
	        leftArrayloc.push(leftloc);

	        rightloc = leftArrayloc[i] + csloc;
	        rightArrayloc.push(rightloc);

	    }

		//Rounding the last element of localization array to an integer
	    if (!(Number.isInteger(rightArrayloc[9]))) {
	        rightArrayloc[9] = Math.round(rightArrayloc[9]);
	    }

			
		//Define size class as caption			
		roundedRightArray = [];
		for (i = 0; i < rightArrayloc.length; i++) {
			roundedRightArray.push(Math.round(rightArrayloc[i]));
		}

		
	    //Fill array with counters and colors
	    var proteinLocColorArray = [];
		
       		
		//Loop for asigning colors
		var colorLocalizationpercentageArray=[];
		for (var i = 0; i < localizationpercentageArray.length; i++) {

	        for (var j = 0; j < leftArrayloc.length; j++) {
	            if (localizationpercentageArray[i] >= leftArrayloc[j] && localizationpercentageArray[i] <= rightArrayloc[j]) {
	                
					colorLocalizationpercentageArray.push(colorLocalizationArray[j]);
	            }
	        }
	    }	
		//end Loop
		
		for (var i = 0; i < localizationpercentageArray.length; i++) {

	                if (localizationpercentageArray[i] == 0) {
	                    proteinLocColorArray.push({
	                        proteinLocalization: cellcompartmentArray[i],
	                        LocalizationColor: "none",                   
							numberProtein: numproteinsArray[i],
							percentProtein:  0
	                    });
	                }
	                else {

	                    proteinLocColorArray.push({
	                        proteinLocalization: cellcompartmentArray[i],
	                        LocalizationColor: colorLocalizationpercentageArray[i],
							numberProtein : numproteinsArray[i],
							percentProtein : localizationpercentageArray[i]
	                    });
	                }        

	    }
		
	    return proteinLocColorArray;

	}
	
	
	function definedColorScore(maxminScore)
	{
			
	 		var colorArray=[];
			//Blue - 0
			var blue_colorScoreArray=["#EBEBE0","#D6E0EB","#C2D1E0","#ADC2D6","#99B2CC","#85A3C2","#5C85AD","#336699","#29527A","#1F3D5C"];

			//Green - 1
			var green_colorScoreArray=["#E8F4E9","#D7FCDC","#B9FAC3","#96F6A5","#76E687","#4DCB60","#379745","#167023","#045310","#003F0A"];
	
			//Lila - 2
			var lila_colorScoreArray=["#FAE6FA","#F5CCF5","#F0B2F0","#EB99EB","#E680E6","#E066E0","#D633D6","#B800B8","#8F008F","#660066"];
			
			//Red - 3
			var red_colorScoreArray=["#FAE6E6","#F5CCCC","#F0B2B2","#EB9999","#E68080","#E06666","#D63333","#CC0000","#A30000","#7A0000"];
		
		
			if(selectedcolorScore == "blue"){
				colorArray = blue_colorScoreArray.slice(0);
			}
			else if (selectedcolorScore == "green"){
				colorArray = green_colorScoreArray.slice(0); 
			}
			else if (selectedcolorScore == "lila"){
				colorArray = lila_colorScoreArray.slice(0); 
			}
			else if (selectedcolorScore == "red"){
				colorArray = red_colorScoreArray.slice(0); 
			}
			else{
				//Red
				colorArray=["#FAE6E6","#F5CCCC","#F0B2B2","#EB9999","#E68080","#E06666","#D63333","#CC0000","#A30000","#7A0000"];
			}
			
			var maxcolor=10;              
              
              //Get the minimum and maximum score by reading the second line of the file
              var score = maxminScore;
             
              var scorescale = score.split("-");
              var min = (scorescale[0]+1)-1;
              var max = scorescale[1];
   
              
              //class size
              var cs=(max-min)/maxcolor;
              
              // Array of size classes
              var leftArray = [];
              var rightArray = [];
              
              leftArray.push(min);
              rightArray.push(min+cs);
              
              for(i=1; i<maxcolor; i++){
              		
              	left=rightArray[i-1];
              	leftArray.push(left);
              	
              	right=leftArray[i]+cs;	
              	rightArray.push(right);
              		
              }
              
              //Array containing protein score and score color
              var proteinScoreColorArray = [];
              //Assign color to proteinscore
              for(var i=0; i<scoreProtein.length; i++){
              	var score = scoreProtein[i];
    										    				
    					if(score.proteinScore == 0)
    					{
    					 		proteinScoreColorArray.push({
    						        proteinID:score.proteinID,
                                    proteinLocalization: score.proteinLocalization,
    								proteinScore: score.proteinScore,
    								scoreColor: colorArray[0],
    								percentScore: 0
    								
                                });	
    					}
    					else
    					{				
    				
                        	for(var j=0;j<leftArray.length; j++){				       
                           		if(score.proteinScore>leftArray[j] && score.proteinScore<=rightArray[j]){					
          						proteinScoreColorArray.push({
          						        proteinID:score.proteinID,
                                        proteinLocalization: score.proteinLocalization,
          								proteinScore: score.proteinScore,
          								scoreColor: colorArray[j],
          								percentScore: Math.round((100 / parseInt(scoreProtein[0].proteinScore)) * parseInt(score.proteinScore))
          								
                                      });	         							
          								
                        			}
                        	 }	
    				    }				
					
               }
			  
			  
			  
			  return proteinScoreColorArray;	
	
	} 
	
   function createStringExample(exampleType)
   {
   		var strData = "";
   		if(exampleType == 1)
		{
		    
		 	strData = "Eukaryota" +
					  "\n0-100" +
					  "\nProtein Id	Score	Localization	Gene Ontology" +
					  "\ntr|Q8STW1|Q8STW1_ENCCU	20	plasma membrane	This is not needed";
			readExample(strData);
		
		
		}
		else if (exampleType == 2)
		{
		 	strData = "Eukaryota" +
			"\n0-100"+
			"\nProtein Id	Score	Localization	Gene Ontology"+
			"\ntr|Q8STW1|Q8STW1_ENCCU	1	chloroplast	This is not needed"+
			"\ntr|Q8STW1|Q8STW1_ENCCU	2	chloroplast membrane	This is not needed"+
			"\ntr|Q8STW1|Q8STW1_ENCCU	100	cytoplasm	This is not needed"+
			"\ntr|Q8STW1|Q8STW1_ENCCU	3	endoplasmic reticulum	This is not needed"+
			"\ntr|Q8STW1|Q8STW1_ENCCU	4	endoplasmic reticulum membrane	This is not needed"+
			"\ntr|Q8STW1|Q8STW1_ENCCU	8	mitochondrion	This is not needed"+
			"\ntr|Q8STW1|Q8STW1_ENCCU	9	mitochondrion membrane	This is not needed"+
			"\ntr|Q8STW1|Q8STW1_ENCCU	10	nucleus	This is not needed"+
			"\ntr|Q8STW1|Q8STW1_ENCCU	11	nucleus membrane	This is not needed"+
			"\ntr|Q8STW1|Q8STW1_ENCCU	12	peroxisome	This is not needed"+
			"\ntr|Q8STW1|Q8STW1_ENCCU	13	peroxisome membrane	This is not needed"+
			"\ntr|Q8STW1|Q8STW1_ENCCU	14	plastid	This is not needed"+
			"\ntr|Q8STW1|Q8STW1_ENCCU	15	vacuole	This is not needed"+
			"\ntr|Q8STW1|Q8STW1_ENCCU	16	vacuole membrane	This is not needed";
			readExample(strData);
		}
		else if (exampleType == 3)
		{
		 	strData = "Eukaryota" +
					  "\n0-100"+
					  "\nProtein Id	Score	Localization	Gene Ontology"+
					  "\nsp|Q8SWH2|HSP7A_ENCCU	16	nucleus	This is not needed"+
					  "\ntr|Q8SQK2|Q8SQK2_ENCCU	2	nucleus	This is not needed"+
					  "\ntr|Q8STW1|Q8STW1_ENCCA	23	vacuole	This is not needed"+
					  "\ntr|Q8SQK2|Q8SQK2_ENCCU	80	peroxisome	This is not needed";	
			readExample(strData);	
		}
   }
	
   function readExample(strData)
   {
   			cellType = "";
            scoreProtein = [];	
        	scoreColorArray = [];
        	localizationColorArray = [];
        	isNotOneProtein = false;
   
   			//split the file contents into separate lines on encountering \R or \r\n or \n
                    var fileLines = strData.trim().split(/\r?\n/);  
            //Old version replace(/[\R\r\n]/g, ',').split(/[\,]+/g);                     
                    var fileLinesCount = fileLines.length;                        						                       
            //create two new arrays - for score and localization
                    var scoreArray = [];                                                
            //Omit the 1st two lines and start from the 3rd line
                                                      for (var i = 3; i < fileLines.length; i++) {
                              
                                                          //Separate the line into words on encountering a tab and print each word
                                                          var arrayWords = fileLines[i].replace(/[\t]/g, ',').split(/[\,]+/g);                            
                              							
                              							// Array containing protein scores													
      													if(arrayWords[1] >= 0)
      													{													
                                                                scoreArray.push({
                                                                    proteinID: arrayWords[0],
                                    								proteinScore: arrayWords[1],
                                                                    proteinLocalization: arrayWords[2]
                                                                });	
      													}					
                              							
                                                      }
                        																						  			
                                                //Assigning global variable of score array
                                                scoreProtein = scoreArray;																
                        						scoreProtein.sort(function(a,b) { return parseInt(b.proteinScore) - parseInt(a.proteinScore) } );									
                        
                                                //find out the type of cell by reading the first line in the input file
                                                cellType = fileLines[0].trim().toLowerCase();
                        						
                        						//To select correct cell picture
                                                selectCellPicture(); 
                        						                       	
                        						//Header				 
                        					    writeHeader('headerPP',"");		
                        						
                        						//Checking only one protein in file
                        						isOneProteinInFile();
                        						
                        						//Color of score
                        						scoreColorArray = definedColorScore(fileLines[1].trim().toLowerCase());												
												secondlineScore = fileLines[1].trim().toLowerCase();
                        						
                        						//Color of Protein number				
                        						localizationColorArray = definedColorLocalization();				
                        						
                        						//Checking only one protein in file
                        						if(isNotOneProtein)
                        						{					
                        									
                                						//To highlight cell's compartments
                                						for (var i = 0; i < localizationColorArray.length; i++) {
                                              					 var colorLoc = localizationColorArray[i];										
                        										        						
                                								highlightCompartments("",colorLoc.proteinLocalization,colorLoc.LocalizationColor);							   
                                         				}				   
                        						}
                        						else
                        						{						
                        									
                        								//To highlight cell's compartments
                                						for (var i = 0; i < scoreColorArray.length; i++) {
                                              					 var colorScore = scoreColorArray[i];								
                                								
                                								highlightCompartments(colorScore.proteinID,colorScore.proteinLocalization,colorScore.scoreColor);							   
                                         				}						
                        										
                        						 } 
   	    	
   }
		
	
	
   function readFile(fileInput,fileDisplayArea)
   {
   						   						
			var file = fileInput.files[0];			
            var textType = /text.*/;	
			
			                       			
           if (file.type.match(textType)) {
                        			   
                                        var reader = new FileReader();
                                        reader.onload = function (e) {
                                            var words = (function () {
                        
                                                //split the file contents into separate lines on encountering \R or \r\n or \n
                                                var fileLines = reader.result.trim().split(/\r?\n/);												 
                        						//Old version replace(/[\R\r\n]/g, ',').split(/[\,]+/g);                     
                                                var fileLinesCount = fileLines.length;
                        						                       
                                                //create two new arrays - for score and localization
                                                var scoreArray = [];
                                                
                                                //Omit the 1st two lines and start from the 3rd line
                                                for (var i = 3; i < fileLines.length; i++) {
                        
                                                    //Separate the line into words on encountering a tab and print each word
                                                    var arrayWords = fileLines[i].replace(/[\t]/g, ',').split(/[\,]+/g);                            
                        							
                        							// Array containing protein scores													
													if(arrayWords[1] >= 0)
													{													
                                                          scoreArray.push({
                                                              proteinID: arrayWords[0],
                              								proteinScore: arrayWords[1],
                                                              proteinLocalization: arrayWords[2]
                                                          });	
													}					
                        							
                                                }
                        																						  			
                                                //Assigning global variable of score array
                                                scoreProtein = scoreArray;						
                        						scoreProtein.sort(function(a,b) { return parseInt(b.proteinScore) - parseInt(a.proteinScore) } );									
                        
                                                //find out the type of cell by reading the first line in the input file
                                                cellType = fileLines[0].trim().toLowerCase();
                        						
                        						//To select correct cell picture
                                                selectCellPicture(); 
                        						                       	
                        						//Header				 
                        					    writeHeader('headerPP',"");		
                        						
                        						//Checking only one protein in file
                        						isOneProteinInFile();	
                        						
                        						//Color of score
                        						scoreColorArray = definedColorScore(fileLines[1].trim().toLowerCase());	
												
												secondlineScore = fileLines[1].trim().toLowerCase();
                        						
                        						//Color of Protein number				
                        						localizationColorArray = definedColorLocalization();				
                        						
                        						//Checking only one protein in file
                        						if(isNotOneProtein)
                        						{					
                        									
                                						//To highlight cell's compartments
                                						for (var i = 0; i < localizationColorArray.length; i++) {
                                              					 var colorLoc = localizationColorArray[i];										
                        										        						
                                								highlightCompartments("",colorLoc.proteinLocalization,colorLoc.LocalizationColor);							   
                                         				}				   
                        						}
                        						else
                        						{						
                        									
                        								//To highlight cell's compartments
                                						for (var i = 0; i < scoreColorArray.length; i++) {
                                              					 var colorScore = scoreColorArray[i];								
                                								
                                								highlightCompartments(colorScore.proteinID,colorScore.proteinLocalization,colorScore.scoreColor);							   
                                         				}						
                        										
                        						 }
                        
                                            } ());
                        
                                        }
                                        reader.readAsText(file);
                        
                                    }
                        
             else {
                      fileDisplayArea.innerText = "File not supported!";
                  }	
									
   }
		

   function main() { 
    
	   var rdbCase1 = getPopupObject('case1');
	   rdbCase1.setAttribute("onclick", "createStringExample('1');");
	   
	   var rdbCase2 = getPopupObject('case2');
	   rdbCase2.setAttribute("onclick", "createStringExample('2');");
	   
	   var rdbCase3 = getPopupObject('case3');
	   rdbCase3.setAttribute("onclick", "createStringExample('3');");
	   
	   var selectLoc = getPopupObject('ddlColorLoc');
   	   selectLoc.setAttribute("onchange", "getDropdownListSelectedColorLoc();");	
	   
	   var selectScore = getPopupObject('ddlColorScore');
   	   selectScore.setAttribute("onchange", "getDropdownListSelectedColorScore();");		
   	
        var fileInput = document.getElementById('fileInput');
        var fileDisplayArea = document.getElementById('fileDisplayArea');	
		
		var divBtBack = getPopupObject('btnBack');
        		if(divBtBack.hasChildNodes())
				{			
					   if(fileInput.files[0])
					   {		   	
                       				readFile(fileInput,fileDisplayArea);
					   }
					   else
					   {
					   	   			createStringExample('3');
					   }							   
				}
				else
				{					
        			fileInput.addEventListener('change', function (e) {
					   readFile(fileInput,fileDisplayArea);            
        			});
      	   		}
					  
    }
    main();

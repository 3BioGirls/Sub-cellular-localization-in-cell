var d3 = require("d3");

var data = require("./svgdata");
var bact_svg = data.bact;
var eukary_svg = data.eukary;
var arch_svg = data.arch;

var subcellularlocalization = function (opts) {

  var view = {};
  this.view = view;
  view.path = "../img/";

  view.path = opts.path;

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
    view.ClearPopup = function() {
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
    view.mouseEventHandler = function(mEvent,cID,pID) {
	   
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
	view.showHighlightScore = function(proteinID)
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
			    
				divbtnBack.innerHTML = "<label style='float:left;'>Go back to localization visualization &nbsp; &nbsp;</label><input style='float:left;' type='submit' value='Go Back' onclick = \"main();\">";
			    
			     var strScoreTable = "";
			     strScoreTable += "<table><tr><td>Localization</td><td>Score</td></tr>";
					 					 
					 for (var i = 0; i < scoreColorArray.length; i++) {
		          	 	  var scoreColor = scoreColorArray[i];
						  
						  if(proteinID==scoreColor.proteinID)
						  {						   									 
						      strScoreTable += "<tr><td>" + scoreColor.proteinLocalization + "</td><td class='adjustRight'>" + scoreColor.proteinScore + "</td></tr>";
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
						  var locPercent = LocColor.percentProtein;
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
                       
						//+ "<td><font size='2'>%</font></td>"                    	
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

	function drawProtein(proteinID, proteinLocalization, colorCellCompartment, id, svgpath) {
		var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", id)
				  .attr("fill", colorCellCompartment)
				  .attr("d", svgpath)
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");
	} 

	function drawProteinMembrane(proteinID, proteinLocalization, colorCellCompartment, id, svgpath) {
		var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", id)
				  .attr("fill", "none")
				  .attr("stroke", colorCellCompartment)
				  .attr("stroke-width", "3")
				  .attr("d", svgpath)
				  .attr("onmouseover", "javaScript:mouseEventHandler(event,'" + proteinLocalization + "','" + proteinID + "');");

	}
	
    function highlightCompartments(proteinID, proteinLocalization,colorCellCompartment) {	
	
	    drawCaptionColor(proteinID);
		drawTableDescription(proteinID);

	    if (cellType == cellTypeArray[cellPos]) {

	        if (proteinLocalization == eukaryotaArray[eukaPos]) {

	            drawProtein(proteinID, proteinLocalization, colorCellCompartment, "chloroplast_euka", eukary_svg[0]);
			
	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 1]) {
	            
	            drawProteinMembrane(proteinID, proteinLocalization, colorCellCompartment, "chlorMem_euka", eukary_svg[1]);

	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 2]) {
	            
	            drawProtein(proteinID, proteinLocalization, colorCellCompartment, "cytosol_euka", eukary_svg[2]);
			
	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 3]) {

	            drawProtein(proteinID, proteinLocalization, colorCellCompartment, "endoplas_euka", eukary_svg[3]);
			}
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 4]) {

	            drawProteinMembrane(proteinID, proteinLocalization, colorCellCompartment, "endoplasmicMem_euka", eukary_svg[4]);
			}
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 5]) {
	            
	            drawProtein(proteinID, proteinLocalization, colorCellCompartment, "extraCell_euka", eukary_svg[5]);
			
	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 6]) {
	            
	            drawProtein(proteinID, proteinLocalization, colorCellCompartment, "golgi_euka", eukary_svg[6]);
			
	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 7]) {
	            
	            drawProteinMembrane(proteinID, proteinLocalization, colorCellCompartment, "golgiMem_euka", eukary_svg[7]);
			
	        }

	        else if (proteinLocalization == eukaryotaArray[eukaPos + 8]) {
	            
	            drawProtein(proteinID, proteinLocalization, colorCellCompartment, "mitochondria_euka", eukary_svg[8]);
			

	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 9]) {

	            drawProteinMembrane(proteinID, proteinLocalization, colorCellCompartment, "mitoconMem_euka", eukary_svg[9]);
			
	        }

	        else if (proteinLocalization == eukaryotaArray[eukaPos + 10]) {
	            
	            drawProtein(proteinID, proteinLocalization, colorCellCompartment, "nucleus_euka", eukary_svg[10]);
			
	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 11]) {
	            
	            drawProteinMembrane(proteinID, proteinLocalization, colorCellCompartment, "nucleusMem_euka", eukary_svg[11]);
			
	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 12]) {
	            
	            drawProtein(proteinID, proteinLocalization, colorCellCompartment, "peroxisome_euka", eukary_svg[12]);
			
	            }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 13]) {

	        	drawProteinMembrane(proteinID, proteinLocalization, colorCellCompartment, "peroxiMem_euka", eukary_svg[13]);
			
	            }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 14]) {
	           
	            drawProtein(proteinID, proteinLocalization, colorCellCompartment, "plastid_euka", eukary_svg[14]);
			}
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 15]) {
	            
	            drawProtein(proteinID, proteinLocalization, colorCellCompartment, "plasmaMem_euka", eukary_svg[15]);
			
	        }

	        else if (proteinLocalization == eukaryotaArray[eukaPos + 16]) {

	            drawProtein(proteinID, proteinLocalization, colorCellCompartment, "vacuole_euka", eukary_svg[16]);
			

	        }
	        else if (proteinLocalization == eukaryotaArray[eukaPos + 17]) {
	            
           		drawProteinMembrane(proteinID, proteinLocalization, colorCellCompartment, "vacuoleMem_euka", eukary_svg[17]);
			}

	    }

	    else if (cellType == cellTypeArray[cellPos + 1]) {
	    
	    	if (proteinLocalization == bacteriaArray[bactPos]) {

	            drawProtein(proteinID, proteinLocalization, colorCellCompartment, "cytosol_bact", bact_svg[0]);

	        }
	        else if (proteinLocalization == bacteriaArray[bactPos + 1]) {

	            drawProtein(proteinID, proteinLocalization, colorCellCompartment, "extraCell_bact", bact_svg[1]);

	        }
	        else if (proteinLocalization == bacteriaArray[bactPos + 2]) {
	            drawProtein(proteinID, proteinLocalization, colorCellCompartment, "fimbrium", bact_svg[2]);

	        }

	        else if (proteinLocalization == bacteriaArray[bactPos + 3]) {

	            drawProtein(proteinID, proteinLocalization, colorCellCompartment, "outerMem_bact", bact_svg[3]);

	        }
	        else if (proteinLocalization == bacteriaArray[bactPos + 4]) {

	        	drawProtein(proteinID, proteinLocalization, colorCellCompartment, "periplasmic_bact", bact_svg[4]);

	        }
	        else if (proteinLocalization == bacteriaArray[bactPos + 5]) {
	        	
	        	drawProtein(proteinID, proteinLocalization, colorCellCompartment, "plasmaMem_bact", bact_svg[5]);
    
	        }

	    }
	    
	    else if (cellType == cellTypeArray[cellPos + 2]) {
            
            if (proteinLocalization == archeaArray[archPos]) {

	        	drawProtein(proteinID, proteinLocalization, colorCellCompartment, "cytoplasm_arch", arch_svg[2]); 

	        }
	        else if (proteinLocalization == archeaArray[archPos+1]) {

	        	drawProtein(proteinID, proteinLocalization, colorCellCompartment, "extraCellular_arch", arch_svg[1]);

	        }
	        else if (proteinLocalization == archeaArray[archPos+2]) {

	        	drawProtein(proteinID, proteinLocalization, colorCellCompartment, "plasmaMem_arch", arch_svg[0]);

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
					.attr("xlink:href", view.path + "eukaryota-2D.jpg")
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
					.attr("xlink:href", view.path + "bacteria-2D.jpg")
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
					.attr("xlink:href", view.path + "archaea-2D.jpg")
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
	
   function createStringExample()
   {
   		var strData = "";
   		
		 	strData = "Eukaryota" +
					  "\n0-100"+
					  "\nProtein Id	Score	Localization	Gene Ontology"+					 
					  "\ntr|Q16KC9|Q16KC9_AEDAE	10	cytoplasm	cytosol GO:0005829(IDA)"+
					  "\ntr|Q17BP5|Q17BP5_AEDAE	19	nucleus	spliceosomal complex GO:0005681(ISO); transcription export complex GO:0000346(ISO)"+
					  "\ntr|Q17JY7|Q17JY7_AEDAE	21	secreted	extracellular space GO:0005615(IDA)"+
					  "\ntr|Q1DGR4|Q1DGR4_AEDAE	49	mitochondrion	mitochondrial fatty acid beta-oxidation multienzyme complex GO:0016507(IDA)"+
					  "\ntr|Q17A65|Q17A65_AEDAE	32	nucleus	nucleus GO:0005634(IEA)"+
					  "\ntr|Q16GE6|Q16GE6_AEDAE	19	nucleus	nucleus GO:0005634(IDA)"+
					  "\ntr|Q16NT8|Q16NT8_AEDAE	10	cytoplasm	cytosolic ribosome GO:0022626(ISO)"+
					  "\ntr|Q17B03|Q17B03_AEDAE	14	golgi apparatus	endoplasmic reticulum lumen GO:0005788(TAS); Golgi stack GO:0005795(IEA)"+
					  "\ntr|Q16I97|Q16I97_AEDAE	12	mitochondrion membrane	integral to membrane GO:0016021(IEA); mitochondrial inner membrane GO:0005743(IDA)"+
					  "\ntr|Q16UV3|Q16UV3_AEDAE	7	secreted	extracellular space GO:0005615(IEA)"+
					  "\ntr|Q16RE8|Q16RE8_AEDAE	16	cytoplasm	cytosol GO:0005829(TAS)"+
					  "\ntr|Q16EB0|Q16EB0_AEDAE	32	mitochondrion	mitochondrial matrix GO:0005759(IEA)"+
					  "\ntr|Q178J5|Q178J5_AEDAE	12	chloroplast	chloroplast stroma GO:0009570(IDA)"+
					  "\ntr|Q178J0|Q178J0_AEDAE	50	endoplasmic reticulum membrane	integral to endoplasmic reticulum membrane GO:0030176(IDA)" +
					  "\ntr|Q17CL4|Q17CL4_AEDAE	21	peroxisome	peroxisome GO:0005777(IEA)";	
			readExample(strData);	
		
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
	
   view.setPath = function(path) {
   	view.path = path;
   }	

   view.main = function() {   		
   			 		
   	    
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
					   	   			createStringExample();
					   }							   
				}
				else
				{	
					createStringExample();				
        			fileInput.addEventListener('change', function (e) {
					   readFile(fileInput,fileDisplayArea);            
        			});
      	   		}
					  
    }
	
	view.main();

};

module.exports = subcellularlocalization;

var subFieldsExpanded = false;
var updatingPDML = false, newPackets = false;
var filter = "";
var nets;
var options, intervals;
var numEvents = 0;
var offset = 0;
var result, lastPacketStats = 0;
var series, linesStats, finished;

function infoStatus() {
	
	var spanNet = document.createElement("span");
	spanNet.setAttribute("class","info");
	spanNet.appendChild(document.createTextNode(manageLanguage("Filename")));
	var inputNet = document.createElement("input");
	inputNet.setAttribute("style","float:left");
	inputNet.setAttribute("type","button");
	inputNet.setAttribute("id","statusBar");
	inputNet.setAttribute("class","infoNet");
	
	if (CaptureNet.length > 12)
	var net = CaptureNet.substring(0,9) + "...";
	else var net = CaptureNet;
	
	inputNet.setAttribute("value",net);
	inputNet.setAttribute("title",CaptureNet);
	
	document.getElementById("infoNet").appendChild(spanNet);	
	document.getElementById("infoNet").appendChild(inputNet);
	
	var spanFilter = document.createElement("span");
	spanFilter.setAttribute("class","info");
	spanFilter.appendChild(document.createTextNode(manageLanguage("Filter")+":"));
	var inputFilter = document.createElement("input");
	inputFilter.setAttribute("style","float:left");
	inputFilter.setAttribute("type","button");
	inputFilter.setAttribute("id","statusBar");
	inputFilter.setAttribute("class","infoFilter");
	
	if (filter.length > 12)
	var f = filter.substring(0,9) + "...";
	else var f = filter;
	
	inputFilter.setAttribute("value",f);
	inputFilter.setAttribute("title",filter);
	
	document.getElementById("infoFilter").appendChild(spanFilter);	
	document.getElementById("infoFilter").appendChild(inputFilter);
	
	var spanLang = document.createElement("span");
	spanLang.setAttribute("class","info");
	spanLang.appendChild(document.createTextNode(manageLanguage("MenuLanguage")+":"));
	var inputLang = document.createElement("input");
	inputLang.setAttribute("style","float:left");
	inputLang.setAttribute("type","button");
	inputLang.setAttribute("id","statusBar");
	inputLang.setAttribute("class","infoFilter");
	
	if (language.length > 12)
	var lang = language.substring(0,9) + "...";
	else var lang = language;
	
	inputLang.setAttribute("value",manageLanguage(language));
	inputLang.setAttribute("title",language);
	
	document.getElementById("infoLang").appendChild(spanLang);	
	document.getElementById("infoLang").appendChild(inputLang);
}

function centerModal() {

	var left = (window.innerWidth/2 - document.getElementById("simplemodal-container").scrollWidth/2) ; // need to center modal manually 
	var top = (window.innerHeight/2 - document.getElementById("simplemodal-container").scrollHeight/2) ; // because initial position is wrong
	document.getElementById("simplemodal-container").style.left = left+"px";
	document.getElementById("simplemodal-container").style.top = top+"px";	
}

function initDensityGraph() {
	
	var capDuration = $("#SummaryTable tr:last td:eq(1)").html();
	capDuration = Math.ceil(capDuration);
	
	intervals = capDuration / 10;
	intervals = Math.round(intervals * 100) / 100;
	
	var divStats = document.createElement("div");
	divStats.setAttribute("id","graph");
	divStats.setAttribute("class","graph");
	
	$.modal(divStats);	
	centerModal();
	
	
	options = {
		chart: {
			renderTo: 'graph',
			type: 'column',
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false
		},
		title: {
			text: "",
		},
		xAxis: {
			categories: [],
			title: {
				text: ""
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: ""
			}
		},
		legend: {
			enabled: false
		},
		credits: {
			enabled: false
		},

		tooltip: {
			formatter: function() {
				return "<b>" + manageLanguage("Interval") +":</b> [" + this.x +"]<br/><b>" + manageLanguage(this.series.name) + ":</b> " + this.y;
			}			
		},
		
		series:[]
				
	};
	

}

function densityOptions(dynamic) {
	
	$.get('php/session.php');
	
	var mod = document.createElement("div");
	mod.setAttribute("id","simplemodal-container");

	var headerNet = document.createElement("h3");
	headerNet.setAttribute("style","text-align: center;");
	if (dynamic) {
		headerNet.appendChild(document.createTextNode(manageLanguage("DensityMod") + ":"));
	}
	else headerNet.appendChild(document.createTextNode(manageLanguage("DensityMod") + ":"));
	
	var br = document.createElement("br");
	headerNet.appendChild(br);
	
	var buttonNet = document.createElement("button");
	buttonNet.setAttribute("type","button");
	buttonNet.setAttribute("value","Packets");
	if (dynamic) {
		buttonNet.setAttribute("onmousedown","$.modal.close(); dynamicDensity();");
	}
	else buttonNet.setAttribute("onmousedown","$.modal.close(); densityPackets();");
	buttonNet.appendChild(document.createTextNode(manageLanguage("Packets")));
	headerNet.appendChild(buttonNet);
	
	buttonNet = document.createElement("button");
	buttonNet.setAttribute("type","button");
	buttonNet.setAttribute("value","Bytes");
	if (dynamic) {
		buttonNet.setAttribute("onmousedown","$.modal.close(); dynamicDensity();");
	}
	else buttonNet.setAttribute("onmousedown","$.modal.close(); densityBytes();");
	buttonNet.appendChild(document.createTextNode(manageLanguage("Bytes")));
	headerNet.appendChild(buttonNet);
		
	mod.appendChild(headerNet);
	
	$.modal(mod);
}
function densityPackets() {
	
	initDensityGraph();
	
	$.ajax({url:"php/statsDensity.php", data: { interval: intervals, path: path, net: CaptureNet},
	success: function(response) {
		if (response != "Session Expired") {
			$.get(path+'statsDensity.txt'+'?nocache='+Math.random(), function(data) {
				var lines = data.split("\n");
				var series = {
					name: "",
					data: []
					};
					var lineIntervals = 7;
					var symbol = " ";
				
					$.each(lines, function(lineNo, line) {
						if (lineNo == 2) {
							if (line != "IO Statistics") { // new version tshark
								lineIntervals = 11;
								symbol = "|";
							}
								
						}
						
						if (lineNo >= lineIntervals) { // not interesting lines before
							var items = line.split(symbol);
							var i=0;
				
							$.each(items, function(itemNo, item) {
								if (item != "") {
									switch (i) {
										case 0: item = item.replace("<>", "-"); options.xAxis.categories.push(item); break;
										case 1: series.data.push(parseInt(item)); break;							
									}
									i++;
								}
							
							})
					
						}	
				
					});
					
					series.name = "Packets";
					options.series.push(series);
					options.title.text = manageLanguage("DensityMod") + " " + manageLanguage("Packets") + " " + CaptureNet;
					options.yAxis.title.text = manageLanguage("Num") + manageLanguage("Packets");
					options.xAxis.title.text = manageLanguage("Interval")+"s (s)";
					var chart = new Highcharts.Chart(options);
				});
			}
			else manageErrors("Session Expired");
		}
	});;
}

function densityBytes() {
	
	initDensityGraph();
	
	$.ajax({url:"php/statsDensity.php", data: { interval: intervals, path: path, net: CaptureNet},
		success: function(response) {
			if (response != "Session Expired") {
				$.get(path+'statsDensity.txt'+'?nocache='+Math.random(), function(data) {
					var lines = data.split("\n");
					var series = {
						data: []
						};
					
					var lineIntervals = 7;
					var symbol = " ";
				
					$.each(lines, function(lineNo, line) {
						if (lineNo == 2) {
							if (line != "IO Statistics") { // new version tshark
								lineIntervals = 11;
								symbol = "|";
							}
								
						}
						
						if (lineNo >= lineIntervals) { // not interesting lines before
							var items = line.split(symbol);
							var i=0;
						
							$.each(items, function(itemNo, item) {
								if (item != "") {
									switch (i) {
										case 0: item = item.replace("<>", "-"); options.xAxis.categories.push(item); break;
										case 2: series.data.push(parseInt(item)); break;							
									}
									i++;
								}
								
							})
							
						}
					});	
						
			
					series.name = "Bytes";
					options.series.push(series);
					options.title.text = manageLanguage("DensityMod") + " " + manageLanguage("Bytes") + " " + CaptureNet;
					options.yAxis.title.text = manageLanguage("Num") + manageLanguage("Bytes");
					options.xAxis.title.text = manageLanguage("Interval")+"s (s)";
					var chart = new Highcharts.Chart(options);
				});
			}
			else manageErrors("Session Expired");
		}
	});
	
}

function processLinesStats(lines) {
	$.each(lines, function(lineNo, line) {
		if (lineNo >= (7+offset)) { // not interesting lines before
			if (line != "") {
				var items = line.split(" ");
				var i=0;
				var x = 0, y = 0, x1 = 0, x2 = 0;
			
				$.each(items, function(itemNo, item) {
					if (item != "") {
						switch (i) {
							case 0: x = (offset++*intervals*10)/10; break;
							case 2: y = parseInt(item); 
									 break;		
						}
						i++;
					}
					
					
				})
				
				series.addPoint([x, y], false, true);
				series.addPoint([(offset*intervals-0.01),y], false, true);
				series.addPoint([(offset*intervals-0.005),0], true, true);
				return false;
																								
			}
			else finished = true;
		}
	});
}

function initDynamicDensity() {
	
	var capDuration = $("#SummaryTable tr:last td:eq(1)").html();
	capDuration = Math.ceil(capDuration);
	
	intervals = capDuration / 10;
	intervals = Math.round(intervals * 100) / 100;
	
	var divStats = document.createElement("div");
	divStats.setAttribute("id","graph");
	divStats.setAttribute("class","graph");
	
	$.modal(divStats);	
	centerModal();
	
	
	options = {
		chart: {
			renderTo: 'graph',
			type: 'area',
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			events: {
                    click: function() {
    
                        // set up the updating of the chart each second
                        series = this.series[0];
                        finished = true;
                        setInterval(function() {
							if (newPackets) {
								$.ajax({url:"php/statsDensity.php", data:"interval=" + intervals + "&file=capture" + CaptureNet + ".cap" + "&filter=" + lastPacketStats,
								success: function(response) {
									$.get('statsDensity.txt'+'?nocache='+Math.random(), function(data) {
										newPackets = false;
										var lines = data.split("\n");
										finished = false;
										linesStats = lines;																																
										});	
									}
								});
							}
							
							if (!finished) {
								processLinesStats(linesStats);
							}
							else {
								series.addPoint([(offset++*intervals), 0], false, true);
								series.addPoint([(offset*intervals-0.005),0], true, true);
							}
                        
							/*var x = (offset++*intervals);
                                y = Math.random()*800;
                            
                            series.addPoint([x,y], false, true);
                            series.addPoint([(offset*intervals-0.01),y], false, true);
							series.addPoint([(offset*intervals-0.005),0], true, true);
							*/
					}, intervals*1000);
                    
                }
			}
		},
		title: {
			text: "",
		},
		xAxis: {
			//categories: [],
			title: {
				text: ""
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: ""
			}
		},
		legend: {
			enabled: false
		},
		credits: {
			enabled: false
		},

		tooltip: {
			//shared: true,
			
			formatter: function() {
				var start = (Math.round(this.x*100)/100);
				if (start % intervals == 0)			
				return "<b>" + manageLanguage("Interval") +":</b> [" + Math.round(this.x*10)/10 + " - " + Math.round((this.x+intervals)*10)/10+"]<br/><b>" + manageLanguage(this.series.name) + ":</b> " + this.y + " ";
				else return false; //"<b>" + manageLanguage("Interval") +":</b> [" + this.key + " - " + (this.key+intervals)+"]<br/><b>" + manageLanguage(this.series.name) + ":</b> " + this.y;
			}			
		},
		
		series:[]
				
		
	};
}
	
	
function dynamicDensity() {
		
	initDynamicDensity();
	
	$.ajax({url:"php/statsDensity.php", data:"interval=" + intervals + "&file=capture" + CaptureNet + ".cap",
	success: function(response) {
	$.get('statsDensity.txt'+'?nocache='+Math.random(), function(data) {
		newPackets = false;
		lastPacketStats = lastPacket;
		var lines = data.split("\n");
		var series =  {
			data: [],
			marker: {
				enabled: false
				}
			};
		
		$.each(lines, function(lineNo, line) {
			if (lineNo >= 7) { // not interesting lines before
				var items = line.split(" ");
				var i=0;
				var x = 0, y = 0, x1 = 0, x2 = 0;
			
				$.each(items, function(itemNo, item) {
					if (item != "") {
						switch (i) {
							case 0: x = (offset++*intervals*10)/10; break;//offset*intervals+"s - "+(offset+1)*intervals+"s"); break;
							case 2: y = parseInt(item); 
									series.data.push({
										x: x, 
										y: y,
										name: "Start"
										}); break;		
						}
						i++;
					}
					
				})
				x1 = (offset*intervals)-0.01;
				series.data.push({
					x: x1,
					y: y,
					name: x
						
				});
				x2 = (offset*intervals)-0.005;
				series.data.push({
					x: x2,
					y: 0,
					name: x
				});
				
				
			}
		});	
			

		series.name = "Bytes";
		options.series.push(series);
		options.title.text = manageLanguage("DensityMod") + " " + manageLanguage("Bytes") + " capture" + CaptureNet + ".cap";
		options.yAxis.title.text = manageLanguage("Num") + manageLanguage("Bytes");
		options.xAxis.title.text = manageLanguage("Interval")+"s (s)";
		var chart = new Highcharts.Chart(options);
	});
	}
	});
	
}
	

/* NOT USED - DRILLDOWN? */
function statsHierarchy() {
	
	var hierarchy = [];
	var hier_values = [];
	
	$.get('statsHierarchy.txt'+'?nocache='+Math.random(), function(data) {
			var lines = data.split("\n");
			var series = {
				name: "",
				data: []
			};
				
			$.each(lines, function(lineNo, line) {
				if (lineNo >= 5) { // not interesting lines before
					var items = line.split(" ");
					var i=0;
			
					$.each(items, function(itemNo, item) {
						if (item != "") {
							if (i == 0) { // just the first value of the line is a protocol
								if (jQuery.inArray(itemNo, hierarchy)<0) {
									hierarchy.push(itemNo);
								}
						}
							else {
								
							}
						}
						
						i++;
					});
					
				}
				
			});	
			
		});
}

function hierarchyInfo() {
	

	$.get('php/session.php');
	
	var mod = document.createElement("div");
	mod.setAttribute("id","simplemodal-container");
	
	var headerInfo = document.createElement("h3");
	headerInfo.setAttribute("style","text-align: center;");
	headerInfo.appendChild(document.createTextNode(manageLanguage("HierInfoMod")));
	
	var br = document.createElement("br");
	
	var codeInfo = document.createElement("code");
	var preInfo = document.createElement("pre");
	var requestAjax = $.ajax({url:"php/hierarchyInfo.php", data: { path: path, net: CaptureNet},
	success: function (response) {
		if (response != "Session Expired") {		
			response = response.split("\n");
			response.splice(3,1);
			response = response.join("\n");
			preInfo.appendChild(document.createTextNode(response));
			codeInfo.appendChild(preInfo);
			mod.appendChild(headerInfo);
			mod.appendChild(br);
			mod.appendChild(codeInfo);
		
			$.modal(mod);
		}
		else manageErrors("Session Expired");
	}})
	
}

function conversationsOptions() {
	

	$.get('php/session.php');
	
	var mod = document.createElement("div");
	mod.setAttribute("id","simplemodal-container");

	var headerNet = document.createElement("h3");
	headerNet.setAttribute("style","text-align: center;");
	headerNet.appendChild(document.createTextNode(manageLanguage("ProtoConvMod")));
	
	var br = document.createElement("br");
	headerNet.appendChild(br);
	
	for (var i=0; i<9; i++) {
		var buttonNet = document.createElement("button");
		buttonNet.setAttribute("type","button");
		buttonNet.setAttribute("onmousedown","$.modal.close(); conversationsInfo(this.id, this.innerHTML);");
		headerNet.appendChild(buttonNet);
		
		switch(i) {
			case 0: buttonNet.setAttribute("id","eth"); buttonNet.appendChild(document.createTextNode("Ethernet")); break;
			case 1: buttonNet.setAttribute("id","fc"); buttonNet.appendChild(document.createTextNode("Fibre Channel")); break;
			case 2: buttonNet.setAttribute("id","fddi"); buttonNet.appendChild(document.createTextNode("FDDI")); break;
			case 3: buttonNet.setAttribute("id","ip"); buttonNet.appendChild(document.createTextNode("IPv4")); break;
			case 4: buttonNet.setAttribute("id","ipv6"); buttonNet.appendChild(document.createTextNode("IPv6"));
					var br = document.createElement("br"); headerNet.appendChild(br); break;			
			case 5: buttonNet.setAttribute("id","ipx"); buttonNet.appendChild(document.createTextNode("IPX")); break;
			case 6: buttonNet.setAttribute("id","tcp"); buttonNet.appendChild(document.createTextNode("TCP/IP")); break;
			case 7: buttonNet.setAttribute("id","tr"); buttonNet.appendChild(document.createTextNode("Token Ring")); break;
			case 8: buttonNet.setAttribute("id","udp"); buttonNet.appendChild(document.createTextNode("UDP/IP")); break;
		}
		
	}
	
	mod.appendChild(headerNet);
	$.modal(mod);
}

function conversationsInfo(protocol, name) {
	
	var mod = document.createElement("div");
	mod.setAttribute("id","simplemodal-container");
	
	var headerInfo = document.createElement("h3");
	headerInfo.setAttribute("style","text-align: center;");
	headerInfo.appendChild(document.createTextNode(name));
	
	var br = document.createElement("br");
	
	var codeInfo = document.createElement("code");
	var preInfo = document.createElement("pre");
	var requestAjax = $.ajax({url:"php/conversationsInfo.php", data: { path: path, net: CaptureNet, protocol: protocol },
	success: function (response) {
		if (response != "Session Expired") {
			response = response.split("\n");
			response.splice(2,1);
			response = response.join("\n");
			preInfo.appendChild(document.createTextNode(response));
			codeInfo.appendChild(preInfo);
			mod.appendChild(headerInfo);
			mod.appendChild(br);
			mod.appendChild(codeInfo);
		
			$.modal(mod);
		}
		else manageErrors("Session Expired");
	}})
}
function generalInfo() {
	
	
	$.get('php/session.php');
	
	var mod = document.createElement("div");
	mod.setAttribute("id","simplemodal-container");
	
	var headerInfo = document.createElement("h3");
	headerInfo.setAttribute("style","text-align: center;");
	headerInfo.appendChild(document.createTextNode(manageLanguage("GeneralInfo")));
	
	var br = document.createElement("br");
	
	var codeInfo = document.createElement("code");
	var preInfo = document.createElement("pre");
	var requestAjax = $.ajax({
		url:"php/generalInfo.php", 
		data: {net: CaptureNet, path: path}, 
		success: function (response) {
			if (response != "Session Expired") {
				preInfo.appendChild(document.createTextNode(response));
				codeInfo.appendChild(preInfo);
				mod.appendChild(headerInfo);
				mod.appendChild(br);
				mod.appendChild(codeInfo);
			
				$.modal(mod);
			}
			else manageErrors("Session Expired");
			
		}
	});
	
}

function modalChangeLanguage() {
	var mod = document.createElement("div");
	var langs = new Array("English", "Spanish", "Catalan", "Galician", "Basque");
	var images = new Array("uk.gif", "spain.png", "catalunya.jpg", "galicia.jpg", "euskal.gif");
	
	mod.setAttribute("id","simplemodal-container");

	var headerLang = document.createElement("h3");
	headerLang.setAttribute("style","text-align: center;");
	headerLang.appendChild(document.createTextNode(manageLanguage("Language")));
	
	var br = document.createElement("br");
	headerLang.appendChild(br);
	
	for (var i=0 ; i<5 ; i++) {
		var buttonLang = document.createElement("button");
		buttonLang.setAttribute("type","button");
		buttonLang.setAttribute("value",langs[i]);
		buttonLang.setAttribute("onmousedown","changeLanguage(this.value); $.modal.close();");
		
		var buttonImg = document.createElement("img");
		buttonImg.setAttribute("src", "images/flag_icon_"+images[i]);
		buttonImg.setAttribute("style", "margin-right: 5px");
		
		buttonLang.appendChild(buttonImg);
		buttonLang.appendChild(document.createTextNode(manageLanguage(langs[i])));
		headerLang.appendChild(buttonLang);
	}
		
	mod.appendChild(headerLang);
	
	$.modal(mod);
	
}

function changeFile() {
	var mod = document.createElement("div");
	mod.setAttribute("id","simplemodal-container");

	var headerFile = document.createElement("h3");
	headerFile.setAttribute("style","text-align: center;");
	headerFile.appendChild(document.createTextNode(manageLanguage("changeModal")));
	
	var br = document.createElement("br");
	headerFile.appendChild(br);
	
	for (var i in files) {
			
		var buttonFile = document.createElement("button");
		buttonFile.setAttribute("type","button");
		buttonFile.setAttribute("value",files[i]);
		
		if (files[i].length > 20) {
			var filename = files[i].substring(0,17) + "...";
			buttonFile.setAttribute("title",files[i]);
		}
		else var filename = files[i];
		
		buttonFile.setAttribute("onmousedown","onChange(this.value,filter); $.modal.close();");
		buttonFile.appendChild(document.createTextNode(filename));
		headerFile.appendChild(buttonFile);
	}
		
	mod.appendChild(headerFile);
	
	$.modal(mod);
	
}

function changeNetwork() {
	var mod = document.createElement("div");
	mod.setAttribute("id","simplemodal-container");

	var headerNet = document.createElement("h3");
	headerNet.setAttribute("style","text-align: center;");
	headerNet.appendChild(document.createTextNode(manageLanguage("Red")));
	
	var br = document.createElement("br");
	headerNet.appendChild(br);
	
	for (var i=0 ; i<nets ; i++) {
		var buttonNet = document.createElement("button");
		buttonNet.setAttribute("type","button");
		buttonNet.setAttribute("value",i);
		buttonNet.setAttribute("onmousedown","onChange(this.value,filter); $.modal.close();");
		buttonNet.appendChild(document.createTextNode(manageLanguage("Droplist")+" "+i));
		headerNet.appendChild(buttonNet);
	}
		
	mod.appendChild(headerNet);
	
	$.modal(mod);
	
}

function navigatePacketsKeyboard() {
	// Navigate packets using the keyboard
	
	$("#SummaryTable").keydown(function(evt) {
		
		if (evt.which == 40) { evt.preventDefault(); navigatePackets("Next"); }
		if (evt.which == 38) { evt.preventDefault(); navigatePackets("Previous"); }
		if (evt.which == 36) { evt.preventDefault(); navigatePackets("First"); }
		if (evt.which == 35) { evt.preventDefault(); navigatePackets("Last"); }
	});
}

	

function navigatePackets(navigateTo) {
	
	if (navigateTo.match("Next")) {
		var packet = document.getElementById("picked").nextSibling;
		if (packet == null) packet = document.getElementById("picked");
	}
	
	else if (navigateTo.match("Previous")) {
		var packet = document.getElementById("picked").previousSibling;
		if (packet == null) packet = document.getElementById("picked");
	}
	
	else if (navigateTo.match("First")) {
		var packet = document.getElementById("picked");
		while (packet.previousSibling != null)
			packet = packet.previousSibling;
		}
		
	else {
			var packet = document.getElementById("picked");
			while (packet.nextSibling != null)
			packet = packet.nextSibling;
		}
			
		
		
	packet.setAttribute("class",""); 
	packetDetails(packet);
	packet.scrollIntoView(false);
	
}

function manageFilter() {
	// Jquery. Modal to introduce display filter
	
	var mod = document.createElement("div");
	mod.setAttribute("id","simplemodal-container");

	var headerFilter = document.createElement("h3");
	headerFilter.setAttribute("style","text-align: center;");
	headerFilter.appendChild(document.createTextNode(manageLanguage("Filter")));

	var br = document.createElement("br");

	var inputFilter = document.createElement("input");
	inputFilter.setAttribute("type","text");
	inputFilter.setAttribute("size","18");
	inputFilter.setAttribute("class","ui-corner-all");
	inputFilter.setAttribute("onKeyPress", "if (event.which == 13) { filter = this.value; onChange(CaptureNet, filter); $.modal.close();} ");
	
	headerFilter.appendChild(br);
	headerFilter.appendChild(inputFilter);
	mod.appendChild(headerFilter);
	
	$.modal(mod);

	
}

function managePlayButton()
{ // start live capture when is stopped
    if (!Capturing)
    {
        var status = document.getElementById("statusBar");

        if (status.getAttribute("class") == "stopped")
        {
            status.setAttribute("class", "Capturing");
            status.setAttribute("value", manageLanguage("StatusBarPlay"));
            stopCapture = false;
        }
    }
    else manageErrors("Capturing");
}

function manageStopButton(status)
{ // stop live capture. Allows consult packets info easily
    if (!Capturing)
    {
        var status = document.getElementById("statusBar");

        if (status.getAttribute("class") == "Capturing")
        {
            status.setAttribute("class", "stopped");
            status.setAttribute("value", manageLanguage("StatusBarStop"));
            stopCapture = true;
        }
    }
    else manageErrors("Capturing");
}

function onChange(net, filter)
{ // Network change event or filter
    updating = true;
    CaptureNet = net;
    CaptureFilter = filter;
    deleteTable("infoNet");
    deleteTable("infoFilter");
    deleteTable("infoLang");
    infoStatus();
    lastPacket = 0; // new net, whole new file
    packetPDML = "1"; // first packet's details by default
    newSummary(net);
    updating = false;
}

function pickJustThisPacket(packet, atribute)
{ // only select last packet clicked in summary
    var aux = packet;

    while ((aux) != null)
    {
        if (aux.nodeType == 1)
        {
            if (aux.getAttribute('class').match(atribute))
            {

                if (atribute == "field")
                {
                    if (aux.getAttribute('class').match('parent field')) aux.setAttribute('class', 'parent field');
                    else if (!aux.getAttribute('class').match('fieldLabel')) aux.setAttribute('class', atribute); // deselect if selected
                }
                else if (atribute == "parent field")
                {
                    if (aux.getAttribute('class') == 'field picked') aux.setAttribute('class', 'field');
                }
                else {
					aux.setAttribute('class', atribute); // deselect if selected
					try 
					{
					if (aux.getAttribute('id').match("picked"))
						aux.setAttribute('id', atribute); // need to navigate packets
						
					} 
					catch(err)
					{
					}
					
				}
            }
        }
        aux = aux.nextSibling;
    }

    aux = packet.previousSibling;

    while ((aux) != null)
    {
        if (aux.nodeType == 1)
        {
            if (aux.getAttribute('class').match(atribute))
            {
                if (atribute == "field")
                {
                    if (aux.getAttribute('class').match('parent field')) aux.setAttribute('class', 'parent field');
                    else if (!aux.getAttribute('class').match('fieldLabel')) aux.setAttribute('class', atribute); // deselect if selected
                }
                else if (atribute == "parent field")
                {
                    if (aux.getAttribute('class') == 'field picked') aux.setAttribute('class', 'field');
                }
                else {
                aux.setAttribute('class', atribute); // deselect if selected
                try 
                {
                if (aux.getAttribute('id').match("picked"))
					aux.setAttribute('id', atribute); // need to navigate packets
				} 
				catch(err)
				{
				}
			  }
            }
        }
        aux = aux.previousSibling;
    }
}

function eventPDML() {
	
	if (numEvents == 1) {
		updatingPDML = true;
		deleteTable("detail-div");
		deleteTable("tab-0");
		updateFile(CaptureNet, CaptureFilter);
		showLoadingDetails();
        setTimeout("newPacketDetails()", 1000);	
	}
	else if ((numEvents == 2)&&(updatingPDML)) {
		setTimeout("eventPDML()", 1000);
	}
	else numEvents--; 
		
}

function newPacketDetails() { 
	// writes details and ascii tables with the info of new packet selected  
	
		if (fileReady) { 
			deleteTable("detail-div");
			var xmlDoc = loadXMLDoc(path + 'pdml.xml');
			if (numEvents == 1) {
				writePDML('packet', xmlDoc, 0);
				writeAscii();
			}
			
			numEvents--;
			updatingPDML = false;
		}
		else setTimeout("newPacketDetails()", 500); 
	
}

function packetDetails(packet) { 
	// update pdml.xml with the xml info of the new packet selected
	
	if (!Capturing) {
		numEvents++;     
        packetPDMLref = packet;
        pickJustThisPacket(packet, '');
        packet.setAttribute('class', 'picked');
        packet.setAttribute('id', 'picked');
        packetPDML = packet.firstChild.firstChild.nodeValue; // update the packet which need to show details
		eventPDML();
	}
	else manageErrors("Capturing");
    
}

function expandClass(node)
{ // expands info in details table
    var atrib = node;

    if (atrib.getAttribute('class') == ('protocol'))
    { // expands parents
        pickJustThisPacket(atrib, 'protocol');
        pickJustThisPacket(atrib.childNodes[1], 'field');
        pickJustThisPacket(document.getElementById("h0"), '');
        atrib.setAttribute('class', 'protocol picked expanded');
    }

    else if (atrib.getAttribute('class') == ('protocol picked expanded'))
    { // 
        pickJustThisPacket(atrib, 'protocol');
        pickJustThisPacket(atrib.childNodes[1], 'field');
        pickJustThisPacket(document.getElementById("h0"), '');
        atrib.setAttribute('class', 'protocol');
    }

    else if (atrib.getAttribute('class') == ('parent field'))
    { // expands sons
        pickJustThisPacket(atrib, 'parent field');
        pickJustThisPacket(atrib, 'field');
        pickJustThisPacket(atrib.childNodes[1], 'field');
        pickJustThisPacket(document.getElementById("h0"), '');
        atrib.setAttribute('class', 'parent field picked expanded');
    }

    else if (atrib.getAttribute('class') == ('parent field picked expanded'))
    {
        pickJustThisPacket(atrib, 'parent field');
        pickJustThisPacket(atrib.childNodes[1], 'field');
        pickJustThisPacket(document.getElementById("h0"), '');
        atrib.setAttribute('class', 'parent field');
        atrib = atrib.parentNode;
    }

    else if (atrib.getAttribute('class') == ('field'))
    { // select grandsons
        pickJustThisPacket(atrib, 'field');
        pickJustThisPacket(document.getElementById("h0"), '');
        atrib.setAttribute('class', 'field picked');
    }

    else if (atrib.getAttribute('class') == ('field picked'))
    {
        pickJustThisPacket(atrib, 'field');
        pickJustThisPacket(document.getElementById("h0"), '');
        atrib.setAttribute('class', 'field');
        atrib = atrib.parentNode;
    }
    selectAscii(atrib);

}

function selectAscii(field)
{ // select (blue color) ascii and hexadecimal info of the field picked in details table
    var classType = field.getAttribute("class");

    if (!((classType == "protocol") || ((classType == "parent field"))))
    { // not protocol nor parent field (not expanded)
        if (!subFieldsExpanded)
        {
            var position = field.getAttribute("pos");
            var size = field.getAttribute("size");
            position = parseInt(position);

            //pickJustThisPacket(document.getElementById("h0"),'');
            for (var i = 0; i < size; i++)
            {
                var hexadecimal = document.getElementById("h" + (position + i));
                var ascii = document.getElementById("d" + (position + i));
                hexadecimal.setAttribute("class", "h ascii-selection");
                ascii.setAttribute("class", "d ascii-selection");
            }
        }
    }

}

$(document).ready(function($){
	// Jquery manage menu options
	$('#mega-menu-2').dcMegaMenu({
		rowItems: '1',
		speed: 'fast',
		effect: 'fade',
		event: 'click'
	});
});

function newSession() {
	$.ajax({
		url: "php/deleteUserFolder.php", 
		async: false
		}
	);
	window.location.replace("IntroWebShark.php");
}

function writeMenu() {
	// Dinamic Menu Javascript
	document.write('<li><a href="#">'+manageLanguage("File")+'</a>');
	document.write('<ul><li><a href="#" onmousedown="newSession();">'+manageLanguage("New")+'</a></li>');
	document.write('<li><a href="#" onmousedown="changeFile()">'+manageLanguage("Change")+'</a></li></ul></li>');
	
	document.write('<li><a href="#">'+manageLanguage("Go")+'</a>');
	document.write('<ul><li><a href="#">'+manageLanguage("Navigate")+'</a>');
	document.write('<ul><li><a href="#" id="Next" onmousedown="navigatePackets(this.id)">'+manageLanguage("Next")+'</a></li>');
	document.write('<li><a href="#" id="Previous" onmousedown="navigatePackets(this.id)" ">'+manageLanguage("Previous")+'</a></li>');
	document.write('<li><a href="#" id="First" onmousedown="navigatePackets(this.id)">'+manageLanguage("First")+'</a></li>');
	document.write('<li><a href="#" id="Last" onmousedown="navigatePackets(this.id)">'+manageLanguage("Last")+'</a></li></ul></li></ul></li>');
	
	document.write('<li><a href="#">'+manageLanguage("Statistics")+'</a>');
	document.write('<ul><li><a href="#">'+manageLanguage("FileInfo")+'</a>');
	document.write('<ul><li><a href="#" onmousedown="generalInfo();">'+manageLanguage("GeneralInfo")+'</a></li>');
	document.write('<li><a href="#" onmousedown="hierarchyInfo();">'+manageLanguage("HierInfo")+'</a></li>');
	document.write('<li><a href="#" onmousedown="conversationsOptions();">'+manageLanguage("ProtoConv")+'</a></li></ul></li>');
	document.write('<li><a href="#">'+manageLanguage("Graphs")+'</a>');
	document.write('<ul><li><a href="#" onmousedown="densityOptions(false);">'+manageLanguage("Density")+'</a></li>');
	document.write('</ul></li></ul></li>');

	document.write('<li><a href="#">'+manageLanguage("MenuLanguage")+'</a>');
	document.write('<ul><li><a href="#" id="English" onmousedown="changeLanguage(this.id)"><img src="images/flag_icon_uk.gif" style="margin-right: 2px" />'+manageLanguage("English")+'</a></li>');
	document.write('<li><a href="#" id="Spanish" onmousedown="changeLanguage(this.id)"><img src="images/flag_icon_spain.png" style="margin-right: 2px" />'+manageLanguage("Spanish")+'</a></li>');
	document.write('<li><a href="#" id="Catalan" onmousedown="changeLanguage(this.id)"><img src="images/flag_icon_catalunya.jpg" style="margin-right: 2px" />'+manageLanguage("Catalan")+'</a></li>');
	document.write('<li><a href="#" id="Galician" onmousedown="changeLanguage(this.id)"><img src="images/flag_icon_galicia.jpg" style="margin-right: 2px" />'+manageLanguage("Galician")+'</a></li>');	
	document.write('<li><a href="#" id="Basque" onmousedown="changeLanguage(this.id)"><img src="images/flag_icon_euskal.gif" style="margin-right: 2px" />'+manageLanguage("Basque")+'</a></li></ul></li>');	
	
	document.write('<li><a href="#" onmousedown="manageFilter()" >'+manageLanguage("MenuFilter")+'</a></li>');
	
}
		

	

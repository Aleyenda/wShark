<?php 
$path = session_save_path(".");
session_start();
$_SESSION['last_activity'] = time();
?>

<!DOCTYPE html>
<head>
  <title>WebShark</title>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <META HTTP-EQUIV="PRAGMA" CONTENT="NO-CACHE">
  <META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE">
  <meta http-equiv="expires" content="Fri, 5 Apr 1996 23:59:59 GMT">
   <link type="text/css" charset="utf-8" rel="Stylesheet" media="all" href="css/Webshark.css" />
   <link type="text/css" rel="stylesheet" href="css/dcmegamenu.css" />
   <link type="text/css" rel="stylesheet" href="css/skins/white.css"/>
   <link type="text/css" rel="stylesheet" href="css/basic.css"/>
    <script type="text/javascript" charset="utf-8" src="js/WebShark.js"></script>
    <script type="text/javascript" charset="utf-8" src="js/Errors.js"></script>
    <script type="text/javascript" charset="utf-8" src="js/Language.js"></script>
    <script type="text/javascript" charset="utf-8" src="js/io.js"></script>
    <script type="text/javascript" charset="utf-8" src="js/Events.js"></script>
    <script type="text/javascript" charset="utf-8" src="js/ManageTables.js"></script>
    <script type="text/javascript" src="js/jquery-1.6.2.min.js"></script>
    <script type="text/javascript" src="js/jquery.cookie.js"></script>
    <script type='text/javascript' src='js/jquery.hoverIntent.minified.js'></script> <!-- Menu -->
	<script type='text/javascript' src='js/jquery.dcmegamenu.1.3.2.js'></script> <!-- Menu -->
	<script type='text/javascript' src='js/Menu.js'></script> <!-- Menu -->
	<script type='text/javascript' src='js/jquery.simplemodal.js'></script> <!-- Modal for filter and other things -->
	<script type="text/javascript" src="js/highcharts.js"></script>
   
    <meta name="apple-mobile-web-app-capable" content="yes">
   
   <script type="text/javascript">
	   
	   if ($.cookie('lang') != null)
	   	language = $.cookie('lang');
  
   </script>
    
</head>
<body onload="detectBrowser(); if ('Navigator' == navigator.appName) document.forms[0].reset(); navigatePacketsKeyboard()" >

    <div id='header' class='ui-widget-header' style='border:none; '>
    <img src='images/wSharkSecondaryLogo.jpg' align='left' style="margin-left: 5px" /> 
    
    <script type="text/javascript">
		
	<?php // detects the uploaded files and their names
		$path = session_id() . "/";
		$filenames = array();
		// Open a known directory, and proceed to read its contents  
		foreach(glob($path . "*") as $filename) {
			$ext = pathinfo($filename, PATHINFO_EXTENSION);
			if (($ext == "cap") || ($ext == "pcap"))
				$filenames[] = substr($filename, strpos($filename,"/")+1);
		}

	?>
	files = ["<?php echo join("\", \"", $filenames); ?>"];
	path = "<?php echo $path; ?>";
	CaptureNet = files[0];
	
    document.write("<div id='stopCaptureTitle'>"); 
    document.write("<span style='margin-left: 3px;'>" + manageLanguage("Status") + "</span>");
    document.write('<div><input style="float:left;" type="button" id="statusBar" class="File" value="' + manageLanguage("File") + '"></input> '); 
    document.write('</div></div><div id="infoNet" class="info"></div>');
    document.write('<div id="infoFilter" class="info"></div>');
    document.write('<div id="infoLang" class="info"></div>');
    infoStatus();
	
	</script>	  
		
	
<div class="white" style="float:right;">  
<ul id="mega-menu-2" class="mega-menu">

<script type="text/javascript">
writeMenu();
</script>
</ul>

</div>


</div> 
<!-- "Rails" for summary -->

  <div id='wrapper' class='expanded' style='overflow:hidden'>
    <div class="fht_fixed_header">
    <table style="width: 100%; height: 26px; background-color: #eee; ">
    <thead>
    <tr>
	<script type="text/javascript">
	document.write('<th class="first-cell" style="width:3.5%"><div class="empty-cell">No.</div></th>');
    document.write('<th style="width:8%"><div class="empty-cell">' + manageLanguage("Time") + '</div></th>');
    document.write('<th style="width:13%"><div class="empty-cell">' + manageLanguage("Source") + '</div></th>');
    document.write('<th style="width:13%"><div class="empty-cell">' + manageLanguage("Destination") +'</div></th>');
    document.write('<th style="width:8%"><div class="empty-cell">' + manageLanguage("Protocol") + '</div></th>');
    document.write('<th style="width:6%;"><div class="empty-cell">' + manageLanguage("Length") + '</div></th>');
    document.write('<th class="last-cell" style="width:48.5%"><div class="empty-cell">' + manageLanguage("Info") + '</div></th>');
    </script>

    </tr>
    </thead></table>
    </div>
    <div id="wholeSummary" class="fht_table_body"  >
    <table id="summary" style="width: 100%; margin-top: -30px; ">  <!-- rails to write the packet data in the right position -->
    <thead>
    <tr>
	<script type="text/javascript">
    document.write('<th class="first-cell" style="width:3.6%"><div class="empty-cell">No.</div></th>');
    document.write('<th style="width:8.1%"><div class="empty-cell">Time</div></th>');
    document.write('<th style="width:13.1%"><div class="empty-cell">Source</div></th>');
    document.write('<th style="width:13.1%"><div class="empty-cell">Destination</div></th>');
    document.write('<th style="width:8.1%"><div class="empty-cell">Protocol</div></th>');
    document.write('<th style="width:5.1%;"><div class="empty-cell">Length</div></th>');
    document.write('<th class="last-cell" style="width:48.9%"><div class="empty-cell">Info</div></th>');
    </script>
    </tr>
    </thead>
	<tbody id="SummaryTable" tabindex="0">
    
	<script type="text/javascript">
		modifyFile(CaptureNet);
	</script>

    </tbody>
    </table>
    </div>
<div id="detail-div" class="pane">
	
</div>

 <div id="ascii-div" class="pane ui-widget-header"><div id="tab-0" style="top:0 !important">
 
</div></div>


</body>

</html>

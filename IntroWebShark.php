<?php
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN"
"http://www.w3.org/TR/html4/strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>IntroWebShark</title>
		<meta name="author" content="Agustín Leyenda" />
		<!-- Date: 2012-02-20 -->
		<script type="text/javascript" src="js/jquery-1.6.2.min.js"></script>
		<script type="text/javascript" src="js/jquery.cookie.js"></script>
		<script type="text/javascript" src="js/WebShark.js"></script>
		<script type="text/javascript" src="js/Language.js"></script>
		<script type="text/javascript" src="js/Events.js"></script>
		<script type="text/javascript" src="js/fileuploader.js"></script>
		<script type='text/javascript' src='js/jquery.simplemodal.js'></script> <!-- Modal for filter and other things -->
		<link type="text/css" charset="utf-8" rel="Stylesheet" media="all" href="css/IntroWebShark.css" />
		<link type="text/css" charset="utf-8" rel="Stylesheet" media="all" href="css/fileuploader.css" />
		<link type="text/css" rel="stylesheet" href="css/basic.css"/>
		
		<script type="text/javascript">
		$(document).ready(function(){
			var running = 0;
			var uploader = new qq.FileUploader({
    		// pass the dom node (ex. $(selector)[0] for jQuery users)
    		element: document.getElementById('file-uploader'),
    		// path to server-side upload script
    		action: 'php/php.php',
    		allowedExtensions: ['cap', 'pcap'],
    		sizeLimit: 1000000, // 1 MB
    		maxConnections: 12,
    		onSubmit: function() {
    			running++;
    		},
    		onComplete: function() {
    			running--;
    			if (running == 0)			// only trigger the event when there is no more files to upload
    				window.location.replace("WebShark.php");    		
    			}
			});
		});	
	
		if ($.cookie('lang') == null )
			$.cookie('lang', 'English', { expires: 7});
		
		language = $.cookie('lang');
		
		</script>

		
	</head>
	<body>
		<div id="header">
			<img src="images/entel_logo.jpg" style="float: left;" alt=""/>
			<img src="images/ETSETB2.jpg" style="float: right;" alt="" />
		</div>

		<div id="body">
			<img src="images/wSharkLogoBlack.png" id="wLogo" alt="" />
			<div id="dialog">
				<h1>
					<script type="text/Javascript">
						document.write(manageLanguage("Welcome") + "wShark! ");
					</script>
				</h1>
				<div id="file-uploader">
				</div>

			</div>
		</div>
		<div id="foot">
			
				<script type="text/javascript">
				document.write(manageLanguage("Browse"));
				</script>
			
		</div>
		<div id="default">
				
			<span id="defaultSpan" onmousedown='$.ajax({
									type: "GET",
									async: false,
									url: "php/defaultExample.php"
									}); 
									window.location.replace("WebShark.php")'>
				<script type="text/javascript">document.write(manageLanguage("Default"));</script>
			</span>
			<span id="lang" onmousedown='modalChangeLanguage();'>
				<script type="text/javascript">document.write(manageLanguage("Change") + " " + manageLanguage("MenuLanguage"));</script>
	
			</span>
			
				
		</div>
		
		<script type="text/javascript">
			$.get("php/alreadyInSession.php", function(data) {
				if (data == "True") { // already in Session
					alert(manageLanguage("AlreadySession"));
					window.location.replace("WebShark.php");
				}
			});
		</script>
		

	</body>
</html>

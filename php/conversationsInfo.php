<?php

$file = "../" . $_GET['path'] . $_GET['net'];
if (file_exists($file)) {
	$protocol = $_GET['protocol'];
	
	$info = shell_exec("tshark -r " . $file . " -q -z conv," . $protocol);
	
	echo $info;
}
else echo "Session Expired";
?>

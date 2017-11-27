<?php

$file = "../" . $_GET['path'] . $_GET['net'];
if (file_exists($file)) {
	$info = shell_exec("tshark -r " . $file . " -q -z io,phs");
	
	echo $info;
}
else echo "Session Expired";
?>

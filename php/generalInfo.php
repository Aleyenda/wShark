<?php

$file = "../" . $_GET['path'] . $_GET['net'];
if (file_exists($file)) {
	$info = shell_exec("capinfos -A " . $file);
	
	echo $info;
}
else echo "Session Expired";
?>

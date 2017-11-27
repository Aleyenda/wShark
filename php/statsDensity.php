<?php

$interval = $_GET['interval'];
$file = "../" . $_GET['path'] . $_GET['net'];

if (file_exists($file)) {

	shell_exec("tshark -r " . $file . " -q -z io,stat," . $interval . " > ../" . $_GET['path'] . "statsDensity.txt");
}
else echo "Session Expired";
?>

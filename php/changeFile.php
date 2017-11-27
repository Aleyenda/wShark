<?php
$file = "../" . $_GET['path'] . $_GET['net'];

if (file_exists($file)) {
	
	if ( $_GET['filter'] != "" ) {
		$filter = "&& " . $_GET['filter'] ; // add the condition of the filter
	}
	else $filter = ""; // if there isn't filter condition, we can't put the &&
	
	shell_exec("tshark -r " . $file . " -T psml -R 'frame.number > " . $_GET['lastPacket'] . " " . $filter ."' > ../" . $_GET['path'] . "psml.xml");
	shell_exec("tshark -r " . $file . " -T pdml -R 'frame.number == " . $_GET['packet'] ."' > ../" . $_GET['path'] . "pdml.xml");
	shell_exec("tshark -r " . $file . " -x -R 'frame.number == " . $_GET['packet'] ."' > ../" . $_GET['path'] . "ascii.txt");
	
	$ascii = "";
	$ascii = file_get_contents("../" . $_GET['path'] . "ascii.txt"); // hexadecimal and ascii packet information
	$ascii = substr($ascii, strpos($ascii, "\n")); // delete first line (packet text information)
	$ascii = substr($ascii, strpos($ascii, "\n")); // delete second line (line break)
	$ascii = ltrim($ascii); // delete blank spaces
	
	$varReturn = $log . "%" . $ascii;
	echo $varReturn;
}
else echo "Session Expired";

?>

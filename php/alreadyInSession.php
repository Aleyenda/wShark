<?php 
session_start();

if (is_dir("../" . session_id() . "/")) { 
	echo "True";
}

else echo "False";
?>

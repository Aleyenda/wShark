<?php
session_start();
$dir = '../' . session_id();
foreach(glob($dir . '/*') as $file) {
		unlink($file);
    }
    rmdir($dir);
   
   unlink('../sess_' . session_id());
?>

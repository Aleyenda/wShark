<?php
$fich = ( "../" . $_GET['net']);
$modified = filemtime($fich);
echo $modified;
?>

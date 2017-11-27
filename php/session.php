<?php
$path = session_save_path("../");
session_start();
$_SESSION['last_activity'] = time();
echo time();
?>

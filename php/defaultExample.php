<?php
session_start();

mkdir("../" . session_id());
copy("../default.cap", "../" . session_id() . "/default.cap");
?>

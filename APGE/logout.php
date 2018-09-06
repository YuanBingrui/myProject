<?php
$_POST= array();
session_start();
session_unregister('username');
session_unregister('password');

header("location:index.php");
?>
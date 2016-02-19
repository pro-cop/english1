<?php
require_once('../php/functions.php');
error_reporting(0);

$db_host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'english';

$mysqli = new MySQLi($db_host, $db_user, $db_password, $db_name);

if ( !$mysqli->connect_error ) {
    $mysqli->query("SET NAMES utf8");
}




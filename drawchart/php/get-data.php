<?php
header("content-type:text/html;charset=utf-8");

$servername = "localhost";
$username = "root";
$password = "123456";
 
$con = mysql_connect($servername, $username, $password);

if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_select_db("cs", $con);

mysql_query('SET NAMES UTF8');

$sql = "SELECT * FROM `test`";

$result = mysql_query($sql);

$data =array();

class User{
 public $sex;
 public $number;
}
while($row = mysql_fetch_array($result)){
    $user = new User();
    $user->sex = $row["sex"];
    $user->number = $row["number"];
    $data[] = $user;
}

$json = json_encode($data);

echo "{".'"data"'.":".$json."}";
mysql_close($con);
?>
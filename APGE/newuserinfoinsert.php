<?php
$username = $_POST["newusername"];
$password = md5($_POST["newassword"]);
$userinfoline = "";
$userInfoFile = fopen("./userinfo/userinfo.txt", "a+") or die("Unable to open file!");
$flag = 0;
while(!feof($userInfoFile)) {
	$userInfoArr = explode("\t",fgets($userInfoFile));
	if($userInfoArr[0] == $username){
		$flag = 1;
		echo "<script>alert('Username already exists!');history.back(-1);</script>";
		break;
	}else{
		continue;
	}
}
if($flag == 0){
	$userinfoline = $userinfoline . "\n" . $username . "\t" . $password . "\t" . "1";
	fwrite($userInfoFile, $userinfoline);
	fclose($userInfoFile);
	echo "<script>alert('Insert successfully!');history.back(-1);</script>";
}else{
	fclose($userInfoFile);
}

?>
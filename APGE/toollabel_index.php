<?php
$osName=$_POST['osName'];
$osNameDir = "./Databases/genomes/".$osName."/";
if(is_dir($osNameDir)){
	if($openDir = opendir( $osNameDir ) ){
		while ($file = readdir ( $openDir) ) {
			if ($file == '.' || $file == '..'){
				continue;
			}
			if(filetype($osNameDir . $file) == "dir"){
				echo ";" . $file;
			}
		}
	}
}
?>
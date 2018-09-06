<?php
$path = array("./Databases/genomes");
foreach($path as $val){
    $dir_handle = @opendir($val) or die("Unable to open $val");
    while ($file = readdir($dir_handle)) 
    { 
		if ($file == '.' || $file == '..'){
			continue;
		}
        echo  ';'.$file;
    }
    closedir($dir_handle);
}
?>
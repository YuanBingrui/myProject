<?php
$max_execution_time=ini_get('max_execution_time');
ini_set('max_execution_time', '0');

function addFileToZip($path, $zip){
	$handler=opendir($path);
	while(($filename=readdir($handler)) !== false){
		if( $filename == "." || $filename == ".." ){
			continue;
		}else{
			if(is_dir($path ."/".$filename)){
				if(preg_match("/Databases/", $filename)){
					continue;
				}
				addFileToZip($path ."/". $filename ."/", $zip);
			}elseif (preg_match("/APGE.zip/", $filename)){
				continue;
			}else{
				$zip->addFile($path ."/". $filename);
			}
		}
	}
	@closedir($path);
}

$filename = '../APGE/APGE.zip';
$zip = new ZipArchive();
if($zip->open($filename, ZipArchive::OVERWRITE) === TRUE){
	addFileToZip("../APGE", $zip); 
	$zip->close(); 
}

ini_set('max_execution_time', $max_execution_time);
?>
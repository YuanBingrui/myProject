<?php
$gffFileContent = file($uploadFile);
$scaffoldIdArr = array();
$i = 0;
foreach ($gffFileContent as $line => $content) {
	if (preg_match("/^(#.*)/", $content)){
		continue;
	}
	$line_arr = explode('	',$content);
	$scaffoldIdArr [$i++] = $line_arr[0];
}
$scaffoldIdIndexFile = fopen($uploadDirOsName . "scaffold_index", "w") or die("Unable to open file!");
foreach (array_unique($scaffoldIdArr) as $key => $scaffoldContent) {
	fwrite($scaffoldIdIndexFile, $scaffoldContent . "\n");
}
fclose($scaffoldIdIndexFile);
?>

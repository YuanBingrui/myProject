<?php
$os_name = $_POST["os_name"];
$toolName = $_POST["tool_label"];
$gene_name = $_POST["gene_name"];
if(glob("./Databases/genomes/" .$os_name. "/" . $toolName ."/*.gff")){
	$gffArr = glob("./Databases/genomes/" .$os_name. "/" . $toolName . "/*.gff");
	$all_content = file($gffArr[0]);
	foreach ($all_content as $line => $content) {
		$line_arr = explode('	',$content);
			if($line_arr[2] == "mRNA"){
				if(preg_match("/Name=(\w+);/i",$line_arr[8],$matches)){
					if(strtoupper($gene_name) == strtoupper($matches[1])){
						echo $line_arr[0].";".$line_arr[3].";".$line_arr[4];
						break;
					}
				}	
			}
	}
}
?>
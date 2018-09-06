<?php
$osName = $_POST["osName"];
$geneName = $_POST["geneName"];
$scaffold = $_POST["scaffold"];
$strand = $_POST["strand"];
$toolLabel = $_POST["toolLabel"];
if(DirIsEmpty("./DataBases/genomes/" . $osName . "/")){
	echo "noSequence";
}else{
	if(!glob("./DataBases/genomes/" . $osName . "/Scaffold/*.fasta")){
		echo "noSequence";
	}else{
		$range = GetGeneRange($osName,$geneName,$toolLabel);
		$rangeArr = explode(";",$range);
		$sequencrArr = glob("./DataBases/genomes/" . $osName . "/Scaffold/*.fasta");
		$squenceContent = file_get_contents($sequencrArr[0]);
		$squenceContentArr = explode('>',$squenceContent);
		for($i = 1; $i < count($squenceContentArr); $i++){
			$squenceContenScaffoldArr = explode("\n", $squenceContentArr[$i]);
			if($squenceContenScaffoldArr[0] == $scaffold){
				$sequenceCdsInfo = "";
				for($j = 1; $j < count($squenceContenScaffoldArr); $j++){
					$sequenceCdsInfo = $sequenceCdsInfo . $squenceContenScaffoldArr[$j];
				}
				$subSequenceInfo = substr($sequenceCdsInfo, intval($rangeArr[0]), intval($rangeArr[1]) - intval($rangeArr[0]));
				if($strand == "left"){
					$subSequenceInfo = 	ComplementaryStrand($subSequenceInfo);
				}
				echo ">" . $geneName . "\t" . $rangeArr[0] . "-" . $rangeArr[1] . "\n";
				echo $subSequenceInfo;
				break;
			}
		}
	}
}

function GetGeneRange($osName,$geneName,$toolLabel){
	$filePath = glob("./DataBases/genomes/" . $osName . "/" . $toolLabel . "/*.gff");
	$all_content = file($filePath[0]);
	foreach ($all_content as $line => $content) {
		if (preg_match("/^(#.*)/", $content)){
			continue;
		}
		$line_arr = explode('	',$content);
		if(preg_match("/Name=(\w+);/i",$line_arr[8],$matches)){
			if( $geneName == $matches[1] ){
				return $line_arr[3].";".$line_arr[4];
			}
		}	
	}
}
function ComplementaryStrand($sequenceOriginal){
	$sequenceOriginal = strtoupper(strrev($sequenceOriginal));
	$charToSequence="";
	for($i=0;$i<strlen($sequenceOriginal);$i++){
		$charArr = substr($sequenceOriginal,$i,1);
		switch ($charArr) {
			case 'A':
				$charArr = "T";
				break;
			case 'T':
				$charArr = "A";
				break;
			case 'C':
				$charArr = "G";
				break;
			case 'G':
				$charArr = "C";
				break;
			default:
				break;
		}
		$charToSequence = $charToSequence . $charArr;
	}
	return $charToSequence;
}

function DirIsEmpty($dir) {
  	if ($handle = opendir ( $dir )) {
   		while ( $item = readdir ( $handle ) ) {
    		if ($item != "." && $item != "..") {
     			return false;
    		}
   		}
  	}
   	return true;
}
?>
<?php
$osName = $_POST["osName"];
$geneName = $_POST["geneName"];
$start = $_POST["start"];
$end = $_POST["end"];
$scaffold = $_POST["scaffold"];
$strand = $_POST["strand"];
if(DirIsEmpty("./DataBases/genomes/" . $osName . "/")){
	echo "noSequence";
}else{
	if(!glob("./DataBases/genomes/" . $osName . "/Scaffold/*.fasta")){
		echo "noSequence";
	}else{
		$sequencrArr=glob("./DataBases/genomes/" . $osName . "/Scaffold/*.fasta");
		$squenceContent = file_get_contents($sequencrArr[0]);
		$squenceContentArr = explode('>',$squenceContent);
		for($i = 1; $i < count($squenceContentArr); $i++){
			$squenceContenScaffoldArr = explode("\n", $squenceContentArr[$i]);
			if($squenceContenScaffoldArr[0] == $scaffold){
				$sequenceCdsInfo = "";
				for($j = 1; $j < count($squenceContenScaffoldArr); $j++){
					$sequenceCdsInfo = $sequenceCdsInfo . $squenceContenScaffoldArr[$j];
				}
				$subSequenceInfo = substr($sequenceCdsInfo, $start, $end - $start);
				if($strand == "left"){
					$subSequenceInfo = 	ComplementaryStrand($subSequenceInfo);
				}
				echo ">" . $geneName . "\t" . $start . "-" .$end . "\n";
				echo $subSequenceInfo;
				break;
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
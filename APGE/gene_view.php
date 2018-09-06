<?php
$os_name=$_POST['os_name'];
$scaffold=$_POST['scaffold'];
$from=$_POST['from'];
$to=$_POST['to'];
$allSelectedSeqInfo = "";
if( $to <= $from ){
	echo "wrong";
}else{
	$osNameDir = "./Databases/genomes/".$os_name."/";
	$flag = 1;
	if(is_dir($osNameDir)){
		if($openDir = opendir( $osNameDir ) ){
			while ($file = readdir ( $openDir) ) {
				if ($file == '.' || $file == '..'){
					continue;
				}
				if(filetype($osNameDir . $file) == "dir"){
					if(DirIsEmpty($osNameDir . $file . "/")){
						continue;
					}elseif(glob($osNameDir . $file . "/*.gff")){
						$flag = 0;
						$gffArr = glob($osNameDir . $file . "/*.gff");
						$allSelectedSeqInfo = $allSelectedSeqInfo . ScanEachToolGff( $file, $gffArr[0], $from, $to, $scaffold );							
					}else{
						continue;					
					}
				}
       		}
       		echo $allSelectedSeqInfo;
        	closedir($openDir);
    	}
	}
	if($flag == 1){
		echo "no any information";
	}
}

function ScanEachToolGff( $file, $gffPath, $from, $to, $scaffold ) {
	$all_content = file($gffPath);
	$eachSelectedSeqInfo = $file . ">";
	foreach ($all_content as $line => $content) {
		if (preg_match("/^(#.*)/", $content)){
			continue;
		}
		$line_arr = explode('	',$content);
		if( $line_arr[0] == $scaffold ){
			if( $from <= $line_arr[4] && $to >= $line_arr[3] ){
				$eachSelectedSeqInfo = $eachSelectedSeqInfo . $content;
			}
		}
	}
	$eachSelectedSeqInfo = $eachSelectedSeqInfo . "|";
	return $eachSelectedSeqInfo;
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
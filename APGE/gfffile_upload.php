<?php
$osName = $_POST["osName"];
$toolName = $_POST["toolClassLabel"];

//首先判断文件上传是否出错
if ($_FILES["gffFile"]["error"] > 0) 
{
	$ErrorInfo = "File upload error: " . $_FILES["gffFile"]["error"]; //获取出错信息
	echo "<script>alert($ErrorInfo);location.href='index.php';</script>"; //显示出错信息

}else{
	$uploadDirOsName = "Databases/genomes/" . $osName . "/";
	if (!file_exists($uploadDirOsName)) { 
		mkdir($uploadDirOsName); 
	} //判断目录是否存在，若不存在则创建
	$uploadDirToolName = $uploadDirOsName . $toolName . "/";
	if (!file_exists($uploadDirToolName)) { 
		mkdir($uploadDirToolName); 
	}
	if(glob($uploadDirToolName."/*.gff")){
		$gffFileArr = glob($uploadDirToolName."/*.gff");
		$uploadFile = $gffFileArr[0];
	}else{
		$uploadFile = $uploadDirToolName . $_FILES["gffFile"]["name"];	
	}
	//把上传的数据文件移动到指定的文件夹中
	if(move_uploaded_file($_FILES["gffFile"]["tmp_name"],$uploadFile))
	{
		require("createScaffoldIndex.php");	
		echo "File upload successfully";		  
	}else{
		echo "File upload failed！again";
	}
}
?>
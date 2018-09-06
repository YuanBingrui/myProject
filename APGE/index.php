<!DOCTYPE html>
<html lang = "zh-CN">
<head>
	<!-- <meta name = "viewport" content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"> -->
	<meta charset = "utf-8">
	<script type = "text/javascript" src = "jquery-2.1.3.min.js" ></script>	
    <link rel = "stylesheet" type = "text/css" href = "css/bootstrap.min.css" />
    <link rel = "stylesheet" type = "text/css" href = "css/apge.css" />
    <link rel = "stylesheet" type = "text/css" href = "css/loader.css" />
    <script type = "text/javascript" src = "bootstrap.min.js"></script>
    <script type = "text/javascript" src = "os_name_select.js" ></script>
    <script type = "text/javascript" src = "scaffold_id_select.js" ></script>
    <script type = "text/javascript" src = "ajax_range.js" ></script>
    <script type = "text/javascript" src = "gene_view.js" ></script>
    <script type = "text/javascript" src = "alter.js" ></script>
    <script type = "text/javascript" src = "gene_name_search.js" ></script>
    <script type = "text/javascript" src = "get_sequence_cds.js" ></script>
    <script type = "text/javascript" src = "form_validation.js" ></script>
    <script type = "text/javascript" src = "ajaxfileupload.js"></script>
    <script type = "text/javascript" src = "downloadzip.js"></script>
    <title>APGE:Aureobasidium pullulans Genome Explorer</title>
    <script type = "text/javascript">
        window.onload = OsNameSelect();
        window.onload = FormValidation();
    </script>
</head>

<body>
<div id = "container">
	<div id = "header">
		<div id = "login">
			<span class="a_left">
				<a href="http://localhost/phylogenetic_tree_search/index.php" target="_blank">Blast</a>
			</span>
			<span class="a_right">
			<?php
			if($_POST){
				$userInfoFile = fopen("./userinfo/userinfo.txt", "r") or die("Unable to open file!");
				$userInfoFlag = 0;
				while(!feof($userInfoFile)) {
					$userInfoArr = explode("\t",fgets($userInfoFile));
					$userName = $userInfoArr[0];
  					$passWord = $userInfoArr[1];
  					$permission = $userInfoArr[2];
  					if($_POST["username"] == $userName and md5($_POST["password"]) == $passWord and $permission == 0){	
						echo "<a href = '#' data-toggle = 'modal' data-target = '#uploadfile'>Upload</a>
						<a onclick = 'DownLoadZip()' id = 'triggerdownload'>Download</a>
						<a href = 'APGE.zip' download = 'APGE.zip' id = 'downloadziplink'>Download</a>
						<a href = '#' data-toggle = 'modal' data-target = '#insertuserinfo'>Insert</a>
						<a href = 'logout.php'>Logout</a>";
						$userInfoFlag = 1;
					}elseif ($_POST["username"] == $userName and md5($_POST["password"]) == $passWord and $permission == 1) {
						echo "<a href = '#' data-toggle = 'modal' data-target = '#uploadfile'>Upload</a>
						<a onclick = 'DownLoadZip()' id = 'triggerdownload'>Download</a>
						<a href = 'APGE.zip' download = 'APGE.zip' id = 'downloadziplink'>Download</a>
						<a href = 'logout.php'>Logout</a>";
						$userInfoFlag = 1;
					}else{
						continue;
					}
				}
				if($userInfoFlag == 0){
					echo "<script>alert('用户名或密码错误');</script>";
					$_POST= array();
					echo "<script>location.href='index.php';</script>";
					echo "<a href = '#' data-toggle='modal' data-target='#loginmodal'>Login</a>";
				}
				fclose($userInfoFile);	
			}else{
				echo "<a href = '#' data-toggle='modal' data-target='#loginmodal'>Login</a>";
			}
			?>
			</span>		
		</div>
	  	<div id = "header_image"><img src = "image/AP.jpg"></div>
	  	<div id = "wordInfo">
			<div id = "header_intro">APGE(Aureobasidium pullulans Genome Explorer)</div>
			<div id = "description">A web server on Aureobasidium pullulans genome exploring, including region exploration, gene search.</div>
	  	</div>
	</div>
	<div id = "loadingcover" class = "loader">
		<div class="dna">
	  		<div class="ele"></div>
	  		<div class="ele"></div>
	  		<div class="ele"></div>
	  		<div class="ele"></div>
	  		<div class="ele"></div>
	  		<div class="ele"></div>
	  		<div class="ele"></div>
	  		<div class="ele"></div>
	  		<div class="ele"></div>
	  		<div class="ele"></div>
	  		<div class="ele"></div>
	  		<div class="ele"></div>
	  		<div class="ele"></div>
	  		<div class="ele"></div>
	  		<div class="ele"></div>
		</div>
	</div>

	<div id = "toolbar">
		<div id="choose_bar">
			<form role = "form">
				<div class = "row paddingleft">
					<div class = "col-md-3 col-xs-3">
						<label for = "os_name">OS_name select :</label>
		                <select id = "os_name" name = "os_name" class = "form-control">
		                	<option value = "Aureobasidium_pullulans_CCTCC_M_2012259">Aureobasidium_pullulans_CCTCC_M_2012259</option>
		                </select>
		            </div>
		            <div class = "col-md-4 col-xs-4">
						<div class = "row">
							<div class = "col-md-5 col-xs-5">
								<label for = "from">Range :</label>
		    					<input type = "text" class = "form-control" id = "from">
							</div>
							<div class = "col-md-4 col-xs-4">
								<label for = "to">to :</label>
		    					<input type = "text" class = "form-control" id = "to">
							</div>
							<div class = "col-md-3 col-xs-3">
								<label for = "btnsubmit" class = "btnlabel">Explore</label>
								<input type = "button" name = "button" class = "btn btn-primary" id = "btnsubmit" value = "Explore" onclick = "submitForm()">
							</div>
						</div>
					</div>
				</div>
				<div class = "row paddingleft">
					<div class = "col-md-3 col-xs-3">
						<label for = "scaffold">Scaffold select :</label>
		                <select id = "scaffold" name = "scaffold" class = "form-control">
		                    <option></option>
		                </select>
					</div>
					<div class = "col-md-4 col-xs-4">
						<div class = "row">
							<div class = "col-md-9 col-xs-9">
								<label for = "gene_name">Gene name :</label>
								<input id = "gene_name" class = "form-control" name = "gene_name" type = "text">
							</div>
							<div class = "col-md-3 col-xs-3">
								<label for = "search_button" class = "btnlabel">Search</label>
								<input id = "search_button" class = "btn btn-primary" value = "Search" type = "button" onclick = "submitGeneName()"/>						
							</div>
						</div>
					</div>
				</div>
			</form>
			<div id="tool">
				<table id = "tool_table">
	                	<tr>
	                    <td>move</td>
	                    <td width = "10"></td>
	                    <td>
	                        <input class = "btn btn-primary btn-xs tool_button" type = "button" value = "<<<" title = "move 1000 to the left" onclick = "move_left_1000()"/>
	                    </td>
	                    <td>
	                        <input class = "btn btn-primary btn-xs tool_button" type = "button" value = "<<" title = "move 500 to the left" onclick = "move_left_500()"/>
	                    </td>
	                    <td>
	                        <input class = "btn btn-primary btn-xs tool_button" type = "button" value = "<" title = "move 100 to the left" onclick = "move_left_100()"/>
	                    </td>
	                    <td>
	                        <input class = "btn btn-primary btn-xs tool_button" type = "button" value = ">" title = "move 100 to the right" onclick = "move_right_100()"/>
	                    </td>
	                    <td>
	                        <input class = "btn btn-primary btn-xs tool_button" type = "button" value = ">>" title = "move 500 to the right" onclick = "move_right_500()"/>
	                    </td>
	                    <td>
	                        <input class = "btn btn-primary btn-xs tool_button" type = "button" value = ">>>" title = "move 1000 to the right" onclick = "move_right_1000()"/>
	                    </td>
	                    <td width = "10"></td>
	                    <td>zoom in</td>
	                    <td width = "10"></td>
	                    <td>
	                        <input class = "btn btn-primary btn-xs tool_button" type = "button" value = "+" title = "zoom in 100 the gene_view" onclick = "zoom_in_100()"/>
	                    </td>
	                    <td>
	                        <input class = "btn btn-primary btn-xs tool_button" type = "button" value = "++" title = "zoom in 500 the gene_view" onclick = "zoom_in_500()"/>
	                    </td> 
	                    <td>
	                        <input class = "btn btn-primary btn-xs tool_button" type = "button" value = "+++" title = "zoom in 1000 the gene_view" onclick = "zoom_in_1000()"/>
	                    </td>  
	                    <td width = "10"></td>
	                    <td>zoom out</td>
	                    <td width = "10"></td>
	                    <td>
	                        <input class = "btn btn-primary btn-xs tool_button" type = "button" value = "-" title = "zoom out 100 the gene_view" onclick = "zoom_out_100()"/>
	                    </td>
	                    <td>
	                        <input class = "btn btn-primary btn-xs tool_button" type = "button" value = "--" title = "zoom out 500 the gene_view" onclick = "zoom_out_500()"/>
	                    </td>
	                    <td>
	                        <input class = "btn btn-primary btn-xs tool_button" type = "button" value = "---" title = "zoom out 1000 the gene_view" onclick = "zoom_out_1000()"/>
	                    </td>
	                </tr>
	            	</table>
			</div>	
		</div>
	</div>
	
	<div id = "content">
		<div class = "content_box">
			<div class = "left_box wordview">sss</div>
			<div class = "right_box">
				<div class = "mark_count" id = "count_1">1</div>
	            <div class = "mark_count" id = "count_2">2</div>
                <div class = "mark_count" id = "count_3">3</div>
                <div class = "mark_count" id = "count_4">4</div>
                <div class = "mark_count" id = "count_5">5</div>
                <div class = "mark_count" id = "count_6">6</div>
                <div class = "mark_count" id = "count_7">7</div>
                <div class = "mark_count" id = "count_8">8</div>
                <div class = "mark_count" id = "count_9">9</div>
                <div class = "mark_count">
                    <div class = "left_num" id = "count_10">10</div>
                    <div class = "right_num" id = "count_11">11</div>
                </div>
			</div>
		</div>
		<div class = "content_box">
			<div class = "left_box">Mark</div>
			<div class = "right_box">
				<div class = "scale_shallow"></div>
	            <div class = "scale_deep"></div>
                <div class = "scale_shallow"></div>
                <div class = "scale_deep"></div>
                <div class = "scale_shallow"></div>
                <div class = "scale_deep"></div>
                <div class = "scale_shallow"></div>
                <div class = "scale_deep"></div>
                <div class = "scale_shallow"></div>
                <div class = "scale_deep"></div>
			</div>
		</div>
		<div class = "content_box" id = "gene_content"></div>
	</div>
	
	<div id = "footer">
		<p>Copyright ◎Bioinformatics teaching and research section Zhang Gaochuan 2013 of bioinformatics Yuan Bingrui development and maintenance</p>
	</div>
	
</div>

<div class = "modal fade" id = "loginmodal" tabindex = "-1" role = "dialog" aria-hidden = "true" aria-labelledby = "loginModalLabel">
	<div class = "modal-dialog">
   		<div class = "modal-content">
			<div class = "modal-header">
				<button type = "button" class = "close" data-dismiss = "modal"><span aria-hidden = "true">&times;</span><span class = "sr-only">Close</span></button>
     			<h2 class = "modal-title" id = "loginModalLabel">Login</h2>
     		</div>
     		<div class = "modal-body">
				<form role = "form" action = "<?php echo $_SERVER['PHP_SELF'];?>" method = "post">
  					<div class = "form-group">
    					<label for = "username">Username:</label>
    					<input type = "text" class = "form-control" name = "username" placeholder = "please input username" required>
  					</div>
  					<div class = "form-group">
    					<label for = "password">Password:</label>
    					<input type = "password" class = "form-control" name = "password" placeholder = "please input password" required>
  					</div>
  					<div class = "row">
  						<div class = "col-md-3 col-xs-3"></div>
  						<div class = "col-md-4 col-xs-4"><input type = "submit" name = "submit" class = "btn btn-primary" value = "Login"></div>
  						<div class = "col-md-4 col-xs-4"><input type = "reset" name = "reset" class = "btn btn-primary" value = "Reset"></div>
  						<div class = "col-md-1 col-xs-1"></div>		
  					</div>
  				</form>	
      		</div>
      		<div class = "modal-footer">
        		<button type = "button" class = "btn btn-default" data-dismiss = "modal">Close</button>
      		</div>
     	</div>
    </div>
</div>

<div class="modal fade" id="uploadfile" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="uploadfileModalLabel">
	<div class="modal-dialog">
   		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
     			<h2 class="modal-title" id="uploadfileModalLabel">Upload local data
</h2>
     		</div>
     		<div class="modal-body">
				<form  id="uploadfileform" role="form">
  					<div class="form-group">
  						<div><p><strong>Species:</strong></p></div>
  						<div class="input-group">
      						<div class="input-group-btn" id="osnamelist">
        						<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">select
<span class="caret"></span></button>
        						<ul class="dropdown-menu" role="menu"></ul>
      						</div>
      						<input type="text" name="osname" class="form-control" id="osname" placeholder="please input species" required>
    					</div>
  					</div>
  					<div class="form-group">
    					<label for="toolClassLabel">ToolLabel:</label>
    					<input type="text" name="toolClassLabel" class="form-control" id="toolClassLabel" placeholder="please input toollabel" required>
  					</div>
  					<div class="form-group">
  						<label for="gffFile">UploadFile:</label>
  						<input type="file" id="gffFile" name="gffFile">
  					    <p class="help-block">Upload gff3 file.</p>
  					</div>
  					<div class="row">
  						<div class="col-md-3 col-xs-3"></div>
  						<div class="col-md-4 col-xs-4">
  							<input type="button" name="submit" class="btn btn-primary" value="Upload" id = "uploadFilebtn" onclick="UploadFile()">
  						</div>
  						<div class="col-md-4 col-xs-4">
  							<input type="reset" name="reset" class="btn btn-primary" value="Reset">
  						</div>
  						<div class="col-md-1 col-xs-1"></div>		
  					</div>
  				</form>	
      		</div>
      		<div class="modal-footer">
        		<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      		</div>
     	</div>
    </div>
</div>

<div class = "modal fade" id = "insertuserinfo" tabindex = "-1" role = "dialog" aria-hidden = "true" aria-labelledby = "insertModalLabel">
	<div class = "modal-dialog">
   		<div class = "modal-content">
			<div class = "modal-header">
				<button type = "button" class = "close" data-dismiss = "modal"><span aria-hidden = "true">&times;</span><span class = "sr-only">Close</span></button>
     			<h2 class = "modal-title" id = "insertModalLabel">Registering a new user</h2>
     		</div>
     		<div class = "modal-body">
				<form role = "form" action = "newuserinfoinsert.php" method = "post">
  					<div class = "form-group">
    					<label for = "newusername">Username:</label>
    					<input type = "text" class = "form-control" name = "newusername" placeholder = "please input username" required>
  					</div>
  					<div class = "form-group">
    					<label for = "newassword">Password:</label>
    					<input type = "password" class = "form-control" name = "newassword" placeholder = "please input password" required>
  					</div>
  					<div class = "row">
  						<div class = "col-md-3 col-xs-3"></div>
  						<div class = "col-md-4 col-xs-4"><input type = "submit" name = "submit" class = "btn btn-primary" value = "Confirm"></div>
  						<div class = "col-md-4 col-xs-4"><input type = "reset" name = "reset" class = "btn btn-primary" value = "Reset"></div>
  						<div class = "col-md-1 col-xs-4"></div>		
  					</div>
  				</form>	
      		</div>
      		<div class = "modal-footer">
        		<button type = "button" class = "btn btn-default" data-dismiss = "modal">Close</button>
      		</div>
     	</div>
    </div>
</div>

</body>
</html>
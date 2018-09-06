var osNameVarify = 0;
function OsNameSelect(){
	$.post("os_name_index.php",
		function(os_name_arr){
			var os_name_line = os_name_arr.split(';');
			var len = os_name_line.length;
			var os_name_path;
			var osName;
			var select_os_name = document.getElementById("os_name");
			os_name_path = select_os_name.options[0].value;
			ScaffoldIdSelect(os_name_path);
			for(var os_i = 1; os_i < len; os_i++){
				osName = os_name_line[os_i];
				if(osName == os_name_path){
					continue;
				}
			  	var temp_option_os_name = document.createElement("option");
			  	temp_option_os_name.appendChild(document.createTextNode(osName));
			  	temp_option_os_name.setAttribute("value",os_name_line[os_i]);
			  	select_os_name.appendChild(temp_option_os_name);
			}
			select_os_name.onchange = function(){
				osNameVarify = 0;
				document.getElementById("gene_content").innerHTML = "";
				for(var k = 0; k < select_os_name.options.length; k++){
				   if(select_os_name.options[k].selected){
						os_name_path = select_os_name.options[k].value;
					  	ScaffoldIdSelect(os_name_path);
					  	break;
				   }
				}
			}
	});
}
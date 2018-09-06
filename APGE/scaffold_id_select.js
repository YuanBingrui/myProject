function ScaffoldIdSelect(os_name_path){
	path = "./Databases/genomes/" + os_name_path + "/scaffold_index";
	$.post(path, 
		function(str_scaffold){
			var scaffold_line = str_scaffold.split('\n');
			var len = scaffold_line.length;
			var scaffold_arr;
			var select_index = document.getElementById("scaffold");
			var test_from = document.getElementById("from");
			var test_to = document.getElementById("to");
		   	scaffold_arr = scaffold_line[0].split('\t');
		   	select_index.options[0].text = scaffold_arr[0];
		   	select_index.options[0].value = scaffold_arr[0];
		   	test_from.value = 1;
		   	test_to.value = 10000;
		   	while (select_index.firstChild) {
			  	select_index.removeChild(select_index.firstChild); 
		   	}
		   	for(var i = 0; i < len; i++){
			  	scaffold_arr = scaffold_line[i].split('\t');
			  	var temp_option_index = document.createElement("option");
			  	temp_option_index.appendChild(document.createTextNode(scaffold_arr[0]));
			  	temp_option_index.setAttribute("value",scaffold_arr[0]);
			  	select_index.appendChild(temp_option_index);
		   	}
		   	select_index.onchange = function(){
			 	for(var j = 0; j < select_index.options.length; j++){
			   		if(select_index.options[j].selected){
				  		var scaffold_arr_selected = scaffold_line[j].split('\t');
				  		test_from.value = 1;
		   		  		test_to.value = 10000;
				  		submitForm();
				  		break;
			   		}
				}
		   	}
			test_from.value = 1;
			test_to.value = 10000;
			submitForm();
	});
}
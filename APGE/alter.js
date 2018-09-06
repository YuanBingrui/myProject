// JavaScript Document
function move_left_100(){
	var from=document.getElementById('from').value;
	var to=document.getElementById('to').value;
	if(from <= 100){
		document.getElementById('from').value=1;
		document.getElementById('to').value=to-(from-1);
	}else{
		document.getElementById('from').value=from-100;
		document.getElementById('to').value=to-100;
	}
	submitForm();
}
function move_left_500(){
	var from=document.getElementById('from').value;
	var to=document.getElementById('to').value;
	if(from <= 500){
		document.getElementById('from').value=1;
		document.getElementById('to').value=to-(from-1);
	}else{
		document.getElementById('from').value=from-500;
		document.getElementById('to').value=to-500;
	}
	submitForm();
}
function move_left_1000(){
	var from=document.getElementById('from').value;
	var to=document.getElementById('to').value;
	if(from <= 1000){
		document.getElementById('from').value=1;
		document.getElementById('to').value=to-(from-1);
	}else{
		document.getElementById('from').value=from-1000;
		document.getElementById('to').value=to-1000;
	}
	submitForm();
}
function move_right_100(){
	var from=document.getElementById('from').value;
	var to=document.getElementById('to').value;
	//if(to>=range_max){
		//document.getElementById('from').value=from+(range_max-to);
		//document.getElementById('to').value=range_max;
	//}else{
	document.getElementById('from').value=from*1+100*1;
	document.getElementById('to').value=to*1+100*1;
	//}
	submitForm();
}
function move_right_500(){
	var from=document.getElementById('from').value;
	var to=document.getElementById('to').value;
	//if(to>=range_max){
		//document.getElementById('from').value=from+(range_max-to);
		//document.getElementById('to').value=range_max;
	//}else{
	document.getElementById('from').value=from*1+500*1;
	document.getElementById('to').value=to*1+500*1;
	//}
	submitForm();
}
function move_right_1000(){
	var from=document.getElementById('from').value;
	var to=document.getElementById('to').value;
	//if(to>=range_max){
		//document.getElementById('from').value=from+(range_max-to);
		//document.getElementById('to').value=range_max;
	//}else{
	document.getElementById('from').value=from*1+1000*1;
	document.getElementById('to').value=to*1+1000*1;
	//}
	submitForm();
}
function zoom_in_100(){
	var from=document.getElementById('from').value;
	var to=document.getElementById('to').value;
	if(to-from >=1000){
		document.getElementById('from').value=from*1+100*1;
		document.getElementById('to').value=to-100;
	}else{
		
	}
	submitForm();
}
function zoom_in_500(){
	var from=document.getElementById('from').value;
	var to=document.getElementById('to').value;
	if(to-from >=1000){
		document.getElementById('from').value=from*1+500*1;
		document.getElementById('to').value=to-500;
	}else{
		
	}
	submitForm();
}
function zoom_in_1000(){
	var from=document.getElementById('from').value;
	var to=document.getElementById('to').value;
	if(to-from >=1000){
		document.getElementById('from').value=from*1+1000*1;
		document.getElementById('to').value=to-1000;
	}else{
		
	}
	submitForm();
}
function zoom_out_100(){
	var from=document.getElementById('from').value;
	var to=document.getElementById('to').value;
	//if(to-from<=range_max){
	if(from >= 100){
	document.getElementById('from').value=from-100;
	document.getElementById('to').value=to*1+100*1;
	}else{
	document.getElementById('from').value=1;
	document.getElementById('to').value=to*1+100*1-(from-1);
	}
	//}else{
		
	//}
	submitForm();
}
function zoom_out_500(){
	var from=document.getElementById('from').value;
	var to=document.getElementById('to').value;
	//if(to-from<=range_max){
	if(from >= 100){
	document.getElementById('from').value=from-500;
	document.getElementById('to').value=to*1+500*1;
	}else{
	document.getElementById('from').value=1;
	document.getElementById('to').value=to*1+500*1-(from-1);
	}
	//}else{
		
	//}
	submitForm();
}
function zoom_out_1000(){
	var from=document.getElementById('from').value;
	var to=document.getElementById('to').value;
	//if(to-from<=range_max){
	if(from >= 100){
	document.getElementById('from').value=from-1000;
	document.getElementById('to').value=to*1+1000*1;
	}else{
	document.getElementById('from').value=1;
	document.getElementById('to').value=to*1+1000*1-(from-1);
	}
	//}else{
		
	//}
	submitForm();
}
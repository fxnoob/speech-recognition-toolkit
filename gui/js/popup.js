$('#myTab a').click(function (e) {
	e.preventDefault()
	$(this).tab('show')
})

/*
   clicking on the setting buttons
   */ 

   get_vals('allow_fast_cp_status', function(result) {
   	if('allow_fast_cp_status' in result){
   		document.getElementById('allow_fast_cp').checked = (result['allow_fast_cp_status']=="yes")?true:false;
   	}
   	else{
   		set_vals('allow_fast_cp_status',"yes");
   		document.getElementById('allow_fast_cp').checked = true;
   	} 
   });

   get_vals('allow_fast_override_status', function(result) {
   	console.log(result);
   	if('allow_fast_override_status' in result){
   		console.log("if");
   		document.getElementById('allow_fast_override').checked = (result['allow_fast_override_status']=="yes")?true:false;
   	}
   	else{
   		console.log("else");
   		set_vals('allow_fast_override_status',"no");
   		document.getElementById('allow_fast_override').checked = false;
   	} 
   });


   document.getElementById('allow_fast_cp').addEventListener("click",function(){
   	var value = document.getElementById('allow_fast_cp').checked?"yes":"no";
   	set_vals('allow_fast_cp_status',value);
   });


   document.getElementById('allow_fast_override').addEventListener("click",function(){
   	var value = document.getElementById('allow_fast_override').checked?"yes":"no";
   	set_vals('allow_fast_override_status',value,function(){
   		get_vals('allow_fast_override_status', function(result) {
   			console.log(result);
   		});
   	});
   });




//-----------------Utils-----------------------------------------

function set_vals(key , value , callback=null){
	localStorage.setItem(key,value);
	if(callback!=null)
		callback();
}

function get_vals(key,callback){
	var res = localStorage.getItem(key);
	var res_obj = {};
		res_obj[key] = res;
	console.log(res_obj);
	callback(res_obj);
}
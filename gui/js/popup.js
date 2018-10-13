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

   get_vals('allow_speech_recog_status', function(result) {
      console.log(result);
      if('allow_speech_recog_status' in result){
         console.log("if");
         document.getElementById('allow_speech_recog').checked = (result['allow_speech_recog_status']=="yes")?true:false;
      }
      else{
         console.log("else");
         set_vals('allow_speech_recog_status',"no");
         document.getElementById('allow_speech_recog').checked = false;
      } 
   });

   /*
      enable/disable fast copy paste
   */
   document.getElementById('allow_fast_cp').addEventListener("click",function(){
   	var value = document.getElementById('allow_fast_cp').checked?"yes":"no";
   	set_vals('allow_fast_cp_status',value);
   	refresh_page();
   });

   /*
      enable/disable fast override
   */
   document.getElementById('allow_fast_override').addEventListener("click",function(){
   	var value = document.getElementById('allow_fast_override').checked?"yes":"no";
   	set_vals('allow_fast_override_status',value);
   	refresh_page();
   });

   /*
      enable/disable speech recognition
   */
   document.getElementById('allow_speech_recog').addEventListener("click",function(){
      var value = document.getElementById('allow_speech_recog').checked?"yes":"no";
      set_vals('allow_speech_recog_status',value,function(){
         toggle_speech_recog();
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

function refresh_page(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
	});
}

function toggle_speech_recog(){
   get_vals("allow_speech_recog_status",function(val){
      if(val['allow_speech_recog_status']=="yes")
         chrome.tabs.executeScript(null, {file: "js/start.js"});
      else
         chrome.tabs.executeScript(null, {file: "js/abort.js"});  
   });
}
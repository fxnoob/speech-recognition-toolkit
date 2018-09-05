//utils
function __D(value){
  this.timeStamp = +new Date;//copying time in miliseconds
  this.data = value;  // main data
  this.override = null;//override setting
}
//already selected data for newly opened tab
var savedData = new __D(null);
 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 

	if (request.method == "settings_fastcp"){ 
		var _data = getSettings(); 
		console.log(_data);
		sendResponse({data:_data});
	}
	else if(request.method == "BsetDataPlease"){
		var dat = request.data; 
		console.log(dat);
		savedData = dat;
		chrome.tabs.query({}, function(tabs) {
			var message = {method:"BsetDataPlease",data: dat};
			for (var i=0; i<tabs.length; ++i) {
				chrome.tabs.sendMessage(tabs[i].id, message);
			}
		});
	}
	else
      sendResponse({}); // snub them.

}); 
//-----------------Util------------------------

function getSettings(){
	var data = {'allow_fast_override_status':'no','allow_fast_cp_status':'yes',savedData:savedData};
	if ('allow_fast_override_status' in localStorage)
		data.allow_fast_override_status = localStorage['allow_fast_override_status'];
	if ('allow_fast_cp_status' in localStorage) 
		data.allow_fast_cp_status = localStorage['allow_fast_cp_status'];
	console.log(data);
	return data;
}
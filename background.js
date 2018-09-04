var parent1=chrome.contextMenus.create({

	title: "Speedster %s",
	contexts:["all"]
});
chrome.contextMenus.onClicked.addListener(function(info, tab){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {action:info}, function(response) {});  
	});
});
var child1 = chrome.contextMenus.create
(
	{"title": "Show password", "parentId": parent1, "onclick": genericOnClick, "contexts":["editable"],"id":"12" }
	);
var child2 = chrome.contextMenus.create
(
	{"title": "Rank 2", "parentId": parent1, "onclick": genericOnClick, "contexts":["editable"],"id":"13" }
	);
var child2 = chrome.contextMenus.create
(
	{"title": "Rank 3", "parentId": parent1, "onclick": genericOnClick, "contexts":["editable"],"id":"14" }
	);
function genericOnClick(){} 


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 

	if (request.method == "settings_fastcp"){ 
		var _data = getSettings(); 
		console.log(_data);
		sendResponse({data:_data});
	}
	else if(request.method == "BsetDataPlease"){
		var dat = request.data; 
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
	var data = {'allow_fast_override_status':'no','allow_fast_cp_status':'yes'};
	if ('allow_fast_override_status' in localStorage)
		data.allow_fast_override_status = localStorage['allow_fast_override_status'];
	if ('allow_fast_cp_status' in localStorage) 
		data.allow_fast_cp_status = localStorage['allow_fast_cp_status'];

	return data;
}
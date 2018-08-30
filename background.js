chrome.webNavigation.onCompleted.addListener(function(details) {
    chrome.tabs.executeScript({
        file:"cpcp.js"
    });
});


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

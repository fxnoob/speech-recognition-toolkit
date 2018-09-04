//utils
function __D(value){
  this.timeStamp = +new Date;//copying time in miliseconds
  this.data = value;  // main data
  this.override = null;//override setting
}
function __setData(D){
  var ret = false;
  var oldD = __getData();
  var diffMiliSec = D.timeStamp-oldD.timeStamp;
  if (diffMiliSec>2000) { 
    ____D.timeStamp = D.timeStamp;
    ____D.data = D.data;
    ret = true;
  }
  return ret;
}
//broadcasting data 
//params - > data:__getData()
function __BsetData(D){
  var ret = __setData(D);
  if(ret)
    chrome.runtime.sendMessage({method: "BsetDataPlease",data:D});
  return ret;
}
function __getData(){
  return ____D;
}
function __isNonCopyElements(ele){
  var ret  = null;
  if (ele.type=='text'||ele.type=='textarea'||ele.type=='password'||ele.type=='email')
    ret = true;
  return ret;  
}
//init
var ____D = new __D(null); 
//listening to broadcast event  
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 

  if (request.method == "BsetDataPlease"){ 
    console.log(request);
    __setData(request.data);
  } 
}); 
//getting status of allow copypaste from extensions localStorage using message passing mechanism
chrome.runtime.sendMessage({method: "settings_fastcp"}, function(response) {
  //alert(response);
  console.log(response);
  if (response.data.allow_fast_cp_status=="yes") {
    //fast copy
    document.addEventListener("mouseup",ff,false);
    //fast paste
    document.addEventListener("mousemove",mff,false);
    ____D.override = response.allow_fast_override_status; 
    //cutting the text from document
    document.addEventListener("cut",cff,false);
  }
});
//setting brodcasted data

//capituring message
function ff(e)
{
  var data = document.getSelection().toString() ;
  var x = e.clientX;
  var y = e.clientY;
  var ele = document.elementFromPoint(x,y);
  if(!__isNonCopyElements(ele)){
    if(data!=''&&data.length!=0)
    {
      //D.data= data;
      var temp = new __D(data);
      if(__BsetData(temp))
        document.execCommand('copy'); 
      event.preventDefault();
    }
  } 
}
function mff(e)
{
  var x = e.clientX;
  var y = e.clientY;
  var ele = document.elementFromPoint(x,y);
  var data;
  if(ele!=null)
    if(ele.type=='text'||ele.type=='textarea'||ele.type=='password'||ele.type=='email')
    {
      ele.addEventListener('dblclick',function(ee){
        var D = __getData();
        if(D.data!=null) {
          if (D.override = "yes")
            ele.value = D.data;
          else {
            var dat = ele.value +D.data;
            ele.value=dat;
          }
          event.preventDefault();
        }
      },false);
    }
  }

//function for handling cut event
function cff(e)
{
  e.srcElement.innerHTML = e.srcElement.innerHTML.substring(0,e.srcElement.innerHTML.indexOf(document.getSelection().toString()))+e.srcElement.innerHTML.substring(e.srcElement.innerHTML.indexOf(document.getSelection().toString())+document.getSelection().toString().length);
    // console.log(document.getSelection().getRangeAt(0));
  }


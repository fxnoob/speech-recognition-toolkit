var D ={data:null};
//getting status of allow copypaste from extensions localStorage using message passing mechanism
chrome.runtime.sendMessage({method: "settings_fastcp"}, function(response) {
  //alert(response);
  console.log(response);
  if (response.data.allow_fast_cp_status=="yes") {
    //fast copy
    document.addEventListener("mouseup",ff,false);
    //fast paste
    document.addEventListener("mousemove",mff,false);
    //cutting the text from document
    document.addEventListener("cut",cff,false);
  }
});

//capituring message



function ff(e)
{

  var data = document.getSelection().toString() ;
  if(data!=''&&data.length!=0)
  {
    D.data= data;
    document.execCommand('copy');
    event.preventDefault();
  }
}
function mff(e)
{
  var x = e.clientX;
  var y = e.clientY;
  var ele = document.elementFromPoint(x,y);
  var data;
  if(ele.type=='text'||ele.type=='textarea'||ele.type=='password'||ele.type=='email')
  {
    ele.addEventListener('dblclick',function(ee){

      if(D.data!=null) {
        ele.value = D.data;
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


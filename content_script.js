 var Coord ={x:null,y:null};
document.addEventListener("mousedown",mff,false);
function mff(e)
{
     Coord.x = e.clientX;
     Coord.y = e.clientY;
}
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  //console.log(message);  
  if(message.action.menuItemId==12)
      {
         //codes for handling first context menu
          var  ele;
     if(Coord.x!=null&&Coord.y!=null)
        {
          ele = document.elementFromPoint(Coord.x, Coord.y);
          if(ele.type=='password')
          {
               ele.type='text';
          }else
           alert("Not a passord field!");
        }
      }
      else if(message.action.menuItemId==13)
	{
           //codes for handling second context menu
        }
      else if(message.action.menuItemId==14)
	{
         //codes for handling third context menu
        }
});

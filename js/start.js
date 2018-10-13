"use strict";

$(document).ready(function() {
  if (annyang) {


    //inject some html modal
    var openDocPlease = function(){
        //model html injection

        var model_html = '<div class="md-modal md-effect-18 md-show" id="modal-18">'+
        '     <div class="md-content">'+
        '       <h3>Modal Dialog</h3>'+
        '       <div>'+
        '         <p>This is a modal window. You can do the following things with it:</p>'+
        '         <ul>'+
        '           <li><strong>Read:</strong> modal windows will probably tell you something important so don\'t forget to read what they say.</li>'+
        '           <li><strong>Look:</strong> a modal window enjoys a certain kind of attention; just look at it and appreciate its presence.</li>'+
        '           <li><strong>Close:</strong> click on the button below to close the modal.</li>'+
        '         </ul>'+
        '         <button class="md-close">Close me!</button>'+
        '       </div>'+
        '     </div>'+
        '   </div>';
        var div = document.createElement("div");
            div.innerHTML = model_html;
            document.body.appendChild(div);

        var button = document.createElement('button');
        button.innerHTML = '';
        button.class = 'md-trigger md-setperspective';
        button.setAttribute("data-modal", "fcp_modallllllllll-18888888888");
        button.onclick = function(){
          return false;
        };
        // where do we want to have the button to appear?
        // you can append it to another element just by doing something like
        // document.getElementById('foobutton').appendChild(button);
        //document.body.appendChild(button);
    };

    var clearInput = function() {
      if ( $("input").is(":focus") ) {
        $("input:focus").val("");
      } else if ( $("textarea").is(":focus") ) {
        $("textarea:focus").val("");
      }
    };

    var addText = function(txt) {
      if ( $("input").is(":focus") ) {
        $("input:focus").val(function(_, oldVal) {
           return oldVal + txt;
        });
      } else if ( $("textarea").is(":focus") ) {
        $("textarea:focus").val(function(_, oldVal) {
           return oldVal + txt;
        });
      }
    };

    var showDoc = function(){
      alert("ddd");
      openDocPlease();
    }
    var goToTab = function(num){
      //console.log(num);
      //console.log(chrome.tabs.update);
      if(!isNaN(num))
        chrome.runtime.sendMessage({method: "speechRecognitionPlease",data:num});
    }
    
    var commands = {
      "show doc": showDoc,
      "clear input": clearInput,
      "input *search": addText,
      "go to tab *num":goToTab //switch tab
    };
    
    annyang.addCommands(commands);
    annyang.start();
    
    $("input, textarea").on("focus", function() {
      annyang.resume();
    }).on("blur", function() {
      annyang.pause();
    });
  }
});

var socket = io();
var loaded = false;
var loaded2 = false;
socket.emit('GiveInfo');
var textareaPosition = document.getElementById('wrapper');
socket.on('Info',function(signals){
    console.log(signals.length);
   if(!loaded){ 
    var Elements = signals.length - 1;
    console.log(Elements);
    var x = getUrlVars()["x"];
    
    
    var to = (parseInt(x)+1)*3;
    var from = to - 3;

   if(signals.length != 1 && !loaded){
        if(to <= signals.length){
            for(var i = signals.length-(x*3) - 1;i>=signals.length-(x*3)-3;i--){
                console.log("To",to);
                console.log("From",from)
                var textarea = document.createElement("TEXTAREA");
                textarea.setAttribute("id","text");
                textarea.setAttribute("style","overflow: hidden; word-wrap: break-word; resize: none; height: 160px; ");
                textarea.setAttribute("readonly","readonly");
                textarea.value = signals[i].Signal +"\nAuthor:" + signals[i].username;
                
                textareaPosition.appendChild(textarea);
                
        loaded = true;
            }
        }else{
            if(!((signals.length-1)%3 == 0)){
                
                for(var x = 1 ;x >= 0;x--){
                    console.log("yes");
                    var textarea = document.createElement("TEXTAREA");
                    textarea.setAttribute("id","text");
                    textarea.setAttribute("style","overflow: hidden; word-wrap: break-word; resize: none; height: 160px; ");
                    textarea.setAttribute("readonly","readonly");
                    textarea.value = signals[x].Signal +"\nAuthor:" + signals[x].username;
                    textareaPosition.appendChild(textarea);
                    console.log("Length:"+signals.length);
                    
                    loaded = true;
                }
            }else{
                var textarea = document.createElement("TEXTAREA");
                textarea.setAttribute("id","text");
                textarea.setAttribute("style","overflow: hidden; word-wrap: break-word; resize: none; height: 160px; ");
                textarea.setAttribute("readonly","readonly");
                textarea.value = signals[0].Signal +"\nAuthor:" + signals[0].username;
                textareaPosition.appendChild(textarea);
                
                loaded = true;
            }
        }
             loaded = true;
   }else{
       if(!loaded){
            var textarea = document.createElement("TEXTAREA");
            textarea.setAttribute("id","text");
            textarea.setAttribute("style","overflow: hidden; word-wrap: break-word; resize: none; height: 160px; ");
            textarea.setAttribute("readonly","readonly");
            textarea.value = signals[0].Signal +"\nAuthor:" + signals[0].username;
            textareaPosition.appendChild(textarea);
            loaded = true;
       }
   }
    var Page = 0;
    var makePage = document.getElementById("pagination");
    Elements = Elements - 3;
    while(Elements >= 0){
            Page++;
            Elements = Elements - 3;
    }
    
    /*var numbers = 1;
    while(Page >= 0){
       
        var btn = document.createElement("A");
        btn.setAttribute("href","?x="+numbers);
        var Node = document.createTextNode(""+numbers);
        btn.appendChild(Node)
        makePage.appendChild(btn);
        Page--;
        numbers++;
    }*/
    var numbers = 0;
    
        while(Page >= 0 ){
        
            var btn = document.createElement("A");
            btn.setAttribute("href","?x="+numbers);
            var Node = document.createTextNode(""+(numbers+1));
            btn.appendChild(Node)
            makePage.appendChild(btn);
            Page--;
            numbers++;
        
        }
   // if(){
        var arrow = document.createElement("A");
        arrow.setAttribute("href","?x="+(numbers-1));
        arrow.innerHTML = "&raquo;";
        makePage.appendChild(arrow);
    //}
}
});
 function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
} 
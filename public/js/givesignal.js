var socket = io(); 
function Clicked(){
    var signal = {
        text : "",
        username : localStorage.getItem("Account")
    };
    signal.text = document.getElementById("text").value;
    socket.emit("PutSignal",signal);
    location.replace('/static/html/Submitmassage.html');
}
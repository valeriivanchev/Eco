var socket = io();
function Clicked(){
    var username = document.getElementById("reg_username").value;
    var password = document.getElementById("reg_password").value;
    console.log("Username:"+username+" "+"Password:"+password);
    if(username =="" || password == ""){
        Swal.fire({
            icon: 'error',
            title: 'Please write in every field!' 
        });
    }else{
        var account = {
            username:username,
            password:password
        };        
        socket.emit("Account",account);
        var timerInterval;
                    Swal.fire({
                    icon:'info',
                    title: 'One moment',
                    timer: 2000,
                    onBeforeOpen: () => {
                        Swal.showLoading()
                        timerInterval = setInterval(() => {
                        const content = Swal.getContent()
                      
                        }, 100)
                    },
                    onClose: () => {
                        clearInterval(timerInterval)
                    }
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                           console.log('END');
                        }
                    })
        socket.on('Info',function(info){
            if(info <=0){
                localStorage.setItem("Account",""+account.username);
                location.replace('/static/html/homepage.html');
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Sorry, someone already has the same username!' 
                });
            }
        });
    }
}
if(localStorage.getItem("Account") == null){
    var socket = io();
    function Clicked(){
        var account = {
            username : document.getElementById("lg_username").value,
            password : document.getElementById("lg_password").value
        };
        var usr = account.username;
        socket.emit("FAccount",account);
        socket.on('Acnt',function(account){
            if(account.length > 0){
                var timerInterval;
                        Swal.fire({
                        icon:'success',
                        title: 'Thank you!!!',
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
                                console.log("Account "+account.username);
                                localStorage.setItem("Account",""+usr);
                                location.replace('/static/html/homepage.html');
                            }
                        });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Wrong username or password!' 
                });
            }
        });
    }
}else{
    location.replace('/static/html/homepage.html');
}
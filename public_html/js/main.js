function submit(){
    let brightness = document.getElementById("brightness").value;
    let fanSpeed = document.getElementById("fanSpeed").value;
    console.log("brightness is: " + brightness + " fan speed is: " + fanSpeed);

    fetch('/settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            brightness: brightness,
            fan_speed: fanSpeed
            }),
        }).then(function(res){
            if(res.status === 200){
                console.log("success");
            } else {
                console.log("server error");
            }
        }).catch((error) => {console.log(error)});
    }


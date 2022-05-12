window.addEventListener("DOMContentLoaded", event => {
    const options = {
      duration: 300,
      onShow: null,
      swipeable: true,
      responsiveThreshold: Infinity
    };
  
    const tabsContainer = document.querySelector(".tabs");
    M.Tabs.init(tabsContainer, options);
    setInfo();
  });

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

function setInfo(){
    fetch("/info")
    .then(function(res){
        if(res.status == 200)
            return res.json();
    })
    .then(function(res){
        document.getElementById("temp").textContent = res.temp + "°F";
        document.getElementById("level").textContent = res.lvl;
        document.getElementById("ph").textContent = res.ph + " pH";
    }).catch((err)=>console.log(err));
}
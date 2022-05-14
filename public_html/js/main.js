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
        let predEl = document.getElementById("prediction")
        
        let p1 = document.createElement('p');
        p1.textContent = `ML model prediction ${res.state} = basil scab`;

        let p2 = document.createElement('p');
        p2.textContent = "\nHere are ways to better understand the current state of the plant and improve the plants health:";
        predEl.appendChild(p1);
        predEl.appendChild(p2);
        let a = document.createElement('a');
        let linkText = document.createTextNode("here");
        a.appendChild(linkText);
        a.href = res.link;
        predEl.appendChild(a);

        document.getElementById("brightness").value = res.brightness;
        document.getElementById("fanSpeed").value = res.fan_speed;

    }).catch((err)=>console.log(err));
}

function takepic(){
    console.log("taking picture");

    fetch("/takepic")
    .then(function(res){
        if(res.status == 200)
            return;
    })
    .then(function(){
        setTimeout(location.reload(), 30000);
    }).catch((err)=>console.log(err));

}
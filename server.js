let express = require("express");
const { exec } = require("child_process");
let port = 3000;
let hostname = "localhost"
let app = express();

let fanSpeed = 0;
let brightness = 100;

app.use(express.static('public_html'));
app.use(express.json());

app.get('/', function(req,res) {
	res.status(200).sendFile(__dirname + "\\public_html\\index.html\\");
});

app.post("/settings", function (req, res) {
	let body = req.body;

	if(body.hasOwnProperty("brightness") && body.hasOwnProperty("fan_speed")){
		brightness = body.brightness;
		fanSpeed = body.fan_speed;
		exec(`brightness ${brightness}`, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
		});

		exec(`fan ${fanSpeed}`, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
		});

		return res.sendStatus(200);
	} else {
		return res.sendStatus(400);
	}

});

app.get('/info', (req, res) => {
	let temp = (Math.random()/2)*10 + 70;
	temp = temp.toFixed(2);
	let water = "full";
	let pH = 6 + Math.random();
	pH = pH.toFixed(2);
	let state = "basil scab";
	let link = "https://plantvillage.psu.edu/topics/basil/infos";
	res.json({ temp:temp, lvl:water, ph:pH, state:state, link:link, brightness:brightness, fan_speed:fanSpeed});
});

app.get('/takepic', (req, res) => {
	exec("python3 /home/pi/Motorized_Focus_Camera/python/Autofocus.py", (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return res.sendStatus(400);
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return res.sendStatus(400);
		}
	});

	return res.sendStatus(200);
	
});

app.listen(port,() => {
	console.log(`Listening at: http://${hostname}:${port}`);
});
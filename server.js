let express = require("express");
const { exec } = require("child_process");
let port = 3000;
let hostname = "localhost"
let app = express();

app.use(express.static('public_html'));
app.use(express.json());

app.get('/', function(req,res) {
	res.status(200).sendFile(__dirname + "\\public_html\\index.html\\");
});

app.post("/settings", function (req, res) {
	let body = req.body;

	if(body.hasOwnProperty("brightness") && body.hasOwnProperty("fan_speed")){
		exec(`brightness ${body.brightness}`, (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
		});

		exec(`fan ${body.fan_speed}`, (error, stdout, stderr) => {
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
	let pH = 6 + Math.random().toFixed(2);
	res.json({ temp:temp, lvl:water, ph:pH});
});

app.listen(port,() => {
	console.log(`Listening at: http://${hostname}:${port}`);
});
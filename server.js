let express = require("express");
let port = 3000;
let hostname = "localhost"
let app = express();

app.use(express.static('public_html'));
app.use(express.json());

app.get('/', function(req,res) {
	res.status(200).sendFile(__dirname + "\\public_html\\index.html\\");
});

app.listen(port,() => {
	console.log(`Listening at: http://${hostname}:${port}`);
});
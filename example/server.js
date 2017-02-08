var express = require("express");
var app = express();
var ServerTiming = require("../index");

app.get("/", function(req, res) {

	// start timer
	ServerTiming.start("Database Query");

	// simulate long running database query
	setTimeout(function() {

		// stop timer
		ServerTiming.stop("Database Query");

		// add external non timer metric in milliseconds
		ServerTiming.addMetric("Image Processing", 12365);

		res.header("Server-Timing", ServerTiming.generateHeader());
		return res.send({whatever: "you want"});

	}, 1234);
});

app.listen(8888, function() {
	console.log("Listening on port 8888...");
});

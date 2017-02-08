var Timer = require("timer-machine");
var slugify = require("slugify");

// SERVER - TIMING
class ServerTiming {

	// CONSTRUCTOR
	constructor() {
		this.metrics = {};
		this.times = {};
	}

	// START
	start(name) {

		// slugify name
		var slug = slugify(name).toLowerCase();
		this.metrics[slug] = name;

		// start timer
		Timer.get(slug).start();

		return true;
	}

	// STOP
	stop(name) {

		// slugify name
		var slug = slugify(name).toLowerCase();

		Timer.get(slug).stop();

		// get time
		this.times[slug] = Timer.get(slug).time();
		Timer.destroy(slug);

		return this.times[slug];
	}

	// GENERATE HEADER
	generateHeader() {

		var header = "";

		// loop the metrics
		Object.keys(this.metrics).forEach(slug => {
			header += slug + "=" + (this.times[slug] / 1000) + "; \"" + this.metrics[slug] + "\",";
		});

		// remove trailing comma and return header string
		return header.replace(/,\s*$/, "");
	}
}

module.exports = new ServerTiming();

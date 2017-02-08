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
		var slug = slugify(name);
		this.metrics[slug] = name;

		// start timer
		Timer.get(slug).start();

		return true;
	}

	// STOP
	stop(name) {

		// slugify name
		var slug = slugify(name);

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
		Object.keys(this.names).forEach(slug => {
			header += slug + "=" + (this.times[slug] / 1000) + "; \"" + this.metrics[slug] + "\",";
		});

		return header;
	}
}

module.exports = new ServerTiming();

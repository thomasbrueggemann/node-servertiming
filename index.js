"use strict";

var Timer = require("timer-machine");
var slugify = require("slugify");

// SERVER - TIMING
class ServerTiming {

	// CONSTRUCTOR
	constructor() {
		this.metrics = {};
		this.times = {};
	}

	// START TIMER
	startTimer(name) {

		// slugify name
		var slug = slugify(name).toLowerCase();
		if(!slug || slug.length === 0) return false;

		this.metrics[slug] = name;

		// start timer
		Timer.get(slug).start();

		return true;
	}

	// STOP TIMER
	stopTimer(name) {

		// slugify name
		var slug = slugify(name).toLowerCase();
		if(!slug || slug.length === 0) return false;

		// check if timer even exists
		if(this.metrics && !(slug in this.metrics)) return false;

		// stop timer
		Timer.get(slug).stop();

		// get time
		this.times[slug] = Timer.get(slug).time();
		Timer.destroy(slug);

		return this.times[slug];
	}

	// ADD METRIC
	addMetric(name, value) {

		// slugify name
		var slug = slugify(name).toLowerCase();
		if(!slug || slug.length === 0) return false;

		var parsedValue = parseFloat(value);

		// check if value is not a number
		if(isNaN(parsedValue)) return false;

		// add metric manually
		this.metrics[slug] = name;
		this.times[slug] = parsedValue;

		return true;
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

module.exports = ServerTiming;

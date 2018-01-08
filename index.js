"use strict";

var Timer = require("timer-machine-node");
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
		var timer = Timer.get(slug);
		timer.start();

		var self = this;

		return {
			stop() {

				// check if timer even exists
				if(self.metrics && !(slug in self.metrics)) return false;

				// already stopped and recorded
				if(slug in self.times) return self.times[slug];

				// stop timer
				Timer.get(slug).stop();

				// get time
				self.times[slug] = Timer.get(slug).time();
				Timer.destroy(slug);

				return self.times[slug];

			},

			clear() {

				// check if timer even exists
				if(self.metrics && !(slug in self.metrics)) return false;

				// stop and destory timer
				Timer.get(slug).stop();
				Timer.destroy(slug);

				// delete references to self slug
				delete self.metrics[slug];
				delete self.times[slug];

				return true;
			}
		}
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

	// CLEAR TIMER
	clearTimer(name) {

		// slugify name
		var slug = slugify(name).toLowerCase();
		if(!slug || slug.length === 0) return false;

		// check if timer even exists
		if(this.metrics && !(slug in this.metrics)) return false;

		// stop and destory timer
		Timer.get(slug).stop();
		Timer.destroy(slug);

		// delete references to this slug
		delete this.metrics[slug];
		delete this.times[slug];

		return true;
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
			header += slug + "; dur=" + this.times[slug] + "; desc=\"" + this.metrics[slug] + "\",";
		});

		// remove trailing comma and return header string
		return header.replace(/,\s*$/, "");
	}
}

module.exports = ServerTiming;

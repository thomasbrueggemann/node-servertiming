'use strict';

var ServerTiming = require("../index");

describe("Server-Timing ", function() {

	it("should start a timer with the name 'Database Query'", function(done) {

		var result = ServerTiming.start("Database Query");
		result.should.equal(true);

		setTimeout(done, 112);
	});

	it("should stop a timer with the name 'Database Query'", function(done) {

		var time = ServerTiming.stop("Database Query");
		(time > 0).should.equal(true);

		return done();
	});

	it("should print the Server-Timing header string", function(done) {

		var header = ServerTiming.generateHeader();
		console.log(header);
		(header.length > 0).should.equal(true);

		return done();
	});
});

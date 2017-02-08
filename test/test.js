'use strict';

var ServerTiming = require("../index");

describe("Server-Timing ", function() {

	it("should start a timer with the name 'Database Query'", function(done) {

		var result = ServerTiming.start("Database Query");
		result.should.equal(true);

		return done();
	});
});

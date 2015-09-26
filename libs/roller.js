'use strict';

var Roller = function () {
}

Roller.prototype = {
	start: function() {
		return JSON.stringify(Math.floor((Math.random() * 100) + 1));
	}
};

module.exports = Roller;
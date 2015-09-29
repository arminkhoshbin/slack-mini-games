'use strict';

var items = ['Rock', 'Paper', 'Scissors'];

var RPS = function () {
}

RPS.prototype = {
	chance: function() {
		return JSON.stringify(items[Math.floor(Math.random() * items.length)]);
	}
};

module.exports = RPS;
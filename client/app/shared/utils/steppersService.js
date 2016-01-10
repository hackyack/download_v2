angular.module('app.services')
.factory('steppersService', function () {
	var steppersService = {};

	steppersService._steps = [];
	steppersService._active = 0;

	steppersService.steps = function(steps) {
		steppersService._steps = [];
		steppersService._active = 0;
		for (var i in steps) {
			steppersService._steps.push({
				name: steps[i],
				state: ""
			});
			steppersService._steps[0].state = "active";
		}
		return steppersService.getSteps();
	};

	steppersService.getSteps = function() {
		return steppersService._steps;
	};

	steppersService.next = function() {
		var nextStep = steppersService._active + 1;
		if (steppersService._steps.length >= nextStep) {
			steppersService._steps[steppersService._active].state = "done";
			if (steppersService._steps.length >= nextStep + 1) {
				steppersService._steps[nextStep].state = "active";
			}
			steppersService._active = steppersService._active + 1;
		}
	};

	steppersService.previous = function() {
		var previousStep = steppersService._active - 1;
		if (previousStep >= 0) {
			if (steppersService._active < steppersService._steps.length) {
				steppersService._steps[steppersService._active].state = "";
			}
			steppersService._steps[previousStep].state = "active";
			steppersService._active = steppersService._active - 1;
		}
	};

	steppersService.goTo = function(number) {
		if (number > 0 && number <= steppersService._steps.length + 1) {
			var index = number - 1;
			steppersService._active = index;
			for (var i in steppersService._steps) {
				if (index < i && index < steppersService._steps.length) {
					steppersService._steps[i].state = "";
				}
				else if (index == i) {
					steppersService._steps[i].state = "active";
				}
				else if (index > i) {
					steppersService._steps[i].state = "done"
				}
				
			}
		}
	}

	steppersService.init = function() {
		steppersService.goTo = 1;
	}

	steppersService.finish = function() {
		steppersService.goTo(steppersService._steps.length);
	}

	return steppersService;
});
const color = require('./console-colors.js')

Object.defineProperty(global, '__stack', {
	get: function() {
		var orig = Error.prepareStackTrace;
		Error.prepareStackTrace = function(_, stack) { return stack; };

		var err = new Error;
		Error.captureStackTrace(err, arguments.callee);

		var stack = err.stack;
		Error.prepareStackTrace = orig;

		return stack;
	}
});

Object.defineProperty(global, '__debug', {
	get: function() {
		return ("\n\t** " + color.fg.Cyan + __stack[1].getFunctionName() + color.Reset + ":" +
				color.fg.Red + __stack[1].getLineNumber() + color.Reset + " -> " +
				color.fg.Magenta + __stack[1].getFileName() + color.Reset + " **\n");
	}
});

Object.defineProperty(global, '__getFuncName', {
	get: function() {
		return ("\n\t** " + color.fg.Cyan + __stack[1].getFunctionName() + color.Reset + ":" +
				color.fg.Red + __stack[1].getLineNumber() + color.Reset + " -> " +
				color.fg.Magenta + __stack[1].getFileName() + color.Reset + " **\n");
	}
});

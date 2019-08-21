const color = require('./console-colors.js')

function optimizedCheck() {
	let argList = []

	for (let arg = 0; arg < arguments.length; ++arg) {
		let arr = arguments[arg];

		if (arr === undefined) {
			argList.push(arg + 1)
		}
	}

	let fmtArgList = argList.join("")

	if (argList.length === 1) {
		process.stdout.write(color.Bright + color.fg.Red + "OPTIMIZED WARNING" + color.fg.White + ": " + color.fg.Magenta + "UNDEFINED VARIABLE\n"
					+ color.fg.Red + "FUNCTION" + color.fg.White + ": " + color.fg.Blue + __stack[1].getFunctionName() + color.fg.White + "()\n"
					+ color.fg.Red + "ARGUMENT" + color.fg.White + ": " + color.fg.Blue + fmtArgList + color.Reset + "\n\n")
	} else if (argList.length > 1) {
		process.stdout.write(color.Bright + color.fg.Red + "OPTIMIZED WARNING" + color.fg.White + ": " + color.fg.Magenta + "UNDEFINED VARIABLES\n"
					+ color.fg.Red + "FUNCTION" + color.fg.White + ": " + color.fg.Blue + __stack[1].getFunctionName() + color.fg.White + "()\n"
					+ color.fg.Red + "ARGUMENTS" + color.fg.White + ": " + color.Reset)

		let buffer = ""

		for (let n = 0; n < fmtArgList.length; ++n) {
			buffer += color.Bright + color.fg.Blue + fmtArgList[n]

			if (n < fmtArgList.length - 1) {
				buffer += color.fg.White + ", "
			} else {
				buffer += color.fg.White
			}
		}

		process.stdout.write(buffer + color.Reset + "\n\n")
	}
}

module.exports = {
	optimizedCheck: optimizedCheck
}
const color = require('./console-colors.js')

class Debugger {
	constructor(oneArg, twoArgs) {
		this.pubMsg = false
		this.privMsg = false
		this.objConst = true
		this.verbose = false
		this.funcEntrance = true
		this.funcDepature = true
		this.prevFuncArgCount = arguments.length
		this.funcArgCount = [ arguments.length ]
		
		if (this.objConst) {
			console.log("CONSTRUCTOR CALLED; " + arguments.length)
		}
	}

	output(message) {
		process.stdout.write(color.Bright + color.fg.Red + "DEBUG MESSAGE" + color.fg.White + ": " + color.fg.Magenta + message + "\n"
							+ color.fg.Red + "FILE" + color.fg.White + ": " + color.fg.Cyan + __stack[1].getFileName()
							+ color.fg.White + ":" + color.fg.Cyan + __stack[1].getLineNumber() + color.Reset + "\n\n")
	}

	funcEntry(calleeArgCount) {
		this.funcArgCount.push(calleeArgCount)

		process.stdout.write(color.Bright + color.fg.Red + "DEBUG TYPE" + color.fg.White + ": " + color.fg.Magenta + "FUNCTION ENTRY\n"
					+ color.fg.Red + "ORIGIN" + color.fg.White + ": " + color.fg.Blue + __stack[2].getFunctionName() + color.fg.White + "(" + this.prevFuncArgCount + " arguments) -> "
					+ color.fg.Blue + __stack[1].getFunctionName() + color.fg.White + "(" + calleeArgCount + " arguments)\n"
					+ color.fg.Red + "FILE" + color.fg.White + ": " + color.fg.Cyan + __stack[1].getFileName()
					+ color.fg.White + ":" + color.fg.Cyan + __stack[1].getLineNumber() + color.Reset + "\n\n")

		this.prevFuncArgCount = calleeArgCount
	}

	funcExit(retData) {
		process.stdout.write(color.Bright + color.fg.Red + "DEBUG TYPE" + color.fg.White + ": " + color.fg.Magenta + "FUNCTION EXIT\n"
					+ color.fg.Red + "ORIGIN" + color.fg.White + ": " + color.fg.Blue + __stack[1].getFunctionName() + color.fg.White + "(" + this.funcArgCount.pop() + " arguments)\n"
					+ color.fg.Red + "RETURN DATA" + color.fg.White + ": " + color.fg.Blue + retData + "\n"
					+ color.fg.Red + "FILE" + color.fg.White + ": " + color.fg.Cyan + __stack[1].getFileName()
					+ color.fg.White + ":" + color.fg.Cyan + __stack[1].getLineNumber() + color.Reset + "\n\n")
	}
};

module.exports = {
	Debugger: Debugger
}
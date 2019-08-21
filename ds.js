require('./node_modules/includes/objectOverride.js')
const debugRoutines = require('./node_modules/includes/debug.js')
const debug = new debugRoutines.Debugger();

const mimickEffect = require('./node_modules/includes/mimick.js')
const mimick = new mimickEffect.Mimick();

const Discord = require('discord.js')
const client = new Discord.Client()
const { prefix, token } = require('./config.json')
const color = require('./node_modules/includes/console-colors.js')

let mimickFlag = false

// Generic class; to be used specifically for our elevator class object
class Level {
	constructor(floor = 1) {
		// Default floor level is: 1
		this.floor = floor;
	}

	// No limitations for assigning a floor level (negatives, positives or even 0)
	// No safety checks (EG: ensure it's a numerical value)
	setFloor(floor) {
		this.floor = floor;
	}

	// Returns the floor level that the elevator is currently on
	getFloor() {
		return this.floor;
	}
}

class Elevator {
	constructor(startingFloor = 4, maxUpFloors = 20, maxDownFloors = -10) {
		// This is an example of: Class composition
		this.elevatorFloor = new Level(startingFloor);

		// Maximum (above-ground) floors this elevator has access to
		this.maxUpFloors = maxUpFloors;

		// Maximum (sub-ground) floors this elevator has access to
		this.maxDownFloors = maxDownFloors;
	}

	// Defaults to the value of "1" if no value is explicitly passed (EG: floor() or floor(1) work)
	setFloor(newFloor = 1) {
		// Here: We can control what internally happens in the method without the user (programmer) needing to know
		if (newFloor >= this.maxDownFloors) {
			this.elevatorFloor.floor = newFloor;
		} else {
			throw "ERROR: ELEVATOR DESCENDING LEVEL";
		}

		// Conditional statement prevents the elevator from going up to a level that's not allowed (this.maxUpFloors)
		if (newFloor <= this.maxUpFloors) {
			this.elevatorFloor.floor = newFloor;
		} else {
			throw "ERROR: ELEVATOR ASCENDING LEVEL";
		}
	}

	// Elevator implementation of "floor()" is unrelated to Level's implementation of "floor()" (same name; no relation)
	getFloor() {
		// This returns the VALUE returned from the class object's "get floor()" method
		return this.elevatorFloor.getFloor();
	}

	// Ascends upwards by 1 floor level
	goUp() {
		this.setFloor(this.getFloor() + 1);
	}

	// Descends downwards by 1 floor level
	goDown() {
		this.setFloor(this.getFloor() - 1);
	}
}

client.on('ready', () => {

	process.stdout.write(color.Blink + color.Bright + color.fg.Magenta + color.bg.Cyan + "Democratic Society Javascript started" + color.Reset + "\n\n")

	let retValue = null

	if (debug.funcEntrance) {
		debug.funcEntry(arguments.length)
	}

	process.stdout.write("Connected as " + client.user.tag + "\n\n")
	client.user.setActivity("with myself")

	const common = require('./node_modules/includes/common.js')

	const test = common._getChannelByID(client, "611592848030302213", "611592848030302208")

	if (test === null) {
		process.stdout.write("Channel by ID return value: " + test + "\n\n")
	} else {
		process.stdout.write("Channel by ID return value: " + test + "\n\n")
	}

	// Assign a channel to output text to
	mimick.selectChannel(client.channels.get(test))

	// Assign a target to mimick
	mimick.selectTarget("Muted#3677")

	// This small example demonstrates how object oriented programming might be (simple form)
	console.log("Creating a new ELEVATOR object")

	// This creates a new elevator object; it starts on the 4th floor and has 20 floors maximum
	let gameElevatorObj = new Elevator(4, 20, -10);

	// try-catch statement attempts (TRIES) to run the block of code
	// Upon an error it handles (CATCHES) the alternative track of program flow
	try {
		// This for-loop runs 25 times
		for (let n = 0; n < 25; ++n) {
			gameElevatorObj.goUp();
			console.log("CURRENT LEVEL: " + gameElevatorObj.getFloor());
		}

		// This attempts to set the elevator level to the 99th level (but this block will NEVER execute! An error is THROWN first)
		gameElevatorObj.setFloor(99);
	} catch (errorThatWasThrown) {
		console.log(errorThatWasThrown);

		// Attempt to recover from the error
		if (errorThatWasThrown === "ERROR: ELEVATOR ASCENDING LEVEL") {
			console.log("Attempting to recover from ascention error; setting elevator floor to max level: " + gameElevatorObj.maxUpFloors);
			gameElevatorObj.setFloor(gameElevatorObj.maxUpFloors - 1);
		}

		if (errorThatWasThrown === "ERROR: ELEVATOR DESCENDING LEVEL") {
			console.log("Attempting to recover from descention error; setting elevator floor to max level: " + gameElevatorObj.maxDownFloors);
			gameElevatorObj.setFloor(gameElevatorObj.maxDownFloors + 1);
		}
	}

/*
	const liveChat = require('./node_modules/includes/live-chat.js')
	const server = new liveChat.Server(client, "Power to the People")

	server.link("Power to the People", "teen-chat")
	server.sendMessage("Robot online & operational!")

	const test = server._getServerByName("Power to the People", true)

	if (test === null) {
		process.stdout.write(color.fg.Cyan + "test" + color.Reset + " = " + color.fg.Magenta + "null" + color.Reset)
	} else if (test.constructor === Array) {
		process.stdout.write(color.fg.Cyan + "test" + color.Reset + " = " + color.fg.Magenta + "array" + color.Reset)
	} else if (test) {
		process.stdout.write(color.fg.Cyan + "test" + color.Reset + " = " + color.fg.Magenta + "single object" + color.Reset)
	}

	const test = server._getChannelByID("437811385989201934", "Power to the People")
	const test2 = server._getChannelByName("teen-chat", "Power", true, true)

	if (test !== null) {
		server.sendMessage("Channel ID found: " + test.id + " | Channel name found: " + test.name)
	}

	if (test2 !== null) {
		server.sendMessage("Channel ID found: " + test2.id + " | Channel name found: " + test2.name)
	}
*/
	let stdin = process.openStdin();

	console.log(typeof test + test)

	stdin.addListener("data", async function(d) {
		let msgToSend = d.toString().trim()

		//server.broadcast(d.toString().trim())
		let foo = client.channels.get(test)
		foo.send(d.toString().trim())
	})

	client.on('message', async (msg) => {
		// Prevent bot from responding to its own messages
		if (msg.author === client.user) {

			if (debug.funcDepature) {
				debug.funcExit(retValue)
			}

			return
		}

		// The channel to send messages to
		let foo = client.channels.get(test)

		let nameOnly = msg.author.tag.substr(0, msg.author.tag.length - 5)

		for (let n = 0; n < mimick.Masters.length; ++n) {
			// Elevator shaft controller - UP
			if (nameOnly === mimick.Masters[n] && msg.content === "!elevator.up()") {
				try {
					gameElevatorObj.goUp();
				} catch (e) {
					foo.send(e)
					foo.send("Attempting to recover from ascention error; setting elevator floor to max level: " + gameElevatorObj.maxUpFloors);
					gameElevatorObj.setFloor(gameElevatorObj.maxUpFloors);
					return
				}

				foo.send("Elevator ascended to floor #: " + gameElevatorObj.getFloor());
				return
			}

			// Elevator shaft controller - DOWN
			if (nameOnly === mimick.Masters[n] && msg.content === "!elevator.down()") {
				try {
					gameElevatorObj.goDown();
				} catch (e) {
					foo.send(e)
					foo.send("Attempting to recover from descention error; setting elevator floor to max level: " + gameElevatorObj.maxDownFloors);
					gameElevatorObj.setFloor(gameElevatorObj.maxDownFloors);
					return
				}

				foo.send("Elevator descended to floor #: " + gameElevatorObj.getFloor());
				return
			}

			// Elevator shaft controller - RETURN FLOOR
			if (nameOnly === mimick.Masters[n] && msg.content === "!elevator.getFloor()") {
				foo.send("Elevator resting on floor #: " + gameElevatorObj.getFloor());
				return
			}

			// Elevator shaft controller - SET FLOOR XYZ
			if (nameOnly === mimick.Masters[n] && msg.content.startsWith("!elevator.setFloor(")) {
				let newFloor = msg.content.substr(19, msg.content.length - 20);
				console.log("USER SAID: " + newFloor);
				gameElevatorObj.setFloor(newFloor);
				return
			}

			// Enable the mimick command via: !mimick
			if (nameOnly === mimick.Masters[n] && msg.content === "!mimick") {
				mimick.toggleState()
				return
			}

			// Enable the mimick command via: !masters
			if (nameOnly === mimick.Masters[n] && msg.content.startsWith("!masters")) {
				mimick.showMasters()
				return
			}

			// Enable the mimick command via: !mimick
			if (nameOnly === mimick.Masters[n] && msg.content.startsWith("!add ")) {
				mimick.add(msg.content.substr(5, msg.content.length - 5))
				return
			}

			// Designate a new target to mimick via: !target
			if (nameOnly === mimick.Masters[n] && msg.content.startsWith("!target ")) {
				mimick.selectTarget(msg.content.substr(8, msg.content.length - 8))
				return
			}

			// Mimicks the user's text (after modifying it via: trim()); excludes the command itself ("!mimick")
			if (msg.content != "!mimick" && nameOnly === mimick.target) {
				mimick.mimickText(msg.toString().trim())
				return
			}
		}

		process.stdout.write("[" + msg.author.tag + "]: " + msg.content + "\n\n")
	})

	//if (debug.funcDepature) {
	//	debug.funcExit(retValue)
	//}
})

client.login(token)

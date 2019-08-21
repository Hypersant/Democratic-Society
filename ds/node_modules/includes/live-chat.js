const color = require('./console-colors.js')
const common = require('./common.js')

class Debugger {
	constructor() {
		this.pubMsg = false
		this.privMsg = false
		this.objConst = false
		this.funcEntry = false
		this.funcExit = false
	}

	async funcEntry() {
		process.stdout.write("Class composition successful\n\n")
	}
};

// Server manager (provides management of links of channel data to be streamed)
class ServerMgr {
	constructor(client) {
		this.client = client			// Discord client
		this.links = []					// List of linked channels to broadcast messages to
		this.debug = new Debugger() // CLASS COMPOSITION
		this.verboseMode = true

		if (this.debug.objConst) {
			process.stdout.write("Class composition successful\n\n")
		}

		if (this.verboseMode) {
			process.stdout.write("** NOTICE - Server Manager object constructed", __debug + "\n\n");
		}
	}

	// Returns a link to the caller
	async link(server, channel) {
		// TO DO:
		// Filter out numeral servers (min. digits required)
		let serverID = common._getServerByName(server)

		if (serverID === null) {
			process.stdout.write("serverID undefined\n\n")
			return undefined
		}

		if (arguments.length > 2) {
			for (var n = 1; n < arguments.length; ++n) {
				process.stdout.write(arguments[n] + "\n\n")

				// TO DO:
				// Filter out numeral servers (min. digits required)
				let channelID = common._getChannelByName(arguments[n], serverID)

				if (channelID === null) {
					process.stdout.write("\"" + arguments[n] + "\" - undefined\n\n")
					continue
				}

				process.stdout.write("Adding channel to chain-link of channels to message\n\n")
				this.links.push(this.client.channels.get(channelID.id))

				process.stdout.write("Searching for the channel \"" + channelID.name + "\" in the server of \"" + serverID.name + "\"\n\n")
			}
		} else {
			// TO DO:
			// Filter out numeral servers (min. digits required)
			let channelID = common._getChannelByName(channel, serverID)

			if (channelID === null) {
				process.stdout.write("\"" + channel + "\" - undefined\n\n")
				return undefined
			}

			process.stdout.write("Adding channel to chain-link of channels to message\n\n")
			this.links.push(this.client.channels.get(channelID.id))

			process.stdout.write("Searching for the channel \"" + channelID.name + "\" in the server of \"" + serverID.name + "\"\n\n")
		}
	}

	// Broadcasts a message to all channels listed
	async broadcast(message) {
		this.links.forEach(async (channel) => {
			channel.send(message)

			if (this.verboseMode) {
				process.stdout.write("CHANNEL: " + channel.name + "; MESSAGE: " + message + __debug + "\n\n");
			}
		})
	}

	async installSpeaker(channel) {
	}

	async installListener(channel) {
	}
}

class Server extends ServerMgr {
	constructor(client, server) {
		super(client)
	}

	async sendMessage(message) {
		this.links.forEach(async (channel) => {
			channel.send(message)
		})
	}
}

module.exports = {
	ServerMgr: ServerMgr,
	Server: Server
}

const debugRoutines = require('./debug.js')
const debug = new debugRoutines.Debugger();
const OW = require('./optimizedWarnings.js')
const color = require('./console-colors.js')

// Returns server object if exact match found; else returns null
function _getServerByPartialMatch(client, serverName) {

	let retValue = null

	if (debug.funcEntrance) {
		debug.funcEntry(arguments.length)
	}

	for (let [serverID, server] of client.guilds) {
		if (server.name === serverName) {
			if (this.verboseMode) {
				process.stdout.write("** NOTICE - Partial match selected -- " + color.Bright + "exact match found" + color.Reset, __debug + "\n\n");
			}

			retValue = server

			if (debug.funcDepature) {
				debug.funcExit(retValue)
			}

			return retValue
		} else if (server.name.includes(serverName)) {
			if (this.verboseMode) {
				process.stdout.write("** NOTICE - Partial match selected -- " + color.Bright + "partial match found" + color.Reset, __debug + "\n\n");
			}

			this.serverPartialMatches.push(server)
		}
	}

	// TO DO:
	// Request user for selection of partial match
	for (let servers of this.serverPartialMatches) {
		this.broadcast("PARTIAL MATCHES: " + servers)
	}

	retValue = this.serverPartialMatches

	if (debug.funcDepature) {
		debug.funcExit(retValue)
	}

	return retValue
}

// Queries a server's ID based on name
function _getServerByName(client, serverName, partialMatchServer) {

	let retValue = null

	if (debug.funcEntrance) {
		debug.funcEntry(arguments.length)
	}

	let optimizedWarnings = false

	if (optimizedWarnings) {
		OW.optimizedCheck(client, serverName, partialMatchServer)
	}

	if (partialMatchServer !== undefined && partialMatchServer == true) {

		retValue = _getServerByPartialMatch(serverName)

		if (debug.funcDepature) {
			debug.funcExit(retValue)
		}

		return retValue
	} else {
		for (let [serverID, server] of client.guilds) {
			if (server.name === serverName) {

				retValue = server

				if (debug.funcDepature) {
					debug.funcExit(retValue)
				}

				return retValue
			}
		}
	}

	if (debug.funcDepature) {
		debug.funcExit(retValue)
	}

	return retValue
}

// Queries a server's ID based on ID
function _getServerByID(client, id) {

	let retValue = null

	if (debug.funcEntrance) {
		debug.funcEntry(arguments.length)
	}

	let optimizedWarnings = false

	if (optimizedWarnings) {
		OW.optimizedCheck(client, id)
	}

	for (let [serverID, server] of client.guilds) {
		if (server.id == id) {
			retValue = server

			if (debug.funcDepature) {
				debug.funcExit(retValue)
			}

			return retValue
		}
	}

	if (debug.funcDepature) {
		debug.funcExit(retValue)
	}

	return retValue
}

// Queries a server's channel ID based on name
function _getChannelByName(channelName, server, partialMatchChannel, partialMatchServer) {

	let retValue = null

	if (debug.funcEntrance) {
		debug.funcEntry(arguments.length)
	}

	if (partialMatchChannel !== undefined && partialMatchChannel == true) {
		if (isNaN(server)) {
			if (partialMatchServer !== undefined && partialMatchServer == true) {
				// Partially match server(s)
				server = _getServerByName(server, partialMatchChannel)
			} else {
				server = _getServerByName(server, partialMatchChannel)
			}
		} else {
			debug.message("_getChannelByName() -- getting server by ID")
			server = _getServerByID(server)
		}
	}

	for (let [channelID, channel] of server.channels) {
		if (channel.name == channelName) {

			retValue = channel

			if (debug.funcDepature) {
				debug.funcExit(retValue)
			}

			return retValue
		}
	}

	if (debug.funcDepature) {
		debug.funcExit(retValue)
	}

	return retValue
}

// Queries a channel's ID based on ID
function _getChannelByID(client, chanID, server) {

	let retValue = null

	if (debug.funcEntrance) {
		debug.funcEntry(arguments.length)
	}

	let optimizedWarnings = false

	if (optimizedWarnings) {
		OW.optimizedCheck(client, chanID, server)
	}

	// Check all servers
	if (server === undefined) {
		if (debug.verbose) {
			debug.output("Server not listed (" + color.fg.Red + "undefined" + color.fg.Magenta + ")")
		}

		for (let [serverID, server] of client.guilds) {
			for (let [channelID, channel] of server.channels) {
				if (channel.id === chanID) {
					if (debug.verbose) {
						debug.output("Channel ID found: \"" + color.fg.Blue + chanID + color.fg.Magenta + "\" = \"" + color.fg.Blue + channel.name + color.fg.Magenta + "\"")
					}

					retValue = chanID

					if (debug.funcDepature) {
						debug.funcExit(retValue)
					}

					return retValue
				}
			}
		}
	} else {
		if (debug.verbose) {
			debug.output("Function argument for server: \"" + color.fg.Blue + server + color.fg.Magenta + "\"")
		}

		let guild = null

		if (!isNaN(server)) {
			guild = _getServerByID(client, server)
		} else {
			guild = _getServerByName(client, server)
		}

		// CHECK FOR VALID GUILD
		if (guild === null) {
			if (debug.verbose) {
				debug.output("guild value: " + color.fg.Blue + "null")
			}

			if (debug.funcDepature) {
				debug.funcExit(retValue)
			}

			return retValue
		}

		for (let [channelID, channel] of guild.channels) {
			if (channelID === chanID) {
				if (debug.verbose) {
					debug.output("channel value: \"" + color.fg.Blue + channel + color.fg.Magenta + "\"")
				}

				retValue = chanID

				if (debug.funcDepature) {
					debug.funcExit(retValue)
				}

				return retValue
			}
		}
	}

	if (debug.funcDepature) {
		debug.funcExit(retValue)
	}

	return retValue
}

module.exports = {
	_getChannelByID: _getChannelByID,
	_getChannelByName: _getChannelByName
}
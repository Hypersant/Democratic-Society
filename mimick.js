class Mimick {
	constructor() {
		this.target = "Muted#3677"
		this.activated = false
		this.channel = null
		this.Masters = []

		this.Masters.push("Muted")
	}

	add(master) {
		this.Masters.push(master)
		this.channel.send("Added: " + master + " to the bot controller compilation")
	}

	showMasters() {
		let msgBuffer = "Masters listed: "

		for (let n = 0; n < this.Masters.length; ++n) {
			msgBuffer += this.Masters[n] + " "
		}

		this.channel.send(msgBuffer)
	}

	selectChannel(channel) {
		this.channel = channel
	}

	selectTarget(user) {
		this.target = user
		this.channel.send("Mimicking: " + user)
	}

	toggleState() {
		let msgBuffer = "**MIMICK STATE**: "
	
		this.activated = !this.activated

		if (this.activated) {
			msgBuffer += "Enabled"
		} else {
			msgBuffer += "Disabled"
		}

		this.channel.send(msgBuffer)
	}

	mimickText(text) {
		if (this.activated) {
			this.channel.send(text)
		}
	}
}

module.exports = {
	Mimick: Mimick
}

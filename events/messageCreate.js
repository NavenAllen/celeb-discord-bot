const { Events} = require('discord.js');

checkIfRespond = message => {
    if(message.mentions.users.has(process.env.APPLICATION_ID)){
        return true;
    } else if(message.mentions.repliedUser && message.mentions.repliedUser.id === process.env.APPLICATION_ID) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
        console.log(message.mentions)
        if(checkIfRespond(message)) {
            console.log("success!!");
        };
	},
};

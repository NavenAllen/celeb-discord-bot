const { Events} = require('discord.js');
const { OpenAI } = require('openai');
const {getPreviousResponses, updatePreviousResponses} = require("../state/previousResponses")

const openai = new OpenAI();

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
        if(checkIfRespond(message)) {
            message.channel.send("...").then(async replyMessage => {
                console.log(getPreviousResponses("beyonce"));
                updatePreviousResponses({role: "user", content: message.content}, "beyonce")
                const completion = await openai.chat.completions.create({
                    messages: getPreviousResponses("beyonce"),
                    model: "gpt-3.5-turbo",
                });
                
                replyMessage.edit(completion.choices[0].message.content).then(
                    updatePreviousResponses(completion.choices[0].message, "beyonce")
                )
            })
            
        };
	},
};

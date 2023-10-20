const { Events} = require('discord.js');
const { OpenAI } = require('openai');

const openai = new OpenAI();

let count = 1;

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
                console.log(message.client.chatbotProperties.previous_responses);
                message.client.chatbotProperties.previous_responses.push({role: "user", content: message.content})
                const completion = await openai.chat.completions.create({
                    messages: message.client.chatbotProperties.previous_responses,
                    model: "gpt-3.5-turbo",
                });
                
                replyMessage.edit(completion.choices[0].message.content).then(
                    message.client.chatbotProperties.previous_responses.push(completion.choices[0].message)
                )
            })
            
        };
	},
};

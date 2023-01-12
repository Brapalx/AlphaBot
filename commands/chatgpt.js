const { SlashCommandBuilder } = require('discord.js');


import { ChatGPTAPIBrowser } from 'chatgpt'

const api = new ChatGPTAPIBrowser({
  email: process.env.OPENAI_EMAIL,
  password: process.env.OPENAI_PASSWORD
})
await api.initSession()

const result = await api.sendMessage('Hello World!')
console.log(result.response)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};s
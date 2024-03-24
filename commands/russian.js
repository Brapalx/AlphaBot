const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('russian')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {

		const Index = require('../index.js')



		await interaction.reply('Pong!');
	},
};
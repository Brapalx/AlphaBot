const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('Gives you Money!'),
	async execute(interaction) {

		

		await interaction.reply('Money!');
	},
};
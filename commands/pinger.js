const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pinger')
		.setDescription('Replies with Ponger!'),
	async execute(interaction) {
		await interaction.reply('Ponger!');
	},
};
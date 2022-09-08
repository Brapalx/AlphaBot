const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Deletes X number of messages')
        .addIntegerOption(option =>
            option.setName('number')
            .setDescription('Number of messages to delete')
            .setRequired(true)),
	async execute(interaction) {
        interaction.channel.bulkDelete(interaction.options.getInteger('number') + 1);
        await interaction.reply('Done!');
	},
};

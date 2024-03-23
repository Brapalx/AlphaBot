const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('Gives you Money!'),
	async execute(interaction) {

        const Index = require('../index.js')


        const conn = await Index.connection;

        var curr = 0;

        await conn.query(
            `SELECT CURR FROM Users WHERE ID = '${interaction.member.id}'`).then(result => {
                curr = result[0][0].CURR;
            }).catch(err => console.log(err));

        if (curr == 0)
        {
            await interaction.reply(`You have no corgis :(`)
        }
        else if (curr == 1)
        {
            await interaction.reply(`You have ${curr} corgi!`)
        }
        else if (curr > 1)
        {
            await interaction.reply(`You have ${curr} corgis!`)
        }       
	},
};
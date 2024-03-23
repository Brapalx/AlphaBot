const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('Gives you Money!'),
	async execute(interaction) {

        const Index = require('../index.js')


        const conn = await Index.connection;

        var newCurr = 0;

        await conn.query(
            `SELECT CURR FROM Users WHERE ID = '${interaction.member.id}'`).then(result => {
                newCurr = result[0][0].CURR + 20;
            }).catch(err => console.log(err));

        await conn.query(
            `UPDATE Users SET CURR = ${newCurr} WHERE ID = '${interaction.member.id}'`).catch(err => console.log(err));
          

        console.log("gottem");

		await interaction.reply('More Money!');
	},
};
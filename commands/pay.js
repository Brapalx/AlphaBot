const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('Gives you Money!')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('User to pay')
            .setRequired(true))
        .addIntegerOption( option =>
            option.setName('amount')
            .setDescription('Amount to pay')
            .setRequired(true)),
	async execute(interaction) {

        const Index = require('../index.js')


        const conn = await Index.connection;

        var curr = 0;
        var amount = interaction.options.getInteger('amount');
        var usr = interaction.options.getUser('user');
        var newAmount = 0;
        var newCurr = 0;

        await conn.query(
            `SELECT CURR FROM Users WHERE ID = '${interaction.member.id}'`).then(result => {
                curr = result[0][0].CURR;
            }).catch(err => console.log(err));

        if (curr < amount)
        {
            await interaction.reply(`You don't have enough to pay! 🤡`);
        }
        else
        {
            newCurr = curr - amount;

            await conn.query(
                `SELECT CURR FROM Users WHERE ID = '${usr.id}'`).then(result => {
                    newAmount = result[0][0].CURR + amount;
                }).catch(err => console.log(err));
    
            await conn.query(
                `UPDATE Users SET CURR = ${newAmount} WHERE ID = '${usr.id}'`).catch(err => console.log(err));
    
            await conn.query(
                `UPDATE Users SET CURR = ${newCurr} WHERE ID = '${interaction.member.id}'`).catch(err => console.log(err));

        }
    },

};
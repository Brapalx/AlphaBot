const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('Gives you Money!'),
	async execute(interaction) {

        const Index = require('../index.js')


        const conn = await Index.connection;

        var lastDaily = "";

        await conn.query(
            `SELECT LDAILY FROM Users WHERE ID = '${interaction.member.id}'`).then(result => {
                lastDaily = result[0][0].LDAILY;
            }).catch(err => console.log(err));


        var today = new Date();


        var date = today.getFullYear() + '-';
        
        if ((today.getMonth() + 1) < 10)
        {
            date = date + '0' +(today.getMonth() + 1) + '-';
        }
        else
        {
            date = date + (today.getMonth() + 1) + '-';
        }

        if (today.getDate() < 10)
        {
            date = date + '0' + today.getDate();
        }
        else
        {
            date = date + today.getDate();
        }


        console.log(date);
        console.log(lastDaily);


        if (date != lastDaily)
        {
            var newCurr = 0;

            await conn.query(
                `SELECT CURR FROM Users WHERE ID = '${interaction.member.id}'`).then(result => {
                    newCurr = result[0][0].CURR + 20;
                }).catch(err => console.log(err));
    
            await conn.query(
                `UPDATE Users SET CURR = ${newCurr} WHERE ID = '${interaction.member.id}'`).catch(err => console.log(err));
              
    
            console.log("gottem");
    
            await interaction.reply('More Money!');
        }
        else
        {
            await interaction.reply('Already Claimed!');
        }

       
	},
};
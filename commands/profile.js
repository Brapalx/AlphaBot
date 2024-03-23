const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('See all your stats!')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('Profile to display.')),
	async execute(interaction) {

        const Index = require('../index.js')

        const conn = await Index.connection;


        var usr = interaction.options.getUser('user');
        var lvl = 0;
        var XP = 0;
        var curr = 0;
        var clowned = 0;
        var fooled = 0;
        var won = 0;
        var id = 0;

        if (usr != null)
        {
            id = usr.id;
        }
        else
        {
            id = interaction.member.id;
            usr = interaction.member.user;
        }


        await conn.query(
            `SELECT * FROM Users WHERE ID = '${id}'`).then(result => {
                lvl = result[0][0].LVL;
                XP = result[0][0].XP;
                curr = result[0][0].CURR;
                clowned = result[0][0].CLOWNED;
                fooled = result[0][0].FOOLED;
                won = result[0][0].WON;
            }).catch(err => console.log(err));


        const profEmbed = new EmbedBuilder()
            .setTitle(usr.username)
            .addFields(
                { name: "LVL: ", value: lvl, inline: true},
                { name: "XP: ", value: XP, inline: true},
                { name: "Corgis: ", value: curr, inline: false},
                { name: "Clowned: ", value: clowned, inline: false},
                { name: "Got Clowned On: ", value: fooled, inline: true},
                { name: "Games Won: ", value: won, inline: false},
            )
            .setThumbnail(usr.displayAvatarURL())
            
            
        //await interaction.channel.send({ embeds: [pokeEmbed], files: [fileA]});
        await interaction.channel.reply({ embeds: [profEmbed]});
    },

};


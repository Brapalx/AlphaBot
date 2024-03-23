const { SlashCommandBuilder } = require('discord.js');
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pokedex')
		.setDescription('Searches for a pokemon')
        .addStringOption(option =>
            option.setName('pokemon')
            .setDescription('Pokemon to look for')
            .setRequired(true)),
	async execute(interaction) {
        
        const Index = require('../index.js')

        await interaction.reply('Searching...');

        const conn = await Index.connection;
        var param = interaction.options.getString('pokemon').toUpperCase();


        let pokedexEmbed;
        var wins1 = 0;
        var loss1 = 0;
        var draws1 = 0;

        await conn.query(
            `SELECT * FROM Pokemon WHERE STRING = '${param}'`).then(result => {
                wins1 = result[0][0].WINS;
                loss1 = result[0][0].LOSSES;
                draws1 = result[0][0].DRAWS;
            }).catch(err => console.log(err));

        var fileString2 = param.toLowerCase();
        var dirString2 = "./pokeimages/" + fileString2 + ".png";

        const file = new AttachmentBuilder(dirString2);

        var attachString2 = "attachment://";
        attachString2 = attachString2.concat(fileString2 + ".png");


        var linkString2 = "https://bulbapedia.bulbagarden.net/wiki/";
        linkString2 = linkString2.concat(fileString2.charAt(0).toUpperCase() + fileString2.slice(1), "_(Pok%C3%A9mon)")
        
        pokedexEmbed = new EmbedBuilder()
         .setTitle(param)
         .addFields(
            { name: "Wins:", value: wins1.toString(), inline: true},
            { name: "Losses:", value: pokemon.loss1.toString(), inline: true},
            { name: "Draws:", value: draws1.toString(), inline: true},
            { name: "More info:", value: "[Click here](" + linkString2 + ")", inline: true},
         )
         .setImage(attachString2)

        interaction.channel.send({ embeds: [pokedexEmbed], files: [file]});




        await interaction.deleteReply();
	},
};



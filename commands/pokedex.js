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

        
        var param = interaction.options.getString('pokemon').toUpperCase();

        var luName = "__***" + param + "***__";

        let pokedexEmbed;

        var found = false;

        Index.pokeArray.forEach( pokemon => {

            if (pokemon.name === luName)
            {

                var fileString2 = param.toLowerCase();
                var dirString2 = "./pokeimages/" + fileString2 + ".png";

                const file = new AttachmentBuilder(dirString2);
        
                var attachString2 = "attachment://";
                attachString2 = attachString2.concat(fileString2 + ".png");

                var trimString2 = fileString2;


                var linkString2 = "https://bulbapedia.bulbagarden.net/wiki/";
                linkString2 = linkString2.concat(trimString2.charAt(0).toUpperCase() + trimString2.slice(1), "_(Pok%C3%A9mon)")
                
                pokedexEmbed = new EmbedBuilder()
                 .setTitle(pokemon.name)
                 .addFields(
                    { name: "Wins:", value: pokemon.wins.toString(), inline: true},
                    { name: "Losses:", value: pokemon.losses.toString(), inline: true},
                    { name: "More info:", value: "[Click here](" + linkString2 + ")", inline: true},
                 )
                 .setImage(attachString2)

                interaction.channel.send({ embeds: [pokedexEmbed], files: [file]});

                found = true;
            }
            })

            if (!found)
            {
                pokedexEmbed = new EmbedBuilder()
                .setTitle("POKEMON  __***NOT***__  FOUND IN THE BATTLE RECORDS")
                interaction.channel.send({ embeds: [pokedexEmbed] });
            }


        await interaction.deleteReply();
	},
};



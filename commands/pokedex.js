const { SlashCommandBuilder } = require('discord.js');
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const {Pokemon, PokemonArray, PokemonNamesArray, getPokemon,getAllPokemon,getAllPokemonNames} = require('pkmonjs')

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

        const names = await getAllPokemonNames();

        var found = false;

        names.forEach( name => {

            if (name.pokemonName == param.toLowerCase())
                found = true;
        })

        if (found)
        {
            var wins1 = 0;
            var loss1 = 0;
            var draws1 = 0;
    
            await conn.query(
                `SELECT * FROM Pokemon WHERE STRING = '${param}'`).then(result => {
                    wins1 = result[0][0].WINS;
                    loss1 = result[0][0].LOSSES;
                    draws1 = result[0][0].DRAWS;
                }).catch(err => console.log(err));
    
    
            const poke = getPokemon(param.toLowerCase()).then((f)=>
            {
               if(f) {
                 
       
                 const pokeEmbed2 = new EmbedBuilder()
                        .setTitle(param)
                        .addFields(
                           { name: "Wins:", value: wins1.toString(), inline: true},
                           { name: "Losses:", value: loss1.toString(), inline: true},
                           { name: "Draws:", value: draws1.toString(), inline: true},
                        )
                        .setImage(url=f.image.default)
                   
               
                   //await interaction.channel.send({ embeds: [pokeEmbed], files: [fileA]});
                   interaction.channel.send({ embeds: [pokeEmbed2]});
               }
            }
           )
        }
        else
        {
            interaction.channel.send('Not a valid Pokemon.');
        }




        await interaction.deleteReply();
	},
};



const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const fs = require('node:fs');
const {Pokemon, PokemonArray, getPokemon,getAllPokemon,getAllPokemonNames} = require('pkmonjs')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pokevs')
		.setDescription('Starts a Pokemon Voting Battle!'),
	async execute(interaction) {
        
        const Index = require('../index.js')

        await interaction.reply('Loading...');

            interaction.channel.send(" 👊  __***POKEMON BATTLE***__  👊 ");

            const conn = await Index.connection;

            var name1 = "";
            var name2 = "";
            var wins1 = 0;
            var loss1 = 0;
            var draws1 = 0;
            var wins2 = 0;
            var loss2 = 0;
            var draws2 = 0;

            do {

                await conn.query(
                `SELECT * FROM Pokemon ORDER BY RAND() LIMIT 1`).then(result => {
                    name1 = result[0][0].STRING;
                    wins1 = result[0][0].WINS;
                    loss1 = result[0][0].LOSSES;
                    draws1 = result[0][0].DRAWS;
                }).catch(err => console.log(err));


                await conn.query(
                `SELECT * FROM Pokemon ORDER BY RAND() LIMIT 1`).then(result => {
                    name2 = result[0][0].STRING;
                    wins2 = result[0][0].WINS;
                    loss2 = result[0][0].LOSSES;
                    draws2 = result[0][0].DRAWS;
                }).catch(err => console.log(err));
            }
            while (name1 == name2)

            var lowerName1 = name1.toLowerCase();
            console.log(lowerName1);

            const poke = getPokemon(lowerName1).then((f)=>
     {
        if(f) {
          

          const pokeEmbed = new EmbedBuilder()
                 .setTitle(name1)
                 .addFields(
                     { name: "Wins:", value: wins1.toString(), inline: true},
                     { name: "Losses:", value: loss1.toString(), inline: true},
                     { name: "Draws:", value: draws1.toString(), inline: true},
                 )
                 .setImage(url=f.image.default)
            
        
            //await interaction.channel.send({ embeds: [pokeEmbed], files: [fileA]});
            interaction.channel.send({ embeds: [pokeEmbed]});
        }
     }
    )

            
            var lowerName2 = name2.toLowerCase();

            console.log(lowerName2)

            const poke2 = getPokemon(lowerName2).then((f)=>
     {
        if(f) {
          

          const pokeEmbed2 = new EmbedBuilder()
                 .setTitle(name2)
                 .addFields(
                    { name: "Wins:", value: wins2.toString(), inline: true},
                    { name: "Losses:", value: loss2.toString(), inline: true},
                    { name: "Draws:", value: draws2.toString(), inline: true},
                 )
                 .setImage(url=f.image.default)
            
        
            //await interaction.channel.send({ embeds: [pokeEmbed], files: [fileA]});
            interaction.channel.send({ embeds: [pokeEmbed2]});
        }
     }
    )


            const filter = (reaction, user) => {
                    return true;///&& !user.bot;
                };

                // MSG.awaitReactions({ filter, max: 4, time: 60000, errors: ['time'] })
                // .then(collected => console.log(collected.size))
                // .catch(collected => {
                //     console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
                // });    

                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('primary')
                        .setLabel(name1)
                        .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                        .setCustomId('secondary')
                        .setLabel(name2)
                        .setStyle(ButtonStyle.Primary)
                );

                const wait = require('node:timers/promises').setTimeout;

                interaction.channel.send({ content: 'VOTE HERE: ONLY FIRST VOTE COUNTS!', components: [row] });

                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 25000 });

        let ids = [];

        let numA = 0;
        let numB = 0;

collector.on('collect', async i => {
	//await i.update({ content: 'A button was clicked!', components: [] });

    if (!ids.includes(i.user)){
        ids.push(i.user)

        if (i.customId === 'primary'){

            numA++;
            console.log("A");
        }
        else {
            console.log("B")
            numB++;
        }
        i.reply("Thanks for voting!");
    }

});

collector.on('end', async (collected) => {


        let winnerName = "";
                let loserName = "";

                if( numA > numB)
                {
                    winnerName = name1;
                    loserName = name2;


                    await conn.query(
                        `UPDATE Pokemon SET WINS = ${wins1 + 1} WHERE STRING = '${winnerName}'`).catch(err => console.log(err));

                    
                    await conn.query(
                        `UPDATE Pokemon SET LOSSES = ${loss2 + 1} WHERE STRING = '${loserName}'`).catch(err => console.log(err));

                }
                else if (numB > numA)
                {
                    winnerName = name2;
                    loserName = name1;

                    await conn.query(
                        `UPDATE Pokemon SET WINS = ${wins2 + 1} WHERE STRING = '${winnerName}'`).catch(err => console.log(err));

                    
                    await conn.query(
                        `UPDATE Pokemon SET LOSSES = ${loss1 + 1} WHERE STRING = '${loserName}'`).catch(err => console.log(err));
                }

                let surveyResultsEmbed;

                if (numB == numA)
                {
                    surveyResultsEmbed = new EmbedBuilder()
                    .setTitle(`IT'S A __***TIE***__ \n\ SCORE: ${numA} - ${numB}` )

                    await conn.query(
                        `UPDATE Pokemon SET DRAWS = ${draws1 + 1} WHERE STRING = '${name1}'`).catch(err => console.log(err));

                    
                    await conn.query(
                        `UPDATE Pokemon SET DRAWS = ${draws2 + 1} WHERE STRING = '${name2}'`).catch(err => console.log(err));
            
                }
                else if ((numA + numB) == 1)
                {
                    surveyResultsEmbed = new EmbedBuilder()
                    .setTitle("NOT ENOUGH VOTES!")
                }
                else
                {

                    if (winnerName === name1)
                    {
                        surveyResultsEmbed = new EmbedBuilder()
                    .setTitle(`${winnerName} WINS! \n\ SCORE: ${numA} - ${numB}` )

                    }
                    else
                    {
                        surveyResultsEmbed = new EmbedBuilder()
                    .setTitle(`${winnerName} WINS! \n\ SCORE: ${numB} - ${numA}` )
                    }

                }
        
        
                interaction.channel.send({ embeds: [surveyResultsEmbed]});
                

    });





          await interaction.deleteReply();
	},
};



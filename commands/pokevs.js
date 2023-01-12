const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pokevs')
		.setDescription('Starts a Pokemon Voting Battle!'),
	async execute(interaction) {
        
        const Index = require('../index.js')

        await interaction.reply('Loading...');

            interaction.channel.send(" 👊  __***POKEMON BATTLE***__  👊 ");

            var fileString = "";
            var fileString2 = "";
            var poke_files = fs.readdirSync('./pokeimages/');

            
            do {

            fileString = poke_files[Math.floor(Math.random() * poke_files.length)];

            fileString2 = poke_files[Math.floor(Math.random() * poke_files.length)];
            }
            while (fileString != fileString2)


            var dirString = "./pokeimages/" + fileString;
            const fileA = new AttachmentBuilder(dirString);

            var asterisk = "__***";
            var trimString = fileString.slice(0, -4);
            var editedString = asterisk.concat(trimString.toUpperCase(),"***__");

            var attachString = "attachment://";
            attachString = attachString.concat(fileString);

            var linkString = "https://bulbapedia.bulbagarden.net/wiki/";
            linkString = linkString.concat(trimString.charAt(0).toUpperCase() + trimString.slice(1), "_(Pok%C3%A9mon)")

            var pokewins = 0;
            var pokelosses = 0;

            Index.pokeArray.forEach(pokemon => {
                if (pokemon.name === editedString)
                {
                    pokewins = pokemon.wins;
                    pokelosses = pokemon.losses;
                }
            })


            const pokeEmbed = new EmbedBuilder()
                 .setTitle(editedString)
                 .addFields(
                     { name: "Wins:", value: pokewins.toString(), inline: true},
                     { name: "Losses:", value: pokelosses.toString(), inline: true},
                     { name: "More info:", value: "[Click here](" + linkString + ")", inline: true},
                 )
                 .setImage(attachString)
            
            var pokeA = editedString;

            await interaction.channel.send({ embeds: [pokeEmbed], files: [fileA]});

            var fileString2 = poke_files[Math.floor(Math.random() * poke_files.length)]
            var dirString2 = "./pokeimages/" + fileString2;
            const fileB = new AttachmentBuilder(dirString2);
            var asterisk = "__***";
            var trimString2 = fileString2.slice(0, -4);
            var editedString2 = asterisk.concat(trimString2.toUpperCase(),"***__");

            var attachString2 = "attachment://";
            attachString2 = attachString2.concat(fileString2);

            var linkString2 = "https://bulbapedia.bulbagarden.net/wiki/";
            linkString2 = linkString2.concat(trimString2.charAt(0).toUpperCase() + trimString2.slice(1), "_(Pok%C3%A9mon)")

            var pokewins2 = 0;
            var pokelosses2 = 0;

            Index.pokeArray.forEach(pokemon => {
                if (pokemon.name === editedString2)
                {
                    pokewins2 = pokemon.wins;
                    pokelosses2 = pokemon.losses;
                }
            })

            const pokeEmbed2 = new EmbedBuilder()
                 .setTitle(editedString2)
                 .addFields(
                    { name: "Wins:", value: pokewins2.toString(), inline: true},
                    { name: "Losses:", value: pokelosses2.toString(), inline: true},
                    { name: "More info:", value: "[Click here](" + linkString2 + ")", inline: true},
                )
                 .setImage(attachString2)

            var pokeB = editedString2;
            
            await interaction.channel.send({ embeds: [pokeEmbed2], files: [fileB]});
            

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
                        .setLabel(pokeA.substring(5, pokeA.length - 5))
                        .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                        .setCustomId('secondary')
                        .setLabel(pokeB.substring(5, pokeB.length - 5))
                        .setStyle(ButtonStyle.Primary)
                );

                const wait = require('node:timers/promises').setTimeout;

                interaction.channel.send({ content: 'VOTE HERE: ONLY FIRST VOTE COUNTS!', components: [row] });

                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

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

    

    }

});

collector.on('end', collected => {


        let winnerName = "";
                let loserName = "";

                if( numA > numB)
                {
                    winnerName = pokeA;
                    loserName = pokeB;
                }
                else if (numB > numA)
                {
                    winnerName = pokeB;
                    loserName = pokeA;
                }

                let surveyResultsEmbed;

                if (numB == numA)
                {
                    surveyResultsEmbed = new EmbedBuilder()
                    .setTitle(`IT'S A __***TIE***__ \n\ SCORE: ${numA} - ${numB}` )
            
                }
                else if ((numA + numB) == 1)
                {
                    surveyResultsEmbed = new EmbedBuilder()
                    .setTitle("NOT ENOUGH VOTES!")
                }
                else
                {

                    if (winnerName === pokeA)
                    {
                        surveyResultsEmbed = new EmbedBuilder()
                    .setTitle(`${winnerName} WINS! \n\ SCORE: ${numA} - ${numB}` )

                    }
                    else
                    {
                        surveyResultsEmbed = new EmbedBuilder()
                    .setTitle(`${winnerName} WINS! \n\ SCORE: ${numB} - ${numA}` )
                    }


    
                    var found = false;

    Index.pokeArray.forEach( pokemon => {

        if (pokemon.name === winnerName)
        {

            var tempnum = parseInt(pokemon.wins) + 1;

            pokemon.wins = tempnum.toString();
            found = true;
        }
    })

    if (!found)
    {
        var tempPokemon = {name: winnerName, wins: 1, losses: 0};
        Index.pokeArray.push(tempPokemon);
    }

    var concatString = "";
    var tempString = "";

    Index.pokeArray.forEach( pokemon => {

        tempString = pokemon.name + " " + pokemon.wins + " " + pokemon.losses + "\n";

        concatString = concatString.concat(tempString);
    })

    concatString = concatString.slice(0, -1);

    fs.writeFile('pokewinners.txt', concatString, function (err) {
        if (err) return console.log(err);
    })



var found = false;

Index.pokeArray.forEach( pokemon => {

        if (pokemon.name === loserName)
        {

            var tempnum = parseInt(pokemon.losses) + 1;

            pokemon.losses = tempnum.toString();
            found = true;
        }
    })

    if (!found)
    {
        var tempPokemon = {name: loserName, wins: 0, losses: 1};
        Index.pokeArray.push(tempPokemon);
    }

    var concatString = "";
    var tempString = "";

    Index.pokeArray.forEach( pokemon => {

        tempString = pokemon.name + " " + pokemon.wins + " " + pokemon.losses + "\n";

        concatString = concatString.concat(tempString);
    })

    concatString = concatString.slice(0, -1);

    fs.writeFile('pokewinners.txt', concatString, function (err) {
        if (err) return console.log(err);
    })


                }
        
        
                interaction.channel.send({ embeds: [surveyResultsEmbed]});
                

});


            //const collector = MSG.createReactionCollector({filter, time:15000});

            // collector.on('collect', (reaction, user) => {
	        //         console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
            //     });

            // collector.on('end', collected => {
	        //         console.log(`Collected ${collected.size} items`);

            //         // Convert the collection to an array
            // let collectedArray = Array.from(collected.values);


            // let numA = 0;
            // let numB = 0;

            // collectedArray.forEach(reaction => {

            //         if (reaction.emoji.name == '🅰️')
            //         {
            //             numA = reaction.count - 1;
            //         }

            //         if (reaction.emoji.name == '🅱️')
            //         {
            //             numB = reaction.count - 1;
            //         }
            //     })

            //     let winnerName = "";
            //     let loserName = "";

            //     if( numA > numB)
            //     {
            //         winnerName = pokeA;
            //         loserName = pokeB;
            //     }
            //     else if (numB > numA)
            //     {
            //         winnerName = pokeB;
            //         loserName = pokeA;
            //     }

            //     let surveyResultsEmbed;

            //     if (numB == numA)
            //     {
            //         surveyResultsEmbed = new EmbedBuilder()
            //         .setTitle("IT'S A __***TIE***__")
            
            //     }
            //     else if ((numA + numB) == 1)
            //     {
            //         surveyResultsEmbed = new EmbedBuilder()
            //         .setTitle("NOT ENOUGH VOTES!")
            //     }
            //     else
            //     {
            //         surveyResultsEmbed = new EmbedBuilder()
            //         .setTitle(`${winnerName} WINS!`)

            //         //updateWinners(winnerName);
            //         //updateLosers(loserName);
            //     }
        
        
            //     interaction.channel.send({ embeds: [surveyResultsEmbed]});
                
            // });


          await interaction.deleteReply();
	},
};



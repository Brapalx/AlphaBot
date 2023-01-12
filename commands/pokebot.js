const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pokebot')
		.setDescription('Shows the pokemon with most losses!'),
	async execute(interaction) {

        const Index = require('../index.js')

        await interaction.reply('Sorting...');

        Index.pokeArray.sort((a,b) => parseInt(b.losses) - parseInt(a.losses)); 

              var concString = "";
              var tString = "";
              var i = 1;

              var j;

              for (j = 0; j < 20; j++)
              {

                if(!Index.pokeArray[j])
                {
                    break;
                }

                if(Index.pokeArray[j].losses > 0)
                {
                    tString = "#" + i.toString() + ":  " + Index.pokeArray[j].name + "  -  " + Index.pokeArray[j].losses + "\n";
                    concString = concString.concat(tString);
                    i = i + 1;
                }
              }

              const pokeWLembed = new EmbedBuilder()
                .setTitle(" 🤢  __***POKEMON BATTLE LOSER RANKINGS***__  🤢 ")
                .setDescription(concString);

              interaction.channel.send({ embeds: [pokeWLembed] });


        await interaction.deleteReply();
		
	},
};

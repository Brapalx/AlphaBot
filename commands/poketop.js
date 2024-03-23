const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poketop')
		.setDescription('Shows the pokemon with most wins!'),
	async execute(interaction) {

        const Index = require('../index.js')

        await interaction.reply('Sorting...');
        
        const conn = await Index.connection;

        const [rows, fields] = await conn.query(
          `SELECT * FROM Pokemon ORDER BY WINS DESC LIMIT 20`).catch(err => console.log(err));


              var concString = "";
              var tString = "";
              var i = 1;

              var j;

              for (j = 0; j < 20; j++)
              {
                  tString = "#" + i.toString() + ":  " + rows[j].STRING + "  -  " + rows[j].WINS + "\n";
                  concString = concString.concat(tString);
                  i = i + 1;
              }

              const pokeWLembed = new EmbedBuilder()
                .setTitle(" 🥵  __***POKEMON BATTLE WINNER RANKINGS***__  🥵 ")
                .setDescription(concString);

              interaction.channel.send({ embeds: [pokeWLembed] });


        await interaction.deleteReply();
		
	},
};

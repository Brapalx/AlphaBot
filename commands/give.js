const { SlashCommandBuilder } = require('discord.js');
var Scraper = require('images-scraper');

const google = new Scraper({
    puppeteer: {
        headless: true
    }
})

module.exports = {
	data: new SlashCommandBuilder()
		.setName('give')
		.setDescription('Searches for a random image')
        .addStringOption(option =>
            option.setName('thing')
            .setDescription('Thing to look for')
            .setRequired(true)),
	async execute(interaction) {
        image2rand(interaction, interaction.options.getString('thing'));
        await interaction.reply('Done!');
        await interaction.deleteReply();
	},
};

function image2rand(interaction, word){
 
    if(!word)
        return interaction.channel.send("Please enter an image name.");

    (async () => {
        const results = await google.scrape(word, 50);
        
        var rand = Math.floor(Math.random() * 50)

        interaction.channel.send(results[rand].url);
    })();

}

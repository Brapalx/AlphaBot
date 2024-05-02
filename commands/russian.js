const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('russian')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {

		const Index = require('../index.js')


		var htmldata="";
        var imgString=""
        request('https://www.gocomics.com/random/heathcliff', function (error, response, body) {

            htmldata=body;
			
			console.log(htmldata);
                    
            // let imgIndexStart = htmldata.indexOf("<div id='z'");
            // imgString = htmldata.substring(imgIndexStart + 12, htmldata.size);
    
            // let imgIndexEnd = imgString.indexOf("<br/>");
    
            // imgString = imgString.substring(0, imgIndexEnd);
            // //imgString = imgString.replace(/\s+/g, '');
            // //console.log(imgIndexStart);
            // //console.log(imgIndexEnd);
    
                    
            // msg.channel.send(imgString);
    
        });


		await interaction.reply('Pong!');
	},
};
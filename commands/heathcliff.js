const { SlashCommandBuilder } = require('discord.js');
const request = require('request')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('heathcliff')
		.setDescription('Gives you a random Heathciff comic!'),
	async execute(interaction) {

		//const Index = require('../index.js')


		var htmldata="";
        var imgString=""
        request('https://www.gocomics.com/random/heathcliff', function (error, response, body) {

            htmldata=body;
			
			//console.log(htmldata);
                    
            let imgIndexStart = htmldata.indexOf("og:image");
            imgString = htmldata.substring(imgIndexStart + 19, htmldata.size);
    
            let imgIndexEnd = imgString.indexOf("<meta");
    
            imgString = imgString.substring(0, imgIndexEnd - 5);
            //imgString = imgString.replace(/\s+/g, '');
            //console.log(imgIndexStart);
            //console.log(imgIndexEnd);
    
            console.log(imgString);      
            interaction.channel.send(imgString);
    
        });


		await interaction.reply("Pong");
	},
};
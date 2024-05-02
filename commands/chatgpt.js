require('dotenv').config()
const { SlashCommandBuilder } = require('discord.js');

//const {ChatGPTAPIBrowser} = require('chatgpt')
const {Configuration, OpenAIApi} = require('openai');
const { message } = require('statuses');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ask')
		.setDescription('Ask AlphaBot anything! Do not spam this costs me MONEY')
        .addStringOption(option =>
            option.setName('prompt')
            .setDescription('Your message to AlphaBot')
            .setRequired(true)),
	async execute(interaction) {

		const configuration = new Configuration({
            apiKey: process.env.OPENAI_KEY
        })

        const openai = new OpenAIApi(configuration);

        await interaction.reply('Thinking... 🤔');
        
        try {
            const completion = await openai.createCompletion({
                model:"gpt-3.5-turbo",
                prompt: interaction.options.getString('prompt'),
                temperature:0.7,
                max_tokens:2048,
                top_p:1,
                frequency_penalty:0.0,
                presence_penalty:0.0,
            });
            console.log(completion.data.choices[0].text);

            const responseEmbed = new EmbedBuilder()
	            .setColor(interaction.member.displayColor)
                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
	            .setTitle(interaction.options.getString('prompt'))
	            .setDescription(completion.data.choices[0].text)
	            .setTimestamp()
	            .setFooter({ text: 'Powered by GPT-3.5 Turbo'});

            interaction.channel.send({ embeds: [responseEmbed] });
            console.log(interaction.user.displayAvatarURL());
            //interaction.channel.send("*Prompt: " + interaction.options.getString('prompt') + '*');
            await interaction.deleteReply();

          } catch (error) {
            if (error.response) {
              console.log(error.response.status);
              console.log(error.response.data);
            } else {
              console.log(error.message);
            }
          }

        
          
	},
};

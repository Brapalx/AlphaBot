require('dotenv').config()
const { SlashCommandBuilder } = require('discord.js');

//const {ChatGPTAPIBrowser} = require('chatgpt')
const {OpenAI} = require('openai');
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


        const openai = new OpenAI({
          organization: process.env.OPENAI_ORG,
          project: process.env.OPENAI_PROJ,
          api_key: process.env.OPENAI_KEY
        })

        await interaction.reply('Thinking... 🤔');
        
        try {
            const completion = await openai.chat.completions.create({
                messages: [{roles: "system", content: interaction.options.getString('prompt')}],
                model:"gpt-3.5-turbo"
            });
            console.log(completion.choices[0]);

            const responseEmbed = new EmbedBuilder()
	            .setColor(interaction.member.displayColor)
                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()})
	            .setTitle(interaction.options.getString('prompt'))
	            .setDescription(completion.choices[0])
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

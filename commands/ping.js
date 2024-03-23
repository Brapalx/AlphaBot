const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {

		const Index = require('../index.js')

		async function testDB() {
			try {
				const conn = await Index.connection;
				const [rows, fields] = await conn.execute('SELECT * FROM Users');
			  
				console.log(rows); // in this query, results will be an array of arrays rather than an array of objects
				console.log(fields); // fields are unchanged
			} catch (err) {
				console.log(err);
			}
		}

		testDB();

		await interaction.reply('Pong!');
	},
};
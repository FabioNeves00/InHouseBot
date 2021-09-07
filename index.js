// const { default: discordButtons } = require('discord-buttons');
import * as config from 'dotenv/config'
import { Client, MessageEmbed } from 'discord.js';
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES",] });
import fetch from 'node-fetch';

client.once('ready', () => {
    console.log('Logged as => ' + client.user.tag);
    client.user.setActivity('bot em construção', { type: 'WATCHING' })
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});

async function notFound(msg){
    const notFound = new MessageEmbed()
        .setTitle('Ajuda: Comando não encontrado')
        .setAuthor('Mine Bot')
        .addFields(
            { name: 'Explicação', value: 'Comando não encontrado linda, use o ?comandos para ver os comandos disponíveis' },
        )
        .setImage('https://tenor.com/view/quby-chan-confused-huh-what-what-is-it-gif-17010842')
        .setFooter('Mine Bot');
        msg.channel.send({ embeds: [notFound] })
}


client.login(process.env.token)
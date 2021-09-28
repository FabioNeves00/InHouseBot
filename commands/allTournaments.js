const { SlashCommandBuilder } = require("@discordjs/builders");
const Tournament = require("../models/Tournament");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("alltournaments")
    .setDescription("Shows all scheduled tournaments"),

  async execute(interaction) {
    const tournament = await Tournament.find({ tournament: true })
    if (!tournament) {
        const err1 = new MessageEmbed()
        .setTitle(`There is no tournament yet scheduled`)
        .setThumbnail(`${interaction.member.user.avatarURL()}`)
        .setTimestamp()
        interaction.reply({embeds: [err1]});
        return
    }
    let dates = []
    let prizes = []
    if(tournament.length == 0 ){
        dates = "No tournaments scheduled"
        prizes = "None"
    } else {
        for (let count = 0; count < tournament.length; count++) {
          dates.push(tournament[count].date + "\n");
          prizes.push(tournament[count].prize + "\n");
        }
    }
    const teammsg = new MessageEmbed()
      .setTitle(`All Tournaments`)
      .setThumbnail(`${interaction.member.user.avatarURL()}`)
      .addFields(
		{ name: 'Dates', value: dates, inline: true },
		{ name: 'Prizes', value: prizes, inline: true }
	)
      .setTimestamp()

      interaction.reply({embeds: [teammsg]});
  }
};

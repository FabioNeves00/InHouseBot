const { SlashCommandBuilder } = require("@discordjs/builders");
const Tree = require("../models/tournamentTrees");
const Tournament = require("../models/Tournament");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("showtree")
    .setDescription("Show a tournament games tree")
    .addStringOption((Option) =>
      Option.setName("date")
        .setDescription("Day of the tournament")
        .setRequired(true)
    ),

  async execute(interaction) {
    const {
      value
    } = interaction.options.data[0];
    
    let tree = await Tree.findOne({ date: value })
    let tournament = await Tournament.findOne({ date: value })
    if (!tree) {
      const err1 = new MessageEmbed()
      .setTitle(`There is no tournament tree on day: ${value}`)
      .setThumbnail(`${interaction.member.user.avatarURL()}`)
      .addField('Date not found', `Try other date`)
      .setTimestamp()

      interaction.reply({embeds: [err1]});
      return
    }
    let ArrNames = []
    for (let count = 0; count < tree.teams.length; count++) {
      for (let counter = 0; counter < tree.teams.length; counter += 2) {
            ArrNames.push(`\n${tree.teams[count][counter]} vs ${tree.teams[count][counter + 1]}`)
      }
    }
    const treemsg = new MessageEmbed()
      .setTitle(`Tournament tree on day: ${value}`)
      .setThumbnail(`${interaction.member.user.avatarURL()}`)
      .addField('Organizer', `${tournament.organizer}`)
      .addField('Teams', `${ArrNames}`)
      .setTimestamp()

      interaction.reply({embeds: [treemsg]});
  }
};

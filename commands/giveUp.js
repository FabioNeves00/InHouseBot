const { SlashCommandBuilder } = require("@discordjs/builders");
const Team = require("../models/Team");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("giveup")
    .setDescription("Gives up a team | Deletes your team"),

  async execute(interaction) {
    const team = await Team.findOne({ captain: interaction.member.user.tag })
    if(!team) {
      const err = new MessageEmbed()
      .setTitle(`You are not the owner of any team`)
      .setThumbnail(`${interaction.member.user.avatarURL()}`)
      .setTimestamp()
  
      interaction.reply({embeds: [err]}); 
        return;
    }
    await Team.deleteOne({ captain: interaction.member.user.tag })
    const teammsg = new MessageEmbed()
      .setTitle(`Successfully deleted team ${team.name}`)
      .setThumbnail(`${interaction.member.user.avatarURL()}`)
      .setTimestamp()
  
      interaction.reply({embeds: [teammsg]});
  }
};

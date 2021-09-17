const { SlashCommandBuilder } = require("@discordjs/builders");
const Tournament = require("../models/Tournament");
const { isAdm, isScheduled } = require("../auths.js")
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("endtournament")
    .setDescription("Ends a tournament")
    .addStringOption((Option) =>
      Option.setName("date")
        .setDescription("Day of the tournament")
        .setRequired(true)
    ),

  async execute(interaction) {
    const date = interaction.options.data[0].value
    if(!(await isAdm(interaction)) || !(await isScheduled(date))) {
      const err = new MessageEmbed()
      .setTitle(`Tournament not found, try other date`)
      .setThumbnail(`${interaction.member.user.avatarURL()}`)
      .setTimestamp()
  
      interaction.reply({embeds: [err]});
        return;
    }
    await Tournament.deleteOne({ date: date })
    const tournametmsg = new MessageEmbed()
      .setTitle(`Successfully ended tournament`)
      .setThumbnail(`${interaction.member.user.avatarURL()}`)
      .setTimestamp()
  
      interaction.reply({embeds: [tournametmsg]});
  }
};

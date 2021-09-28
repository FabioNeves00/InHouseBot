const { SlashCommandBuilder } = require("@discordjs/builders");
const Team = require("../models/Team");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("showteams")
    .setDescription("Shows all registered teams"),

  async execute(interaction) {
    const teams = await Team.find({ team: true })
    if (!teams) {
        const err1 = new MessageEmbed()
        .setTitle(`There is no team yet created`)
        .setThumbnail(`${interaction.member.user.avatarURL()}`)
        .setTimestamp()
        interaction.reply({embeds: [err1]});
        return
    }
    let ArrNames = []
    if(teams.length == 0){
      ArrNames = "No teams created"
    } else {
      for (let count = 0; count < teams.length; count++) {
        ArrNames.push(" " + teams[count].name);
      }
    }
    const teammsg = new MessageEmbed()
      .setTitle(`All Teams`)
      .setThumbnail(`${interaction.member.user.avatarURL()}`)
      .addField('Teams', `${ArrNames}`)
      .setTimestamp()

      interaction.reply({embeds: [teammsg]});
  }
};

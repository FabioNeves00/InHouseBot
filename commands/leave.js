const {
  SlashCommandBuilder
} = require("@discordjs/builders");
const Team = require("../models/Team");
const {
  isOwner,
  isOnTeam
} = require("../auths.js");
const { MessageEmbed } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("leave the team you're currently in"),
  async execute(interaction) {
    if (await isOnTeam(interaction.member.user.tag) && !(await isOwner(interaction))) {
      let team = await Team.findOne({
        players: {
          $in: [interaction.member.user.tag]
        }
      });
      const updatedPlayers = team.players.splice(team.players.indexOf(interaction.member.user.tag), 1)
      await Team.updateOne({
        players: {
          $in: [interaction.member.user.tag]
        }
      }, {
        $set: {
          players: [updatedPlayers]
        }
      })
      await team.save()
      const teamMsg = new MessageEmbed()
      .setTitle(`Successefully leaved team ${team.name}`)
      .setThumbnail(`${interaction.member.user.avatarURL()}`)
      .setTimestamp()
  
      interaction.reply({embeds: [teamMsg]});
    } else {
      const err = new MessageEmbed()
      .setTitle(`Cannot leave team as captain`)
      .setThumbnail(`${interaction.member.user.avatarURL()}`)
      .addField("Solution", "Try first changecaptain command, or giveup")
      .setTimestamp()
  
      interaction.reply({embeds: [err]});
    }
  }
}
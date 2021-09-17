const {
  SlashCommandBuilder
} = require("@discordjs/builders");
const Team = require("../models/Team");
const {
  isOwner,
  isOnTeam
} = require("../auths.js")
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks a player from your team")
    .addMentionableOption((Option) =>
      Option.setName("player")
        .setDescription("Player that you want kicked out")
        .setRequired(true)
    ),
  async execute(interaction) {
    let {
      value
    } = interaction.options.data[0];
    //formats userid from value to only numbers
    value = value.replace(/[<>{}@!]/g, '')

    const team = await Team.findOne({
      captain: interaction.member.user.tag
    })
    //fetchs the usertag by the userid
    await interaction.client.users.fetch(value, false).then((user) => {

      if (team && isOwner(interaction) && isOnTeam(user)) {

        const updatedPlayers = team.players.splice(team.players.indexOf(user), 1)
        await Team.updateOne({
          players: {
            $in: [user]
          }
        }, {
          $set: {
            players: [updatedPlayers]
          }
        })
        await team.save()
        const teammsg = new MessageEmbed()
        .setTitle(`Successfully kicked player ${user.username}`)
        .setThumbnail(`${interaction.member.user.avatarURL()}`)
        .setTimestamp()
    
        interaction.reply({embeds: [teammsg]});
      } else {
        const teammsg = new MessageEmbed()
        .setTitle(`You are not the owner of the team`)
        .setThumbnail(`${interaction.member.user.avatarURL()}`)
        .setTimestamp()
    
        interaction.reply({embeds: [teammsg]});
      }
    })
  }
};
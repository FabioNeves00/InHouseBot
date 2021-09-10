const {
  SlashCommandBuilder
} = require("@discordjs/builders");
const Team = require("../models/Team");
const {
  isOwner,
  isOnTeam
} = require("../auths.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("invites a player to your team")
    .addMentionableOption((Option) =>
      Option.setName("mention")
        .setDescription("@ the player you want to invite")
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

      if (team.players.length < 5 && isOwner(interaction) && isOnTeam(user)) {

        let invited = `${user.username}#${user.discriminator}`
        let updatedPlayers = team.players.push(invited)

        const updatedTeam = Team.updateOne({
          captain: interaction.member.user.tag
        }, {
          $set: {
            players: updatedPlayers
          }
        })
        team.save()
        interaction.reply(`Successfully invited ${invited}`)
      }
    })
  }
};
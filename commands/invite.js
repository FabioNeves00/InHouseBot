const { SlashCommandBuilder } = require("@discordjs/builders");
const Team = require("../models/Team");
const { isOwner, Exists } = require("../auths.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("invites a player to your team")
    .addMentionableOption((Option) =>
      Option.setName("mention")
        .setDescription("mention the player you want to invite")
        .setRequired(true)
    ),
  async execute(interaction) {
      const { value } = interaction.options.data[0];
      console.log(value);
      const team = await Team.findOne({ captain: interaction.member.user.tag })
      await interaction.client.users.fetch(value, false).then((user) => {
        let invited = `${user.username}#${user.discriminator}`
        console.log(invited);
        let updatedPlayers = team.players.push(invited)
        const updatedTeam = Team.updateOne(
          {captain: interaction.member.user.tag},
          { $set: {players: updatedPlayers}}
        )
        interaction.reply(`Successfully invited ${invited}`)
      })
  }
};


const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Invite players to an already existing team.")
    .addMentionableOption((Option) =>
      Option.setName("mention").setDescription("@user#0000").setRequired(true)
    ),
};
// /editTeams time players

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Edits an already existing team."),
  async execute(interaction) {
    console.log("pinto")
  },
};
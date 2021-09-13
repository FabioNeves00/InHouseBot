const { SlashCommandBuilder } = require("@discordjs/builders");
const Team = require("../models/Team");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("showteams")
    .setDescription("Shows all registered teams"),

  async execute(interaction) {
    const teams = await Team.find({ team: true })
    if (!teams) return

    let ArrNames = []
    for (let count = 0; count < teams.length; count++) {
      ArrNames.push(" " + teams[count].name);
    }
    interaction.reply(`Os times são: ${ArrNames}`)
  }
};

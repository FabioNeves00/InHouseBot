const { SlashCommandBuilder } = require("@discordjs/builders");
const Tree = require("../models/tournamentTrees");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("showtree")
    .setDescription("Show a tournament games tree")
    .addStringOption((Option) =>
      Option.setName("date")
        .setDescription("Day of the tournament")
        .setRequired(true)
    ),

  async execute(interaction) {
    const {
      value
    } = interaction.options.data[0];

    let tree = await Tree.findOne({ date: value })
    if (!tree) {
      interaction.reply("There is no tournament scheduled for that day")
      return
    }
    let ArrNames = []
    for (let count = 0; count < tree.teams.length; count++) {
      for (let counter = 0; counter < tree.teams.length; counter += 2) {
            ArrNames.push(`\n${tree.teams[count][counter]} vs ${tree.teams[count][counter + 1]}`)
      }
    }
    interaction.reply(`A chave é : ${ArrNames}`)
  }
};

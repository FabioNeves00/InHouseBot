const { SlashCommandBuilder } = require("@discordjs/builders");
const Tournament = require("../models/Tournament");
const { isAdm, isScheduled } = require("../auths.js")

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
        interaction.reply(`Tournament was not found`) 
        return;
    }
    await Tournament.deleteOne({ date: date })
    .then(interaction.reply(`Successfully ended tournament`))
  }
};

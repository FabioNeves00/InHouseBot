const { SlashCommandBuilder } = require("@discordjs/builders");
const Team = require("../models/Team");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createteam")
    .setDescription("creates a new team with the name given")
    .addStringOption((Option) =>
      Option.setName("name")
        .setDescription("name of the player you want to invite")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { value } = interaction.options.data[0];
    const team = new Team({
      name: `${value.toLowerCase()}`,
      captain: `${interaction.member.user.tag}`,
      players: [],
    });
    await team.save();
    interaction.reply(`Successfully created team ${value}`);
  },
};

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createteam")
    .setDescription("creates a team with the name given")
    .addStringOption((Option) =>
      Option.setName("name")
        .setDescription("name of the team you want to create")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.reply("pinto");
  },
};

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("editteam")
    .setDescription("Edits an already existing team.")
    .addStringOption((Option) =>
      Option.setName("name")
        .setDescription("name of the team you want to create")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.reply("pinto");
  },
};

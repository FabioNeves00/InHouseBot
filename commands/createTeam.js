const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");

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
    const { value } = interaction.options.data[0]
    const data = await JSON.parse(fs.readFileSync("./database/teams.json", "utf8"))
    data.teams.push({
      nome: `${value}`,
      integrantes: {}
    })
      await fs.writeFileSync("./database/teams.json", JSON.stringify(data, true, 2))
  }
}

const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");
const {isOwner, isConfirmed} = require("../authorize")

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
    if (isOwner(interaction, data, value) === false && isConfirmed(data, interaction.member.user.tag) === false){
      //Creates the team on the json
      data.teams.push({
        nome: `${value.toLowerCase()}`,
        captain: `${interaction.member.user.tag}`,
        integrantes: []
      })
      await interaction.reply(`Successfully created team ${value}`)
    } else {
      await interaction.reply(`Failed to create team ${value}`)
    }
    await fs.writeFileSync("./database/teams.json", JSON.stringify(data, true, 2))
  }
}

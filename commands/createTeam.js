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
    let checker = false; 
    const { value } = interaction.options.data[0]
    const data = await JSON.parse(fs.readFileSync("./database/teams.json", "utf8"))
    for (let i = 0; i < data.teams.length; i++) { 
      //Checks if the player is already confirmed on a team ( confirming system under construction)
        for (let j = 0; j < data.teams[i].integrantes.length; j++) {
          if (data.teams[i].integrantes[j].status === "CONFIRMED") {
            checker = true
            break;
          }
        }
    }
    for(let i = 0; i < data.teams.length; i++){
      //Checks if a player is an owner of a team
      if (data.teams[i].nome === value || data.teams[i].captain === `${interaction.member.user.tag}`){
        checker = true;
        break;
      }
    }
    if(!checker){
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

const { SlashCommandBuilder } = require("@discordjs/builders");
const Team = require("../models/Team");
const { isOwner } = require("../auths.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("giveup")
    .setDescription("Gives up a team | Deletes your team"),

  async execute(interaction) {
    const team = await Team.findOne({ captain: interaction.member.user.tag })
    if(!team) {
        interaction.reply(`You're not the captain of any team`) 
        return;
    }
    let name = team.name
    await Team.deleteOne({ captain: interaction.member.user.tag })
    .then(interaction.reply(`Successfully deleted team ${name}`))
    
  }
};

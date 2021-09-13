const { SlashCommandBuilder } = require("@discordjs/builders");
const Team = require("../models/Team");
const { isOnTeam, isOwner } = require("../auths.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("myteam")
    .setDescription("Shows your own team"),

  async execute(interaction) {
    if(!(await isOnTeam(interaction.member.user.tag)) && !(await isOwner(interaction))) {
        interaction.reply(`You're not part of any team`) 
        return;
    }
    let team = await Team.findOne({ captain: interaction.member.user.tag})
    if(!team){
        team = await Team.findOne({ players: [interaction.member.user.tag]})
    }
    interaction.reply(`Team name: ${team.name}, captain: ${team.captain}, members: ${team.captain}, ${team.players}`)
    
  }
};

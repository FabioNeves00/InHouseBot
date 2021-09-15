const { SlashCommandBuilder } = require("@discordjs/builders");
const Team = require("../models/Team");
const { isOnTeam, isOwner } = require("../auths.js")
const { MessageEmbed } = require("discord.js");

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
    //interaction.reply(`Team name: ${team.name}, captain: ${team.captain}, members: ${team.captain}, ${team.players}`)
    let players;
    const teamLength = team.players.length
    if(teamLength > 0){
      players = team.players.join("\n");
    }
    else{
      players = "empty"
    }
    console.log(players)
    const teamMsg = new MessageEmbed()
    .setTitle(`${team.name}`)
    .setThumbnail(`${interaction.member.user.avatarURL()}`)
    .addField('Captain', `${team.captain}`)
    .addField(`Members ${teamLength}/5`, `${`${players}`}`)

    teamMsg.setTimestamp()

    interaction.reply({embeds: [teamMsg]});

  }
};

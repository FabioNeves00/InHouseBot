const { SlashCommandBuilder } = require("@discordjs/builders");
const Team = require("../models/Team");
const { isOnTeam, isOwner } = require("../auths.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("showteams")
    .setDescription("Shows all teams"),

  async execute(interaction) {
    console.log(inHouse.teams.find());    
  }
};

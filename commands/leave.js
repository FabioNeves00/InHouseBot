const { SlashCommandBuilder } = require("@discordjs/builders");
const Team = require("../models/Team");
const { isOwner, isOnTeam } = require("../auths.js");
const { update } = require("../models/Team");


module.exports = {
    data: new SlashCommandBuilder()
      .setName("leave")
      .setDescription("leave the team you're currently in"),
      async execute(interaction) {
        if(await isOnTeam(interaction.member.user.tag) && !(await isOwner(interaction))){
            let team = await Team.findOne({players: { $in: [interaction.member.user.tag]} });
            const updatedPlayers = team.players.splice(team.players.indexOf(interaction.member.user.tag), 1)
            const updatedTeam = Team.updateOne(
                {players: { $in: [interaction.member.user.tag]} },
                { $set: { players: [updatedPlayers] } }
                )
            team.save().then(
            interaction.reply("ptino calma mano"))
        }
        else interaction.reply("you can't leave your team")
      }
}
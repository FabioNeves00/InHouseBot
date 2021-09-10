const { SlashCommandBuilder } = require("@discordjs/builders");
const Team = require("../models/Team");
const { isOwner, isOnTeam } = require("../auths.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks a player from your team")
    .addMentionableOption((Option) =>
      Option.setName("player")
        .setDescription("Player that you want kicked out")
        .setRequired(true)
    ),
  async execute(interaction) {
    let { value } = interaction.options.data[0];
    //formats userid from value to only numbers
    value = value.replace(/[<>{}@!]/g,'')

    const team = await Team.findOne({ captain: interaction.member.user.tag })
    //fetchs the usertag by the userid
    await interaction.client.users.fetch(value, false).then((user) => {

      if (team && isOwner(interaction) && isOnTeam(user)){

        const updatedPlayers = team.players.filter((element) => { return element == value})
        const updatedTeam = Team.updateOne(
            {players: { $in: [value]} },
            { $set: { players: updatedPlayers } }
          )
        
        interaction.reply(`Successfully kicked ${user}`)
      }
      else interaction.reply(`You're not the owner of the user's team`)
    })
  }
};

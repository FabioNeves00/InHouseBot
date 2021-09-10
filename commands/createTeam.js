const { SlashCommandBuilder } = require("@discordjs/builders");
const Team = require("../models/Team");
const { isOwner, Exists, isOnTeam } = require("../auths.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createteam")
    .setDescription("creates a new team with the name given")
    .addStringOption((Option) =>
      Option.setName("name")
        .setDescription("name of the player you want to invite")
        .setRequired(true)
    ),
  async execute(interaction) {
      //gets team name
      const { value } = interaction.options.data[0];
    if (!(await isOwner(interaction)) && !(await Exists(value)) && !(await isOnTeam(interaction.member.user.tag))) {
      //creates new team
      const team = new Team({
        name: `${value.toLowerCase()}`,
        captain: `${interaction.member.user.tag}`,
        players: [],
      });

      //saves team to database
      await team.save();
      //replies to the message
      interaction.reply(`Successfully created team ${value}`);
    } else {
      interaction.reply(`Failed to create team`);
    }
  },
};



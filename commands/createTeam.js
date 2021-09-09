const { SlashCommandBuilder } = require("@discordjs/builders");
const Team = require("../models/Team");

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
    if (await isOwner(interaction) == false) {
      //gets team name
      const { value } = interaction.options.data[0];
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
      interaction.reply(`failed to create team`);
    }
  },
};

const isOwner = async (interaction) => {
  var isowner = await Team.findOne({ captain: interaction.member.user.tag });
  if (isowner) return true
  else return false
};

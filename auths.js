const Team = require("./models/Team");
const Tournament = require("./models/Tournament");

const isOwner = async (interaction) => {
  return await Team.exists({
    captain: interaction.member.user.tag
  });
};

const Exists = async (value) => {
  return await Team.exists({
    name: value.toLowerCase()
  });
};

const isOnTeam = async (user) => {
  return await Team.exists({
    players: {
      $in: [user]
    }
  });
}

const isAdm = async (interaction) => {
  return interaction.member.roles.cache.has('884151483468234802') || interaction.member.roles.cache.has('884173663920877648')
}

const isScheduled = async (data) => {
  return await Tournament.exists({date: data})
}
module.exports = {
  isOwner,
  Exists,
  isOnTeam,
  isAdm,
  isScheduled
}
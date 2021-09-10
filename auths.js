const { exists } = require("./models/Team");
const Team = require("./models/Team");

const isOwner = async (interaction) => {
  let isowner = await Team.exists({ captain: interaction.member.user.tag });
  return isowner
};

const Exists = async (value) => {
  let exists = await Team.exists({ name: value.toLowerCase()});
  return exists
};

const isOnTeam = async (user) => {
    let isonteam = await Team.exists({players: { $in: [user]} });
    return isonteam;
}

module.exports = {
    isOwner, Exists
}
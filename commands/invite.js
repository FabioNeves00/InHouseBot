const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require('fs');
const { isOwner, isConfirmed, isOnTeam, isSelfInviting } = require("../authorize");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Invite players to an already existing team.")
    .addMentionableOption((Option) =>
      Option.setName("mention").setDescription("@user#0000").setRequired(true)
    ),
  async execute(interaction) {
    const { value } = interaction.options.data[0]
    const data = JSON.parse(fs.readFileSync("./database/teams.json", "utf8"))
    await interaction.client.users.fetch(value, false).then((user) => {
      console.log(interaction.member.user.tag, value, isOwner(interaction, data, interaction.member.user.tag));

      for(let i = 0; i < data.teams.length; i++){
          if (isOwner(interaction, data, data.teams[i].nome) === false){
            interaction.reply(`You are not the captain of any team.`)
          }
          if(isOnTeam(data, user) === false && isSelfInviting(data, user) === false){
            //Adds new info to "integrantes"
            data.teams[i].integrantes.push({
              nick: `${user.username}#${user.discriminator}`,
              status: "INVITED"
            })
            user.send('fake convite')
            interaction.reply("Successfully invited")
          } else {
            interaction.reply("Failed to invite")
          }
          fs.writeFileSync("./database/teams.json", JSON.stringify(data, true, 2))
          break;
        }
      });
    
  }
};

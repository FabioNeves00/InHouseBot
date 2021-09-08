const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require('fs')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Invite players to an already existing team.")
    .addMentionableOption((Option) =>
      Option.setName("mention").setDescription("@user#0000").setRequired(true)
    ),
  async execute(interaction) {
    let checker = false;
    let checker1 = false;
    const { value } = interaction.options.data[0]
    await interaction.client.users.fetch(value, false).then((user) => {
      
      const data = JSON.parse(fs.readFileSync("./database/teams.json", "utf8"))
      for (let i = 0; i < data.teams.length; i++) {
        //Checks if the invited player is an onwer of a team
        if (data.teams[i].captain === `${user.username}#${user.discriminator}`) {
          for (let j = 0; j < data.teams[i].integrantes.length; j++) {
            //Checks if he is already invited or confirmed on the same team
            if (data.teams[i].integrantes[j].nick === `${user.username}#${user.discriminator}` && data.teams[i].integrantes[j].status === "CONFIRMED") {
              checker = true
              break;
            }
          }
          checker = true
          break;
        }
      }
      for(let i = 0; i < data.teams.length; i++){
        if(data.teams[i].captain === interaction.member.user.tag){
          //Checks if the player inviting is the owner of the team
          checker1 = true
          for (let j = 0; j < data.teams[i].integrantes.length; j++) {
            //Checks if the player inviting is inviting himself
            if (data.teams[i].integrantes[j].nick === `${user.username}#${user.discriminator}`){
              checker = true
              break;
            }
            
          }
          if(!checker1){
            interaction.reply(`You are not the captain of any team.`)
          }
          if(!checker){
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
      }
      
    });
    
  }
};

const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed , MessageActionRow, MessageSelectMenu , MessageButton, Client} = require("discord.js");
const {
  isOwner,
  Exists,
  isOnTeam,
  hasAccepted
} = require("../auths.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("testeee")
    .setDescription("Shows all registered teams"),

  async execute(interaction) {
    // const teams = await Team.find({ team: true })
    // if (!teams) {
    //     const err1 = new MessageEmbed()
    //     .setTitle(`There is no team yet created`)
    //     .setThumbnail(`${interaction.member.user.avatarURL()}`)
    //     .setTimestamp()
    //     interaction.reply({embeds: [err1]});
    //     return
    // }
    // let ArrNames = []
    // if(teams.length == 0){
    //   ArrNames = "No teams created"
    // } else {
    //   for (let count = 0; count < teams.length; count++) {
    //     ArrNames.push(" " + teams[count].name);
    //   }
    // }
    // const teammsg = new MessageEmbed()
    //   .setTitle(`All Teams`)
    //   .setThumbnail(`${interaction.member.user.avatarURL()}`)
    //   .addField('Teams', `${ArrNames}`)
    //   .setTimestamp()
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('accept')
          .setLabel('Accept')
					.setStyle('SUCCESS'),
        new MessageButton() 
          .setCustomId('decline')
          .setLabel('Decline')
          .setStyle('DANGER'),
			);

    await interaction.reply({ content: 'Pong!', components: [row] });
    
    
  }
};
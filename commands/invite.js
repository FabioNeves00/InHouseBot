const {
  SlashCommandBuilder , userMention
} = require("@discordjs/builders");
const Team = require("../models/Team");
const {
  isOwner,
  isOnTeam
} = require("../auths.js")
const { MessageEmbed , MessageActionRow , MessageButton, Guild, Client} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("invites a player to your team")
    .addMentionableOption((Option) =>
      Option.setName("mention")
        .setDescription("@ the player you want to invite")
        .setRequired(true)
    ),
  async execute(interaction) {
    let {
      value
    } = interaction.options.data[0];
    //formats userid from value to only numbers
    value = value.replace(/[<>{}@!]/g, '')

    const team = await Team.findOne({
      captain: interaction.member.user.tag
    })
    //fetchs the usertag by the userid
    await interaction.client.users.fetch(value, false).then((user) => {

      if (team.players.length < 5 && isOwner(interaction) && isOnTeam(user)) {
        
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
        let players;
        const teamLength = team.players.length
        if(teamLength > 0){
          players = team.players.join("\n");
        }
        else{
          players = "empty"
        }
        const teammsg = new MessageEmbed()
        .setTitle(`${interaction.member.user.username} invited ${user.username} to team ${team.name}`)
        .setThumbnail(`${interaction.member.user.avatarURL()}`)
        .addField('Captain', `${team.captain}`)
        .addField(`Members ${teamLength}/5`, `${`${players}`}`)
        .setTimestamp()

        const filter = i => i.customId === 'accept'
        const filter2 = j => j.customId === 'decline'
        const collectorAccept = interaction.channel.createMessageComponentCollector({filter})
        const collectorDecline = interaction.channel.createMessageComponentCollector({filter2})
        let invited = `${user.username}#${user.discriminator}`

        collectorAccept.on('collect', async i => {
          if (i.customId === 'accept') {
            updatedPlayers = team.players.push(invited)
    
            Team.updateOne({
              captain: interaction.member.user.tag
            }, {
              $set: {
                players: updatedPlayers
              }
            })
            team.save()
            await i.deferUpdate();
            await i.editReply({ content: `player ${invited} joined team ${team.name}`, components: [] , embeds: []});
          }
        });
        collectorDecline.on('collect', async j => {
          if (j.customId === 'decline') {
            await j.deferUpdate();
            await j.editReply({ content: `${invited} declined the invite`, components: [] , embeds: []});
          }
        });

        interaction.reply({embeds: [teammsg] , components: [row]});
      }
    })
  }
};
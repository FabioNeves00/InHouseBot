const {
    SlashCommandBuilder
} = require("@discordjs/builders");
const Team = require("../models/Team");
const {
    isOwner,
    isOnTeam
} = require("../auths.js")
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("changecaptain")
        .setDescription("Changes the captain of your team")
        .addMentionableOption((Option) =>
            Option.setName("player")
                .setDescription("Player that you want to be the new captain")
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

            if (team && isOwner(interaction) && isOnTeam(user)) {

                team.captain = `${user.username}#${user.discriminator}`
                let updatedPlayers = team.players.splice(team.players.indexOf(user), 1)
                team.players.push(interaction.member.user.tag)

                team.save()
                const success = new MessageEmbed()
                    .setTitle(`Team: ${team.name}`)
                    .setThumbnail(`${interaction.member.user.avatarURL()}`)
                    .addField('Previous Captain', `${interaction.member.user.tag}`)
                    .addField('New Captain', `${user}`)
                    .setTimestamp()
                interaction.reply({ embeds: [success] });
            } else {
                const err1 = new MessageEmbed()
                    .setTitle(`Failed to change captain`)
                    .setThumbnail(`${interaction.member.user.avatarURL()}`)
                    .setTimestamp()

                interaction.reply({ embeds: [err1] });
            }
        })
    }
};
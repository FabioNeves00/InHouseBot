const {
    SlashCommandBuilder
} = require("@discordjs/builders");
const Team = require("../models/Team");
const {
    isAdm
} = require("../auths.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("disqualify")
        .setDescription("Disqualifies a team ( ADM ONLY )")
        .addStringOption((Option) =>
            Option.setName("team")
                .setDescription("Team that you want to disqualify")
                .setRequired(true)
        ),
    async execute(interaction) {
        const {
            value
        } = interaction.options.data[0];

        const team = await Team.findOne({
            name: value
        })
        //fetchs the usertag by the userid
            if (team && isAdm(interaction)) {
                await Team.deleteOne({ name: value })
                const teammsg = new MessageEmbed()
                .setTitle(`Successfully disqualified team ${team.name}`)
                .setThumbnail(`${interaction.member.user.avatarURL()}`)
                .setTimestamp()
  
                interaction.reply({embeds: [teammsg]});
            } else {
                const err = new MessageEmbed()
                .setTitle(`Failed to disqualify team ${team.name}`)
                .setThumbnail(`${interaction.member.user.avatarURL()}`)
                .setTimestamp()
  
                interaction.reply({embeds: [err]});
            }
    }
};
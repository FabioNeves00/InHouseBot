const { SlashCommandBuilder } = require("@discordjs/builders");
const Tournament = require("../models/Tournament");
const Tree = require("../models/tournamentTrees");
const { MessageEmbed } = require("discord.js");
const {
    isScheduled
} = require("../auths.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("showtournament")
        .setDescription("Show a tournament infos")
        .addStringOption((Option) =>
            Option.setName("date")
                .setDescription("Day of the tournament")
                .setRequired(true)
        ),
    async execute(interaction) {
        const {
            value
        } = interaction.options.data[0];
        const tournament = await Tournament.findOne({date: value})
        if(!isScheduled(value)) {
            const err1 = new MessageEmbed()
            .setTitle(`There is no tournament tree on day: ${value}`)
            .setThumbnail(`${interaction.member.user.avatarURL()}`)
            .addField('Date not found', `Try other date`)
            .setTimestamp()
            
            interaction.reply({embeds: [err1]});
            return
        }
        let exists = Tree.exists({date: value}) ? "Tournament tree generated" : "Tournament tree not generated"
        const tournamentmsg = new MessageEmbed()
        .setTitle(`Tournament day: ${value}`)
        .setThumbnail(`${interaction.member.user.avatarURL()}`)
        .addField('Organizer', `${interaction.member.user.tag}`)
        .addField('Infos', `Date: ${value}\nPrize Pool: ${tournament.prize}`)
        .addField('Tree', `${exists}`)
        .setTimestamp()
  
        interaction.reply({embeds: [tournamentmsg]});
    }
};

const {
    SlashCommandBuilder
} = require("@discordjs/builders");
const Tournament = require("../models/Tournament");
const {
    isAdm, isScheduled
} = require("../auths.js")
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("createtournament")
        .setDescription("Schedules a new Tounament")
        .addStringOption((Option) =>
            Option.setName("date")
                .setDescription("Date of start ( XX/XX day/month)")
                .setRequired(true)
        )
        .addIntegerOption((Option) =>
            Option.setName("prize")
                .setDescription("RP prize pool")
                .setRequired(true)
        ),
    async execute(interaction) {
        //gets team name
        const date = interaction.options.data[0].value
        const prize = interaction.options.data[1].value
        //checks if date is equal to data mask
        if(date.indexOf('/')){
            let mask = date.split('/')
            if(Number(mask[0]) <= 31 && Number(mask[1]) <= 12) {
                if (await isAdm(interaction) && await isScheduled(date) === false) {
                    //creates new team
                    const tournament = new Tournament({
                        date: date, 
                        organizer: `${interaction.member.user.tag}`,
                        prize: `${prize} RP`
                    });

                    //saves team to database
                    await tournament.save();
                    //replies to the message
                    const tournamentmsg = new MessageEmbed()
                    .setTitle(`Successfully scheduled tournament`)
                    .setThumbnail(`${interaction.member.user.avatarURL()}`)
                    .addField('Organizer', `${interaction.member.user.tag}`)
                    .addField('Infos', `Day: ${date}\nPrize Pool: ${prize} RP`)
                    .setTimestamp()

                    interaction.reply({embeds: [tournamentmsg]});

                } else if(!(await isAdm(interaction))) {
                    const err1 = new MessageEmbed()
                    .setTitle(`Error`)
                    .setThumbnail(`${interaction.member.user.avatarURL()}`)
                    .addField('You are not an admin', "Contact an admin to use this command")
                    .setTimestamp()

                    interaction.reply({embeds: [err1]});
                } else {
                    const err2 = new MessageEmbed()
                    .setTitle(`Error`)
                    .setThumbnail(`${interaction.member.user.avatarURL()}`)
                    .addField('There is already a tournament scheduled at that day', "Try other day")
                    .setTimestamp()

                    interaction.reply({embeds: [err2]});
                }
            } else {
                const err3 = new MessageEmbed()
                    .setTitle(`Error`)
                    .setThumbnail(`${interaction.member.user.avatarURL()}`)
                    .addField('Invalid date', "Try XX/XX, day/month")
                    .setTimestamp()

                    interaction.reply({embeds: [err3]});
            }
        } else {
            const err4 = new MessageEmbed()
                    .setTitle(`Error`)
                    .setThumbnail(`${interaction.member.user.avatarURL()}`)
                    .addField('Wrong date form, try: XX/XX, day/month')
                    .setTimestamp()

                    interaction.reply({embeds: [err4]});
        }
        
    },
};
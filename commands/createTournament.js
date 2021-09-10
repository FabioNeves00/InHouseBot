const {
    SlashCommandBuilder
} = require("@discordjs/builders");
const Tournament = require("../models/Tournament");
const {
    isAdm, isScheduled
} = require("../auths.js")

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
                if (await isAdm(interaction) && !(await isScheduled(date))) {
                    //creates new team
                    const tournament = new Tournament({
                        date: date,
                        organizer: `${interaction.member.user.tag}`,
                        prize: `${prize} RP`
                    });

                    //saves team to database
                    await tournament.save();
                    //replies to the message
                    interaction.reply(`Successfully scheduled tournament`);
                } else {
                    interaction.reply(`You need to be an admin to execute this command`);
                }
            } else {
                interaction.reply(`Invalid date`);
            }
        } else {
            interaction.reply(`Wrong date form, try day/month`);
        }
        
    },
};
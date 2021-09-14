const { SlashCommandBuilder } = require("@discordjs/builders");
const Tournament = require("../models/Tournament");

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

        let tournament = await Tournament.findOne({ date: value })
        if (!tournament) {
            interaction.reply("There is no tournament scheduled for that day")
            return
        }
        await interaction.reply(`-=Infos=-\nData:${tournament.date}\nPremiação:${tournament.prize}\nOrganizador:${tournament.organizer}`)
    }
};

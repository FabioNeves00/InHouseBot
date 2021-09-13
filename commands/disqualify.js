const {
    SlashCommandBuilder
} = require("@discordjs/builders");
const Team = require("../models/Team");
const {
    isAdm
} = require("../auths.js");

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
                let name = team.name
                await Team.deleteOne({ name: value })
                .then(
                    team.save()
                .then(
                    interaction.reply(`Successfully disqualified team ${name}`)))
            } else interaction.reply(`You're not an admin or team doesn't exists`)
    }
};
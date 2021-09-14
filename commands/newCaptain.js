const {
    SlashCommandBuilder
} = require("@discordjs/builders");
const Team = require("../models/Team");
const {
    isOwner,
    isOnTeam
} = require("../auths.js")

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

                const updatedTeam = team.captain.user.tag
                let updatedPlayers = team.players.splice(team.players.indexOf(user), 1)
                updatedPlayers = team.players.push(interaction.member.user.tag)
                
                team.save().then(
                    interaction.reply(`The new captain is ${user}`)
                )
            } else interaction.reply(`You're not the owner of the user's team or player is not on the team`)
        })
    }
};
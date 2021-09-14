const { SlashCommandBuilder } = require("@discordjs/builders");
const Tree = require("../models/tournamentTrees");
const { isAdm } = require("../auths.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("matchwinner")
        .setDescription("Sets a winner for a match")
        .addStringOption((Option) =>
            Option.setName("date")
                .setDescription("Tournament date (XX/XX day/month)")
                .setRequired(true)
        )
        .addStringOption((Option) =>
            Option.setName("winner")
                .setDescription("Winner team")
                .setRequired(true)
        )
        .addStringOption((Option) =>
            Option.setName("loser")
                .setDescription("Loser team")
                .setRequired(true)
        ),

    async execute(interaction) {
        if (isAdm(interaction)) {
            const {
                value
            } = interaction.options.data[0];
            const  winner = interaction.options.data[1].value;
            const  loser = interaction.options.data[2].value;
            let tree = await Tree.findOne({ date: value })
            if (!tree) {
                interaction.reply("There is no tournament scheduled for that day")
                return
            }
            const updated = (w, l) => {
                for (let i = 0; i < tree.teams.length; i++) {
                    for (let j = 0; j < 1; j++) {
                        if (tree.teams[i][j] === w) {
                            tree.teams[i][j] === `:white_check_mark:${w}`
                        }
                        if (tree.teams[i][j] === l) {
                            tree.teams[i][j] === `:x:${l}`
                        }
                    }
                }
                return tree.teams
            }
            const update = Tree.updateOne(
                { date: value },
                {
                    teams: updated(winner, loser)
                })
            tree.save().then(
                interaction.reply(`Successfully set a win for the team ${winner}`)
            )
        }
    }
};

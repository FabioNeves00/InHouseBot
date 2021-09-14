const { SlashCommandBuilder } = require("@discordjs/builders");
const Tree = require("../models/tournamentTrees");
const Team = require("../models/Team");
const { isAdm, Exists, isScheduled } = require("../auths.js");

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
        ),

    async execute(interaction) {
        if (isAdm(interaction)) {
            const {
                value
            } = interaction.options.data[0];
            const winner = interaction.options.data[1].value;
            if(Exists(winner) && isScheduled(value)){
                const team = await Team.updateOne({name: winner}, {$set: {winner: true}})
                const tree = await Tree.findOne({date: value})
                let newArr = []
                tree.teams.forEach(time => {
                    if(time[0] == winner || time[1] == winner){
                        time[0] = `:white_check_mark: ${time[0]}`
                    }
                    newArr.push(time)
                });
                
                const updatedTree = Tree.updateOne({
                    date: value
                  }, {
                    $set: {
                      teams: newArr
                    }
                  })
                interaction.reply(`Team ${winner} won the match`)
                
            }
        } else {
            interaction.reply("You're not an admin")
        }
    }
};

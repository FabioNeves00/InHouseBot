const {
    SlashCommandBuilder
} = require("@discordjs/builders");
const Team = require("../models/Team");
const Tree = require("../models/tournamentTrees");
const {
    isAdm,
    isScheduled
} = require("../auths.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("generatetree")
        .setDescription("Creates a fully randomized tournament tree")
        .addStringOption((Option) =>
            Option.setName("date")
                .setDescription("tournament date (XX/XX day/month)")
                .setRequired(true)
        ),
    async execute(interaction) {
        const {
            value
        } = interaction.options.data[0];
        if (await isAdm(interaction) && await isScheduled(value)) {
            const teams = await Team.find({team: true})
            let ArrNames = []
            for(let count = 0; count < teams.length; count++){
                ArrNames.push(teams[count].name);
            }
            ArrNames.sort(()=> Math.random() - 0.5)
            const tree = new Tree({
                date: value,
                teams: transformMatriz(ArrNames),
                tree: true
              });

            await tree.save();
            interaction.reply(`Successfully generated tree for the tournament on day: ${value}`);
        } else {
          interaction.reply(`Failed to generate tournament tree`);
        }
    },
};

const transformMatriz = (arr) => {
    let newArr = []
    for (let i = 0; i < arr.length; i+=2) {
        newArr.push([arr[i], arr[i+1]])
    }
    return newArr
}
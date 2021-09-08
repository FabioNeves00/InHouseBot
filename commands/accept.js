const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("accept")
        .setDescription("Accepts a team invite.")
        .addStringOption((Option) =>
            Option.setName("team").setDescription("Team's name").setRequired(true)
        )
        .addStringOption((Option) =>
            Option.setName("confirm").setDescription("Yes | No").setRequired(true)
        ),
    async execute(interaction) {
        const { value } = interaction.options.data[0]
        const argument = interaction.options.data[1].value
        switch (value.toLowerCase()) {
            case "yes":
                case "y":
                    case "sim":
                        case "s":

                        break;
            case "no":
                case "n":
                    case "não":
                        case "nao":

                        break;
            default:
                //NOT FOUND
                break;
        }
        // const data = await JSON.parse(fs.readFileSync("./database/teams.json", "utf8"))
        // data.teams.push({
        //   nome: `${value}`,
        //   integrantes: {}
        // })
        // await fs.writeFileSync("./database/teams.json", JSON.stringify(data, true, 2))
    }
};
const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const { token } = require("./config.json");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

//gets all the commandds
client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

//client is ready
client.once("ready", () => {
  console.log("Logged as => " + client.user.tag);
  client.user.setActivity("bot em construção", { type: "WATCHING" });
});

//interaction handling
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

async function notFound(msg) {
  const notFound = new MessageEmbed()
    .setTitle("Ajuda: Comando não encontrado")
    .setAuthor("Mine Bot")
    .addFields({
      name: "Explicação",
      value:
        "Comando não encontrado linda, use o ?comandos para ver os comandos disponíveis",
    })
    .setImage(
      "https://tenor.com/view/quby-chan-confused-huh-what-what-is-it-gif-17010842"
    )
    .setFooter("Mine Bot");
  msg.channel.send({ embeds: [notFound] });
}

client.login(token);

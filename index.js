const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const { token, url } = require("./config.json");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const mongoose = require('mongoose');

//gets all the commandds
client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

connectDB(url)

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

client.login(token);

async function connectDB(url) {
  await mongoose.connect(url, () => {
    console.log("connected to db")
  })
}

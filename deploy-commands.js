import {} from "dotenv/config";
import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

const commands = [
  //create team command
  new SlashCommandBuilder()
    .setName("createteam")
    .setDescription("creates a team with the name given")
    .addStringOption((Option) =>
      Option.setName("name")
        .setDescription("name of the team you want to create")
        .setRequired(true)
    ),
  //invite member to team command
  new SlashCommandBuilder()
    .setName("invite")
    .setDescription("invites a player to your team")
    .addMentionableOption((Option) =>
      Option.setName("player")
        .setDescription("player you want to invite to your team")
        .setRequired(true)
    ),
  //setTeamLeader command
  new SlashCommandBuilder()
    .setName("setleader")
    .setDescription("sets a new leader to your team")
    .addMentionableOption((Option) =>
      Option.setName("player")
        .setDescription("player you want to set as the new leader")
        .setRequired(true)
    ),
  //Kick command
  new SlashCommandBuilder()
    .setName("kick")
    .setDescription("kicks a member from your team")
    .addMentionableOption((Option) =>
      Option.setName("player")
        .setDescription("player you want to remove from your team")
        .setRequired(true)
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(process.env.token);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.clientId,
        process.env.guildId
      ),
      { body: commands }
    );

    console.log("Successfully registered application commands.");
  } catch (error) {
    console.error(error);
  }
})();

import {} from "dotenv/config";
import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

const commands = [
  //create team command
  new SlashCommandBuilder()
    .setName("Create Team")
    .setDescription("Creates a team with the name given")
    .addStringOption((Option) =>
      Option.setName("Name")
        .setDescription("Name of the team you want to create")
        .setRequired(true)
    ),
  //invite member to team command
  new SlashCommandBuilder()
    .setName("Invite")
    .setDescription("invites a player to your team")
    .addMentionableOption((Option) =>
      Option.setName("Player")
        .setDescription("Player you want to invite to your team")
        .setRequired(true)
    ),
  //setTeamLeader command
  new SlashCommandBuilder()
    .setName("Set Leader")
    .setDescription("Sets a new leader to your team")
    .addMentionableOption((Option) =>
      Option.setName("Player")
        .setDescription("Player you want to set as the new leader")
        .setRequired(true)
    ),
  //Kick command
  new SlashCommandBuilder()
    .setName("Kick")
    .setDescription("Kicks a member from your team")
    .addMentionableOption((Option) =>
      Option.setName("Player")
        .setDescription("Player you want to remove from your team")
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

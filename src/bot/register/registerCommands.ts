import { REST, Routes } from "discord.js";
import config from "../config.js";
import loadCommands from "./loadCommands.js";

export default async function registerCommands() {
  const commands = await loadCommands();

  const commandData = commands.map((cmd) => cmd.data.toJSON());

  const rest = new REST().setToken(config.discordToken);

  await rest.put(Routes.applicationCommands(config.clientId), {
    body: commandData,
  });

  console.log(`Registered commands: ${commandData.map((cmd) => cmd.name)}`);

  return commands;
}

registerCommands();
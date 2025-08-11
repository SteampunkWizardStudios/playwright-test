import { SlashCommandCollection } from "../types/SlashCommand.js";
import { Collection } from "discord.js";
import { readdir } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = join(fileURLToPath(import.meta.url), "..");
const commandsDir = join(__dirname, "../commands");const loadCommands = async (): Promise<SlashCommandCollection> => {
  const commands: SlashCommandCollection = new Collection();

  const commandFiles = (await readdir(commandsDir)).filter(
    (file) => file.endsWith(".ts") || file.endsWith(".js")
  );

  for (const file of commandFiles) {
    const commandPath = `../commands/${file}`;
    try {
      const commandModule = await import(commandPath);
      const command = commandModule.default;

      commands.set(command.data.name, command);
    } catch (error) {
      console.error(`Failed to load command from ${file}:`, error);
    }
  }

  return commands;
};

export default loadCommands;

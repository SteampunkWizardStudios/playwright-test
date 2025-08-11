import {
  Interaction,
  MessageFlags,
  ChatInputCommandInteraction,
} from "discord.js";
import client from "../client.js";

export default async function interactionCreate(interaction: Interaction) {
  if (interaction.isChatInputCommand()) {
    await handleSlashCommand(interaction);
  } else if (interaction.isRepliable()) {
    interaction.reply({
      content: "This interaction could not be handled.",
      flags: MessageFlags.Ephemeral,
    });
    console.error(`Unhandled repliable interaction: ${interaction}`);
  } else {
    console.error(`Unhandled interaction: ${interaction}`);
  }
}

const handleSlashCommand = async (interaction: ChatInputCommandInteraction) => {
  const getSubcommand = interaction.options.getSubcommand(false);
  const time = performance.now();
  const command = client.commands.get(interaction.commandName);
  if (!command) {
    interaction.reply({
      content: `The command \`${interaction.commandName}\` does not have a handler.`,
      flags: MessageFlags.Ephemeral,
    });
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing command ${interaction.commandName}:`, error);
    const message = `There was an error while executing the command \`${interaction.commandName}\`: ${error}`;
    if (!interaction.replied && !interaction.deferred) {
      interaction.reply({
        content: message,
      });
    } else {
      interaction.editReply({
        content: message,
        components: [],
        flags: [],
      });
    }
  } finally {
    console.log(
      `${interaction.user.displayName} ran: /${interaction.commandName}${
        getSubcommand ? ` ${getSubcommand}` : ""
      } in ${(performance.now() - time).toFixed()}ms`
    );
  }
};

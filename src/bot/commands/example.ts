import {
  ApplicationIntegrationType,
  InteractionContextType,
  SlashCommandBuilder,
} from "discord.js";
import SlashCommand from "../types/SlashCommand.js";

const supportCommand: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName("example")
    .setDescription("Example usage of playwright + preact to generate images")
    .setContexts(
      InteractionContextType.BotDM,
      InteractionContextType.Guild,
      InteractionContextType.PrivateChannel
    )
    .setIntegrationTypes(
      ApplicationIntegrationType.GuildInstall,
      ApplicationIntegrationType.UserInstall
    )
    .addStringOption((opt) =>
      opt
        .setName("quote")
        .setDescription("The quote to display")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const quote = interaction.options.getString("quote", true);

    const response = await fetch("http://localhost:3001", {
      method: "POST",
      body: JSON.stringify({
        avatarUrl: interaction.user.displayAvatarURL(),
        username: interaction.user.displayName,
        text: quote,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const buffer = await response.arrayBuffer();

    await interaction.editReply({
      files: [
        {
          attachment: Buffer.from(buffer),
          name: "image.png",
        },
      ],
    });
  },
};

export default supportCommand;

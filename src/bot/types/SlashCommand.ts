import {
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
  SlashCommandOptionsOnlyBuilder,
  ChatInputCommandInteraction,
  AutocompleteInteraction,
  Collection,
} from "discord.js";

type SlashCommand = {
  data:
    | SlashCommandBuilder
    | SlashCommandSubcommandsOnlyBuilder
    | SlashCommandOptionsOnlyBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
  autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
};

export type SlashCommandCollection = Collection<string, SlashCommand>; // name -> SlashCommand

export default SlashCommand;
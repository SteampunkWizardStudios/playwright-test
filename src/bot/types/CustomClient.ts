import { Client, Collection } from "discord.js";
import { SlashCommandCollection } from "./SlashCommand";

export default class CustomClient extends Client {
  public commands: SlashCommandCollection = new Collection();
}

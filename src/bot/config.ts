import "dotenv/config"

const isDevelopment = process.env.NODE_ENV === "development";
const discordToken = isDevelopment
  ? process.env.DISCORD_TOKEN_DEV
  : process.env.DISCORD_TOKEN;
const clientId = isDevelopment
  ? process.env.CLIENT_ID_DEV
  : process.env.CLIENT_ID;

if (!discordToken || !clientId) {
  throw new Error("Missing required environment variables");
}

const config = {
  isDevelopment,
  discordToken,
  clientId,
};

export default config;

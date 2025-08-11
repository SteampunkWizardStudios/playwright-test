import client from "./client.js";
import config from "./config.js";
import interactionCreate from "./events/interactionCreate.js";
import { Events } from "discord.js";
import loadCommands from "./register/loadCommands.js";

let isShuttingDown = false;

let errorCount = 0;
const MAX_ERRORS = 6;
const ERROR_RESET_TIME = 5 * 60 * 1000;
let errorResetTimeout: NodeJS.Timeout | null = null;

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  increaseErrorCount();
});
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  increaseErrorCount();
});

(async () => {
  try {
    await client.login(config.discordToken);

    client.once(Events.ClientReady, async (c) => {
      console.log(`Logged in as ${c.user?.displayName}`);

      [client.commands] = await Promise.all([loadCommands()]);

      client.on(Events.InteractionCreate, interactionCreate);

      console.log("Bot fully initialized");
    });
  } catch (error) {
    console.error("Error during bot initialization:", error);
    process.exit(1);
  }
})();

async function gracefulShutdown() {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log("Initiating graceful shutdown...");

  try {
    client.removeAllListeners();

    if (errorResetTimeout) {
      clearTimeout(errorResetTimeout);
    }

    const disconnectPromises = [];

    if (client.isReady()) {
      disconnectPromises.push(client.destroy());
    } else {
      console.log("Discord client was not ready, skipping shutdown.");
    }

    await Promise.all(disconnectPromises);
    console.log("All services disconnected.");
  } catch (error) {
    console.error("Error during graceful shutdown:", error);
  } finally {
    console.log("Process exiting.");
    process.exit(0);
  }
}

function increaseErrorCount() {
  errorCount++;

  if (errorCount >= MAX_ERRORS) {
    console.error(
      `Exceeded maximum error count (${MAX_ERRORS}). Shutting down...`
    );
    gracefulShutdown();
  } else {
    if (errorResetTimeout) {
      clearTimeout(errorResetTimeout);
    }

    errorResetTimeout = setTimeout(() => {
      if (errorCount > 0) {
        errorCount = 0;
      }
      errorResetTimeout = null;
    }, ERROR_RESET_TIME);
  }
}

import { createWriteStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

const streamPipeline = promisify(pipeline);

(async () => {
  const response = await fetch("http://localhost:3001", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: ["Hello", "World"],
    }),
  });

  const nodeStream = response.body as unknown as NodeJS.ReadableStream;

  await streamPipeline(nodeStream, createWriteStream("screenshot.png"));
  console.log("Screenshot saved as screenshot.png");
})();
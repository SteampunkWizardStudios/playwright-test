import { chromium, BrowserContext } from "playwright";
import express from "express";

let context: BrowserContext;

const app = express();
app.use(express.json());

const port = 3001;

app.listen(port, () => {
  console.log(`Screenshot service running at http://localhost:${port}`);
});

(async () => {
  context = await chromium.launchPersistentContext("", { headless: true });
  console.log("Persistent browser context started");
})();

app.post("/", async (req, res) => {
  const page = await context.newPage();
  const response = await page.request.post("http://localhost:3000", {
    data: { ...req.body },
  });
  const html = await response.text();
  await page.setContent(html);

  const element = page.locator("#example");
  const screenshot = await element.screenshot({ omitBackground: true });
  await page.close();
  res.set("Content-Type", "image/png");
  res.send(screenshot);
});

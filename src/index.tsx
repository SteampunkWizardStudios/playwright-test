import express from "express";
import { render } from "preact-render-to-string";
import Example from "./components/Example.js";

const app = express();
app.use(express.json());

const port = 3000;

app.post("/", (req, res) => {
  const { avatarUrl, username, text } = req.body;
  const example = render(
    <Example avatarUrl={avatarUrl} username={username} text={text} />
  );
  res.send(`
    <!DOCTYPE html>
    <html>
      <body>
        ${example}
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Image serving running at http://localhost:${port}`);
});

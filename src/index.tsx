import express from "express";
import { render } from "preact-render-to-string";
import Example from "./components/Example";

const app = express();
app.use(express.json());

const port = 3000;

app.post("/", (req, res) => {
  const { avatarUrl, username } = req.body;
  const example = render(<Example avatarUrl={"https://cdn.discordapp.com/avatars/1206295979918106705/2ea4307d0b310f97d76c8ecdb7d8c22f.png?size=1024"} username={"steampunkWizard"} />);
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

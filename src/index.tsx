import express from "express";
import { render } from "preact-render-to-string";
import MyImage from "./MyImage";

const app = express();
app.use(express.json());

const port = 3000;

app.post("/", (req, res) => {
  const items = Array.isArray(req.body.items) ? req.body.items : undefined;
  const myImage = render(<MyImage items={items} />);
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            background: #18181b;
          }
        </style>
      </head>
      <body>
        ${myImage}
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Image serving running at http://localhost:${port}`);
});

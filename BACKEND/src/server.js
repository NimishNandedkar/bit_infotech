import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(PORT, (error) => {
    if (!error) {
        console.log("success server is running on " + PORT);
    } else {
        console.log(error.message);
    }
});

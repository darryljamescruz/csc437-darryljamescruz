import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";

console.log("STATIC_DIR:", process.env.STATIC_DIR);
console.log("Serving file from:", path.resolve(staticDir, "index.html"));


const app = express();
app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get("*", (req: Request, res: Response) => {
    console.log("none of the routes above me were matched");
    res.sendFile(path.resolve(staticDir, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

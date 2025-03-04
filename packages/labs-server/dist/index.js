"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";
console.log("STATIC_DIR:", process.env.STATIC_DIR);
console.log("Serving file from:", path_1.default.resolve(staticDir, "index.html"));
const app = (0, express_1.default)();
app.use(express_1.default.static(staticDir));
app.get("/hello", (req, res) => {
    res.send("Hello, World");
});
app.get("*", (req, res) => {
    console.log("none of the routes above me were matched");
    res.sendFile(path_1.default.resolve(staticDir, "index.html"));
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

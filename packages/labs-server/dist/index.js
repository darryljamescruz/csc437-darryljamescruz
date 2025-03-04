"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";
const app = (0, express_1.default)();
app.use(express_1.default.static(staticDir));
app.get("/hello", (req, res) => {
    res.send("Hello, World");
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

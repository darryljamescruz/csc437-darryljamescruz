"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const ImageProvider_1 = require("./ImageProvider");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";
const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;
const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;
console.log("Attempting Mongo connection at " + connectionStringRedacted);
async function setUpServer() {
    try {
        // Connect to MongoDB
        const mongoClient = await mongodb_1.MongoClient.connect(connectionString);
        console.log("✅ Connected to MongoDB");
        const collectionInfos = await mongoClient.db().listCollections().toArray();
        console.log("Collections:", collectionInfos.map(info => info.name));
        // Set up Express
        const app = (0, express_1.default)();
        const staticDir = process.env.STATIC_DIR || "public";
        app.use(express_1.default.static(staticDir));
        app.get("/hello", (req, res) => {
            res.send("Hello, World");
        });
        // Make a new route that fetches images
        app.get("/api/images", async (req, res) => {
            try {
                const provider = new ImageProvider_1.ImageProvider(mongoClient);
                const images = await provider.getAllImages();
                res.json(images);
            }
            catch (error) {
                console.error("Error fetching images:", error);
                res.status(500).json({ error: "Failed to fetch images" });
            }
        });
        // Catch-all route for SPA support
        app.get("*", (req, res) => {
            res.sendFile(path_1.default.resolve(staticDir, "index.html"));
        });
        // Start server
        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server running on port ${process.env.PORT}`);
        });
    }
    catch (error) {
        console.error("❌ MongoDB connection failed:", error);
    }
}
// Start the server
setUpServer();

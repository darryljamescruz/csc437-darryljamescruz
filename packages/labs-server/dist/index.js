"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Read the .env file in the current working directory, and load values into process.env.
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const images_1 = require("./routes/images");
const auth_1 = require("./routes/auth");
const auth_2 = require("./routes/auth");
const path_1 = __importDefault(require("path"));
const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";
const IMAGE_UPLOAD_DIR = process.env.IMAGE_UPLOAD_DIR || "uploads";
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
        app.use(express_1.default.json());
        app.get("/hello", (req, res) => {
            res.send("Hello, World");
        });
        // LAB 22: call register auth routes from auth.ts
        app.use("/api/*", auth_2.verifyAuthToken);
        // LAB 21: call register image routes from images.ts
        (0, images_1.registerImageRoutes)(app, mongoClient);
        // LAB 22: call register auth routes from auth.ts
        (0, auth_1.registerAuthRoutes)(app, mongoClient);
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

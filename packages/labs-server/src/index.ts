import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.

const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";

const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;
const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

console.log("Attempting Mongo connection at " + connectionStringRedacted);

async function setUpServer() {
    try {
        // Connect to MongoDB
        const mongoClient = await MongoClient.connect(connectionString);
        console.log("✅ Connected to MongoDB");

        const collectionInfos = await mongoClient.db().listCollections().toArray();
        console.log("Collections:", collectionInfos.map(info => info.name));

        // Set up Express
        const app = express();
        const staticDir = process.env.STATIC_DIR || "public";

        app.use(express.static(staticDir));

        app.get("/hello", (req: Request, res: Response) => {
            res.send("Hello, World");
        });

        // Catch-all route for SPA support
        app.get("*", (req: Request, res: Response) => {
            res.sendFile(path.resolve(staticDir, "index.html"));
        });

        // Start server
        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server running on port ${process.env.PORT}`);
        });

    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
    }
}

// Start the server
setUpServer();
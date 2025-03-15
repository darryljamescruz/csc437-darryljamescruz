import dotenv from "dotenv";
dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.

import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { registerImageRoutes } from "./routes/images";
import { registerAuthRoutes } from "./routes/auth";
import { verifyAuthToken } from "./routes/auth";
import path from "path";


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
        app.use(express.json());

        app.get("/hello", (req: Request, res: Response) => {
            res.send("Hello, World");
        });

        // LAB 22: call register auth routes from auth.ts
        app.use("/api/*", verifyAuthToken);

        // LAB 21: call register image routes from images.ts
        registerImageRoutes(app, mongoClient);

        // LAB 22: call register auth routes from auth.ts
        registerAuthRoutes(app, mongoClient);

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
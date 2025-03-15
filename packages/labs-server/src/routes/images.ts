import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { ImageProvider } from "../ImageProvider";

export function registerImageRoutes(app: express.Application, mongoClient: MongoClient) {
    // Make a new route that fetches images
    app.get("/api/images", async (req: Request, res: Response) => {
        try {
            const provider = new ImageProvider(mongoClient);
            const images = await provider.getAllImages();
            res.json(images);
        } catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });
}
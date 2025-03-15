import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { ImageProvider } from "../ImageProvider";

export function registerImageRoutes(app: express.Application, mongoClient: MongoClient) {
    // make a new route that fetches images
    app.get("/api/images", async (req: Request, res: Response) => {
        // get the userId from the query parameters
        let userId: string | undefined = undefined;
        if (typeof req.query.createdBy === "string") {
            userId = req.query.createdBy;
        }
        console.log("Queried userID: ", userId);
        try {
            // Use the ImageProvider to fetch images
            const provider = new ImageProvider(mongoClient);
            // Fetch images from the provider
            const images = await provider.getAllImages(userId);
            // Send the images as a response
            res.json(images);
        } catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });
}
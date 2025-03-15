"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerImageRoutes = registerImageRoutes;
const ImageProvider_1 = require("../ImageProvider");
function registerImageRoutes(app, mongoClient) {
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
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerImageRoutes = registerImageRoutes;
const ImageProvider_1 = require("../ImageProvider");
function registerImageRoutes(app, mongoClient) {
    // make a new route that fetches images
    app.get("/api/images", async (req, res) => {
        // get the userId from the query parameters
        let userId = undefined;
        if (typeof req.query.createdBy === "string") {
            userId = req.query.createdBy;
        }
        console.log("Queried userID: ", userId);
        try {
            // Use the ImageProvider to fetch images
            const provider = new ImageProvider_1.ImageProvider(mongoClient);
            // Fetch images from the provider
            const images = await provider.getAllImages(userId);
            // Send the images as a response
            res.json(images);
        }
        catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    });
    // update API 
    app.patch("/api/images/:id", async (req, res) => {
        // exctact image id from route params
        const imageId = req.params.id;
        // extract the image data from the request body
        const { name } = req.body;
        // send a 400 error if name is not provided
        if (!name) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing name property. Try again."
            });
            return;
        }
        try {
            const provider = new ImageProvider_1.ImageProvider(mongoClient);
            const matchedCount = await provider.updateImageName(imageId, name);
            // log the imageId and name
            console.log(`Updating image ID ${imageId} to new name: ${name}`);
            // send a 404 error if no image was found
            if (matchedCount === 0) {
                res.status(404).send({
                    error: "Not found",
                    message: "No image found with the provided ID. Try again."
                });
                return;
            }
        }
        catch (error) {
            console.error("Error updating image name:", error);
            res.status(500).json({ error: "Failed to update image name" });
        }
        res.status(204).send("Image name updated successfully");
    });
}

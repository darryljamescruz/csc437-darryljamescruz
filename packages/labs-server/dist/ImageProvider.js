"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProvider = void 0;
class ImageProvider {
    mongoClient;
    constructor(mongoClient) {
        this.mongoClient = mongoClient;
    }
    async getAllImages() {
        const imagesCollectionName = process.env.IMAGES_COLLECTION_NAME;
        const usersCollectionName = process.env.USERS_COLLECTION_NAME;
        if (!imagesCollectionName || !usersCollectionName) {
            throw new Error("Missing collection names in environment variables");
        }
        const imagesCollection = this.mongoClient.db().collection(imagesCollectionName);
        const usersCollection = this.mongoClient.db().collection(usersCollectionName);
        // Fetch all images
        const images = await imagesCollection.find().toArray();
        // Replace author ID with actual user object
        for (const image of images) {
            if (typeof image.author === "string") {
                try {
                    const user = await usersCollection.findOne({ _id: image.author }); // No ObjectId conversion                    
                    if (user) {
                        image.author = user; // Replace ID with full user object
                    }
                }
                catch (error) {
                    console.error(`Error fetching user for author ID ${image.author}:`, error);
                }
            }
        }
        return images;
    }
}
exports.ImageProvider = ImageProvider;

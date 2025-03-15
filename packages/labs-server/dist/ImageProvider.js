"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProvider = void 0;
class ImageProvider {
    mongoClient;
    constructor(mongoClient) {
        this.mongoClient = mongoClient;
    }
    async getAllImages(authorId) {
        const imagesCollectionName = process.env.IMAGES_COLLECTION_NAME;
        const usersCollectionName = process.env.USERS_COLLECTION_NAME;
        if (!imagesCollectionName || !usersCollectionName) {
            throw new Error("Missing collection names in environment variables");
        }
        const imagesCollection = this.mongoClient.db().collection(imagesCollectionName);
        const usersCollection = this.mongoClient.db().collection(usersCollectionName);
        // fetch images based on authorId
        const filterImage = authorId ? { author: authorId } : {};
        const images = await imagesCollection.find(filterImage).toArray();
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
    async updateImageName(imageId, name) {
        // Convert imageId to ObjectId
        const imagesCollectionName = process.env.IMAGES_COLLECTION_NAME;
        // Check if the collection name is defined
        if (!imagesCollectionName) {
            throw new Error("Missing collection name in environment variables");
        }
        const imagesCollection = this.mongoClient.db().collection(imagesCollectionName);
        const result = await imagesCollection.updateOne({ _id: imageId }, { $set: { name: name } });
        return result.matchedCount;
    }
}
exports.ImageProvider = ImageProvider;

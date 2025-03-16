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
                    const user = await usersCollection.findOne({ _id: image.author });
                    if (user) {
                        image.author = user; // Replace ID with full user object
                    }
                }
                catch (error) {
                    console.error(`Error fetching user for author ID ${image.author}:`, error);
                }
            }
        }
        // Map each image to include an `id` property (converted from _id)
        return images.map((image) => ({
            ...image,
            id: image._id.toString()
        }));
    }
    async updateImageName(imageId, name) {
        // Check if the collection name is defined
        const imagesCollectionName = process.env.IMAGES_COLLECTION_NAME;
        if (!imagesCollectionName) {
            throw new Error("Missing collection name in environment variables");
        }
        const imagesCollection = this.mongoClient.db().collection(imagesCollectionName);
        const result = await imagesCollection.updateOne({ _id: imageId }, { $set: { name: name } });
        return result.matchedCount;
    }
}
exports.ImageProvider = ImageProvider;

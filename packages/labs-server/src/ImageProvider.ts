import { MongoClient, ObjectId } from "mongodb";

// define an interface matching the MongoDB document structure
interface ImageDocument {
    _id: string;
    url: string;
    title: string;
    description: string;
    author: string | UserDocument; // allows both ID and user object
}

// Define an interface for Users
interface UserDocument {
    _id: string;
    name: string;
    email: string;
}

interface NewImage {
    url: string;
    title: string;
    author: string;
}


export class ImageProvider {
    constructor(private readonly mongoClient: MongoClient) {}

    async getAllImages(authorId?: string): Promise<ImageDocument[]> {
        const imagesCollectionName = process.env.IMAGES_COLLECTION_NAME;
        const usersCollectionName = process.env.USERS_COLLECTION_NAME;

        if (!imagesCollectionName || !usersCollectionName) {
            throw new Error("Missing collection names in environment variables");
        }

        const imagesCollection = this.mongoClient.db().collection<ImageDocument>(imagesCollectionName);
        const usersCollection = this.mongoClient.db().collection<UserDocument>(usersCollectionName);

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
                } catch (error) {
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

    async updateImageName(imageId: string, name: string): Promise<number> {
        // Check if the collection name is defined
        const imagesCollectionName = process.env.IMAGES_COLLECTION_NAME;
        if (!imagesCollectionName) {
            throw new Error("Missing collection name in environment variables");
        }
        
        const imagesCollection = this.mongoClient.db().collection<ImageDocument>(imagesCollectionName);
        const result = await imagesCollection.updateOne({ _id: imageId }, { $set: { name: name }});
        return result.matchedCount;
    }

    async insertImage(newImage: NewImage): Promise<any> {
        const imagesCollectionName = process.env.IMAGES_COLLECTION_NAME;
        if (!imagesCollectionName) {
            throw new Error("Missing collection name in environment variables");
        }
        const imagesCollection = this.mongoClient.db().collection(imagesCollectionName);
        const result = await imagesCollection.insertOne(newImage);
        return {
            ...newImage,
            id: result.insertedId.toString()
        };
    }

}
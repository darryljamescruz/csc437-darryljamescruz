import { MongoClient, ObjectId} from "mongodb";

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
                    const user = await usersCollection.findOne({ _id: image.author }); // No ObjectId conversion                    
                    if (user) {
                        image.author = user; // Replace ID with full user object
                    }
                } catch (error) {
                    console.error(`Error fetching user for author ID ${image.author}:`, error);
                }
            }
        }

        return images;
    }
}
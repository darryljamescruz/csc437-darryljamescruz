import { Collection, MongoClient } from "mongodb";
import bcrypt from "bcrypt";

interface ICredentialsDocument {
    username: string;
    password: string;
}

export class CredentialsProvider {
    private readonly collection: Collection<ICredentialsDocument>;

    constructor(mongoClient: MongoClient) {
        const COLLECTION_NAME = process.env.CREDS_COLLECTION_NAME;
        if (!COLLECTION_NAME) {
            throw new Error("Missing CREDS_COLLECTION_NAME from env file");
        }
        this.collection = mongoClient.db().collection<ICredentialsDocument>(COLLECTION_NAME);
    }

    async registerUser(username: string, plaintextPassword: string) {
        //check if user exists
        const existingUser = await this.collection.findOne({ username });
        if (existingUser) {
            // user already exists, registration should not continue
            return false;
        }

        // generate salt w/ 10 rounds
        const salt = await bcrypt.genSalt(10);
        // hash plaintect password with generated salt
        const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

        console.log("hashed password: ", hashedPassword);
        // insert user record into the database
        await this.collection.insertOne({
            username,
            password: hashedPassword,
        });
        
        // Wait for any DB operations to finish before returning!
        return true;
    }

    async verifyPassword(username: string, plaintextPassword: string) {
        // TODO
        return false;
    }
}

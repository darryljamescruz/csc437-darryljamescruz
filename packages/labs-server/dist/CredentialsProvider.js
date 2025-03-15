"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsProvider = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class CredentialsProvider {
    collection;
    constructor(mongoClient) {
        const COLLECTION_NAME = process.env.CREDS_COLLECTION_NAME;
        if (!COLLECTION_NAME) {
            throw new Error("Missing CREDS_COLLECTION_NAME from env file");
        }
        this.collection = mongoClient.db().collection(COLLECTION_NAME);
    }
    async registerUser(username, plaintextPassword) {
        //check if user exists
        const existingUser = await this.collection.findOne({ username });
        if (existingUser) {
            // user already exists, registration should not continue
            return false;
        }
        // generate salt w/ 10 rounds
        const salt = await bcrypt_1.default.genSalt(10);
        // hash plaintect password with generated salt
        const hashedPassword = await bcrypt_1.default.hash(plaintextPassword, salt);
        console.log("hashed password: ", hashedPassword);
        // insert user record into the database
        await this.collection.insertOne({
            username,
            password: hashedPassword,
        });
        // Wait for any DB operations to finish before returning!
        return true;
    }
    async verifyPassword(username, plaintextPassword) {
        // find user in the database
        const user = await this.collection.findOne({ username });
        if (!user) {
            // user not found
            return false;
        }
        // returns true if password matches, false otherwise
        return await bcrypt_1.default.compare(plaintextPassword, user.password);
    }
}
exports.CredentialsProvider = CredentialsProvider;
;

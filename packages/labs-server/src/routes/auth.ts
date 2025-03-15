import express, { Request, Response, RequestHandler, NextFunction } from "express";
import { MongoClient } from "mongodb";
import { CredentialsProvider } from "../CredentialsProvider";
import jwt from "jsonwebtoken";

// get the JWT secret from the env file
const signatureKey = process.env.JWT_SECRET!
if (!signatureKey) {
    throw new Error("Missing JWT_SECRET from env file");
}

// function to generate JWT token that expires in one day
function generateAuthToken(username: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        jwt.sign(
            { username: username },
            signatureKey,
            { expiresIn: "1d" },
            (error, token) => {
                if (error) reject(error);
                else resolve(token as string);
            }
        );
    });
}

// middleware to verify JWT token
export function verifyAuthToken(
    req: Request,
    res: Response,
    next: NextFunction // Call next() to run the next middleware or request handler
) {
    const authHeader = req.get("Authorization");
    // The header should say "Bearer <token string>".  Discard the Bearer part.
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).end();
    } else { // signatureKey already declared as a module-level variable
        jwt.verify(token, signatureKey, (error, decoded) => {
            if (decoded) {
                next();
            } else {
                res.status(403).end();
            }
        });
    }
}

export function registerAuthRoutes(app: express.Application, mongoClient: MongoClient) {

    //handle post requests to /auth/register
    app.post("/auth/register", async (req: Request, res: Response) => {
        const { username, password } = req.body;
        //console.log("Registering user: ", username);
        //console.log("password: ", password);

        //check if username and password are provided
        if (!username || !password) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing username or password. Try again."
            });
            return;
        }

        //create instance of credsprovider
        const credsProvider = new CredentialsProvider(mongoClient);
        //attempt to register the user
        const registrationSuccess = await credsProvider.registerUser(username, password);

        //check if registration was successful
        if (!registrationSuccess) {
            res.status(400).send({
                error: "Bad request",
                message: "Usename already taken. Try again."
            });
            return;
        }
        //send a 201 response if registration was successful
        res.status(201).send();
        return;
    });

    // login route
    app.post("/auth/login", async (req: Request, res: Response) => {
        const { username, password } = req.body;
        
        //if no username or password return 400
        if (!username || !password) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing username or password. Try again."
            });
            return;
        }

        //create instance of credsprovider
        const credsProvider = new CredentialsProvider(mongoClient);
        //verify the password
        const passwordValid = await credsProvider.verifyPassword(username, password);

        //check if password is valid
        if (!passwordValid) {
            res.status(401).send({
                error: "Unauthorized",
                message: "Invalid username or password. Try again."
            });
            return;
        }

        // if password is valid, generate a token
        try {
            const token = await generateAuthToken(username);
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).send({
                error: "Internal server error",
                message: "Failed to generate auth token. Try again."
            });
        }
        
    });
}
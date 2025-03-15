import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";

export function registerAuthRoutes(app: express.Application, mongoClient: MongoClient) {
    //handle post requests to /auth/register
    app.post("/auth/register", async (req: Request, res: Response) => {
        res.send("register request received.")
    })
}
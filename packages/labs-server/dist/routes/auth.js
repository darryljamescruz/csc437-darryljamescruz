"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAuthRoutes = registerAuthRoutes;
const CredentialsProvider_1 = require("../CredentialsProvider");
function registerAuthRoutes(app, mongoClient) {
    //handle post requests to /auth/register
    app.post("/auth/register", async (req, res) => {
        const { username, password } = req.body;
        console.log("Registering user: ", username);
        console.log("password: ", password);
        //check if username and password are provided
        if (!username || !password) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing username or password"
            });
            return;
        }
        //create instance of credsprovider
        const credsProvider = new CredentialsProvider_1.CredentialsProvider(mongoClient);
        //attempt to register the user
        const registrationSuccess = await credsProvider.registerUser(username, password);
        //check if registration was successful
        if (!registrationSuccess) {
            res.status(400).send({
                error: "Bad request",
                message: "Usenamer already exists"
            });
            return;
        }
        //send a 201 response if registration was successful
        res.status(201).send();
        return;
    });
}

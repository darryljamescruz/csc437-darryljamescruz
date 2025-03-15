"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAuthRoutes = registerAuthRoutes;
function registerAuthRoutes(app, mongoClient) {
    //handle post requests to /auth/register
    app.post("/auth/register", async (req, res) => {
        res.send("register request received.");
    });
}

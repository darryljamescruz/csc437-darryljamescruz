import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyAuthToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "No token provided" });
    return;
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    res.locals.token = decoded; // Store the decoded token for later middleware/handlers.
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
    return;
  }
}
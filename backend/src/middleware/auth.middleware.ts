import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
    name: string;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      userId: string;
      role: string;
      name: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return next();
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      userId: string;
      role: string;
      name: string;
    };
    req.user = decoded;
  } catch (error) {
    // Token invalid, continue without user
  }
  next();
};
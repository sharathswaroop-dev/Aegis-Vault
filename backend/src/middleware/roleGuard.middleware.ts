import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

type Role = "farmer" | "warehouse" | "distributor" | "retailer" | "admin";

export const authorize = (...allowedRoles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    if (!allowedRoles.includes(req.user.role as Role)) {
      return res.status(403).json({ error: "Not authorized for this action" });
    }
    
    next();
  };
};

export const isOwnerOrAdmin = (userIdParam: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    const resourceUserId = req.params[userIdParam] || req.body.userId;
    
    if (req.user.role === "admin" || req.user.userId === resourceUserId) {
      next();
    } else {
      return res.status(403).json({ error: "Not authorized" });
    }
  };
};
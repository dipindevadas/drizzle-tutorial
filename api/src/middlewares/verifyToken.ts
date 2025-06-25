import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

declare global {
  namespace Express {
    interface Request {
      userId?: any;
    }
  }
}

interface JwtPayload {
  userId: any;
  role: string;
  iat?: number;
  exp?: number;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
     res.status(401).json({ success: false, message: "Token not found" });
     return;
  }

  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    req.userId = decoded.userId;
    next();
  } catch {
     res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
     res.status(401).json({ success: false, message: "Token not found" });
     return;
  }

  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;

    if (decoded.role !== "admin") {
       res.status(403).json({
        success: false,
        message: "You don’t have access",
      });
      return;
    }

    req.userId = decoded.userId;
    next();
  } catch {
     res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

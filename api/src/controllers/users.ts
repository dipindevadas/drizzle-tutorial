import express, { Request, Response } from "express";
import { db } from "../db";
import { usersTable } from "../db/usersSchema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";


export const register = async (req: Request, res: Response) => {
  try {
    console.log("user data", req.body);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    const [user] = await db.insert(usersTable).values(req.body).returning();

    res.status(201).json({
      message: "User created successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (!email) {
      res.status(404).json({
        message: "Authentication failed",
        success: false,
      });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.status(401).json({
        message: "creadential not matched",
        success: false,
      });
    }

    const token = await jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        token: token,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

import { Message } from "./../../node_modules/@esbuild-kit/core-utils/node_modules/esbuild/lib/main.d";
import express, { Request, Response } from "express";
import { db } from "../db/index";
import { productsTable } from "../db/ProductsSchema";
import { desc } from "drizzle-orm";



export const createProducts = async (req: Request, res: Response) => {
  const { name, price, description } = req.body;
  console.log(name, price, description);
  try {
    const response = await db
      .insert(productsTable)
      .values(req.body)
      .returning();

    console.log("response", response[0]);

    res.status(201).json({
      Message: "Product created successfully",
      success: true,
      data: response[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
   const response = await db.select().from(productsTable).orderBy(desc(productsTable.createdAt));
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

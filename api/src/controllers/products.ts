import { Message } from "./../../node_modules/@esbuild-kit/core-utils/node_modules/esbuild/lib/main.d";
import express, { Request, Response } from "express";
import { db } from "../db/index";
import { productsTable } from "../db/ProductsSchema";
import { desc, eq } from "drizzle-orm";

export const createProducts = async (req: Request, res: Response) => {
  console.log("request body", req.body);
  try {
    const response = await db
      .insert(productsTable)
      .values(req.body)
      .returning();

    console.log("response", response);
    res.status(201).json({
      message: "Product created successfully",
      success: true,
      data: response[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const response = await db
      .select()
      .from(productsTable)
      .orderBy(desc(productsTable.createdAt));
    res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      data: response,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));

    if (!product) {
      res.status(404).json({
        message: "Product not found",
        success: false,
      });
      return;
    } else {
      res.status(200).json({
        message: "Product fetched successfully",
        success: true,
        data: product,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};




export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [product] = await db
      .update(productsTable)
      .set(req.body)
      .where(eq(productsTable.id, Number(id)))
      .returning();

    if (!product) {
      res.status(404).json({
        message: "Product not found",
        success: false,
      });
      return;
    } else {
      res.status(200).json({
        message: "Product updated successfully",
        success: true,
        data: product,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, Number(id)))
      .returning();

    if (!deletedProduct) {
      res.status(204).json({
        message: "Product not found",
        success: false,
      });
      return;
    } else {
      res.status(200).json({
        message: "Product deleted successfully",
        success: true,
        data: deletedProduct,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

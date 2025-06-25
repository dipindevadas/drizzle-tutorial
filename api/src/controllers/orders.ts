import {Response, Request } from "express";
import { db } from "../db";
import { orderItemsTable, ordersTable } from "../db/orders";

export const createOrder = async (req: Request, res: Response) => {
 try {
     const userId = req.userId;

  const { items } = req.body;

  const [newOrder] = await db.insert(ordersTable).values({userId:userId}).returning()

  const orderItmes = items.map((item:any)=>({
    ...item,
    orderId: newOrder.id
  }))

  const newOrderItems = await db.insert(orderItemsTable).values(orderItmes).returning()

  res.status(201).json({
    message: "Order created successfully",
    success: true,
    data: {...newOrder, items: newOrderItems},
  });
    
 } catch (error: any) {
     res.status(500).json({
       message: error.message,
       success: false,
     });
   
 }

};

import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validate =
  (schema: z.ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(", ")} is ${issue.message}`,
        }));

        res.status(400).json({
          success: false,
          error: errorMessages,
        });
      } else {
        res.status(500).json({
          success: false,
          error: error.issues,
        });
      }
    }
  };

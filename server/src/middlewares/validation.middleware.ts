import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";
import { sendError } from "../utils/response";
import { HTTP_STATUS, MESSAGES } from "../constants";

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const formattedErrors: Record<string, string[]> = {};
      result.error.errors.forEach((error) => {
        const field = error.path.join(".");
        if (!formattedErrors[field]) {
          formattedErrors[field] = [];
        }
        formattedErrors[field].push(error.message);
      });

      sendError(
        res,
        MESSAGES.ERROR.VALIDATION_ERROR,
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
        formattedErrors
      );
      return;
    }

    req.body = result.data.body;
    Object.assign(req.params, result.data.params);
    next();
  };
}

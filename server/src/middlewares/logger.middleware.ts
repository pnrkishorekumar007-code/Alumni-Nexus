import morgan from "morgan";
import type { Request, Response } from "express";

const skipHealthChecks = (req: Request, _res: Response): boolean => {
  return req.url === "/health" || req.url === "/api/health";
};

export const httpLogger = morgan(
  ":method :url :status :response-time ms - :res[content-length]",
  {
    skip: skipHealthChecks,
    stream: {
      write: (message: string) => {
        console.log(message.trim());
      },
    },
  }
);

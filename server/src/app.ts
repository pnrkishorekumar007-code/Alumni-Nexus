import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import path from "path";
import { config } from "./config";
import routes from "./routes";
import { globalLimiter, httpLogger, errorHandler, notFoundHandler } from "./middlewares";
import { swaggerSpec } from "./docs/swagger";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: config.frontend.url,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(compression());

app.use(httpLogger);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(globalLimiter);

app.use("/api-docs", (req, res, next) => {
  const swaggerUi = require("swagger-ui-express");
  swaggerUi.setup(swaggerSpec)(req, res, next);
});

app.get("/api-docs.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use(config.apiPrefix, routes);

app.get("/", (_req, res) => {
  res.redirect("/api-docs");
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

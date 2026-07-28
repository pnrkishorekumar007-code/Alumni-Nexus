import app from "./app";
import { config } from "./config";
import prisma from "./config/database";
import { initCloudinary } from "./config/cloudinary";
import { initResend } from "./config/email";

async function startServer(): Promise<void> {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    initCloudinary();
    initResend();

    const PORT = config.port;
    app.listen(PORT, () => {
      console.log(`
  ====================================
  SRM Alumni Nexus API Server
  ====================================
  Environment : ${config.env}
  Port        : ${PORT}
  API Prefix  : ${config.apiPrefix}
  API Docs    : http://localhost:${PORT}/api-docs
  Health      : http://localhost:${PORT}/api/health
  ====================================
      `);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received. Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

startServer();

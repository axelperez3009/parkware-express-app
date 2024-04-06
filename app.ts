import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import cors from "cors";
import authRouter from "./routes/auth.route";
import morgan from "morgan";
export const prisma = new PrismaClient();
const app = express();
const PORT = 5000;
  
async function main() {
    // Middleware
    app.use(morgan("dev"));
    // app.use(
    //   cors({
    //     origin: ["http://localhost:3000"],
    //     credentials: true,
    //   })
    // );
    app.use(express.json());
  
    // Test
    app.get("/api/test", (req: Request, res: Response) => {
      res.status(200).json({
        status: "success",
        message: "Welcome to Parkware Express App with Node.js",
      });
    });
  
    app.use("/api/auth", authRouter);
  
    app.all("*", (req: Request, res: Response) => {
      return res.status(404).json({
        status: "fail",
        message: `Route: ${req.originalUrl} not found`,
      });
    });
  
    app.listen(PORT, () => {
        console.info(`Server started on port: ${PORT}`);
    });
  }
  
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
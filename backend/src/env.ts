import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: parseInt(process.env.PORT || "3333", 10),
  JWT_SECRET: process.env.JWT_SECRET || "dev-secret",
};
import express from "express";
import cors from "cors";
import { env } from "./env";
import { authRoutes } from "./routes/auth.routes";
import { taskRoutes } from "./routes/task.routes";


const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/auth", authRoutes);
app.use("/api", taskRoutes);

app.listen(env.PORT, () => {
  console.log(`API rodando em http://localhost:${env.PORT}`);
});
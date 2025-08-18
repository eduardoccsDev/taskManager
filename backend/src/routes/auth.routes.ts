import { Router } from "express";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../env";

export const authRoutes = Router();

authRoutes.post("/register", async (req, res) => {
  const { name, email, password } = req.body as {
    name: string; email: string; password: string;
  };

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Campos obrigatórios" });
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return res.status(409).json({ error: "E-mail já cadastrado" });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { name, email, password: hash } });

  return res.status(201).json({ id: user.id, name: user.name, email: user.email });
});

authRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Credenciais inválidas" });

  const token = jwt.sign({}, env.JWT_SECRET, { subject: String(user.id), expiresIn: "7d" });
  return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});
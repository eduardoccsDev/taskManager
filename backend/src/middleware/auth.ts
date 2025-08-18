import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";

export function ensureAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Token não informado" });

  const [, token] = auth.split(" "); // Bearer <token>
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub: string };
    req.userId = Number(payload.sub);
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
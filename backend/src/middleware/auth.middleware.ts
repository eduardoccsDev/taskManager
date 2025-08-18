// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../env';

// Extend the Express Request type to include our user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export interface JwtPayload {
  id: number;
  email: string;
  // Add other user properties as needed
}

interface TokenPayload extends JwtPayload {
  sub: string;
  iat: number;
  exp: number;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  console.log('Auth middleware called');
  
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log('No authorization header found');
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('No token found in authorization header');
    return res.status(401).json({ message: 'Token mal formatado' });
  }

  try {
    console.log('Verifying token...');
    const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    console.log('Token decoded successfully:', { 
      sub: decoded.sub,
      iat: decoded.iat,
      exp: decoded.exp 
    });
    
    // Use the 'sub' claim as the user ID
    req.user = { 
      id: parseInt(decoded.sub, 10), // Convert string to number if needed
      email: '' // Email is not in the token, so we'll leave it empty
    };
    
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(401).json({ 
      message: 'Token inválido',
      error: err instanceof Error ? err.message : 'Unknown error'
    });
  }
};
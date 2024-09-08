import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const decoded = verifyToken(token); // นำ token ที่ได้มา Verify กับ JWT
    req.body.user = decoded;  // ส่งข้อมูล token ไปยัง req.body.user
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

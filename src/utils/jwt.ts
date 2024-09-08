import jwt from 'jsonwebtoken';

const JWT_SECRET = String(process.env.JWT_SECRET);

export const generateToken = (userId: number) => {
  // ให้ token คงอยู่ 1 ชั่วโมง
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  // ตรวจสอบ token กับ env
  return jwt.verify(token, JWT_SECRET);
};

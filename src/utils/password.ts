import bcrypt from 'bcryptjs';

// hash password โดยใช้ bcrypt
  // bcrypt จะเจน salt ให้กับ password ที่ถูก hash 
export const hashPassword = async (password: string) => {
  // ใช้ salt สุ่ม string 10 ตัว เพื่อป้องกันการโจมตีแบบ Rainbow Table Attacks และยังทำให้การถูกโจมตีช้าลงได้
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
// ใช้ bcrypt เทียบ password กับ hash
export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

import { Router } from 'express';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { db } from '../db';

const router = Router();

// Register User
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await db.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'อีเมลล์ซ้ำ' });
        }
        // hash รหัสผ่าน ผ่าน bcrypt
        const hashedPassword = await hashPassword(password);
        // สร้าง User
        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
        // เก็บ user_id เข้า token
        const token = generateToken(newUser.user_id);
        res.json({ user: newUser, token });
    } catch (error) {
        res.status(500).json({ message: 'ไม่สามารถสร้าง User ได้', error });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // หา User จาก email
        const user = await db.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'ไม่พบ User' });
        }
        // bcrypt เทียบรหัสผ่าน input กับ database user password
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'รหัสผ่านไม่ถูกต้อง' });
        }

        // เจน token
        const token = generateToken(user.user_id);
        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการล็อคอิน', error });
    }
});

export default router;
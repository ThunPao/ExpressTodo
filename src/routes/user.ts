import { Router } from 'express';
import { db } from '../db';
import { hashPassword } from '../utils/password';
import { userSchema, valreqId } from '../validators';

const router = Router();

// Get
router.get('/', async (req, res) => {
  try {
    const users = await db.user.findMany();
    res.json(users);
    if (!users) {
      return res.status(404).json({ message: "ไม่พบ User" });
    }
  } catch (error) {
    res.status(500).json({ message: "เกิดข้อผิดพลาด", error });

  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const users = await db.user.findFirst({
      where: { user_id: Number(id) }
    })

    // หากไม่พบ User ดังกล่าว
    if (!users) {
      return res.status(404).json({ message: "ไม่พบ User" });
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "เกิดข้อผิดพลาด", error });
  }
});

// สามารถสร้าง User ได้จาก auth/register เพื่อรับ auth token
// Create
router.post('/', async (req, res) => {
  // ตรวจสอบข้อมูลที่รับมาด้วย zod
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    const errorMessages = result.error.errors.map((err) => err.message);
    return res.status(400).json({
      message: 'เกิดข้อผิดพลาด',
      errors: errorMessages,
    });
  }

  const { username, email, password } = result.data;

  try {
    const hashedPassword = await hashPassword(password);

    const newUser = await db.user.create({
      data: { username, email, password: hashedPassword },
    });

    return res.status(201).json(newUser); // ใช้ status code 201 สำหรับการสร้าง resource ใหม่
  } catch (error) {
    // console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Email ซ้ำ' });
  }
});

// Update ข้อมูลจาก user_id
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  // ตรวจสอบ req body ให้ตรงตาม pattern ของ validation
  const result = userSchema.safeParse(req.body);
  if (!result.success) {
    const errorMessages = result.error.errors.map((err) => err.message);
    return res.status(400).json({
      message: 'เกิดข้อผิดพลาด',
      errors: errorMessages,
    });
  }

  // ใช้ result.data ที่ผ่านการ validation
  const { username, email, password } = result.data;
  const hashedPassword = await hashPassword(password);


  const updatedUser = await db.user.update({
    where: { user_id: Number(id) },
    data: { username, email, password: hashedPassword },
  }).catch(() => {
    res.status(404).json({ message: 'ไม่พบ User' })
  })

  return res.json(updatedUser);

});


// Delete User จาก task_id
router.delete('/:id', async (req, res) => {
  const curId = valreqId.safeParse(req.params);
  if (!curId.success) {
    return res.status(400).json({
      message: 'เกิดข้อผิดพลาด',
      errors: curId.error.errors.map((err) => err.message),
    });
  }
  try {
    const findData = await db.user.findFirst({
      where: { user_id: Number(curId.data.id) }
    })
    if (!findData) {
      return res.status(404).json({ message: "ไม่พบข้อมูล" });
    }
    await db.user.delete({ where: { user_id: Number(curId.data.id) } })
  } catch (error) {
    // console.error('Error:', error);
    return res.status(500).json({ message: 'ไม่สามารถลบ User ดังกล่าวได้' });
  }

  res.json({ message: 'User ' + Number(curId.data.id) + ' ถูกลบ' });
});

export default router;

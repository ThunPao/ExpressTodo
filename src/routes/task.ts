import { Router } from 'express';
import { db } from '../db';
import { taskSchema, valreqId } from '../validators';

const router = Router();

// Get
router.get('/', async (req, res) => {
  const tasks = await db.task.findMany();
  res.json(tasks);
});

router.get('/:id', async (req, res) => {
  const curId = valreqId.safeParse(req.params);
  if (!curId.success) {
    return res.status(400).json({
      message: 'เกิดข้อผิดพลาด',
      errors: curId.error.errors.map((err) => err.message),
    });
  }
  try {
    const tasks = await db.task.findFirst({
      where: { task_id: Number(curId.data.id) }
    });

    // หากไม่พบ Task ดังกล่าว
    if (!tasks) {
      return res.status(404).json({ message: "ไม่พบ Task" });
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "เกิดข้อผิดพลาด", error });
  }
});


// Create
router.post('/', async (req, res) => {
  // ตรวจสอบข้อมูลที่รับมาด้วย zod
  const result = taskSchema.safeParse(req.body);

  if (!result.success) {
    // ดึงข้อความแสดงข้อผิดพลาดทั้งหมด
    const errorMessages = result.error.errors.map((err) => err.message);
    return res.status(400).json({
      message: 'เกิดข้อผิดพลาด',
      errors: errorMessages,
    });
  }

  const { title, description, status, priority, due_date } = result.data;

  try {
    // สร้าง task ใหม่ในฐานข้อมูล
    const newTask = await db.task.create({
      select: {
        title: true, description: true, status: true, priority: true, due_date: true
      },
      data: { title, description, status, priority, due_date },
    });
    return res.status(201).json(newTask); // ใช้ status code 201 สำหรับการสร้าง resource ใหม่
  } catch (error) {
    // console.error('Error:', error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้าง task' });
  }
});

// Update ข้อมูลจาก task_id
router.put('/:id', async (req, res) => {
  const curId = valreqId.safeParse(req.params);
  if (!curId.success) {
    return res.status(400).json({
      message: 'เกิดข้อผิดพลาด',
      errors: curId.error.errors.map((err) => err.message),
    });
  }

  const result = taskSchema.safeParse(req.body);


  // ตรวจสอบ req body ให้ตรงตาม pattern ของ validation
  if (!result.success) {
    const errMsg = result.error.errors.map((err) => err.message);
    return res.status(400).json({
      message: 'เกิดข้อผิดพลาด',
      errors: errMsg,
    });
  }

  const { title, description, status, priority, due_date } = result.data;

  const updatedTask = await db.task.update({
    where: { task_id: Number(curId.data.id) },
    data: { title, description, status, priority, due_date },
  }).catch(() => {
    res.status(404).json({ message: "ไม่พบ Task" })
  })
  res.json(updatedTask);
});

// Delete Task จาก task_id
router.delete('/:id', async (req, res) => {
  const curId = valreqId.safeParse(req.params);
  if (!curId.success) {
    return res.status(400).json({
      message: 'เกิดข้อผิดพลาด',
      errors: curId.error.errors.map((err) => err.message),
    });
  }
  try {
    const findData = await db.task.findFirst({
      where: { task_id: Number(curId.data.id) }
    })
    if (!findData) {
      return res.status(404).json({ message: "ไม่พบข้อมูล" });
    }

    await db.task.delete({ where: { task_id: Number(curId.data.id) } })
  } catch (error) {
    // console.error('Error:', error);
    return res.status(500).json({ message: 'ไม่สามารถลบ Task ดังกล่าวได้' });
  }

  res.json({ message: 'Task ถูกลบ' });
});

export default router;

import { Router } from 'express';

import { addUserToTaskSchema, valreqId } from '../validators';
import { db } from '../db';
const router = Router();

router.post('/updatetaskuser/:id', async (req, res) => {

    const curId = valreqId.safeParse(req.params);
    if (!curId.success) {
      return res.status(400).json({
        message: 'เกิดข้อผิดพลาด',
        errors: curId.error.errors.map((err) => err.message),
      });
    }

  const result = addUserToTaskSchema.safeParse(req.body);

  if (!result.success) {
    const errorMessages = result.error.errors.map(err => err.message);
    return res.status(400).json({
      message: 'เกิดข้อผิดพลาด',
      errors: errorMessages,
    });
  }

  const { user_ids } = result.data;

  try {
    // เพิ่ม User เข้า task
    const updatedTask = await db.task.update({
      where: { task_id: Number(curId.data.id) },
      data: {
        users: {
          connect: user_ids.map(user_id => ({ user_id })),
        },
      },
      select: {
        // task_id: true,
        // title: true,
        // description: true,
        // status: true,
        // priority: true,
        // due_date: true,
        users: true,
      },
    });
    if(!updatedTask){
        return res.status(404).json({message: "ไม่พบข้อมูล"})
    }
    
    return res.status(201).json(updatedTask);
  } catch (error) {
    // console.error('Error:', error);
    return res.status(500).json({ message: 'ไม่สามารถเพิ่ม User ไปยัง Task ได้' });

  }
});

export default router;

import { Router } from 'express';

import { addUserToTaskSchema, valreqId } from '../validators';
import { db } from '../db';
const router = Router();

router.put('/updatetaskuser/:id', async (req, res) => {

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
    
    return res.json(updatedTask);
  } catch (error) {
    // console.error('Error:', error);
    return res.status(500).json({ message: 'ไม่สามารถเพิ่ม User ไปยัง Task ได้' });

  }
});
// Get Task ที่มี User ของ task นั้นๆ
router.get('/taskusercomment', async (req, res) => {
  const tasks = await db.task.findMany(
    {
      include: {
        users: {
          select: {
            user_id: true,
            username: true,
            email: true
          }
        },
        comments: {
          select: {
            comment_id: true,
            user: {
              select: { user_id: true, email: true, username: true }
            },
            comment: true
          }
        }
      }
    }
  );
  res.json(tasks);
});


export default router;

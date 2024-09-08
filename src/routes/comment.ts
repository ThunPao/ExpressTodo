import { Router } from 'express';
import { db } from '../db';
import { commentSchema, valreqId } from '../validators';

const router = Router();

// Get
router.get('/', async (req, res) => {
  const comments = await db.comment.findMany();
  res.json(comments);
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
    const comments = await db.comment.findMany();
    if (!comments) {
      return res.status(404).json({ message: "ไม่พบ Comment" });
    }
    res.json(comments);
  } catch (error) {
    return res.status(500).json({ message: "เกิดข้อผิดพลาด", error });
  }

});

// Create
router.post('/', async (req, res) => {

  const result = commentSchema.safeParse(req.body);

  if (!result.success) {
    // ดึงข้อความแสดงข้อผิดพลาดทั้งหมด
    const errorMessages = result.error.errors.map((err) => err.message);
    return res.status(400).json({
      message: 'เกิดข้อผิดพลาด',
      errors: errorMessages,
    });
  }
  const { task_id, user_id, comment } = result.data;
  try {
    const newComment = await db.comment.create({
      data: { task_id: Number(task_id), user_id: Number(user_id), comment },
    });
    res.status(201).json(newComment);
  } catch (error) {
    // console.error('Error:', error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้าง Comment' });
  }

});

// Update ข้อมูลจาก comment_id
router.put('/:id', async (req, res) => {
  const curId = valreqId.safeParse(req.params);
  if (!curId.success) {
    return res.status(400).json({
      message: 'เกิดข้อผิดพลาด',
      errors: curId.error.errors.map((err) => err.message),
    });
  }

  const { comment } = req.body;
  try {
    const updatedComment = await db.comment.update({
      where: { comment_id: Number(curId.data.id) },
      data: { comment },
    });
    if (!updatedComment) {
      return res.status(404).json({ message: "ไม่พบ Comment" });
    }

    res.json(updatedComment);

  } catch (error) {

  }

});

// Delete Comment จาก comment id
router.delete('/:id', async (req, res) => {
  const curId = valreqId.safeParse(req.params);
  if (!curId.success) {
    return res.status(400).json({
      message: 'เกิดข้อผิดพลาด',
      errors: curId.error.errors.map((err) => err.message),
    });
  }

  try {
    const findData = await db.comment.findFirst({
      where: { comment_id: Number(curId.data.id) }
    })
    if (!findData) {
      return res.status(404).json({ message: "ไม่พบข้อมูล" });
    }
    await db.comment.delete({ where: { comment_id: Number(curId.data.id) } });

  } catch (error) {
    // console.error('Error:', error);
    return res.status(500).json({ message: 'ไม่สามารถลบ Comment ดังกล่าวได้' });
  }


  res.json({ message: 'Comment ' + Number(curId) + ' ถูกลบ' });
});

export default router;

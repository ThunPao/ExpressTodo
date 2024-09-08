import { z } from "zod";
import { TaskStatus,TaskPriority } from '@prisma/client'; // ใช้ enum จาก Schema

export const valreqId = z.object({
    id: z.string().regex(/^\d+$/, { message: "ID ต้องเป็นตัวเลข" })
  });

export const userSchema = z.object({
    username: z.string().min(1, { message: "กรุณากรอกชื่อผู้ใช้งาน" }).max(50),
    email: z.string().email({ message: "รูปแบบของอีเมลล์ไม่ถูกต้อง" }).max(100),
    password: z.string().min(6, { message: "ต้องมีรหัสผ่านอย่างน้อย 6 ตัวอักษร" }).max(255),
});

export const taskSchema = z.object({
    title: z.string().min(1, { message: "ต้องระบุชื่อเรื่อง" }).max(255, { message: "ชื่อเรื่องต้องไม่เกิน 255 ตัวอักษร" }),
    description: z.string().min(1, { message: "ต้องระบุรายละเอียด" }),
    status: z.enum([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED]).default(TaskStatus.PENDING),
    priority: z.enum([TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH]).default(TaskPriority.MEDIUM),
    due_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "วันที่ครบกำหนดต้องอยู่ในรูปแบบ yyyy-MM-dd" })
      .transform((val) => new Date(val)), // แปลง string เป็น Date
      user_ids: z.array(z.number()).optional(),
  });


  export const commentSchema = z.object({
    task_id: z.string().regex(/^\d+$/, { message: "Task ID ต้องเป็นตัวเลข" }),
    user_id: z.string().regex(/^\d+$/, { message: "User ID ต้องเป็นตัวเลข" }),
    comment: z.string().min(1, { message: "กรอก Comment" }).max(1024, { message: "Comment ต้องไม่เกิน 1024 ตัวอักษร" }),
  });


  export const addUserToTaskSchema = z.object({
    user_ids: z.array(z.number().int().positive()),
  });
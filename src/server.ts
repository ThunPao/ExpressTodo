import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// นำเข้า Routes User Task Comment และ Authentication
import userRouter from './routes/user';
import taskRouter from './routes/task';
import authRouter from './routes/auth';
import taskUserRouter from './routes/taskuser';
import commentRouter from './routes/comment';
import { authenticateJWT } from './middleware/authen';
import { db } from './db';

const app = express();

// ใช้ express.json() เพื่ออ่าน JSON body จาก client
// เช่น body /login
// {
//   "email": "test@user.com",
//   "password": "123123123"
// }
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express Task Todo Service');
});

app.get('/protected', authenticateJWT, (req, res) => {
  // เรียกใช้ข้อมูล token จาก req.body.user ที่เก็บโดย การ verifyToken จาก authenticateJWT
  const user = req.body.user;
  res.json({
    message: 'You are authorized!',
    userInfo: user //จะได้ user id ที่ถูกเก็บตอน login โดยฟังก์ชั่น generateToken

  },
  );
});

// เรียกใช้ routes CRUD ตามเส้นที่ระบุ
app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('/comments', commentRouter);
// เรียกใช้ router โดยเส้นที่ระบุ อยู่ใน authRouter แล้ว เช่น /login /register
app.use(authRouter);
app.use(taskUserRouter);

// Get Task ที่มี User ของ task นั้นๆ
app.get('/taskusercomment', async (req, res) => {
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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

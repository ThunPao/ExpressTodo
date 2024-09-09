# Todo Management
โปรเจค Todo Management จัดการรายการสิ่งที่ต้องทำ
## Features
- สามารถจัดการระบบในรูปแบบ CRUD ได้ทั้ง User Task และ Comment
- สามารถ Comment ไปยัง Task ที่ระบุได้หลาย Comment (One to Many)
- สามารถเพิ่ม User ไปยัง Task ได้หลาย User (One to Many)
- มีระบบ Authentication ด้วย JWT และ Bcrypt ในการป้องกันการเข้าถึง Route

## Documentation
  
### Requirements
- requires Node.js 0.10 or higher.


### Installation

#### 1. Setup .ENV Variables
- DATABASE_URL (Mysql Database Connection string)
- JWT_SECRET (Secret Password of a JWT)
- PORT (Server Port Default is 3000)

#### 2.Npm or Bun (Optional)
- npm install
- bun i
#### 3.NPX
- npm install -g npx
#### 4.Prisma
- npx prisma generate
- npx prisma db push
###

ตัวอย่างการส่ง Request Method
## Route Users
### Create User
POST: http://localhost:3000/users
- Auth Bearer token is Required
Body:

```javascript
{
    "username": "Kittithat Sensuk",
    "email": "kpzA1360@gmail.com",
    "password": "123123123"
}
```

### Get Users
GET: http://localhost:3000/users
- Auth Bearer token is Required

GET: http://localhost:3000/users:user_id
- Auth Bearer token is Required

### Update User
PUT: http://localhost:3000/users/:user_id
- Auth Bearer token is Required

Body

```javascript
{
    "username": "Updated Usr",
    "email": "updated@email.com",
    "password": "521123"
}
```
### Delete User
DELETE: http://localhost:3000/users/:user_id
- Auth Bearer token is Required

## Route Tasks
### Create Task
POST: http://localhost:3000/tasks
- Auth Bearer token is Required

Body:

```javascript
{
    "title": "NEW TASK",
    "description": "Task description",
    "status": "IN_PROGRESS",
    "priority": "HIGH",
    "due_date": "2024-09-09",
    "user_id": 1
}
```

### Get Task
GET: http://localhost:3000/tasks
- Auth Bearer token is Required

GET: http://localhost:3000/tasks/:task_id
- Auth Bearer token is Required

### Update Task
PUT: http://localhost:3000/tasks/:task_id
- Auth Bearer token is Required

Body:

```javascript

{
    "title": "TASK UPDATED",
    "description": "Task description UPDATED",
    "status": "COMPLETED",
    "priority": "HIGH",
    "due_date": "2024-09-09"
}
```

### DELETE TASK
DELETE: http://localhost:3000/tasks/:task_id
- Auth Bearer token is Required

## Route Comments
### Create Comment
POST: http://localhost:3000/comments
- Auth Bearer token is Required

Body:

```javascript

{
    "task_id": "1",
    "user_id": "1",
    "comment": "New Comment"
}
```

### Get Comments
GET: http://localhost:3000/comments
- Auth Bearer token is Required


GET: http://localhost:3000/comments/:comment_id
- Auth Bearer token is Required


### Update Comment
PUT: http://localhost:3000/comments/:comment_id
- Auth Bearer token is Required

Body:

```javascript

{
    "comment": "Comment Updated"
}
```

### Delete Comment
DELETE: http://localhost:3000/comments/:comment_id
- Auth Bearer token is Required


## Example: Get Task with User and Comments
GET: http://localhost:3000/taskusercomment
- Auth Bearer token is Required

##

## Example Authentication

### Login
POST: http://localhost:3000/login

Body:
```javascript
{
    "email": "kpzA1360@gmail.com",
    "password": "123123123"
}
```
- after login success you'll get user data and  token
Result:

```javascript
{
    "user": {
        "user_id": 1,
        "username": "Kittithat Sensuk",
        "email": "kpzA1360@gmail.com",
        "password": "$2a$10$ykNMcrh.OczYbaP0iRWdUusnCylZOXEsceoc65AFoA.GWO62TNiQC",
        "created_at": "2024-09-09T11:56:37.000Z",
        "updated_at": "2024-09-09T11:56:37.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNTg4MzE0NywiZXhwIjoxNzI1ODg2NzQ3fQ.r_8damyZFKwXNbSlKdQlH6DMa_oC6gK2cl1GyZMz0yU"
}
```

###
### Register
POST: http://localhost:3000/register

Body:
```javascript
{
    "username": "Kittithat Sensuk",
    "email": "kpzA1360@gmail.com",
    "password": "123123123"
}
```
- after register success you'll get user data and  token
Result:
```javascript
{
    "user": {
        "user_id": 1,
        "username": "Kittithat Sensuk",
        "email": "kpzA1360@gmail.com",
        "password": "$2a$10$ykNMcrh.OczYbaP0iRWdUusnCylZOXEsceoc65AFoA.GWO62TNiQC",
        "created_at": "2024-09-09T11:56:37.000Z",
        "updated_at": "2024-09-09T11:56:37.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNTg4Mjk5NywiZXhwIjoxNzI1ODg2NTk3fQ.HfkgzYPVbPrSCo3KEIoPiV6wyNfhwJyXAClvSjA64Ts"
}
```
###

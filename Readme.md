## Documentation
### Requirements
- requires Node.js 0.10 or higher.


### Installation

#### 1. Setup .ENV Variables
- DATABASE_URL (Mysql Database Connection string)
- JWT_SECRET (Secret Password of a JWT)
- PORT (Server Port Default is 3000)

#### 2.Npm
- npm install
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

GET: http://localhost:3000/users:id

### Update User
PUT: http://localhost:3000/users/:id
Body

```javascript
{
    "username": "Updated Usr",
    "email": "usrupdate@email.com",
    "password": "521123"
}
```
### Delete User
DELETE: http://localhost:3000/users/:id
## Route Tasks
### Create Task
POST: http://localhost:3000/tasks
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

GET: http://localhost:3000/tasks/:id

### Update Task
PUT: http://localhost:3000/tasks/:id
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
DELETE: http://localhost:3000/tasks/:id
## Route Comments
### Create Comment
POST: http://localhost:3000/comments
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

GET: http://localhost:3000/comments/:id

### Update Comment
PUT: http://localhost:3000/comments/:id
Body:

```javascript

{
    "comment": "Comment Updated"
}
```

### Delete Comment
DELETE: http://localhost:3000/comments/:id

## Example: Get Task with User and Comments
GET: http://localhost:3000/taskusercomment
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
###

## Documentation
Hello world
## Route Users
### Create User
POST: http://localhost:3000/users
Body:
{
    "username": "Kittithat Sensuk",
    "email": "kpzA1360@gmail.com",
    "password": "123123123"
}
###Get Users
GET: http://localhost:3000/users
GET: http://localhost:3000/users:id
###Update User
PUT: http://localhost:3000/users/:id
Body
{
    "username": "Updated Usr",
    "email": "usrupdate@email.com",
    "password": "521123"
}
###Delete User
DELETE: http://localhost:3000/users/:id
##Route Tasks
###Create Task
POST: http://localhost:3000/tasks
Body:
{
    "title": "NEW TASK",
    "description": "Task description",
    "status": "IN_PROGRESS",
    "priority": "HIGH",
    "due_date": "2024-09-09",
    "user_id": 1
}
###Get Task
GET: http://localhost:3000/tasks
GET: http://localhost:3000/tasks/:id
###Update Task
PUT: http://localhost:3000/tasks/:id
Body:
{
    "title": "TASK UPDATED",
    "description": "Task description UPDATED",
    "status": "COMPLETED",
    "priority": "HIGH",
    "due_date": "2024-09-09"
}
###DELETE TASK
DELETE: http://localhost:3000/tasks/:id
##Route Comments
###Create Comment
POST: http://localhost:3000/comments
Body:
{
    "task_id": "1",
    "user_id": "1",
    "comment": "New Comment"
}
###Get Comments
GET: http://localhost:3000/comments
GET: http://localhost:3000/comments/:id

###Update Comment
PUT: http://localhost:3000/comments/:id
Body:
{
    "comment": "Comment Updated"
}
###Delete Comment
DELETE: http://localhost:3000/comments/:id

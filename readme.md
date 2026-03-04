# Mini Task Manager

A simple yet powerful RESTful API built with Node.js and Express for managing tasks efficiently. This project allows you to create, read, update, and delete tasks with advanced filtering, searching, and pagination capabilities.

## Features

- ✅ **CRUD Operations** - Create, Read, Update, and Delete tasks
- 🔍 **Advanced Filtering** - Filter tasks by status, priority, and due date
- 🔎 **Search Functionality** - Search tasks by title
- 📊 **Sorting** - Sort tasks by priority, due date, or creation date
- 📄 **Pagination** - Retrieve tasks with page-based pagination
- 🎯 **Priority Levels** - Support for high, medium, and low priority levels
- 📋 **Task Status** - Tasks can be pending, in-process, or complete
- 📝 **Request Logging** - Middleware to log all HTTP requests
- ⚠️ **Error Handling** - Comprehensive error handling and validation
- 💾 **JSON Storage** - Tasks stored in a JSON file for simplicity

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Data Storage**: JSON (task.json)
- **ID Generation**: UUID v4
- **Logging**: Custom logger middleware
- **Environment**: dotenv for configuration

## Project Structure

```
Mini-Task-Manager/
├── app.js              # Express app configuration
├── server.js           # Server entry point
├── package.json        # Project dependencies
├── .env                # Environment variables
├── controllers/
│   └── taskController.js   # Task business logic
├── routes/
│   └── taskRoute.js        # API routes
├── middlewares/
│   └── logger.js           # Request logging middleware
└── data/
    └── task.json           # Tasks data storage
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Mini-Task-Manager.git
   cd Mini-Task-Manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file**
   ```
   Port=3000
   ```

4. **Start the server**
   ```bash
   npm start
   ```

The server will run on the port specified in your `.env` file (default: 3000).

## API Endpoints

### Create a Task
**POST** `/api/tasks`

Request body:
```json
{
  "title": "Complete project",
  "description": "Finish the task manager API",
  "status": "pending",
  "priority": "high",
  "due_date": "2026-03-15"
}
```

Response:
```json
{
  "success": true,
  "message": "Task Created!"
}
```

### Get All Tasks
**GET** `/api/tasks`

Query Parameters:
- `status` - Filter by status (pending, in-process, complete)
- `priority` - Filter by priority (high, medium, low)
- `due_date` - Filter by due date
- `search` - Search by title
- `sortBy` - Sort by field (priority, due_date, created_at)
- `sortOrder` - Sort order (asc or dsc)
- `page` - Page number for pagination
- `limit` - Number of tasks per page

Example:
```
GET /api/tasks?status=pending&priority=high&sortBy=due_date&page=1&limit=10
```

Response:
```json
{
  "success": true,
  "total": 2,
  "data": [
    {
      "id": "uuid-string",
      "title": "Complete project",
      "description": "Finish the task manager API",
      "status": "pending",
      "priority": "high",
      "due_date": "2026-03-15",
      "created_at": "2026-03-04T10:30:00.000Z"
    }
  ],
  "message": "Tasks Retrieved!",
  "page": "1",
  "limit": "10"
}
```

### Get Task by ID
**GET** `/api/tasks/:id`

Response:
```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "title": "Complete project",
    "description": "Finish the task manager API",
    "status": "pending",
    "priority": "high",
    "due_date": "2026-03-15",
    "created_at": "2026-03-04T10:30:00.000Z"
  },
  "message": "Task Retrieved!"
}
```

### Update a Task
**PUT** `/api/tasks/:id`

Request body (all fields optional):
```json
{
  "description": "Updated description",
  "status": "in-process",
  "priority": "medium"
}
```

Response:
```json
{
  "success": true,
  "message": "Task Updated!"
}
```

### Delete a Task
**DELETE** `/api/tasks/:id`

Response:
```json
{
  "success": true,
  "message": "Task Deleted!"
}
```

## Validation Rules

### Priority
- Must be one of: `high`, `medium`, `low`
- Case-insensitive

### Status
- Must be one of: `pending`, `in-process`, `complete`
- Case-insensitive

### Required Fields
When creating a task, all of the following fields are required:
- `title`
- `description`
- `status`
- `priority`
- `due_date`

## Error Handling

The API includes comprehensive error handling:
- **Missing Required Fields**: Returns 200 status with error message
- **Invalid Priority/Status**: Returns 200 status with validation error
- **Task Not Found**: Returns 200 status with not found message
- **Server Errors**: Returns 500 status with internal server error message
- **Invalid Routes**: Returns 404 status with invalid URL message

## Logging

All HTTP requests are logged via the custom logger middleware. Logs include:
- Request method and path
- Warnings for invalid routes
- Errors during task operations
- Info messages for successful operations

## Example Usage

### Create a Task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Node.js",
    "description": "Master Node.js and Express",
    "status": "in-process",
    "priority": "high",
    "due_date": "2026-03-20"
  }'
```

### Get Tasks with Filters
```bash
curl "http://localhost:3000/api/tasks?status=in-process&priority=high&sortBy=due_date&page=1&limit=5"
```

### Update a Task
```bash
curl -X PUT http://localhost:3000/api/tasks/{task_id} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "complete",
    "priority": "low"
  }'
```

### Delete a Task
```bash
curl -X DELETE http://localhost:3000/api/tasks/{task_id}
```

## Dependencies

- **express** - Web framework for Node.js
- **uuid** - Generate unique identifiers
- **dotenv** - Load environment variables from .env file

## Future Enhancements

- Add database integration (MongoDB, PostgreSQL)
- Implement user authentication and authorization
- Add task categories or tags
- Implement task reminders and notifications
- Add task comments and activity history
- Deploy to cloud platforms

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve this project.

## Author

Created as a mini task for Node.js and Express internship training.

## Support

For issues or questions, please open an issue on the GitHub repository.

---

**Happy Task Managing!** 🎯

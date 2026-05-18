# 📋 Family Task Planner

A collaborative family task management application with QR code scanning capabilities. Organize tasks, set priorities, track progress, and complete tasks using QR codes.

## Features

✨ **Core Features**
- Create, read, update, and delete tasks
- Set task priority (Low, Medium, High)
- Add due dates to tasks
- Mark tasks as complete
- Filter tasks by status (All, Pending, Completed)
- Task statistics dashboard

🎯 **QR Code Integration**
- Generate unique QR codes for each task
- Scan QR codes to mark tasks as complete
- Easy mobile task completion

👨‍👩‍👧‍👦 **Family Focused**
- Organized task lists for families
- Clear task descriptions and priorities
- Visual status indicators

## Project Structure

```
family-task-planner/
├── backend/
│   ├── src/
│   │   ├── index.ts           # Express server setup
│   │   ├── database.ts        # SQLite database initialization
│   │   └── routes/
│   │       ├── tasks.ts       # Task API endpoints
│   │       └── qr.ts          # QR code endpoints
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── index.tsx          # React entry point
│   │   ├── App.tsx            # Main App component
│   │   ├── App.css            # App styles
│   │   └── components/
│   │       ├── TaskForm.tsx   # Task creation form
│   │       ├── TaskList.tsx   # Task list with filtering
│   │       └── TaskCard.tsx   # Individual task card
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
PORT=5000
NODE_ENV=development
DATABASE_URL=./tasks.db
```

4. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will open on `http://localhost:3000`

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `POST /api/tasks/:id/complete` - Mark task as complete

### QR Codes
- `GET /api/qr/generate/:taskId` - Generate QR code for task
- `GET /api/qr/scan/:taskId` - Scan QR code and get task info

## Database Schema

### Tasks Table
- `id` - UUID primary key
- `title` - Task title
- `description` - Task description
- `status` - Task status (pending/completed)
- `priority` - Priority level (low/medium/high)
- `dueDate` - Due date for task
- `qrCode` - Unique QR code identifier
- `familyId` - Family identifier
- `createdAt` - Creation timestamp
- `completedAt` - Completion timestamp
- `updatedAt` - Last update timestamp

### Families Table
- `id` - UUID primary key
- `name` - Family name
- `createdAt` - Creation timestamp

### Family Members Table
- `id` - UUID primary key
- `familyId` - Foreign key to families
- `name` - Member name
- `email` - Member email
- `role` - Member role (admin/member)
- `joinedAt` - Join timestamp

## Tech Stack

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **SQLite3** - Database
- **QRCode** - QR code generation
- **CORS** - Cross-origin support

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Axios** - HTTP client
- **qrcode.react** - QR code display
- **CSS3** - Styling

## Development

### Build Backend
```bash
cd backend
npm run build
```

### Build Frontend
```bash
cd frontend
npm run build
```

## Future Enhancements

- [ ] User authentication & authorization
- [ ] Multi-family support
- [ ] Real-time notifications
- [ ] Task reminders
- [ ] Mobile app (React Native)
- [ ] Recurring tasks
- [ ] Task comments & collaboration
- [ ] Task history/audit log
- [ ] Advanced filtering & search
- [ ] Task templates

## Contributing

Feel free to open issues and submit pull requests to help improve the Family Task Planner!

## License

MIT License - See LICENSE file for details

## Support

For questions or issues, please open an issue on GitHub or contact the development team.

---

Happy task planning! 🎉

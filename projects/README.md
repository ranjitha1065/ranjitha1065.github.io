# Full-Stack Mini Projects — Setup Guide

Three complete MERN stack apps ready to run locally.

---

## Prerequisites

Install these before starting:

| Tool | Download |
|------|----------|
| Node.js (v18+) | https://nodejs.org |
| MongoDB Community | https://www.mongodb.com/try/download/community |
| npm (comes with Node) | — |

Verify installation:
```bash
node -v        # should print v18.x or higher
npm -v         # should print 9.x or higher
mongod --version  # should print v6.x or higher
```

---

## Start MongoDB (required for all apps)

**Mac / Linux:**
```bash
mongod
```

**Windows:**
```bash
"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
```

Keep this terminal open while running any of the apps.

---

---

## App 1 — Task Manager

Ports: Backend `5000` · Frontend `3000`

### Step 1 — Backend

```bash
cd task-manager/backend
npm install
npm run dev
```

You should see:
```
MongoDB connected
Server running on port 5000
```

### Step 2 — Frontend

Open a **new terminal**:

```bash
cd task-manager/frontend
npm install
npm start
```

Browser opens at **http://localhost:3000**

### API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create task `{ text, priority }` |
| PATCH | /api/tasks/:id | Update task `{ text?, done?, priority? }` |
| DELETE | /api/tasks/:id | Delete task |

---

---

## App 2 — Student Notes Sharing

Ports: Backend `5001` · Frontend `3000`

### Step 1 — Backend

```bash
cd notes-sharing/backend
npm install
npm run dev
```

You should see:
```
MongoDB connected
Server running on port 5001
```

### Step 2 — Frontend

Open a **new terminal**:

```bash
cd notes-sharing/frontend
npm install
npm start
```

Browser opens at **http://localhost:3000**

### How to upload a PDF

1. Click **"+ Upload Notes"** in the app
2. Fill in the title, select a subject, enter your name
3. Click the file area to select a PDF
4. Click **Submit note**

The file saves to `notes-sharing/backend/uploads/` on your machine.

### API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/notes | Get all notes (supports `?q=search&subject=Physics`) |
| POST | /api/notes/upload | Upload note (multipart/form-data with `pdf` field) |
| GET | /api/notes/download/:id | Download PDF (increments counter) |
| DELETE | /api/notes/:id | Delete note + file |

### Cloud Storage (Production)

For production, replace local `multer.diskStorage` with `multer-s3`:

```bash
npm install multer-s3 @aws-sdk/client-s3
```

```js
// In routes/notes.js, replace storage config with:
const s3     = new S3Client({ region: 'ap-south-1' });
const storage = multerS3({
  s3,
  bucket: process.env.S3_BUCKET,
  key: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
```

---

---

## App 3 — Habit Tracker

Ports: Backend `5002` · Frontend `3000`

### Step 1 — Backend

```bash
cd habit-tracker/backend
npm install
npm run dev
```

You should see:
```
MongoDB connected
Server running on port 5002
```

### Step 2 — Frontend

Open a **new terminal**:

```bash
cd habit-tracker/frontend
npm install
npm start
```

Browser opens at **http://localhost:3000**

### Streak Logic

Streaks are calculated by `backend/utils/streak.js`. The rule is:

- A streak = consecutive days (ending today or yesterday) where the habit was marked done
- If you miss a day, the streak resets to 0
- The best-ever streak (`bestStreak`) is stored permanently in MongoDB

### API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/habits | Get all habits |
| POST | /api/habits | Create habit `{ name, icon }` |
| PATCH | /api/habits/:id/log | Toggle today's completion (auto-updates streak) |
| DELETE | /api/habits/:id | Delete habit |

---

---

## Folder Structure

```
projects/
├── task-manager/
│   ├── backend/
│   │   ├── models/Task.js
│   │   ├── routes/tasks.js
│   │   ├── server.js
│   │   ├── .env
│   │   └── package.json
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   │   ├── TaskForm.js
│       │   │   └── TaskList.js
│       │   ├── App.js
│       │   └── App.css
│       └── package.json
│
├── notes-sharing/
│   ├── backend/
│   │   ├── models/Note.js
│   │   ├── routes/notes.js
│   │   ├── uploads/        ← PDFs saved here
│   │   ├── server.js
│   │   ├── .env
│   │   └── package.json
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   │   ├── UploadForm.js
│       │   │   └── NoteCard.js
│       │   ├── App.js
│       │   └── App.css
│       └── package.json
│
└── habit-tracker/
    ├── backend/
    │   ├── models/Habit.js
    │   ├── routes/habits.js
    │   ├── utils/streak.js
    │   ├── server.js
    │   ├── .env
    │   └── package.json
    └── frontend/
        ├── src/
        │   ├── components/
        │   │   ├── HabitForm.js
        │   │   ├── HabitCard.js
        │   │   └── WeekChart.js
        │   ├── App.js
        │   └── App.css
        └── package.json
```

---

## Common Issues & Fixes

**"Cannot connect to MongoDB"**
→ Make sure `mongod` is running in a separate terminal.

**"Port already in use"**
→ Change `PORT=5001` in the backend `.env` file and update the `proxy` field in the frontend `package.json`.

**"Module not found"**
→ Run `npm install` inside both `backend/` and `frontend/` folders separately.

**CORS error in browser**
→ The backend already has `cors()` enabled. Make sure the frontend `proxy` in `package.json` matches your backend port.

---

## Next Steps (Placement-Level Upgrades)

- Add JWT login/signup to protect routes
- Add due dates and priority filters (Task Manager)
- Add star/favourite for popular notes (Notes App)
- Add monthly calendar heatmap (Habit Tracker)
- Deploy backend to Railway or Render (free)
- Deploy frontend to Vercel or Netlify (free)

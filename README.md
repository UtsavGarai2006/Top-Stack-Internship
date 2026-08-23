# Customer Review Board

A simple BCA-level full-stack CRUD project built with:

- Frontend: React + Vite + Axios
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Main Features

1. Add a customer review
2. Show all reviews
3. Update a review
4. Delete a review
5. Mongoose required-field validation
6. REST API integration using Axios
7. React state management using `useState` and data loading using `useEffect`

## Project Structure

```text
customer-review-board/
│
├── backend/
│   ├── models/
│   │   └── Review.js
│   ├── routes/
│   │   └── reviewRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/reviews` | Show all reviews |
| GET | `/api/reviews/:id` | Show one review |
| POST | `/api/reviews` | Add review |
| PUT | `/api/reviews/:id` | Update review |
| DELETE | `/api/reviews/:id` | Delete review |

## Requirements

Install these before running the project:

- Node.js
- VS Code
- MongoDB Community Server OR a MongoDB Atlas database

Check Node.js:

```bash
node -v
npm -v
```

## Step 1: Start MongoDB

### Option A: MongoDB Community Server

Install MongoDB Community Server and make sure the MongoDB service is running.

The project uses:

```text
mongodb://127.0.0.1:27017/customer_review_board
```

### Option B: MongoDB Atlas

Create a MongoDB Atlas cluster and put its connection string in:

```text
backend/.env
```

Example:

```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/customer_review_board
PORT=5000
```

Do not upload your real password to GitHub.

## Step 2: Backend

Open the project folder in VS Code.

Open a terminal:

```bash
cd backend
npm install
```

Create a file named `.env` inside the `backend` folder:

```env
MONGO_URI=mongodb://127.0.0.1:27017/customer_review_board
PORT=5000
```

Start the backend:

```bash
npm run dev
```

You should see:

```text
MongoDB connected successfully
Server running on http://localhost:5000
```

## Step 3: Frontend

Open a second VS Code terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will show a local address similar to:

```text
http://localhost:5173/
```

Open that address in your browser.

## Step 4: Test CRUD

### Add Review

Enter:

- Customer Name
- Product Name
- Rating (1 to 5)
- Comment

Click **Add Review**.

### Show Review

All saved reviews are displayed automatically after adding and after page load.

### Update Review

Click **Edit** on any review, change the information, and click **Update Review**.

### Delete Review

Click **Delete** and confirm.

## Important

Run the backend and frontend in two separate terminals.

Terminal 1:

```bash
cd backend
npm run dev
```

Terminal 2:

```bash
cd frontend
npm run dev
```

If the frontend says "Failed to fetch" or cannot connect to the API, first check that the backend is running on port 5000.

## Academic Description

This project demonstrates a basic CRUD-based Customer Review Board. Customers can submit reviews for products by entering their name, product name, rating and comment. The React frontend communicates with an Express REST API. Express uses Mongoose to store and manage reviews in MongoDB.

This is intentionally kept simple and suitable for a BCA-level academic project.

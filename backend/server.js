import express from "express";
import cors from "cors";

const app = express();

// FIX 1: Allow your frontend to connect
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://coffee-frontend-indol.vercel.app"
  ]
}));

app.use(express.json());

// FIX 2: Add storage + API routes
let brews = [];

// Load brews
app.get("/brews", (req, res) => {
  res.json(brews);
});

// Save brew
app.post("/brews", (req, res) => {
  const newBrew = { id: Date.now(), ...req.body };
  brews.push(newBrew);
  res.status(201).json(newBrew);
});

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is alive! No DB" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
import express from "express";
import cors from "cors";

const app = express();

// 1. Allow your frontend to connect
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://coffee-frontend-indol.vercel.app"
  ]
}));

// 2. Read JSON from frontend
app.use(express.json());

// 3. This stores your brews. Note: resets when Vercel restarts
let brews = [];

// 4. LOAD brews - fixes "Unable to load brews"
app.get("/brews", (req, res) => {
  res.json(brews);
});

// 5. SAVE brew - fixes "Something went wrong"
app.post("/brews", (req, res) => {
  const newBrew = { id: Date.now().toString(), ...req.body, createdAt: new Date().toISOString() };
  brews.push(newBrew);
  res.status(201).json(newBrew);
});

// 6. Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is alive!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
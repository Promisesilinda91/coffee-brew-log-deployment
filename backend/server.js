import express from "express";
import cors from "cors";

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://coffee-frontend-indol.vercel.app"
  ]
}));
app.use(express.json());

// This is our "database" for now
let brews = [];

// GET all brews - for loading
app.get("/brews", (req, res) => {
  res.json(brews);
});

// POST new brew - for saving
app.post("/brews", (req, res) => {
  const newBrew = { id: Date.now(), ...req.body };
  brews.push(newBrew);
  res.status(201).json(newBrew);
});

app.get("/", (req, res) => {
  res.json({ message: "Backend is alive! No DB" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
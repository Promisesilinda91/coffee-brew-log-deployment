import express from "express";
import cors from "cors";

const app = express();

// Allow your frontend
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://coffee-frontend-indol.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

// In-memory storage
let brews = [];

// GET all brews
app.get("/brews", (req, res) => {
  console.log("GET /brews called");
  res.json(brews);
});

// POST new brew
app.post("/brews", (req, res) => {
  console.log("POST /brews called", req.body);
  const newBrew = { id: Date.now(), ...req.body };
  brews.push(newBrew);
  res.status(201).json(newBrew);
});

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Backend is alive!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
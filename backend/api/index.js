import express from "express";
import cors from "cors";

const app = express();
app.use(cors()); // allow your frontend to connect
app.use(express.json());

// This is just in-memory storage. It resets when Vercel restarts
let brews = [];

// GET all brews
app.get("/api/brews", (req, res) => res.json(brews));

// POST new brew
app.post("/api/brews", (req, res) => {
  const brew = { id: Date.now(), ...req.body };
  brews.push(brew);
  res.status(201).json(brew);
});

// UPDATE brew
app.put("/api/brews/:id", (req, res) => {
  const id = Number(req.params.id);
  brews = brews.map(b => b.id === id ? {...b, ...req.body} : b);
  res.json(brews.find(b => b.id === id));
});

// DELETE brew
app.delete("/api/brews/:id", (req, res) => {
  const id = Number(req.params.id);
  brews = brews.filter(b => b.id !== id);
  res.json({ok: true});
});

// THIS LINE IS CRITICAL FOR VERCEL
export default app;

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let brews = [];

// MATCH YOUR FRONTEND: /api/brews
app.get("/api/brews", (req, res) => res.json(brews));

app.post("/api/brews", (req, res) => {
  const brew = { id: Date.now(), ...req.body };
  brews.push(brew);
  res.status(201).json(brew);
});

app.put("/api/brews/:id", (req, res) => {
  const id = Number(req.params.id);
  brews = brews.map(b => b.id === id ? {...b, ...req.body} : b);
  res.json(brews.find(b => b.id === id));
});

app.delete("/api/brews/:id", (req, res) => {
  const id = Number(req.params.id);
  brews = brews.filter(b => b.id !== id);
  res.json({ok: true});
});

app.get("/", (req, res) => res.json({ok: true}));

app.listen(process.env.PORT || 3000);
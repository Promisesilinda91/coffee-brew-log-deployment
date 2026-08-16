import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let brews = [];

app.get("/brews", (req, res) => res.json(brews));

app.post("/brews", (req, res) => {
  const brew = { id: Date.now(), ...req.body };
  brews.push(brew);
  res.json(brew);
});

app.get("/", (req, res) => res.json({message: "ok"}));

app.listen(process.env.PORT || 3000);
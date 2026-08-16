import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Test route - shows backend is alive
app.get("/", (req, res) => {
  res.json({ message: "Backend is alive! No DB" });
});

// Main API route - this is what your frontend + lecturer will test
app.get("/api/brews", (req, res) => {
  res.json([
    { id: 1, coffee: "Latte", rating: 5, notes: "Creamy and smooth" },
    { id: 2, coffee: "Americano", rating: 4, notes: "Strong" },
    { id: 3, coffee: "Cappuccino", rating: 5, notes: "Perfect foam" }
  ]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

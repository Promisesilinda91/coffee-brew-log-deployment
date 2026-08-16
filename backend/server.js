const express = require("express");
const cors = require("cors");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const DATABASE = process.env.DATABASE || path.join(__dirname, "coffee.db");
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: DATABASE,
  logging: false,
});

const METHODS = [
  "Aeropress",
  "Drip coffee",
  "V60",
  "French press",
  "Chemex",
  "Espresso",
];

const Brew = sequelize.define(
  "Brew",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    beans: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Beans are required." },
      },
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Brew method is required." },
        isIn: {
          args: [METHODS],
          msg: "Please select a valid brew method.",
        },
      },
    },
    coffeeGrams: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "coffee",
      validate: {
        isInt: { msg: "Coffee grams must be a whole number." },
        min: { args: [1], msg: "Coffee grams must be greater than 0." },
      },
    },
    waterGrams: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "water",
      validate: {
        isInt: { msg: "Water grams must be a whole number." },
        min: { args: [1], msg: "Water grams must be greater than 0." },
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Rating must be a whole number." },
        min: { args: [1], msg: "Rating must be at least 1." },
        max: { args: [5], msg: "Rating cannot be more than 5." },
      },
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Tasting notes are required." },
      },
    },
  },
  {
    tableName: "brews",
    timestamps: false,
  }
);

function validateBrewPayload(body) {
  const { beans, method, coffeeGrams, waterGrams, rating, notes } = body || {};

  if (
    !String(beans ?? "").trim() ||
    !String(method ?? "").trim() ||
    coffeeGrams === "" ||
    coffeeGrams === undefined ||
    coffeeGrams === null ||
    waterGrams === "" ||
    waterGrams === undefined ||
    waterGrams === null ||
    rating === "" ||
    rating === undefined ||
    rating === null ||
    !String(notes ?? "").trim()
  ) {
    return "All fields are required.";
  }

  const coffee = Number(coffeeGrams);
  const water = Number(waterGrams);
  const score = Number(rating);

  if (!METHODS.includes(method)) {
    return "Please select a valid brew method.";
  }

  if (!Number.isInteger(coffee) || coffee < 1) {
    return "Coffee grams must be a positive whole number.";
  }

  if (!Number.isInteger(water) || water < 1) {
    return "Water grams must be a positive whole number.";
  }

  if (!Number.isInteger(score) || score < 1 || score > 5) {
    return "Rating must be a whole number from 1 to 5.";
  }

  return null;
}

function normaliseBrew(body) {
  return {
    beans: String(body.beans).trim(),
    method: body.method,
    coffeeGrams: Number(body.coffeeGrams),
    waterGrams: Number(body.waterGrams),
    rating: Number(body.rating),
    notes: String(body.notes).trim(),
  };
}

app.get("/api/brews", async (req, res) => {
  try {
    const brews = await Brew.findAll({ order: [["id", "DESC"]] });
    return res.status(200).json(brews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to load brews." });
  }
});

app.get("/api/brews/:id", async (req, res) => {
  try {
    const brew = await Brew.findByPk(req.params.id);

    if (!brew) {
      return res.status(404).json({ error: "Brew not found." });
    }

    return res.status(200).json(brew);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to load brew." });
  }
});

app.post("/api/brews", async (req, res) => {
  const validationError = validateBrewPayload(req.body);

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const brew = await Brew.create(normaliseBrew(req.body));
    return res.status(201).json(brew);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: error.errors?.[0]?.message || "Unable to create brew.",
    });
  }
});

app.put("/api/brews/:id", async (req, res) => {
  const validationError = validateBrewPayload(req.body);

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const brew = await Brew.findByPk(req.params.id);

    if (!brew) {
      return res.status(404).json({ error: "Brew not found." });
    }

    await brew.update(normaliseBrew(req.body));
    return res.status(200).json(brew);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: error.errors?.[0]?.message || "Unable to update brew.",
    });
  }
});

app.delete("/api/brews/:id", async (req, res) => {
  try {
    const deleted = await Brew.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res.status(404).json({ error: "Brew not found." });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to delete brew." });
  }
});

app.get("/api/health", (req, res) => {
  return res.status(200).json({ status: "ok" });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Coffee Brew Log API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start the server:", error);
    process.exit(1);
  }
}

startServer();

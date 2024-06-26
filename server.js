// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies for all routes
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Mongoose Model
const dbmod = mongoose.model("item", {
  type: String,
  val1: String,
  val2: String,
  val3: String,
  val4: String,
});

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://nirmitjee:${process.env.DB_PASS_KEY}@gallery-tev.c6uel.mongodb.net`,
    {
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Routes
app.get("/gallery", async (req, res) => {
  try {
    const items = await dbmod.find({ type: "gallery" });
    res.json(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/contact", async (req, res) => {
  try {
     console.log(req.body);
    const p = new dbmod({
      type: "mssg",
      val1: req.body.name,
      val2: req.body.email,
      val3: req.body.message,
      val4: req.body.phone,
    });
    await p.save();
    res.status(201).send("Contact message added");
    console.log(p);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/del", async (req, res) => {
  try {

    const items = await dbmod.find();
    res.json(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/deleteItem", async (req, res) => {
  try {
     console.log(req.body);
    await dbmod.deleteOne({ _id: req.body.itemId });
    res.status(200).send("Item deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/gal-add", async (req, res) => {
  try {
     console.log(req.body);
    const p = new dbmod({
      type: "gallery",
      val1: req.body.val1,
      val2: req.body.val2,
      val3: req.body.val3,
      val4: "nothing",
    });
    await p.save();
    res.status(201).send("Gallery item added");
    console.log(p);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

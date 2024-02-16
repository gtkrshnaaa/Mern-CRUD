const express = require("express");
const recordRoutes = express.Router();
const mongoose = require("mongoose");

// Defining (or) Building : Record Model
const Record = mongoose.model("Record", {
  name: String,
  position: String,
  level: String,
});
// All Routes related to records
// Get all records
recordRoutes.route("/record").get(async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get a single record by id
recordRoutes.route("/record/:id").get(async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Create a new record
recordRoutes.route("/record/add").post(async (req, res) => {
  try {
    const newRecord = new Record({
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    });
    await newRecord.save();
    res.json({ message: "Record added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Update a record by id
recordRoutes.route("/update/:id").post(async (req, res) => {
  try {
    await Record.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    });
    res.json({ message: "Record updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Delete a record by id
recordRoutes.route("/:id").delete(async (req, res) => {
  try {
    await Record.findByIdAndDelete(req.params.id);
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = recordRoutes;
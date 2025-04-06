const Package = require("../models/Package");
const fs = require("fs");
const path = require("path");

exports.addPackage = async (req, res) => {
  try {
    const { name, description, date, price } = req.body;
    const agency_id = req.user.id; // From auth middleware
    
    if (!req.file) {
      return res.status(400).json({ error: "Photo is required" });
    }

    const photo = req.file.filename;

    // Validate input
    if (!name || !description || !date || !price) {
      // Clean up uploaded file if validation fails
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "All fields are required" });
    }

    const newPackage = await Package.addPackage({
      name,
      description,
      date,
      price,
      photo,
      agency_id
    });

    res.status(201).json({
      success: true,
      package: newPackage
    });
  } catch (error) {
    // Clean up file if error occurs
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: error.message });
  }
};
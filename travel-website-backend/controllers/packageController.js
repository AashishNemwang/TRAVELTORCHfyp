const Package = require("../models/Package");
const multer = require("multer");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage }).single("photo");

exports.addPackage = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ message: "File upload failed" });

    const { name, description, date, price } = req.body;
    const agency_id = req.user.id;
    const photo = req.file ? req.file.filename : null;

    if (!name || !description || !date || !price || !photo) {
      return res.status(400).json({ message: "All fields are required" });
    }

    Package.addPackage({ name, description, date, price, photo, agency_id }, (err) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.status(201).json({ message: "Package added successfully" });
    });
  });
};

exports.getAllPackages = (req, res) => {
  const filters = {
    search: req.query.search || null,
    minPrice: req.query.minPrice || null,
    maxPrice: req.query.maxPrice || null,
    startDate: req.query.startDate || null,
    endDate: req.query.endDate || null,
  };

  Package.getAllPackages(filters, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
};

exports.getPackageById = (req, res) => {
  Package.getPackageById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "Package not found" });
    res.json(results[0]);
  });
};

exports.updatePackage = (req, res) => {
  const { name, description, date, price } = req.body;
  const photo = req.file ? req.file.filename : null;

  Package.updatePackage(req.params.id, { name, description, date, price, photo }, (err) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ message: "Package updated successfully" });
  });
};

exports.deletePackage = (req, res) => {
  Package.deletePackage(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ message: "Package deleted successfully" });
  });
};

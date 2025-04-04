// const Package = require("../models/Package");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Configure Multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = "uploads/";
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."), false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
// }).single("photo");

// // Add new package
// exports.addPackage = (req, res) => {
//   upload(req, res, async (err) => {
//     try {
//       if (err) {
//         if (err.code === "LIMIT_FILE_SIZE") {
//           return res.status(400).json({ message: "File size exceeds 5MB limit" });
//         }
//         return res.status(400).json({ message: err.message });
//       }

//       const { name, description, date, price } = req.body;
//       const agency_id = req.user.id;
//       const photo = req.file ? req.file.filename : null;

//       // Validate required fields
//       if (!name || !description || !date || !price || !photo) {
//         // Clean up uploaded file if validation fails
//         if (req.file) {
//           fs.unlinkSync(req.file.path);
//         }
//         return res.status(400).json({ message: "All fields are required" });
//       }

//       // Validate date format (YYYY-MM-DD)
//       if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
//         if (req.file) {
//           fs.unlinkSync(req.file.path);
//         }
//         return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD" });
//       }

//       // Validate price is a positive number
//       if (isNaN(price) || parseFloat(price) <= 0) {
//         if (req.file) {
//           fs.unlinkSync(req.file.path);
//         }
//         return res.status(400).json({ message: "Price must be a positive number" });
//       }

//       // Create package
//       const result = await Package.addPackage({ 
//         name, 
//         description, 
//         date, 
//         price: parseFloat(price), 
//         photo, 
//         agency_id 
//       });

//       res.status(201).json({ 
//         message: "Package added successfully",
//         packageId: result.insertId 
//       });
//     } catch (error) {
//       console.error("Error adding package:", error);
//       if (req.file) {
//         fs.unlinkSync(req.file.path);
//       }
//       res.status(500).json({ message: "Failed to add package", error: error.message });
//     }
//   });
// };

// // Get all packages with optional filters
// exports.getAllPackages = async (req, res) => {
//   try {
//     const filters = {
//       search: req.query.search || null,
//       minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : null,
//       maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : null,
//       startDate: req.query.startDate || null,
//       endDate: req.query.endDate || null,
//       agencyId: req.query.agencyId || null
//     };

//     // Validate numeric filters
//     if (filters.minPrice && isNaN(filters.minPrice)) {
//       return res.status(400).json({ message: "minPrice must be a number" });
//     }
//     if (filters.maxPrice && isNaN(filters.maxPrice)) {
//       return res.status(400).json({ message: "maxPrice must be a number" });
//     }

//     const packages = await Package.getAllPackages(filters);
//     res.json(packages);
//   } catch (error) {
//     console.error("Error fetching packages:", error);
//     res.status(500).json({ message: "Failed to fetch packages", error: error.message });
//   }
// };

// // Get single package by ID
// exports.getPackageById = async (req, res) => {
//   try {
//     const packageId = req.params.id;
//     if (isNaN(packageId)) {
//       return res.status(400).json({ message: "Invalid package ID" });
//     }

//     const package = await Package.getPackageById(packageId);
//     if (!package) {
//       return res.status(404).json({ message: "Package not found" });
//     }

//     res.json(package);
//   } catch (error) {
//     console.error("Error fetching package:", error);
//     res.status(500).json({ message: "Failed to fetch package", error: error.message });
//   }
// };

// // Update package
// exports.updatePackage = async (req, res) => {
//   upload(req, res, async (err) => {
//     try {
//       if (err) {
//         return res.status(400).json({ message: err.message });
//       }

//       const packageId = req.params.id;
//       if (isNaN(packageId)) {
//         return res.status(400).json({ message: "Invalid package ID" });
//       }

//       const { name, description, date, price } = req.body;
//       const photo = req.file ? req.file.filename : null;

//       // Validate at least one field is being updated
//       if (!name && !description && !date && !price && !photo) {
//         if (req.file) {
//           fs.unlinkSync(req.file.path);
//         }
//         return res.status(400).json({ message: "At least one field must be updated" });
//       }

//       // Get existing package to handle photo updates
//       const existingPackage = await Package.getPackageById(packageId);
//       if (!existingPackage) {
//         if (req.file) {
//           fs.unlinkSync(req.file.path);
//         }
//         return res.status(404).json({ message: "Package not found" });
//       }

//       // Prepare update data
//       const updateData = {
//         name: name || existingPackage.name,
//         description: description || existingPackage.description,
//         date: date || existingPackage.date,
//         price: price ? parseFloat(price) : existingPackage.price,
//         photo: photo || existingPackage.photo
//       };

//       // Validate price if being updated
//       if (price && (isNaN(price) || parseFloat(price) <= 0)) {
//         if (req.file) {
//           fs.unlinkSync(req.file.path);
//         }
//         return res.status(400).json({ message: "Price must be a positive number" });
//       }

//       // Update package
//       await Package.updatePackage(packageId, updateData);

//       // Delete old photo if a new one was uploaded
//       if (photo && existingPackage.photo && existingPackage.photo !== photo) {
//         const oldPhotoPath = path.join("uploads", existingPackage.photo);
//         if (fs.existsSync(oldPhotoPath)) {
//           fs.unlinkSync(oldPhotoPath);
//         }
//       }

//       res.json({ message: "Package updated successfully" });
//     } catch (error) {
//       console.error("Error updating package:", error);
//       if (req.file) {
//         fs.unlinkSync(req.file.path);
//       }
//       res.status(500).json({ message: "Failed to update package", error: error.message });
//     }
//   });
// };

// // Delete package
// exports.deletePackage = async (req, res) => {
//   try {
//     const packageId = req.params.id;
//     if (isNaN(packageId)) {
//       return res.status(400).json({ message: "Invalid package ID" });
//     }

//     // Get package first to handle photo deletion
//     const package = await Package.getPackageById(packageId);
//     if (!package) {
//       return res.status(404).json({ message: "Package not found" });
//     }

//     // Delete the package
//     await Package.deletePackage(packageId);

//     // Delete associated photo file
//     if (package.photo) {
//       const photoPath = path.join("uploads", package.photo);
//       if (fs.existsSync(photoPath)) {
//         fs.unlinkSync(photoPath);
//       }
//     }

//     res.json({ message: "Package deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting package:", error);
//     res.status(500).json({ message: "Failed to delete package", error: error.message });
//   }
// };
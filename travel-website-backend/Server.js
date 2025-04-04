const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
// const travelPackageRoutes = require("./routes/packageRoutes");
// const bookingRoutes = require("./routes/bookingRoutes"); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
// app.use("/api/packages", travelPackageRoutes);
// app.use("/api/bookings", bookingRoutes); 

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 
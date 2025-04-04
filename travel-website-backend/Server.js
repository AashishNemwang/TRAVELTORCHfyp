const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const dotenv=require('dotenv');
dotenv.config();
// const travelPackageRoutes = require("./routes/packageRoutes");
// const bookingRoutes = require("./routes/bookingRoutes"); 

const app = express();
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
  methods:['GET',"POST","PATCH","PUT","DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
// app.use("/api/packages", travelPackageRoutes);
// app.use("/api/bookings", bookingRoutes); 

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 
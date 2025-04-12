require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');



// const packageRoutes = require('./routes/packageRoutes');
// const userRoutes = require('./routes/userRoutes');
// const errorHandler = require('./middleware/errorMiddleware');

const app = express();


// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authMiddleware.authenticate);

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/packages', packageRoutes);
// app.use('/api/users', userRoutes);

// Error Handling Middleware
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
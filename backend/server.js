// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(express.json());
// app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));

// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/admin', require('./routes/admin'));
// app.use('/api/teacher', require('./routes/teacher'));
// app.use('/api/student', require('./routes/student'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log('Backend started on', PORT));



require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const seedAdmin = require("./config/seedAdmin");


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect MongoDB
connectDB();

seedAdmin();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/teacher", require("./routes/teacherRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

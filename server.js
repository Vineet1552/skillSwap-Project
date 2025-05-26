require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(morgan("dev"));


app.use('/api/auth', authRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
    console.log(`port is listning at ${port}`);
})
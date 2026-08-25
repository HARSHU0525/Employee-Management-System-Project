const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/db");

const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
    res.send("Employee Management System Backend is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
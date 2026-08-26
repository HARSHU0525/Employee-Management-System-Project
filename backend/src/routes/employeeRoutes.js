const express = require("express");

const router = express.Router();

const {
    addEmployee,
    getEmployees,
    updateEmployee
} = require("../controllers/employeeController");

// Get all employees
router.get("/", getEmployees);

// Add employee
router.post("/", addEmployee);

// Update employee
router.put("/:id", updateEmployee);

module.exports = router;
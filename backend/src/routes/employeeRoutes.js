const express = require("express");

const router = express.Router();

const {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
} = require("../controllers/employeeController");

// Get all employees
router.get("/", getEmployees);

// Add employee
router.post("/", addEmployee);

// Update employee
router.put("/:id", updateEmployee);

// Delete employee
router.delete("/:id", deleteEmployee);

module.exports = router;
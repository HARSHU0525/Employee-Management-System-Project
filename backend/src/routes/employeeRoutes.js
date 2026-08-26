const express = require("express");

const router = express.Router();

const {
    addEmployee,
    getEmployees
} = require("../controllers/employeeController");

// ADD EMPLOYEE
router.post("/", addEmployee);

// VIEW ALL EMPLOYEES
router.get("/", getEmployees);

module.exports = router;
    getEmployees,
    addEmployee,
    deleteEmployee,
    updateEmployee
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

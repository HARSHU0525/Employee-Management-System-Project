const express = require("express");

const router = express.Router();

const {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
} = require("../controllers/employeeController");


// ==========================================
// GET ALL EMPLOYEES
// GET /api/employees
// ==========================================
router.get("/", getEmployees);


// ==========================================
// ADD EMPLOYEE
// POST /api/employees
// ==========================================
router.post("/", addEmployee);


// ==========================================
// UPDATE EMPLOYEE
// PUT /api/employees/:id
// ==========================================
router.put("/:id", updateEmployee);


// ==========================================
// DELETE EMPLOYEE
// DELETE /api/employees/:id
// ==========================================
router.delete("/:id", deleteEmployee);


module.exports = router;
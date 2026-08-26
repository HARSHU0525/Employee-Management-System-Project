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
    deleteEmployee
} = require("../controllers/employeeController");

router.get("/", getEmployees);

router.post("/", addEmployee);

router.delete("/:id", deleteEmployee);

module.exports = router;

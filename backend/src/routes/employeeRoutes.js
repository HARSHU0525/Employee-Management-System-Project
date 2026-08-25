const express = require("express");

const router = express.Router();

const {
    addEmployee,
    deleteEmployee
} = require("../controllers/employeeController");

router.post("/", addEmployee);

router.delete("/:id", deleteEmployee);

module.exports = router;
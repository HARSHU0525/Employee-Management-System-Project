const pool = require("../config/db");

// GET ALL EMPLOYEES
const getEmployees = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM employees ORDER BY id ASC"
        );

        res.status(200).json(result.rows);

    } catch (error) {
        console.error("Error fetching employees:", error);

        res.status(500).json({
            message: "Failed to fetch employees",
            error: error.message
        });
    }
};


// ADD EMPLOYEE
const addEmployee = async (req, res) => {
    try {
        const { name, email, department, salary, phone } = req.body;

        console.log("Received employee:", req.body);

        if (!name || !email || !department || !salary || !phone) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const result = await pool.query(
            `INSERT INTO employees
            (name, email, department, salary, phone)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [name, email, department, salary, phone]
        );

        console.log("Employee added:", result.rows[0]);

        res.status(201).json({
            message: "Employee added successfully",
            employee: result.rows[0]
        });

    } catch (error) {
        console.error("Error adding employee:", error);

        res.status(500).json({
            message: "Failed to add employee",
            error: error.message
        });
    }
};

// VIEW ALL EMPLOYEES
const getEmployees = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM employees ORDER BY id ASC`
        );

        res.status(200).json({
            employees: result.rows
        });

    } catch (error) {
        console.error("Error fetching employees:", error);

        res.status(500).json({
            message: "Failed to fetch employees",

// DELETE EMPLOYEE
const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM employees
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee deleted successfully",
            employee: result.rows[0]
        });

    } catch (error) {
        console.error("Error deleting employee:", error);

        res.status(500).json({
            message: "Failed to delete employee",
            error: error.message
        });
    }
};


module.exports = {
    addEmployee,
    getEmployees
};
    getEmployees,
    addEmployee,
    deleteEmployee
};

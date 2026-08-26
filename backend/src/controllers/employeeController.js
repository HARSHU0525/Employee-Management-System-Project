const pool = require("../config/db");

// ADD EMPLOYEE
const addEmployee = async (req, res) => {
    try {
        const { name, email, department, salary, phone } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        const result = await pool.query(
            `INSERT INTO employees
            (name, email, department, salary, phone)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [name, email, department, salary, phone]
        );

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
            error: error.message
        });
    }
};

module.exports = {
    addEmployee,
    getEmployees
};

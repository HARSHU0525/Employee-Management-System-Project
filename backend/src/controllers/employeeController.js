const pool = require("../config/db");

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


const getEmployees = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM employees ORDER BY id`
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


const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, department, salary, phone } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        const result = await pool.query(
            `UPDATE employees
             SET name = $1,
                 email = $2,
                 department = $3,
                 salary = $4,
                 phone = $5
             WHERE id = $6
             RETURNING *`,
            [name, email, department, salary, phone, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee updated successfully",
            employee: result.rows[0]
        });

    } catch (error) {
        console.error("Error updating employee:", error);

        res.status(500).json({
            message: "Failed to update employee",
            error: error.message
        });
    }
};


module.exports = {
    addEmployee,
    getEmployees,
    updateEmployee
};
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
    deleteEmployee
};
const mysql = require("mysql2/promise");

module.exports = async (req, res) => {
    try {

        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [rows] = await db.query(
            "SELECT * FROM Movimientos ORDER BY Fecha DESC"
        );

        res.status(200).json(rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
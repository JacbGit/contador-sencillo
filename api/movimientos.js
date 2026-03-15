const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL
});

module.exports = async (req, res) => {
    try {

        const result = await pool.query(
        "SELECT * FROM Movimientos ORDER BY Fecha DESC"
        );

        res.status(200).json(result.rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL
});

module.exports = async (req, res) => {
    try {

        const result = await pool.query(
        "SELECT SUM(Cantidad) AS total FROM Movimientos"
        );

        res.status(200).json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL
});

module.exports = async (req, res) => {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {

        const { motivo, cantidad, categoria } = req.body;

        await pool.query(
        "INSERT INTO movimientos (fecha, motivo, cantidad, categoria_id) VALUES (NOW(), $1, $2, $3)",
        [motivo, cantidad, categoria]
        );

        res.status(200).json({ message: "Movimiento registrado" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};
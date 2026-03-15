const mysql = require("mysql2/promise");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {

        const { motivo, cantidad } = req.body;

        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const fecha = new Date();

        await db.query(
            "INSERT INTO Movimientos (Fecha, Motivo, Cantidad) VALUES (?, ?, ?)",
            [fecha, motivo, cantidad]
        );

    res.status(200).json({ message: "Movimiento registrado" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
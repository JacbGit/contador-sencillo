const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const app = express()
const PORT = 3000

const config = loadConfig();

const dbConfig = loadConfig(path.join(__dirname, 'db.config'))

app.use(express.static(path.join(__dirname)))
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  host:     dbConfig.host,
  user:     dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'movimientos.html'))
})

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'))
})

app.post('/register_event', (req, res) => {
  const { motivo, cantidad } = req.body
  const fecha = new Date()

  db.query(
    'INSERT INTO Movimientos (Fecha, Motivo, Cantidad) VALUES (?, ?, ?)',
    [fecha, motivo, cantidad],
    (err, results) => {
      if (err) return res.status(500).json({ error: err })
      res.json({ message: 'Evento registrado correctamente' })
    }
  )
})

app.get('/movimientos', (req, res) => {
  db.query('SELECT * FROM Movimientos ORDER BY Fecha DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err })
    res.json(results)
  })
})

app.get('/total', (req, res) => {
  db.query('CALL total_Movs()', (err, results) => {
    if (err) return res.status(500).json({ error: err })
    res.json(results[0][0])
  })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

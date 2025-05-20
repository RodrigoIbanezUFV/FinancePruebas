// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// --- Metodo_de_ahorro ---
app.get('/metodos_ahorro', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Metodo_de_ahorro');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/metodos_ahorro', async (req, res) => {
  const { tipo } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO Metodo_de_ahorro (tipo) VALUES ($1) RETURNING *',
      [tipo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Usuario ---
app.get('/usuarios', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Usuario');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/usuarios', async (req, res) => {
  const { nombre, correo_electronico, contrasena, metodo_ahorro_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO Usuario (nombre, correo_electronico, contrasena, metodo_ahorro_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, correo_electronico, contrasena, metodo_ahorro_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Ingreso ---
app.get('/ingresos', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Ingreso');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/ingresos', async (req, res) => {
  const { monto, fecha, usuario_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO Ingreso (monto, fecha, usuario_id) VALUES ($1, $2, $3) RETURNING *',
      [monto, fecha, usuario_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Gasto ---
app.get('/gastos', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Gasto');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/gastos', async (req, res) => {
  const { monto, categoria, fecha, usuario_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO Gasto (monto, categoria, fecha, usuario_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [monto, categoria, fecha, usuario_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Meta_ahorro ---
app.get('/metas_ahorro', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Meta_ahorro');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/metas_ahorro', async (req, res) => {
  const { objetivo, monto_objetivo, fecha_limite, usuario_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO Meta_ahorro (objetivo, monto_objetivo, fecha_limite, usuario_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [objetivo, monto_objetivo, fecha_limite, usuario_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Notificacion ---
app.get('/notificaciones', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Notificacion');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/notificaciones', async (req, res) => {
  const { mensaje, fecha } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO Notificacion (mensaje, fecha) VALUES ($1, $2) RETURNING *',
      [mensaje, fecha]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Recomendacion ---
app.get('/recomendaciones', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Recomendacion');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/recomendaciones', async (req, res) => {
  const { contenido } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO Recomendacion (contenido) VALUES ($1) RETURNING *',
      [contenido]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Recomendacion_Notificacion ---
app.get('/recomendaciones_notificaciones', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Recomendacion_Notificacion');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/recomendaciones_notificaciones', async (req, res) => {
  const { recomendacion_id, notificacion_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO Recomendacion_Notificacion (recomendacion_id, notificacion_id) VALUES ($1, $2) RETURNING *',
      [recomendacion_id, notificacion_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Iniciar servidor ---
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

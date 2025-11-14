const express = require("express");
const router = express.Router();
const pool = require("./db");

// LISTAR AUTORES
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM autor ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error("🔥 ERROR EN BD:", error);
    res.status(500).json({ mensaje: "Error al obtener autores", error: error.message });
  }
});

// CREAR AUTOR
router.post("/", async (req, res) => {
  const { nombre, nacionalidad } = req.body;

  try {
    const query = `
      INSERT INTO autor (nombre, nacionalidad)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const result = await pool.query(query, [nombre, nacionalidad]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("🔥 ERROR BD CREAR:", error);
    res.status(500).json({ mensaje: "Error al crear autor", error: error.message });
  }
});

// OBTENER 1
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM autor WHERE id = $1", [id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("🔥 ERROR BD:", error);
    res.status(500).json({ mensaje: "Error al obtener autor", error: error.message });
  }
});

// ACTUALIZAR
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, nacionalidad } = req.body;

  try {
    const query = `
      UPDATE autor SET nombre = $1, nacionalidad = $2
      WHERE id = $3 RETURNING *;
    `;
    const result = await pool.query(query, [nombre, nacionalidad, id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("🔥 ERROR BD:", error);
    res.status(500).json({ mensaje: "Error al actualizar autor", error: error.message });
  }
});

// ELIMINAR
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM autor WHERE id = $1", [id]);
    res.json({ mensaje: "Autor eliminado" });
  } catch (error) {
    console.error("🔥 ERROR BD:", error);
    res.status(500).json({ mensaje: "Error al eliminar autor", error: error.message });
  }
});

module.exports = router;
